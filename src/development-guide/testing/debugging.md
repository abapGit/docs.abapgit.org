---
title: Debugging
category: testing
order: 10
---

## ABAP

Using the standalone version for debugging is not recommended since the very large source will have to be loaded and parsed by the debugger. It's much more efficient to debug using the developer version.

If you suspect an issue in the object serializer classes, then be sure to disable parallel processing in the abapGit settings. Otherwise, the debugger will not stop at your break points. 

In case you can't resolve or pinpoint the issue, try to reproduce it using a case from the [abapGit-test](https://github.com/abapGit-tests) organization. If you don't find a test case, open an issue and we will create a new repo for it.

## JavaScript

Some pages in abapGit contain JavaScript. If the script fails, you typically see the following banner:

![Script Issue](https://user-images.githubusercontent.com/59966492/155704923-e1f7dd32-36cc-456c-9b02-dfb10fdb564b.png)

Also, the lower right corner of the HTML output will NOT show "JS OK". Troubleshooting depends on the type of SAP GUI you are using.

:::note
Check [SAP GUI Setup](/user-guide/setup/sapgui.html) for known issues related to SAP GUI.
:::

### SAP GUI for Windows

If you are using SAP GUI 7.6 or below, or SAP GUI 7.7 and higher with *Internet Explorer* browser control, then follow these instructions on how to use the IE Debugger in abapGit:

[Obscure productivity tips: Debug Javascript running within SAPGUI browser](https://blogs.sap.com/2019/03/22/obscure-productivity-tips-debug-javascript-running-within-sapgui-browser/)

If you are using SAP GUI 7.7 or higher with *Edge (Chrome)* browser control, use the developer tools that come with WebView2:

[General: Debug WebView2 Apps](https://docs.microsoft.com/en-us/microsoft-edge/webview2/how-to/debug?tabs=devtools)
SAP Note [3099670](https://me.sap.com/notes/3099670) - SAP GUI for Windows Chromium-based Edge Control: Adding remote debugging feature
[How to Debug WebView2 in SAP GUI](https://blogs.sap.com/2023/01/20/sap-gui-for-windows-8.00-is-coming-on-27th-of-january-2023-new-features-lifecycle-information/comment-page-1/#comment-680362)

### SAP GUI for HTML (Web)

Troubleshooting depends on the type of browser you are using. 

### SAP GUI for Java

JavaScript is not supported with this SAP GUI. 

### Web Edition

Running abapGit completely in a browser is still a proof-of-concept. Open an issue [here](https://github.com/abapGit/web-edition). 
