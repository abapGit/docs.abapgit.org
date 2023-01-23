---
title: Serializers
category: serializers
order: 10
---

## Overview

An abapGit Serializer is an ABAP class that supports creating, reading, updating, and deleting (CRUD) of objects of a given object type. In abapGit, reading of an object is implemented in a `serialize` method. Create and update are combined into a `deserialize` method. There is a `delete` method to remove an object from the system.

All object serializers must implement interface `ZIF_ABAPGIT_OBJECT` and be named `ZCL_ABAPGIT_OBJECT_{type}`, where `{type}` is the corresponding SAP object type (`TADIR-OBJECT`). As a description for the class, use `{type} - {description of type}` (for example, `TABL - Table`). It's recommended to use `ZCL_ABAPGIT_OBJECTS_SUPER` as a superclass since it provides several convenient methods.

In general, only SAP Standard APIs for retrieving and updating object information shall be used. If that is not possible, try using `ZCL_ABAPGIT_OBJECTS_GENERIC` which handles any logical transport object.

As code is stored in git, no usernames, timestamps, states (e.g. active/inactive), or other system-specific information should be part of the serialized object files. Only the active, most recent, and consistent version of an object shall be serialized.

Auto-generated artifacts should be skipped if possible, for example: a CDS view might generate a VIEW artifact, and the VIEW should not be serialized, as it is not something the developer creates.

If an inactive version of an object exists, the class shall indicate so in the `is_active` method. abapGit displays such objects with a yellow bolt icon in the repo view. However, the inactive version must be ignored by the serializer.

As a result, a repo shall only contain the definition of active objects. Therefore, the deserializer can assume that the repo contains a consistent object definition and shall create an active version of the object (or update and activate it).

## To-Do List for New Serializers

The following list includes the mandatory and recommended tasks for adding a new serializer to abapGit:

