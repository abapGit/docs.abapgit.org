---
title: JavaScript
category: ui
order: 40
---

This documentation covers java script specifics in abapGit UI. See also the [UI - HTML Pages](./developing-ui.html).

## General

abapGit UI contains JavaScript code. Some of the dynamic features rely on it e.g. keyboard navigation. The JS code is located in `ui/zabapgit_js_common.w3mi.data.js` - the recommended way to modify it is described in the  "Recommended asset development flow" section of [UI - CSS and Assets](./developing-ui-css.html).

As SAP GUI uses Internet Explorer component to render HTML the JS code must be optimized for IE11 (and use the features available in it). Although some polyfills are available (and more can be added) at the beginning of the code (like `String.includes`).

The pull request CI check includes a run of `eslint`, so any new code should conform to the rules defined for the abapGit repository.

## Components

The JS library contains several components which can be reused in different places.

### Command Palette

To add a command palette add the following code in the `script` method of the page.

```abap
ro_html->add( 'var gCommandPalette = new CommandPalette(enumerateFn, {' ).
ro_html->add( '  toggleKey: "F1",' ).
ro_html->add( '  hotkeyDescription: "Command ..."' ).
ro_html->add( '});' ).
```

where:
- `enumerateFn` is a function that returns a list of commands in the form of an array of
```js
{
    action:    "go_home",        // sapevent action or js function
    iconClass: "icon icon-star", // class for item icon, OPTIONAL !!!
    title:     "Go home"         // title of the command
}
```
- `toggleKey` is a key to toggle the palette. `"^"` at the beginning requires `Ctrl` (`"^g" = Ctrl+g` )
- `hotkeyDescription` is the description that is a) added to the `shortkey` help popup b) used as a placeholder in the command palette

See an example of enumerators - `enumerateToolbarActions` and `enumerateTocAllRepos`.

### To-Do

- `debugOutput`
- `submitSapeventForm`
- `setInitialFocus`
- `setInitialFocusWithQuerySelector`
- `submitFormById`
- `findStyleSheetByName`
- `getIndocStyleSheet`
- `toggleDisplay`
- `Hotkeys.addHotkeyToHelpSheet`
- ...
