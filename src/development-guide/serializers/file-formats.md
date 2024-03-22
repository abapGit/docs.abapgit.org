---
title: File Naming and Formats
category: serializers
order: 40
---

All files for an object are located in the same folder, each folder corresponds to a package. Sub-packages are organized under parent packages (directories) according to the logic described in the [Repository Settings](/user-guide/repo-settings/dot-abapgit.md).

## Naming

In general, the names of files containing the object definitions are derived from the TADIR entry i.e. object type and object name. Filenames are lower case and adhere to the following patterns:

- `<object_name>.<object_type>.<extension>`: Object metadata. Supported extensions: `xml` or `json`
- `<object_name>.<object_type>.<extra>.<extension>`: Additional object data. Typical extensions: `abap`, `html`, `js`, etc.
- `<object_name>.<object_type>.i18n.<language>.<extension>`: Language-specific translation files: Supported extensions: `po` or `properties`

## Codepage, EOL, EOF, Indentation

Metadata, ABAP coding, and translation files are stored in `UFT-8` with leading [Byte-order-mark (xEF BB BF)](https://en.wikipedia.org/wiki/Byte_order_mark), linefeed (x0A) as end-of-line character and a final newline character. Indentation is set to 2 and uses spaces, not tabs. See [.editorconfig](https://github.com/abapGit/abapGit/blob/main/.editorconfig) for details.

## Formats

### Classic abapGit Format

Each object is represented by at least one XML file, which contains the object metadata. Depending on the object type, other files may be added like a file with `abap` extension for source code. 

The XML file contains a root `<abapGit>` tag which specifies the [serializer class](overview.html) and version used by abapGit to convert the object to files and vice versa (see example below). 

Translations are either included in the XML file or stored in a separate `i18n.<language>.po` file.

#### Example

Here's an example for an ABAP OO Class, object type `CLAS` (See also [test repo](https://github.com/abapGit-tests/CLAS_full)).

The following files correspond to the editable parts in source-based class builder or ABAP in Eclipse:

* `zcl_example.clas.abap`
* `zcl_example.clas.locals_def.abap`
* `zcl_example.clas.locals_imp.abap`
* `zcl_example.clas.testclasses.abap`
* `zcl_example.clas.macros.abap`

Files do not exist if empty, i.e. the developer did not choose to implement them.

One XML file `zcl_example.clas.xml` containing:

```xml
﻿*<?xml version="1.0" encoding="utf-8"?>
<abapGit version="v1.0.0" serializer="LCL_OBJECT_CLAS" serializer_version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <VSEOCLASS>
    <CLSNAME>ZCL_ABAPGIT_FACTORY</CLSNAME>
    <LANGU>E</LANGU>
    <DESCRIPT>abapGit - Factory</DESCRIPT>
    <STATE>1</STATE>
    <CLSCCINCL>X</CLSCCINCL>
    <FIXPT>X</FIXPT>
    <UNICODE>X</UNICODE>
   </VSEOCLASS>
  </asx:values>
 </asx:abap>
</abapGit>

*: 
```

Example XML data:

* VSEOCLASS information
* TPOOL information
* SOTR information
* LINES from DOKU
* Descriptions from SEOCOMPOTX

### SAP ABAP File Format

Newer object types are represented by a JSON file and follow the [ABAP File Format (AFF)](https://github.com/SAP/abap-file-formats).

Object types supporting AFF are registered [here](https://github.com/abapGit/abapGit/blob/main/src/objects/aff/zcl_abapgit_aff_registry.clas.abap#L48).

Translations are stored in separate `i18n.<language>.properties` files (see [AFF properties file](https://github.com/SAP/abap-file-formats/blob/main/docs/properties.md)).

## Source Code Reference

[zcl_abapgit_filename_logic](https://github.com/abapGit/abapGit/blob/main/src/objects/core/zcl_abapgit_filename_logic.clas.abap)
- `file_to_object`: Get object from filename and path
- `object_to_file`: Get filename from object
- `detect_object_definition`: Return flags to detect if filename represents an object definition i.e. has an `xml` or `json` extension
- `is_obj_definition_file`: Return boolean flag, if the filename represents an object definition or not (metadata)

