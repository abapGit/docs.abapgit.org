---
title: Database Utility
category: reference
order: 99
---

`Database Utility` is a tool for managing database entries created by abapGit. You can access the tool via the tools icon in the top right corner of the abapGit home page [](img/utilities.png). 

It's possible to edit database entries of type

- `SETTINGS`
- `USER`
- `REPO`
- `REPO_CS`
- `BACKGROUND`
- `PACKAGES`

Caution: Backup all abapGit database entries, first! Be careful when you edit these entries from within abapGit. Corrupting the XML or setting invalid options might break your abapGit!

![](img/db_util_1.png)

![](img/db_util_2.png)

## Global Settings

The `SETTINGS` entries contain global (not user-specific) settings for your abapGit installation. This is an example:

```xml
<?xml version="1.0" encoding="utf-16"?>
<abapGit version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <SETTINGS>
    <PROXY_URL>myproxy.com</PROXY_URL>
    <PROXY_PORT>8080</PROXY_PORT>
    <PROXY_AUTH>X</PROXY_AUTH>
    <PROXY_BYPASS>
     <item>
      <SIGN>I</SIGN>
      <OPTION>EQ</OPTION>
      <LOW>dont.use.proxy.com</LOW>
     </item>
    </PROXY_BYPASS>
    <COMMITMSG_COMMENT_LENGTH>50</COMMITMSG_COMMENT_LENGTH>
    <COMMITMSG_COMMENT_DEFLT>Update $OBJECT</COMMITMSG_COMMENT_DEFLT>
    <COMMITMSG_BODY_SIZE>72</COMMITMSG_BODY_SIZE>
   </SETTINGS>
  </asx:values>
 </asx:abap>
</abapGit>
```

## User Settings

A `USER` entry contains meta information like the favorites of an user and their repository configurations e. g. name and email address for Git. This is an example of a `USER` entry:

```xml
<?xml version="1.0" encoding="utf-16"?>
<asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
 <asx:values>
  <USER>
   <DEFAULT_GIT_USER>
    <NAME/>
    <EMAIL/>
   </DEFAULT_GIT_USER>
   <REPO_SHOW/>
   <HIDE_FILES/>
   <CHANGES_ONLY/>
   <SHOW_ORDER_BY/>
   <DIFF_UNIFIED/>
   <FAVORITES>
    <item>000000000001</item>
    <item>000000000002</item>
    <item>000000000003</item>
   </FAVORITES>
   <REPO_CONFIG>
    <item>
     <URL>https://[...]/file.git</URL>
     <LOGIN>my_username</LOGIN>
     <GIT_USER>
      <NAME>First and Last Name</NAME>
      <EMAIL>email@example.com</EMAIL>
     </GIT_USER>
     <LAST_CHANGE_SEEN/>
    </item>
    <item>
     <URL>https://[...]/file.git</URL>
     <LOGIN>my_second_user</LOGIN>
     <GIT_USER>
      <NAME>First and Last Name</NAME>
      <EMAIL>email@example.com</EMAIL>
     </GIT_USER>
     <LAST_CHANGE_SEEN/>
    </item>
   </REPO_CONFIG>
   <SETTINGS>
    <MAX_LINES>0</MAX_LINES>
    <ADT_JUMP_ENABLED/>
    <SHOW_DEFAULT_REPO/>
    <LINK_HINTS_ENABLED/>
    <LINK_HINT_KEY/>
    <HOTKEYS/>
    <PARALLEL_PROC_DISABLED/>
    <ICON_SCALING/>
    <UI_THEME/>
    <HIDE_SAPGUI_HINT/>
   </SETTINGS>
  </USER>
 </asx:values>
</asx:abap>
```

## Repository Meta Data

The `REPO` entries contain meta data like Git repository URL, branch, and package information and information about files known and to be excluded. 

Note: Older versions of abapGit also stored local checksums under `REPO`. These have been migrated to `REPO_CS` (see below).

This is an example:

