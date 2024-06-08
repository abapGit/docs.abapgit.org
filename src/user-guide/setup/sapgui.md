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

:::info
With *SAP GUI for Windows 7.70* or higher, there is the option to use *Edge (based on Chromium)* as the HTML Control. 

Starting with *SAP GUI for Windows 8.00*, the *Edge (based on Chromium)* HTML Control is the default setting.
:::

:::warning
Using the *Edge (based on Chromium)* HTML Control with abapGit requires *SAP GUI for Windows 7.70 SP 14* or *SAP GUI for Windows 8.00 SP 3 patch 1 or SP 4* or higher (see SAP Note 3331099).
:::

Alternative 1:

Switch SAP GUI to use the *Internet Explorer* control in general.

![SAP GUI IE Control Setting](/img/sapgui_ie_control.png)

Alternative 2:

Configure *Internet Explorer* as a fallback solution for abapGit. The solution is described in SAP Note 2957665:

1. Implement SAP Note 3153691
2. Add an entry to your Windows registry configuring the fallback for abapGit
   For your convenience, you can download preconfigured [BrowserControllFallback.reg](/assets/BrowserControlFallback.reg)
   and merge it to your registry. It points to [BrowserControlFallback.xml](/assets/BrowserControlFallback.xml).

Related issue:

- [SAP GUI for Windows: Issues with chromium-based browser control (WebView/Edge)](https://github.com/abapGit/abapGit/issues/4841)
- [SAP GUI 8.00 SP>=03 / 7.70 SP>=13 chromium browser control not working properly](https://github.com/abapGit/abapGit/issues/6339)

Relevant SAP Notes:

- [2913405 - SAP GUI for Windows: Dependencies to browsers/browser controls](https://me.sap.com/notes/2913405)
- [2901278 - SAP GUI HTML Control based on Chromium Edge: Legacy HTML does not work (correctly) / present limitations](https://me.sap.com/notes/2901278)
- [2957665 - SAP GUI HTML Control: Browser Control Fallback Configuration](https://me.sap.com/notes/2957665)
- [3153691 - SAP GUI HTML Control: Fallback mechanism is not working sometimes in some applications](https://me.sap.com/notes/3153691)
- [3331099 - SAP GUI for Windows Edge HTML control: Custom URI scheme support is now available](https://me.sap.com/notes/3331099)
- [3335007 - SAP GUI for Windows Edge HTML control: Edge browser extension "SAP GUI connector for Microsoft Edge" is not working with SAP Logon Pad and NWBC](https://me.sap.com/notes/3335007)
- [3337501 - SAP GUI for Windows Edge HTML Control: Crash is observed when calling ABAP method GET_BROWSER_STRING of CL_GUI_HTML_VIEWER](https://me.sap.com/notes/3337501)
- [What’s New in SAP GUI for Windows](https://help.sap.com/docs/sap_gui_for_windows/e8f03b91f99d45f4ae9d90ddf6e44b70/64155e6b9cb84de79ac28b55ec6fa26c.html)

### SAP GUI for Java

When you start abapGit for the first time using *SAP GUI for JAVA*, you will get a warning that this GUI is not supported and there might be issues.

You may confirm that you want to use this GUI anyway and continue.

Known issues:

- [Commit page is non-functional, #5082](https://github.com/abapGit/abapGit/issues/5082)

### SAP GUI for HTML

abapGit also works with *SAP GUI for HTML*. However, there are currently several known issues, which prevent proper usage of this GUI.

Known issues:

- [Issue running abapGit in WebGUI (SAP GUI for HTML), #4433](https://github.com/abapGit/abapGit/issues/4433)
- [SAP GUI for HTML: Toolbar on Repository List not working, #6567](https://github.com/abapGit/abapGit/issues/6567)
- [SAP GUI for HTML: Staging does not work correctly, #6568](https://github.com/abapGit/abapGit/issues/6568)

### Browser

A plain HTML version that runs in any browser is available as a [proof-of-concept](https://github.com/abapGit/web-edition).

This solution is currently limited by the fact that will use several SAP GUI popups that don't work in a browser.
