---
title: Language Version
category: reference
order: 80
---

## ABAP Language Version

With the 7.52 release, SAP provides the usage of the ABAP language version information in the on-premises world.

abapGit has been enhanced to support consistent handling of the ABAP language version across the different abapGit "flavors" (open-source / part of SAP BTP ABAP Enviromnent).

:::warning 
Using ABAP Language Version in abapGit is still an experimental feature. 
:::

### Settings

There are four possible [settings](./repo-settings/dot-abapgit.html) for defining how the ABAP language version is handled by abapGit:

Setting | Description
--------|------------
Any (default)              | Object-specific ABAP Language Version
Standard ABAP              | Only objects with "Standard ABAP" are allowed
ABAP for Key Users         | Only objects with "ABAP for Key Users" are allowed
ABAP for Cloud Development | Only objects with "ABAP for Cloud Development" are allowed

### Any ABAP Language Version 

If you do not define the ABAP language version (default setting "Any"), you can mix objects of any ABAP language version in a repository. 

:::info
This setting is recommended for cross-platform repositories that should run on-premises as well as on BTP.
:::

#### Export

When serializing objects, the ABAP language version will be part of the metadata of each object.

#### Import

When deserializing objects, abapGit will set the ABAP language version according to the setting of the root package of the repository (which is limited by the system environment and software component of the package).

### Standard ABAP, ABAP for Key Users, ABAP for Cloud Development

If a specific ABAP language version is defined, then all objects  in the repository must adhere to this ABAP language version. If not, you will receive an error message.

:::info
This setting is recommended for repositories that support only one platform. 
:::

### Export

When serializing objects, the ABAP language version will **not* be part of the metadata of each object.

### Import

We distinguish two cases:

1. The root package has the same or an undefined ABAP language version as specified in the repository

When deserializing objects, abapGit will set the ABAP language version according to the setting in the repository.

2. The root package has a different ABAP language version than specified in the repository

When deserializing objects, abapGit will raise an error message alerting you to the mismatch. To import objects, change the ABAP language version of your root package to match the repository. 
However, this might not be possible since you can't use "Standard ABAP" on BTP, for example. 

### Examples

If your project uses programs, function modules, or classes that are not released for ABAP for Cloud Development, then set the ABAP language version to "Standard ABAP". 
This will ensure, that users will not be able to install the project on BTP.

The other way around, if your project uses exclusively objects and code released for ABAP for Key Users or Cloud Development, then set the ABAP language version accordingly. 
This will ensure, that only objects compatible with BTP will be included in your project. 

:::info
You can use [abaplint](https://github.com/abaplint/abaplint/blob/main/docs/getting_started.md) to automatically check for compatibility. 
:::

### Further Information

[Standard Documentation](https://help.sap.com/doc/abapdocu_752_index_htm/7.52/en-US/abenabap_versions.htm)
[Cloud Documentation](https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/abenabap_versions.htm)
[Blog and FAQ](https://blogs.sap.com/2022/09/09/abap-language-versions-faqs/)
