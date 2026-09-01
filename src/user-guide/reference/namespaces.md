---
title: Namespaces
category: reference
order: 70
---

abapGit supports namespaces. Objects with namespaces can be serialized and deserialized, for example `/FOOBAR/REPORT` to `#foobar#report.prog.abap`. The namespace itself is serialized as well, for example `/FOOBAR` to `#foobar#.nspc.xml`. This XML-file contains the repair license key for the namespace (but *not* the developer license key).

abapGit automatically serializes namespaces and updates existing namespaces when pulling from the repo. If a namespace does not exist in the local system, the namespace can be created by pulling only the namespace object (`NSPC`). Afterwards, all objects can be pulled as usual.  

Example:

![](/img/namespace_example.png)

Alternatively, you can create the namespace upfront as follows:

1. Create namespace in transaction `SE03`, namespace role `C`, and add the repair license
1. Open namespace for modifications in `SE03`
1. Create namespaced package (optional)
1. Clone/pull as usual

:::info
Namespaced object require different transport, i.e. workbench development/correction or repair tasks, when importing into a system. The type of task depends on the original (source) system and the role of the namespace, i.e. producer or consumer. For more details, see [Source System](/user-guide/repo-settings/dot-abapgit.html#source-system) under repository settings.
:::
