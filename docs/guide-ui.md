---
title: UI Features
category: getting-started
order: 40
---

abapGit UI has several unobvious but convenient features.

## Command Palettes

Command palettes are a popular UI control available in modern editors like Sublime, VSCode, Atom and others. There are two command palettes available in abapGit.

### Command Selector

Pressing the `F1` key anywhere in abapGit will open a palette of all possible commands. Type one or more letters contained in the description of the command to narrow down the list. Then use the `arrow keys` and `Enter` to select and execute a command.

If you don't want to run any command, press `F1` again to close the palette.

![keyboard_command_palette](img/keyboard_command_palette.gif)

### Repository Selector

Pressing the `F2` key anywhere in abapGit will open a palette of all existing repositories. Type one or more letters contained in the description of the repository to narrow down the list. Then use the `arrow keys` and `Enter` to select and jump to a repository.

If you don't want to select any repository, press `F2` again to close the palette.

![keyboard_repository_palette](img/keyboard_repository_palette.png)

## Keyboard Navigation

### General

abapGit supports the general browser control keys:

- `Escape`, `F3`, and `Alt + Left Arrow` go a page back
- `Alt + Right Arrow` goes a page forward

### Hotkeys

For each page, abapGit defines certain hotkeys (or keyboard shortcuts). If you press a hotkey, it will execute the corresponding command immediately. You can display the list of possible hotkeys by pressing `?` anywhere in abapGit.

![keyboard_hotkeys](img/keyboard_hotkeys.png)

To close the hotkey popup, press `?` again.

### Link Hints

abapGit provides a clever feature to highlight and select any link (including buttons and menu items) on a page. You can activate link hint in your [personal settings](https://docs.abapgit.org/guide-settings-personal.html#interaction).

## Page Top

At the top of each page, abapGit displays its logo and the current page title on the left, and optionally menu items on the right.

![ui_top](img/ui_top.png)

This section is "sticky" and remains at the top of the page when scrolling downwards.

## Page Header

Pages in abapGit that are related to a repository contain a header including essential repository information and some useful features.

### Icon and Description

Online Repositories:

![ui_header_online](img/ui_header_online.png)

Offline Repositories:

![ui_header_offline](img/ui_header_offline.png)

### Repository 

For online repositories, abapGit shows the URL, a button to change the remote settings, a button to copy the URL, the current commit, and a button to show the changelog.

### Changelog

abapGit allows to display the changelog of a repository and alert the user if a new release is available. You can read instructions on how to add a changelog to your own repository [here](https://docs.abapgit.org/development/guide-changelog.html).

### Favorite

An icon indicates if a repository is marked as a favorite. Click the icon to toggle the state.

![ui_header_favorite_off](img/ui_header_favorite_off.png)

![ui_header_favorite_on](img/ui_header_favorite_on.png)

### Write Protection

If a repository is protected against changes (in local settings), then the header will show a lock icon.

![ui_header_write_protected](img/ui_header_write_protected.png)

### Background Mode

For repositories that have a defined background mode (in settings), a "BG" icon will be shown.

![ui_header_background_mode](img/ui_header_background_mode.png)

### Branch / Tag / Commit

The currently selected remote is shown on the right of the header. This can be either a branch like "main", a tag, or a commit (hash). 

![ui_header_branch](img/ui_header_branch.png)

![ui_header_tag](img/ui_header_tag.png)

![ui_header_commit](img/ui_header_commit.png)

Click the name to select a different branch or tag.

### Package

The root package of the repository is shown on the far left. Click the name to jump to the package maintenance. 

## Page Content

In the area between header and footer is filled differently depending on the selected page or command. Some pages like the repository overview and repository view contain an additional menu bar. Pages that contain input forms, use the top menu bar to switch between forms (like tabs) and a row of buttons at the bottom to select commands.

## Page Footer

At the end of each page, abapGit displays a footer.

![ui_footer](img/ui_footer.png)

### Sponsor Us

On the left, you find a link to the [Sponsor Us](https://abapgit.org/sponsor.html) page. abapGit is exclusively developed and maintained by volunteers. Any donations are highly appreciated.

### Version

In the middle under the abapGit logo, you see the current version of abapGit. This includes version number and a description whether you can running the standalone or the developer version.

Hovering of the logo shows the backend runtime of the last navigation step. Clicking the logo takes you to the [abapGit Homepage](https://abapgit.org/).

### JavaScript

On the right, a small texts shows the state of any JavaScript that may be included on the page. In general, this should show "js: OK". In case of issues, the text might show debugging information or no text at all. For details, see [here](https://docs.abapgit.org/development/developing-ui-js.html).