1. Check [Support for New Object Types](https://github.com/abapGit/abapGit/issues/5912)

   Create an [issue](https://github.com/abapGit/docs.abapgit.org/issues/new) with title "<OBJECT_TYPE>: Support for <OBJECT_TYPE_DESCRIPTION>" (for example, "TABL: Support for Tables"). If the object type is already listed, reference the existing issue is your new issue. Briefly describe why the object is needed and outline the implementation approach. 
   
2. Wait for OK from abapGit maintainers

   Before starting the implementation, it's best to wait for feedback from the community. Once you get the go-ahead, the issue will be assigned to you.
   
3. Implement the serializer class

   Follow the instructions below. Often, it makes sense to use an existing serializer class as a template. This can save a lot of work especially if the new object type is similar to others.
   
4. Create a test repository

   Define a minimal test case for the new object type and commit it to a test repo in [abapGit Test Repositories](https://github.com/abapGit-tests). If you don't have access, use the issue you created initially to ask for it. See "Testing" below for an example.
   
5. Test your implementation

   Perform a full test cycle with your test repository: 
   - Create New Online Repo for a local package (for example `$TABL`)
   - Execute a Pull (should install without any diffs)
   - Uninstall the repository (should not leave any objects of TADIR entries behind)
   - Repeat the process for a transportable pacage (for example `ZTABL`)

6. Create a pull request for your implementation

   Fork the abapGit repository and add a branch for you serializer class. Commit your implementation (the `zcl_abapgit_object_<type>` class) to the branch, and create a pull request to the abapGit repository. Reference your issue in the pull request and add a link to the test repository.

   Note: Object types using the ABAP File Format must be added to the [AFF Registry](https://github.com/abapGit/abapGit/blob/d0167ff97dcf6f90ed2721c40d194a5fb34f3ea0/src/objects/aff/zcl_abapgit_aff_registry.clas.abap#L51-L61) as well.

7. Update documentation

   Add the new object type to the [list of supported objects](https://docs.abapgit.org/ref-supported.html). If the object type is using the ABAP File Format (JSON), add a link to the corresponding JSON schema in the [AFF Repo](https://github.com/SAP/abap-file-formats).

8. Wait for feedback from and merge by abapGit maintainers

   One of the maintainers will typically do a code review, run the test themselves, and either provide feedback or merge the pull request.
   
9. Completing tasks

   After a successful merge, abapGit developer and standalone version will support the new object type. Congratulations. Feel free to tell the world about it!
   
## Constructor

The constructor is implemented in the superclass and takes two parameters as input:

Parameter | Description
----------|------------
`IS_ITEM`     | Contains object type, object name, SAP package, and state (active/inactive)
`IV_LANGUAGE` | Contains the language key for the main language of the repository

These parameters are stored in attributes `MS_ITEM` and `MV_LANGUAGE` respectively.

Requirements that are necessary to support an object type should be checked in the constructor using the following logic. This is typical if object types are not supported in lower releases. 

```abap
  METHOD constructor.

    DATA ...

    super->constructor(
      is_item     = is_item
      iv_language = iv_language ).

    TRY.
        " Check requirements...
      CATCH cx_root.
        " Raise exception if not supported
        zcx_abapgit_exception=>raise( 'Object type DDLS not supported' ).
    ENDTRY.

  ENDMETHOD.
```

This will ensure that none of the other class methods are called, even if objects of the given type exist in a repo. 

Example: [`SRFC`](https://github.com/abapGit/abapGit/blob/main/src/objects/zcl_abapgit_object_srfc.clas.abap).

## Interface

Serializers must implement all methods of interface [`ZIF_ABAPGIT_OBJECT`](https://github.com/abapGit/abapGit/blob/main/src/objects/zif_abapgit_object.intf.abap):

Method | Description
-------|------------
`SERIALIZE`             | Contains of all process steps to read the relevant object type specific information and serialize it (as one or more files)
`DESERIALIZE`           | Contains of all process steps to create or update an object based on one or more files
`DELETE`                | Contains of all process steps to delete an object based on one or more files
`EXISTS`                | Returns whether a given object already exists in any state (i.e. return `abap_true` for inactive objects)
`IS_LOCKED`             | Returns whether a given object is currently locked
`IS_ACTIVE`             | Returns whether a given object exists in active state
`CHANGED_BY`            | Returns the name of the use who last changed a given object (if undetermined, return `c_user_unknown`)
`JUMP`                  | Navigates to the corresponding object maintenance screen
`GET_METADATA`          | Returns object specific metadata (see below)
`GET_COMPARATOR`        | Triggered before deserialization to perform checks (for example, to warn the user that database tables are changed)
`GET_DESERIALIZE_STEPS` | Defines the deserialzation step or steps used to build the processing sequence (see below)

Example: [`DOMA`](https://github.com/abapGit/abapGit/blob/main/src/objects/zcl_abapgit_object_doma.clas.abap).

### Metadata

It is mandatory to provide the following metadata:

Attribute | Description
----------|------------
`CLASS`        | Technical name used to identify the serializer within serialized XML files (format `LCL_OBJECT_{type}`)
`VERSION`      | Version number of the serializer (format `v1.0.0`)

It's recommended to fill `CLASS` and `VERSION` metadata using `SUPER->GET_METADATA( )` and then changing settings as required.

### Deserialization Step

It is mandatory to provide at least one deserialization step (see below).

## Super Class

Serializers can take advantage of the following methods in [`ZCL_ABAPGIT_OBJECTS_SUPER`](https://github.com/abapGit/abapGit/blob/main/src/objects/zcl_abapgit_objects_super.clas.abap):

Method | Description
-------|------------
`GET_METADATA`             | Return default metadata for class and version
`CORR_INSERT`              | Insert object into a transport (for transportable objects)
`TADIR_INSERT`             | Insert object into TADIR
`TADIR_DELETE`             | Delete object from TADIR
`EXISTS_A_LOCK_ENTRY_FOR`  | Check if an enqueue lock exists
`SET_DEFAULT_PACKAGE`      | Set SAP package for RS_CORR_INSERT when it can't be supplied via APIs
`SET_DEFAULT_TRANSPORT`    | Set transport request for RS_CORR_INSERT when it can't be supplied via APIs
`IS_ACTIVE`                | Method to check if an ABAP Workbench object or it's parts are active
`DELETE_DDIC`              | Method to remove DDIC objects

In addition, there are some methods to handle documents associated with an object (transaction `SE61`, table `DOKIL`).

Method | Description
-------|------------
`SERIALIZE_LONGTEXTS`   | Serialize document including I18N handling
`DESERIALIZE_LONGTEXTS` | Deserialize document including I18N handling
`DELETE_LONGTEXTS`      | Delete document
`SERIALIZE_LXE_TEXTS`   | Serialize translation texts (new approach, see below)
`DESERIALIZE_LXE_TEXTS` | Deserialize translation texts (new approach, see below)

## Generic Class

If it's not possible to provide a native implementation for an object serializer, using generic class [`ZCL_ABAPGIT_OBJECTS_GENERIC`](https://github.com/abapGit/abapGit/blob/main/src/objects/zcl_abapgit_objects_generic.clas.abap) is possible for logical transport objects  (see table `OBJH`, object type `L`).

Example: [`IWMO`](https://github.com/abapGit/abapGit/blob/main/src/objects/zcl_abapgit_object_iwmo.clas.abap).

## Serialize Object

The serialize method shall produce one or several files containing the data that represents a given object. There are a few methods available to define files and attach data using [`ZIF_ABAPGIT_OUTPUT_XML`](https://github.com/abapGit/abapGit/blob/main/src/xml/zif_abapgit_xml_output.intf.abap) (input parameter `IO_XML`).

Method | Description
-------|------------
`ADD`         | Append a value, structure, or internal table to the output (using ID transformation to XML suppressing initial fields)
`ADD_XML`     | Append an instance of an XML document to the output (`IF_XML_ELEMENT`)
`SET_RAW`     | Set the output to an instance of an XML document (`IF_XML_ELEMENT`)
`I18N_PARAMS` | Get the settings for internationalization (see below)

## Deserialize Object

The deserialize method shall read the file or files representing a given object and create the object in the system. If the object already exists, it shall be updated according to the definition in the file or files. There are a few methods available to process files using [`ZIF_ABAPGIT_INPUT_XML`](https://github.com/abapGit/abapGit/blob/main/src/xml/zif_abapgit_xml_input.intf.abap) (input parameter `IO_XML`).

Method | Description
-------|------------
`READ`         | Return a value, structure, or internal table from the input (using ID transformation from XML accepting data loss)
`GET_RAW`      | Return the input as an instance of an XML document (`IF_XML_ELEMENT`)
`GET_METADATA` | Return the metadata used at time of serializing the object

In addition, the deserialize method must add or update the TADIR entry for the given object and insert the object into a transport request (for transportable packages). If the used SAP APIs are not performing these tasks, `TADIR_INSERT( iv_package )` and `CORR_INSERT( iv_package )` shall be called by the deserialize method.

## Activate Object

After deserializing, an object (or dependent objects) might have to be activated. Add such objects to the activation queue using [`ZCL_ABAPGIT_OBJECTS_ACTIVATION`]:

Method | Description
-------|------------
`ADD`      | Append a given object type and name to the queue (for example, `INDX` `{table}` for database indexes when deserializing tables)
`ADD_ITEM` | Append a given object to the queue (for example, use `ms_item` for activating the object itself)

The activation queue is built separately for each phase (see 'Deserialize Process' below).

## Internationalization (I18N)

In general, the serializer class shall process texts of an object in all available languages i.e. the original language as well as any translations. It shall respect the "Serialize Main Language Only" setting of a repository and limit the texts to the language provided to the constructor (`MV_LANGUAGE`).

The recommended approach is to check `io_xml->i18n_params( )-serialize_master_lang_only = abap_false` and then serialize the additional translations in the XML (typically using `I18N` prefix). During deserialize the translation languages can then be retrieved and processed accordingly (

Example: [`TABL`](https://github.com/abapGit/abapGit/blob/main/src/objects/zcl_abapgit_object_tabl.clas.abap).

Note: A new approach for serializing translations based on LXE is under development. See [#4470](https://github.com/abapGit/abapGit/issues/4470) for further details and discussion.

## Testing

When adding new serializers, add at least one test repository to the organization [abapGit-tests](https://github.com/abapGit-tests) with the name of the object type in capitals (for example, [`TABL`](https://github.com/abapGit-tests/TABL). This test will be used by [abapGit Continuous Integration](https://github.com/abapGit/CI).

Example (using `SUSH`):

1. Go to https://github.com/abapGit-tests/SUSH and create a fork
1. In your system (where you have the new `SUSH` class), start abapGit and create a new online repo for the URL of your fork (pick any local package like `$SUSH`).
1. Add one `SUSH` object to this package (like `ZAG_UNIT_TEST`)
1. Go back to abapGit and you should see the new object in the object list of the repo
1. Stage everything and commit
1. Go to your forked repo and create a pull request (at the top there's a section showing the delta to the original and a compare button which you can click to create the PR)

## Processing Order and Dependencies

### Serialize Process

abapGit determines which objects need to be serialized based on the SAP package assigned to a repository (including sub-packages unless "Ignore sub-packages" is selected in the repository settings). The list of objects is then sorted by package, object type, and object name.

If a sufficient number of work processes is available, abapGit will activate objects in parallel (unless "Disable Parallel Processing" is selected in the repository settings).

For details, see [`ZCL_ABAPGIT_SERIALIZE`](https://github.com/abapGit/abapGit/blob/main/src/objects/core/zcl_abapgit_serialize.clas.abap).

### Deserialize Process

Objects are deserialized in three phases. After each phase, all objects included in the phase will be activated.

Step | Description | Activation
-----|-------------|-----------
`EARLY` | Used for objects (like classes and interfaces) that are dependencies for DDIC objects
`DDIC`  | Used for DDIC objects which require processing and activation before other object types | DDIC Mass Activation
`ABAP`  | Used for non-DDIC objects (code or mostly anything else) which might depend on DDIC objects   | Workbench Mass Activation
`LATE`  | Used for objects that depend on other objects processed in the previous two phases            | DDIC & Workbench Mass Activation

Within each phase, the sequence of objects is determined by abapGit based on known object type dependencies. For details, see method `PRIORITIZE_DESER` in [`ZCL_ABAPGIT_FILE_DESERIALIZE`](https://github.com/abapGit/abapGit/blob/main/src/objects/core/zcl_abapgit_file_deserialize.clas.abap).

### Uninstall Process

During the uninstallation of a repository, abapGit will determine the objects in the same fashion as the `serialize` process. The sequence of objects is determined by abapGit based on known object type dependencies. For details, see method `RESOLVE` in [`ZCL_ABAPGIT_DEPENDENCIES`](https://github.com/abapGit/abapGit/blob/main/src/objects/core/zcl_abapgit_dependencies.clas.abap).

Note: There are suggestions to [refactor the logic to determine the processing order](https://github.com/abapGit/abapGit/issues/3536).
