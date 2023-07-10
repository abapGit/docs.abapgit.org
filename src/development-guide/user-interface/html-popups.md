---
title: HTML Popups
category: ui
order: 60
---

**Disclaimer**: this functionality is new and may change potentially.

## Architecture comments

Kinds of popups:

- "in-page" - a hovering form, blocking the regular content
- "separate page" - a regular page, yet that does not allow any page transitions others that `go back`

Ideally, a visualization component **should not know that it is a popup** (being agnostic). It is its wrapper that should know and manage the aspects. For example: `zcl_abapgit_gui_picklist` - a component that renders a list to choose an item from. This very same component can be rendered as a part of the page, as an in-page popup, or as a separate page popup.

### Separate-page popup

Calling a separate-page popup would be initiated in the event handler and thus would look like this:

```abap
  rs_handled-state = zcl_abapgit_gui=>c_event_state-new_page.
  rs_handled-page  = zcl_abapgit_gui_page_hoc=>create(
    ii_child_component = mo_popup_picklist " Or another component
    iv_show_as_modal   = abap_true ).
```

Thus wrapping the popup component (e.g. `mo_popup_picklist` in this example) into the High Order page component. Passing `iv_show_as_modal` to `zcl_abapgit_gui_page_hoc` has the following effects on GUI:

- only `re_render`, `go_back`, and `no_more_act` states are accepted from the modal event handler (thus guaranteeing that popup will not forward to any other page rather than its caller)
- `router` is excluded from the event chain (thus also removing the main source of page redirections)

### Calling a popup in-page

The example below focuses on the functionality of `zcl_abapgit_gui_picklist`, yet it can be any other properly designed component in a popup.

- take into account that re-rendering in-page popup *also re-renders the underlying page*. If the caller page is potentially large, probably, an in-page popup is a sub-optimal choice.
- the caller page should not interfere with the popup in terms of event and hotkey handling. Thus it must **not** register the handler if an in-page popup is visible.

Sample implementation can be found for example in `zcl_abapgit_gui_page_sett_remo`, it includes these treats:

- `mo_popup_picklist` - an instance of a popup (one of - the page can show several, yet all of them are managed by `zcl_abapgit_gui_picklist`)
- in the event handler: the code that auto-detects if the popup is an in-page or independent

```abap
  IF mo_popup_picklist IS BOUND. " Uniform popup state handling
    IF mo_popup_picklist->is_in_page( ) = abap_true.
      rs_handled-state = zcl_abapgit_gui=>c_event_state-re_render.
      " in-page popup -> rerender the page together with the popup
    ELSE.
      rs_handled-state = zcl_abapgit_gui=>c_event_state-new_page.
      rs_handled-page  = zcl_abapgit_gui_page_hoc=>create(
        ii_child_component = mo_popup_picklist
        iv_show_as_modal   = abap_true ).
      " separate page popup -> switch to it
    ENDIF.
  ENDIF.
```

- in `render`: if an "in-page" popup was initiated - skip own `register_handlers` (to avoid interference). Otherwise, add the popup to the render result.

```abap
    IF mo_popup_picklist IS NOT BOUND OR mo_popup_picklist->is_in_page( ) = abap_false.
      register_handlers( ).
    ELSEIF mo_popup_picklist->is_in_page( ) = abap_true.
      " Block usual page events if the popup is an in-page popup
      ri_html->add( zcl_abapgit_gui_in_page_modal=>create( mo_popup_picklist ) ).
    ENDIF.
```

## Initiating the popup and retrieving the result

Problem: SAP does not allow modal HTML forms, thus initialization and retrieving the result happens asynchronously and independently. It is more the developer's responsibility to keep this code readable.

The current "state-of-art" approach suggests (though can potentially be improved): process initiation and result reading **in the same method**, the "mode" should be dictated by parameters (e.g. `iv_is_return = abap_true`)

e.g. let's consider the `zcl_abapgit_gui_page_sett_remo->choose_branch`:

- initiation would end up with `mo_popup_picklist = ...` (create the component), thus marking the presence of the popup for the further code
- the returning part `iv_is_return = abap_true` is checking if the popup was canceled by user `mo_popup_picklist->was_cancelled( )` and retrieves the chosen entry `mo_popup_picklist->get_result_item( ... )`

Now, it is important to uniformly initiate the return flow. In `zcl_abapgit_gui_page_sett_remo` this is done by `handle_picklist_state` which is called at the very beginning of the `render`. The method checks if the popup claims that it was fulfilled (confirmed or canceled) and, if yes, calls the appropriate `choose_*` method based on `mo_popup_picklist->id( )`.

Finally, one more way to escape the popup is by pressing the F3 or ESC - which are handled by GUI, not by the popup component. As a result of this:

1. popup does not know that it was canceled
2. even further, the `back` will be applied to the caller page and not to the in-page popup!

The solution to that is the `graceful back` procedure. Before going back the GUI send an event `go_back` to the top-most component (which happens to be the popup). Thus the component has a chance to:

- properly process the request to exit
- send back the `re_render` or `no_more_act` states
  - the `re_render` will result in the re-rendering of the parent (caller) page, yet with the popup in canceled/fulfilled state
  - the `no_more_act` gives a possibility to cancel the `go_back` action (e.g. to prevent exiting the popup when data was not saved)
