---
title: Personal Settings
category: setup
order: 50
---

Personal settings in abapGit are valid only for the logged on user. You can maintain the
settings from the repository list or repository view by selecting "Global Settings" > "Personal".

![image](https://github.com/francisco-milan/docs.abapgit.org/assets/36721657/1a90cc1e-3d01-4482-a120-21da71276458)
![image](https://github.com/francisco-milan/docs.abapgit.org/assets/36721657/8e3f8f19-f38d-4051-8218-37230039df7d)

Note: Personal settings are relevant to all of your repositories.

![image](https://github.com/francisco-milan/docs.abapgit.org/assets/36721657/7f196541-dacd-466b-800a-d5d367ea0247)

## Startup

If you turn on "Show Last Opened Repository", abapGit will jump directly to the repository that you worked on last.

## User Interface

You can switch the **Theme** for abapGit between several choices: Default, Dark, and Belize. Alternatively, you can select "Synced with SAP GUI" to use the same theme
you are using for SAP GUI (availability depends on SAP GUI release).

The size of icons can be influenced using **Icon scaling**. If automatic detection does not work properly, you can pick a better size with the other settings.

Setting | Description
--------|------------
Automatic | abapGit determines if a high-resolution display is present ([High DPI displays](https://doc.qt.io/qt-5/highdpi.html), which would make icons appear too small compared to text. abapGit will then double the size of icons.
Small | abapGit will force the icons to remain small even if an HDPI display is detected
Large | abapGit will force the icons to double in size 

**List Size** defines the maximum number of items shown in a list. If there are more items, then abapGit start paging.

**Repo Label Colors** allows you to customize colors of organization labels use on repository list and view. The format of the configuration is: `"label1:color,label2:color"`. `Color` param accepts either a predefined css-style name or RGB color spec in format of `#<foreground>/<background>` e.g. `#3040ff/ff8a80`. See more (in particular, CSS style list) in "?" hint box.

## Interaction

Typically, when objects are changed, the system will display a popup to confirm the activation of objects. This gives the change to address syntax errors, for example.
If you want objects to be activated automatically, select **Activate Objects Without Popup**. If there are syntax errors, abapGit will indicate this with an icon next to
the objects in the repository view.

If you are using ABAP Development Tools (ADT) in Eclipse, we recommend to turn on **Enable Jump to ABAP Development Tools**. Clicking on objects names in abapGit will then
open the object in ADT (if available).

**Enable Vimium-like Link Hints** and **Key to Activate Link Hints** provide a feature similarly to the [Vimium browser](https://vimium.github.io/). After pressing the
activation key (default "t"), abapGit will uses a clever highlighting method to navigate using links.

![](/img/settings-personal-3.png)

## System Resources

### Standalone Version

The standalone version does not support any parallel processing. Objects of a repository are serialized sequentially.

### Developer Version

**Disable parallel processing**

The developer version of abapGit will try to use parallel processing to serialize objects of a repository. As a prerequisite, logon group `parallel_generators` (lower case) must be configured in transaction `RZ12`. If sufficient system resources are available, abapGit will use multiple threads to serialize objects.

:::note
You can disable parallel processing with this setting. Use this setting in case you need to debug a serializer class.
:::

