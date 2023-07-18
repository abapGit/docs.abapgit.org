---
title: New Serializers
category: serializers
order: 30
---

## Task List for New Serializers

The following list includes the mandatory and recommended tasks for adding a new serializer to abapGit:

1. Check [Support for New Object Types](https://github.com/abapGit/abapGit/issues/5912)

   If the object type is listed already (and not implemented), check the corresponding issue. Typically, you will find valuable discussions to continue or previous work to use as a starting point.

   If the object type is not included in the list, create an [issue](https://github.com/abapGit/abapGit/issues/new) with the title "<OBJECT_TYPE>: Support for <OBJECT_TYPE_DESCRIPTION>" (for example, "TABL: Support for Tables"). Briefly describe why the object is needed and outline the implementation approach.

1. Wait for the OK from abapGit maintainers

   Before starting the implementation, it's best to wait for feedback from the community. Once you get the go-ahead, the issue will be assigned to you.

::: info
abapGit maintainers will add your issue to a [central list](https://github.com/abapGit/abapGit/issues/5912) and, if there's no further discussion required, close it. 
:::

1. Implement the serializer class

   Follow the instructions below. Often, it makes sense to use an existing serializer class as a template. This can save a lot of work especially if the new object type is similar to others.

::: warning
Your code must comply with the [development guidelines](/development-guide/read-first/guidelines.md) for abapGit. Most notably your code must be compatible with 7.02 ABAP syntax and available standard SAP objects, use prefixing of variables, be pretty-printed, and pass all abaplint checks.

You might get lots of abaplint errors. If you are uncertain how to resolve these, maintainers are happy to help.
:::

1. Create a test repository

   Define a minimal test case for the new object type and commit it to a test repo in [abapGit Test Repositories](https://github.com/abapGit-tests). If you don't have access, use the issue you created initially to ask for it. See "Testing" below for an example.
   
1. Test your implementation

   Perform a complete test cycle with your test repository: 
   - Create New Online Repo for a local package (for example `$TABL`)
   - Execute a Pull (should install without any diffs)
   - Uninstall the repository (should not leave any objects of TADIR entries behind)
   - Repeat the process for a transportable package (for example `ZTABL`)

1. Create a pull request for your implementation

   Fork the abapGit repository and add a branch for your serializer class. Commit your implementation (the `zcl_abapgit_object_<type>` class) to the branch, and create a pull request to the abapGit repository. Reference your issue in the pull request and add a link to the test repository.

   Note: Object types using the ABAP File Format must be added to the [AFF Registry](https://github.com/abapGit/abapGit/blob/d0167ff97dcf6f90ed2721c40d194a5fb34f3ea0/src/objects/aff/zcl_abapgit_aff_registry.clas.abap#L51-L61) as well.

1. Update documentation

   Add the new object type to the [list of supported objects](/user-guide/reference/supported.md). If the object type is using the ABAP File Format (JSON), add a link to the corresponding JSON schema in the [AFF repository](https://github.com/SAP/abap-file-formats).

1. Wait for feedback from and merge by abapGit maintainers

   One of the maintainers will typically do a code review, run the test themselves, and either provide feedback or merge the pull request.
   
1. Completing tasks

   After a successful merge, abapGit developer and standalone version will support the new object type. Congratulations. Feel free to tell the world about it!
   
