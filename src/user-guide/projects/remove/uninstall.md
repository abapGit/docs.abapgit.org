---
title: Uninstall
category: projects
order: 10
---

* Start `ZABAPGIT`
* Navigate to the repository

There are three options for removing a project from abapGit, which you find in the "Advanced" menu under the "Danger" section:

1. Remove Repository
2. Remove Objects
3. Uninstall

![](/img/uninstall_menu.png)

## Remove Repository

![](/img/uninstall_remove_objects.png)

Selecting "Remove Repository" deletes the reference between the git repository and the ABAP package but does *not* uninstall the associated ABAP package or objects from the system.

:::info
We recommend to [backup](/user-guide/reference/database-util.html) your repository metadata regularly.
:::

## Remove Objects

![](/img/uninstall_remove_repo.png)

Selecting "Remove Objects" deletes all objects belonging to the associated ABAP package and included sub-packages from the system. It does *not* remove the reference to the repository from abapGit.

:::warning
This process can *not* be undone. You could pull all objects from the repository again (assuming you still have access). However, any changes that were made to objects would be lost.
:::

## Uninstall

![](/img/uninstall_remove_all.png)

"Uninstall" is the combination of deleting all objects belonging to the associated ABAP package and included sub-packages from the system and removing the reference to the repository from abapGit.

:::warning
This process can *not* be undone. You could recreate the repository and pull all objects from it again (assuming you still have access). However, any changes that were made to objects would be lost.
:::
