---
title: SAP GUI
category: setup
order: 10
---

## General

The primary front-end for abapGit is **SAP GUI for Windows**. With limitations, abapGit can work with *SAP GUI for Java* and *SAP GUI for HTML*.

The abapGit application is displayed using a SAP GUI HTML Control embedded in SAP GUI.

### SAP GUI for Windows

abapGit is working without restrictions for *SAP GUI for Windows 7.60* or higher when using the HTML Control based on *Internet Explorer*.

With *SAP GUI for Windows 7.70* or higher, there is the option to use *Edge (based on Chromium)* as the HTML Control. Unfortunately, this control
currently does **not** handle the `SAPEVENT` protocol when triggered by JavaScript which is used by abapGit (see below). The gap is closed with *SAP GUI for Windows 8.00 SP03*. Unless you can use this version, it's recommended
to use the *Internet Explorer* HTML Control.

:::info
Starting with *SAP GUI for Windows 8.00*, the *Edge (based on Chromium)* HTML Control is the default setting.
:::

Workaround 1:

Switch SAP GUI to use the *Internet Explorer* control in general.

![SAP GUI IE Control Setting](/img/sapgui_ie_control.png)

Workaround 2:

Configure *Internet Explorer* as a fallback solution for abapGit. The solution is described in SAP Note 2957665:

1. Implement SAP Note 3153691
2. Add an entry to your Windows registry configuring the fallback for abapGit
   For your convinience, you can download preconfigured [BrowserControllFallback.reg](/assets/BrowserControlFallback.reg)
   and merge it to your registry. It points to [BrowserControlFallback.xml](/assets/BrowserControlFallback.xml).

Known issues:

- [SAPGUI 7.70 - Issues with chromium-based browser control (WebView/Edge)](https://github.com/abapGit/abapGit/issues/4841)

Relevant SAP Notes:

- [2913405 = SAP GUI for Windows: Dependencies to browsers / browser controls](https://me.sap.com/notes/2913405)
- [2901278 - SAP GUI HTML Control based on Chromium Edge: Legacy HTML does not work (correctly) / present limitations](https://me.sap.com/notes/2901278)
- [2957665 - SAP GUI HTML Control: Browser Control Fallback Configuration](https://me.sap.com/notes/2957665)
- [3153691 - SAP GUI HTML Control: Fallback mechanism is not working sometimes in some applications](https://me.sap.com/notes/3153691)
- [3337501 - SAP GUI for Windows Edge HTML Control: Crash is observed when calling ABAP method GET_BROWSER_STRING of CL_GUI_HTML_VIEWER](https://me.sap.com/notes/3337501)
- [3335007 - SAP GUI for Windows Edge HTML control: Edge browser extension "SAP GUI connector for Microsoft Edge" is not working with SAP Logon Pad and NWBC](https://me.sap.com/notes/3335007)
- [3331099 - SAP GUI for Windows Edge HTML control: Custom URI scheme support is now available](https://me.sap.com/notes/3331099)
- [What’s New in SAP GUI for Windows](https://help.sap.com/docs/sap_gui_for_windows/e8f03b91f99d45f4ae9d90ddf6e44b70/64155e6b9cb84de79ac28b55ec6fa26c.html)

### SAP GUI for Java

When you start abapGit for the first using *SAP GUI for JAVA*, you will get a warning that this GUI is not supported and there might be issues.

You may confirm that you want to use this GUI anyway and continue.

Known issues:

- [Commit page is non-functional, #5082](https://github.com/abapGit/abapGit/issues/5082)

### SAP GUI for HTML

abapGit also works with *SAP GUI for HTML*. However, using the browser "Back" feature leads to an unusable state (see below).
The workaround is to use "Back" buttons or menu items provided by abapGit.

Known issues:

- [Issue running abapGit in WebGUI (SAP GUI for HTML), #4433](https://github.com/abapGit/abapGit/issues/4433)

### Browser

A plain HTML version that runs in any browser is available as a [proof-of-concept](https://github.com/abapGit/web-edition).

This solution is currently limited by the fact that  will uses several SAP GUI popups that don't work in a browser.
