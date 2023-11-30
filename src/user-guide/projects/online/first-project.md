---
title: First Project
category: online projects
order: 40
---

## Repository Setup 

* Create the repository on GitHub, and make sure it contains something like a README file
* Start `ZABAPGIT`
* Clone the repository into abapGit

## Adding Objects

* Navigate to the repository, click the "Add" link
* It will ask which object to add, then select the object
* The object will be committed to the repository

## Modifying Objects

After modifying an object, a "commit" link will show up in abapGit. Click this to commit the changes to the remote repository.

## Modifying Repository

If something is changed in the repository, a "pull" link will show up in abapGit. The changes must be pulled before new objects can be changed or added.

## Handling Licenses

Open-source projects on GitHub typically include a `LICENSE` file that describes the repository's licensing terms.

:::info
Note: This license file will not be pulled into SAP systems by abapGit. 

If your license requires, include the license terms in the comments of your main source code file. Alternatively, you can reference the license using an [SPDX License Identifier](https://spdx.dev/learn/handling-license-info/). 
:::
