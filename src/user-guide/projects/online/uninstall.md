---
title: Uninstall Repository
category: online projects
order: 30
---

* Start `ZABAPGIT`
* Navigate to the repository

![](/img/uninstall1.png)

* Select "Advanced > Uninstall" 

![](/img/uninstall2.png)

* Confirm the dialog

* abapGit will now delete all objects in the package specified when installing the repository

:::info
In contrast to "Uninstall",  selecting "Remove" deletes the reference between the git repository and the ABAP package but does *not* uninstall the associated ABAP package or objects from the system.
:::