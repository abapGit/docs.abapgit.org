---
title: Debugging
category: testing
order: 10
---

*******************************

## ABAP

Using the standalone version for debugging is not recommended since the very large source will have to be loaded and parsed by the debugger. It's much more efficient to debug using the developer version.

If you suspect an issue in the object serializer classes, then be sure to disable parallel processing in the abapGit settings. Otherwise, the debugger will not stop at your break-points. 

In case you can't resolve or pinpoint the issue, try to reproduce it using a case from the [abapGit-test](https://github.com/abapGit-tests) organization. If you don't find a test case, open an issue and we will create a new repo for it.

## JavaScript

Some pages in abapGit contain JavaScript. If such script fails, you typically see the following banner:

![image](https://user-images.githubusercontent.com/59966492/155704923-e1f7dd32-36cc-456c-9b02-dfb10fdb564b.png)

Also the lower right corner of the HTML output will NOT show "JS OK". Troubleshooting depends on the type of SAP GUI you are using.

### SAP GUI for Windows

If you are using SAP GUI 7.6 or below, or SAP GUI 7.7 with Internet Explorer control, then follow these instructions on how to use the IE Debugger in abapGit:

[https://blogs.sap.com/2019/03/22/obscure-productivity-tips-debug-javascript-running-within-sapgui-browser/](https://blogs.sap.com/2019/03/22/obscure-productivity-tips-debug-javascript-running-within-sapgui-browser/)

If you are using SAP GUI 7.7 with Edge (Chrome) control, use the developer tools that come with WebView2:

[https://docs.microsoft.com/en-us/microsoft-edge/webview2/how-to/debug?tabs=devtools](https://docs.microsoft.com/en-us/microsoft-edge/webview2/how-to/debug?tabs=devtools)

### SAP GUI for HTML (Web)

Troubleshooting depends on the type of browser you are using. 

### SAP GUI for Java

JavaScript is not supported with this SAP GUI. 

### Web Edition

Running abapGit completely in a browser is still a proof-of-concept. Open an issue [here](https://github.com/abapGit/web-edition). 
