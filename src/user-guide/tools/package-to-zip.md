---
title: Package to ZIP
category: tools
order: 20
---

Export an SAP Package, optionally with sub-packages, to a ZIP file:

![Dialog](/img/package-to-zip.png)

The resulting ZIP will contain files for all serialized objects that were included in the selected package(s). The format allows you to use the ZIP to import the objects into another system using an offline repository.

:::info
The package does not have to be configured as a repository in abapGit.
:::
