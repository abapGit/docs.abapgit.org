---
title: HTML Tables
category: ui
order: 70
---

_The tables component is still experimental and may be a subject to change. Cross check with the actual code in the codebase (e.g. `zcl_abapgit_gui_page_codi_base` and it's subclasses)._

## General concept and features

- Create an instance of `zcl_abapgit_html_table`, supplying the _renderer_
- Define column structure with `define_column`
- Render the component, supplying the data
- While rendering, the html table instance will call the appropriate _renderer_ methods for each row and cell, yet hiding all routine table construction inside

### Features

- styling individual cells and rows
- auto-marking columns with `column_id` data attribute
- sorting UI support

## Simplest table example

Suppose you have a table of this structure:

```abap
  begin of ty_data,
    id   type i,
    name type string,
    city type string,
  end of ty_data,
```

Define the table structure and pass the _renderer_ instance. `column_id` is the id to identify the column in further callback, in css styles, and also to be used as _default_ field name to extract the value from the table record. `column_title` is a visual name of the html table column.

```abap
  li_table = zcl_abapgit_html_table=>create( me
    )->define_column(
      iv_column_id    = 'id'
      iv_column_title = 'ID'
    )->define_column(
      iv_column_id    = 'name'
      iv_column_title = 'Name'
    )->define_column(
      iv_column_id    = 'city'
      iv_column_title = 'Location' ).
```

Implement rendering methods `render_cell` and, optionally, `get_row_attrs`. This can be done directly in a calling component (typically), or in separate local classes (e.g. if there are several tables in the page).

```abap
  method zif_abapgit_html_table~render_cell.
    " This is the simplest form of rendering
    " `iv_value` contains stringified content of `column_id` field of table record
    " `content` attribute of the returning structure
    "  is the text value to be rendered in the cell
    rs_render-content = iv_value.
  endmethod.
```

Finally call the table `render` method to produce html. Pass the data table to be rendered.

```abap
  ri_html->add( li_table->render(
    it_data = value ty_data_tab(
      ( id = 1  name = 'John'    city = 'London' )
      ( id = 2  name = 'Pierre'  city = 'Paris' )
    ) ) ).
```

![Simplest table](/img/ui_table_simple.png)

## CSS styles

There are several approaches to style your table. First of all, you can pass element id, and css class of the table itslef to the `render` method. Passing `iv_wrap_in_div` parameter will wrap your table in another `div` with the given css class name, mostly for visual styling purposes (e.g. see padded borders and rounded corners in the screenshot below). There defauld CSS styles in abapGit to reuse if you don't want to bother with any specific styling - `default-table` and `default-table-container` respectively, for the wrapping `div`.

```abap
  ri_html->add( li_table->render(
    iv_wrap_in_div = 'default-table-container'
    iv_css_class   = 'default-table'
    iv_id          = 'my-addr-tab'
    it_data = ... ).
```

![Styled table](/img/ui_table_styled.png)

Rendering methods `render_cell` and `get_row_attrs` allow specifying css classes for individual cells and rows.

```abap
  method zif_abapgit_html_table~get_row_attrs.
    rs_attrs-css_class = 'my-tab-row'.
  endmethod.

  method zif_abapgit_html_table~render_cell.
    " ...
    rs_render-css_class = 'my-cell'.
  endmethod.
```

Finally, passing `iv_with_cids = abap_true` param to `render` will auto mark cells with data attribute `data-cid` with respecting `column_id`. This enables easy in-direct CSS styling or reassembling memory representation of the table in java script.

```abap
  ri_html->add( li_table->render(
    iv_with_cids     = abap_true
    ... ).
```

`get_row_attrs` also allows passing custom data attribute. Again can be used in CSS styling or JS.

```abap
  method zif_abapgit_html_table~get_row_attrs.
    rs_attrs-data-name = 'status'.
    rs_attrs-data-value = 'error'.
  endmethod.
```

Resulting HTML:

```html
  <table id="my-addr-tab" class="default-table">
    <thead>
      <tr>
        <th data-cid="id">ID</th>
        <th data-cid="name">Name</th>
        <th data-cid="city">Location</th>
      </tr>
    </thead>
    <tbody>
      <tr data-status="error">
        <td data-cid="id">1</td>
        <td data-cid="name">John</td>
        <td data-cid="city">London</td>
      </tr>
      ...
    </tbody>
  </table>

```

```css
table td[data-cid="id"] { font-weight: bold; }
table tr[data-kind="error"] { background-color: red; }
```

## Cell rendering

You can define your column so that the `column_id` and the field to take value from differ. In the example below the `iv_value` in `render_cell` will be taken from `person_id` field of the table structure.

```abap
  li_table->define_column(
    iv_column_id    = 'id'
    iv_column_title = 'ID'
    iv_from_field   = 'person_id' ).
```

You are not obliged to use `iv_value` in `render_cell`. Among the parameters of `render_cell` and `get_row_attrs` you will find also:

- `is_row` - full table record being processed, to access the data flexibly and/or conditionally
- `iv_row_index` - it's index
- `iv_table_id` - table id passed to the `render` (in case, you want to render several table with the same _renderer_ instance. Though it is generally not the best practice)
- `iv_column_id` - column id of the current table column (for `render_cell` only)

As the returning value in `render_cell` you can return a string or also an instance of `zif_abapgit_html` using the `html` attribute. Use this if you want to return a more complex html content.

```abap
  method zif_abapgit_html_table~render_cell.
    rs_render-html = zcl_abapgit_html=>create( )->add_a( ... ).
  endmethod.
```

## Sorting

`html_table` component does not manage sorting over the data table but provides helpers to visualize it and process the appropriate events. The sorting itself is done externally.

![Sorted table](/img/ui_table_sorted.png)

- is_sorting_state = ls_sorting_state - speifies to indicate the sorting ... a structure `zif_abapgit_html_table=>ty_sorting_state` that defines `column_id` and `descending` value
- IV_SORTABLE

`sapevent:sort_by:id:dsc`
`<th data-cid="id"><a href="sapevent:sort_by:id:dsc">ID</a>`

    DATA ls_sorting_req TYPE zif_abapgit_html_table=>ty_sorting_state.
    ls_sorting_req = zcl_abapgit_html_table=>detect_sorting_request( ii_event->mv_action ).
    IF ls_sorting_req IS NOT INITIAL.
      ms_sorting_state = ls_sorting_req.
      rs_handled-state = zcl_abapgit_gui=>c_event_state-re_render.
    ENDIF.

blah blah ... got to do other stuff now ...
