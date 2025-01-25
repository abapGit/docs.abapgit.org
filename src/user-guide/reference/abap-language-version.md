---
title: ABAP Language Version
category: reference
order: 80
---

## ABAP Language Version

With the 7.52 release, SAP provides the usage of the ABAP language version information in the on-premises world.

abapGit has been enhanced to support consistent handling of the ABAP language version across the different abapGit "flavors" (open-source / part of SAP BTP ABAP environment).

:::warning 
Using ABAP language version in abapGit is still an experimental feature. 

So far, abapGit handles ABAP language version only for a limited set of object types. See Supported Object Types, below. 
:::

### Settings

There are five possible [settings](/user-guide/repo-settings/dot-abapgit.md) for defining how the ABAP language version is handled by abapGit:

Setting | Description
--------|------------
Any (default)              | Object-specific ABAP language version
Ignore                     | ABAP language version not serialized
Standard ABAP              | Only objects with "Standard ABAP" are allowed
ABAP for Key Users         | Only objects with "ABAP for Key Users" are allowed
ABAP for Cloud Development | Only objects with "ABAP for Cloud Development" are allowed

### Any ABAP Language Version 

If you do not define the ABAP language version (default setting "Any"), you can mix objects of any ABAP language version in a repository. 

:::info
This setting is recommended for repositories containing objects of more than one ABAP language version, which you would like to keep during import.
:::

#### Export

When serializing objects, the ABAP language version will be part of the metadata of each object.

#### Import

When deserializing objects, abapGit will set the ABAP language version according to the metadata of each object. 

:::warning
The ABAP language version of an object might lead to errors during import or when trying to activate objects. For example, if you try to import "Standard ABAP" into BTP which requires "ABAP for Cloud Development" you might get syntax errors.
:::

### Ignore ABAP Language Version

If you set the ABAP language version to "Ignore" it will not be serialized. This avoids diffs due to variations in development and target environments. 

:::info
This setting is recommended for cross-platform repositories with code running on-premises and BTP.
:::

#### Export

When serializing objects, the ABAP language version will *not* be part of the object metadata. 

#### Import

When deserializing objects, abapGit will set the ABAP language version according to the target SAP package (software component).

:::warning
The ABAP language version of an object might lead to errors during import or when trying to activate objects.
:::

### Standard ABAP, ABAP for Key Users, ABAP for Cloud Development

If a specific ABAP language version is defined, then all objects in the repository must adhere to this ABAP language version. If not, you will receive an error message.

:::info
This setting is recommended for repositories that support only one platform. 
:::

#### Export

When serializing objects, the ABAP language version will be part of the metadata of each object.

#### Import

We distinguish two cases:

1. The root package has the same or an undefined ABAP language version as specified in the repository

   When deserializing objects, abapGit will set the ABAP language version according to the setting in the repository.

2. The root package has a different ABAP language version than specified in the repository

   When deserializing objects, abapGit will raise an error message alerting you to the mismatch. To import objects, change the ABAP language version of your root package to match the repository. However, this might not be possible since you can't use "Standard ABAP" on BTP, for example. 

### Summary

The following table shows the combinations of ABAP language settings of the repository and of the root package used for importing:

Root Package:              | Repo:<br>Any or Ignore    | Repo:<br>Standard ABAP        | Repo:<br>ABAP for Key Users     | Repo:<br>ABAP for Cloud Development
---------------------------|---------------------------|-------------------------------|---------------------------------|------------------------------------
Undefined (Any)            | <span style="color:blue">(1)</span> | <span style="color:blue">(1)</span> | <span style="color:blue">(1)</span> | <span style="color:blue">(1)</span> 
Standard ABAP              | <span style="color:blue">(1)</span> | <span style="color:green">(2)</span> | <span style="color:red">(3)</span> | <span style="color:red">(3)</span> 
ABAP for Key Users         | <span style="color:blue">(1)</span> | <span style="color:red">(3)</span> | <span style="color:green">(2)</span> | <span style="color:red">(3)</span> 
ABAP for Cloud Development | <span style="color:blue">(1)</span> | <span style="color:red">(3)</span> | <span style="color:red">(3)</span> | <span style="color:green">(2)</span> 

<span style="color:blue">(1) Import possible (success if the individual objects are compatible with the target system and ABAP language version)</span>

<span style="color:green">(2) Import possible</span>

<span style="color:red">(3) Import not possible (error message)</span>

### Examples

If your project uses programs, function modules, or classes not released for "ABAP for Cloud Development", set the ABAP language version to "Standard ABAP". 
This will ensure that users will not be able to install the project in systems where the use of "ABAP for Cloud Development" is enforced*.

Conversely, if your project uses exclusively objects and code released for ABAP for Key Users or Cloud Development, set the ABAP language version accordingly. 
This will ensure that only objects compatible with systems will be included in your project, where the use of "ABAP for Cloud Development" is enforced*. 

When transferring code from an on premise system to a system where the use of "ABAP for Cloud Development" is enforced* you can use the repository setting **Ignore ABAP Language Version** if your code has been developed using ABAP language version "Standard ABAP" though it could be activated using ABAP language version "ABAP for Cloud Development" as well. An example for this would be a RAP business object that uses tables with custom developed data elements. In this case the ABAP language version would be set to "ABAP for Cloud Development" based on the settings of the target package.

*_(SAP BTP ABAP Environment, SAP S/4HANA ABAP Environment or SAP S/4HANA on prem / private cloud when using a software component with ABAP language version "ABAP for Cloud Development")_

:::info
You can use [abaplint](https://github.com/abaplint/abaplint/blob/main/docs/getting_started.md) to automatically check for compatibility. 
:::

### Supported Object Types

So far, handling of ABAP language version is implemented for the following object types:

`CLAS`, `DEVC`, `FUGR`, `INTF`, `PROG`, `DDLS`, `DDLX`, `DCLS` and objects based on the ABAP file format.

It's planned to support other object types that include the ABAP language version as well.

See [Supported Object Types](./supported.md) for details.

### Further Information

[Standard Documentation](https://help.sap.com/doc/abapdocu_752_index_htm/7.52/en-US/abenabap_versions.htm)
[Cloud Documentation](https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abenabap_versions.htm)
[Blog and FAQ](https://blogs.sap.com/2022/09/09/abap-language-versions-faqs/)
[Object Types Supporting ABAP Language Version (in general)](https://github.com/abapGit/abapGit/issues/6154#issuecomment-1749086748)