```xml
<?xml version="1.0" encoding="utf-16"?>
<asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
 <asx:values>
  <REPO>
   <URL>https://[...]/file.git</URL>
   <BRANCH_NAME>refs/heads/my_branch</BRANCH_NAME>
   <PACKAGE>Z_MY_PACKAGE</PACKAGE>
   <CREATED_BY>my_user</CREATED_BY>
   <CREATED_AT>20200418201549.200418</CREATED_AT>
   <DESERIALIZED_BY>my_user</DESERIALIZED_BY>
   <DESERIALIZED_AT>20200507134505.184445</DESERIALIZED_AT>
   <OFFLINE/>
   <DOT_ABAPGIT>
    <MASTER_LANGUAGE>E</MASTER_LANGUAGE>
    <STARTING_FOLDER>/src/</STARTING_FOLDER>
    <FOLDER_LOGIC>PREFIX</FOLDER_LOGIC>
    <IGNORE>
     <item>/.gitignore</item>
     <item>/LICENSE</item>
     <item>/README.md</item>
     <item>/package.json</item>
     <item>/.travis.yml</item>
     <item>/.gitlab-ci.yml</item>
     <item>/abaplint.json</item>
     <item>/azure-pipelines.yml</item>
     <item>/src/.gitkeep</item>
    </IGNORE>
    <REQUIREMENTS/>
   </DOT_ABAPGIT>
   <HEAD_BRANCH/>
   <LOCAL_SETTINGS>
    <DISPLAY_NAME>My Test Repository</DISPLAY_NAME>
    <IGNORE_SUBPACKAGES/>
    <WRITE_PROTECTED/>
    <ONLY_LOCAL_OBJECTS/>
    <CODE_INSPECTOR_CHECK_VARIANT>ZMY_CHECK_VARIANT</CODE_INSPECTOR_CHECK_VARIANT>
    <BLOCK_COMMIT>X</BLOCK_COMMIT>
    <SERIALIZE_MASTER_LANG_ONLY/>
   </LOCAL_SETTINGS>
  </REPO>
 </asx:values>
</asx:abap>
```

If you remove a repository entry from the database util, the repository is not shown in abapGit anymore. This is useful for example if you want to remove a repository which has a non-existing package assigned and thus can't be opened and deleted normally.

## Repository Checksums

abapGit persists the checksum (SHA1) of repository files under `REPO_CS`. For optimized storage, these entries do not use XML but a condensed text format:

- Repository name
- For each object: 
  - Object Type | Object Name | Package
  - Path | Filename | Checksum

Example:

```
#repo_name#abapGit
@
/|.abapgit.xml|7c0506a2af34fd1b42027e0288198a00d933d3d4
CLAS|ZCL_ABAPGIT_ADT_LINK|$ABAPGIT_UTILS
/src/utils/|zcl_abapgit_adt_link.clas.abap|909437692c00ea4b93c708d2572eb4f014756b2e
/src/utils/|zcl_abapgit_adt_link.clas.xml|b171192bcffce8241f08dbd70ed2d5bcfab17f76
CLAS|ZCL_ABAPGIT_AJSON|$ABAPGIT_JSON
/src/json/|zcl_abapgit_ajson.clas.abap|ed2a5c09e6cde2c79d667747c42743f60b84e23d
/src/json/|zcl_abapgit_ajson.clas.locals_imp.abap|5faf4e8b3bef9ba5033b5e2d325a2b751379b1c3
/src/json/|zcl_abapgit_ajson.clas.testclasses.abap|aa76c1c55421c3b84d52fb79e568f258c3526f55
/src/json/|zcl_abapgit_ajson.clas.xml|94cbfc7bed436a920ed8806359d5323cd8def85e
...
```

## Background

The `BACKGROUND` entries show the method and the repository key for which the background action will be executed:

![](img/background_6.png)

The respective XML file contains the method and optionally the credentials needed for a push:

```xml
<?xml version="1.0" encoding="utf-16"?>
<asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
 <asx:values>
  <DATA>
   <METHOD>ZCL_ABAPGIT_BACKGROUND_PULL</METHOD>
   <USERNAME/>
   <PASSWORD/>
   <SETTINGS/>
  </DATA>
 </asx:values>
</asx:abap>
```

## Backup & Restore

You can backup the abapGit database entries using the menu. Entries are stored in a separate XML-file and combined into a single ZIP-archive named `abapGit_Backup_<date>_<time>.zip`. You can use this feature also to transfer all your settings to another system.

Example:

[](img/db_backup.png)

## Emergency Mode

On rare occasions, it is necessary to edit the abapGit settings to overcome an issue.

This enhancement allows you to start abapGit in "emergency mode", which directly shows the "Database Util" for you to view or edit any setting.

How to start abapGit in "Emergency Mode":

1. Go to transaction SU3 to maintain your user profile
1. Maintain parameter DBT with value "ZABAPGIT" (all-caps)
1. Start abapGit which will launch the "Database Util"
1. Make necessary changes and save
1. After exiting abapGit, go back to SU3 and remove parameter DBT

![](img/db_util_emergency_mode.png)

## Package Settings

SAP does not support assigning local packages to an application component. To stay in sync with repositories that use application components (in transportable packages), abapGit persists the application component for local package separately.

Example:

```xml
<?xml version="1.0" encoding="utf-16"?>
<abapGit version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <PACKAGES>
    <item>
     <DEVCLASS>$DEVC_SUB</DEVCLASS>
     <COMPONENT>HLB0009083</COMPONENT>
     <COMP_POSID>BC-ABA</COMP_POSID>
    </item>
   </PACKAGES>
  </asx:values>
 </asx:abap>
</abapGit>
```
