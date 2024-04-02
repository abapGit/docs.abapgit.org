---
title: Serializer Class
category: serializers
order: 20
---

## Constructor

The constructor is implemented in the superclass and takes two parameters as input:

Parameter | Description
----------|------------
`IS_ITEM`        | Contains object type, object name, SAP package, and state (active/inactive)
`IV_LANGUAGE`    | Contains the language key for the main language of the repository
`IO_FILES`       | Collection of files associtated with the object
`IO_I18N_PARAMS` | Parameters related to translation of objects

These parameters are stored in attributes `MS_ITEM`, `MV_LANGUAGE`, `MO_FILES`, and `MO_I18N_PARAMS` respectively.

Requirements that are necessary to support an object type should be checked in the constructor using the following logic. This is typical if object types are not supported in lower releases. 

```abap
  METHOD constructor.

    DATA ...

    super->constructor(
      is_item        = is_item
      iv_language    = iv_language
      io_files       = io_files
      io_i18n_params = io_i18n_params ).

    TRY.
        " Check requirements...
      CATCH cx_root.
        " Raise an exception if not supported
        zcx_abapgit_exception=>raise( 'Object type SRFC not supported' ).
    ENDTRY.

  ENDMETHOD.
```

This will ensure that none of the other class methods are called, even if objects of the given type exist in a repo. 

Example: [`SRFC`](https://github.com/abapGit/abapGit/blob/main/src/objects/zcl_abapgit_object_srfc.clas.abap).

## Interface

Serializers must implement all methods of interface [`ZIF_ABAPGIT_OBJECT`](https://github.com/abapGit/abapGit/blob/main/src/objects/zif_abapgit_object.intf.abap):

Method | Description
-------|------------
`SERIALIZE`              | Contains all process steps to read the relevant object type-specific information and serialize it (as one or more files)
`DESERIALIZE`            | Contains all process steps to create or update an object based on one or more files
`DELETE`                 | Contains all process steps to delete an object based on one or more files
`EXISTS`                 | Returns whether a given object already exists in any state (i.e. return `abap_true` for inactive objects)
`IS_LOCKED`              | Returns whether a given object is currently locked
`IS_ACTIVE`              | Returns whether a given object exists in an active state
`CHANGED_BY`             | Returns the name of the user who last changed a given object (if undetermined, return `c_user_unknown`)
`JUMP`                   | Navigates to the corresponding object maintenance screen
`GET_METADATA`           | Returns object-specific metadata (see below)
`GET_COMPARATOR`         | Triggered before deserialization to perform checks (for example, to warn the user that database tables are changed)
`GET_DESERIALIZE_STEPS`  | Defines the deserialzation step or steps used to build the processing sequence (see below)
`GET_DESERIALIZE_ORDER`  | Returns the list of objects that shall be deserialized before an object (optional, see below)
`MAP_FILENAME_TO_OBJECT` | Derive the object from a given filename (optional)
`MAP_OBJECT_TO_FILENAME` | Derive the filename from a given object (optional)

Example: [`DOMA`](https://github.com/abapGit/abapGit/blob/main/src/objects/zcl_abapgit_object_doma.clas.abap).

### Metadata

It is mandatory to provide the following metadata:

Attribute | Description
----------|------------
`CLASS`        | Technical name used to identify the serializer within serialized XML files (format `LCL_OBJECT_{type}`)
`VERSION`      | Version number of the serializer (format `v1.0.0`)

It's recommended to fill `CLASS` and `VERSION` metadata using `SUPER->GET_METADATA( )` and then change settings as required.

### Deserialization Step

It is mandatory to provide at least one deserialization step (see below).

### Deserialization Order

This method is used to return a list of objects that shall be deserialized before the given object. 

## Super Class

Serializers can take advantage of the following methods in [`ZCL_ABAPGIT_OBJECTS_SUPER`](https://github.com/abapGit/abapGit/blob/main/src/objects/zcl_abapgit_objects_super.clas.abap):

Method | Description
-------|------------
`GET_METADATA`             | Return default metadata for class and version
`CORR_INSERT`              | Insert the object into a transport (for transportable objects)
`TADIR_INSERT`             | Insert the object into TADIR
`TADIR_DELETE`             | Delete the object from TADIR
`EXISTS_A_LOCK_ENTRY_FOR`  | Check if an enqueue lock exists
`SET_DEFAULT_PACKAGE`      | Set SAP package for RS_CORR_INSERT when it can't be supplied via APIs
`SET_DEFAULT_TRANSPORT`    | Set transport request for RS_CORR_INSERT when it can't be supplied via APIs
`IS_ACTIVE`                | Method to check if an ABAP Workbench object or its parts are active
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
`GET_METADATA` | Return the metadata used at the time of serializing the object
`I18N_PARAMS`  | Get the settings for internationalization (see below)

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

The recommended approach is to check `io_xml->i18n_params( )-main_language_only = abap_false` and then serialize the additional translations in the XML (typically using the `I18N` prefix). During deserialize, the translation languages can then be retrieved and processed accordingly.

Example: [`TABL`](https://github.com/abapGit/abapGit/blob/main/src/objects/tabl/zcl_abapgit_object_tabl.clas.abap).

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
`EARLY` | Used for objects (like classes and interfaces) that are dependencies for DDIC objects | None
`DDIC`  | Used for DDIC objects which require processing and activation before other object types | DDIC Mass Activation
`ABAP`  | Used for non-DDIC objects (code or mostly anything else) which might depend on DDIC objects   | Workbench Mass Activation
`LATE`  | Used for objects that depend on other objects processed in the previous two phases            | DDIC & Workbench Mass Activation

Within each phase, the sequence of objects is determined by abapGit based on known object type dependencies. For details, see method `PRIORITIZE_DESER` in [`ZCL_ABAPGIT_FILE_DESERIALIZE`](https://github.com/abapGit/abapGit/blob/main/src/objects/core/zcl_abapgit_file_deserialize.clas.abap).

### Uninstall Process

During the uninstallation of a repository, abapGit will determine the objects in the same fashion as the `serialize` process. The sequence of objects is determined by abapGit based on known object type dependencies. For details, see method `RESOLVE` in [`ZCL_ABAPGIT_DEPENDENCIES`](https://github.com/abapGit/abapGit/blob/main/src/objects/core/zcl_abapgit_dependencies.clas.abap).

Note: There are suggestions to [refactor the logic to determine the processing order](https://github.com/abapGit/abapGit/issues/3536).
