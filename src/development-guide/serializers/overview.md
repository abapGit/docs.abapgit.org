---
title: Overview
category: serializers
order: 10
---

## Overview

An abapGit Serializer is an ABAP class that supports creating, reading, updating, and deleting (CRUD) objects of a given object type. In abapGit, the reading of an object is implemented in a `serialize` method. Create and update are combined into a `deserialize` method. There is a `delete` method to remove an object from the system.

All object serializers must implement interface `ZIF_ABAPGIT_OBJECT` and be named `ZCL_ABAPGIT_OBJECT_{type}`, where `{type}` is the corresponding SAP object type (`TADIR-OBJECT`). As a description for the class, use `{type} - {description of type}` (for example, `TABL - Table`). It's recommended to use `ZCL_ABAPGIT_OBJECTS_SUPER` as a superclass since it provides several convenient methods.

In general, only SAP Standard APIs for retrieving and updating object information shall be used. If that is not possible, try using `ZCL_ABAPGIT_OBJECTS_GENERIC` which handles any logical transport object.

As code is stored in git, no usernames, timestamps, states (e.g. active/inactive), or other system-specific information should be part of the serialized object files. Only the active, most recent, and consistent version of an object shall be serialized.

Auto-generated artifacts should be skipped if possible, for example, a CDS view might generate a VIEW artifact, and the VIEW should not be serialized, as it is not something the developer creates.

If an inactive version of an object exists, the class shall indicate so in the `is_active` method. abapGit displays such objects with a yellow bolt icon in the repo view. However, the inactive version must be ignored by the serializer.

As a result, a repo shall only contain the definition of active objects. Therefore, the deserializer can assume that the repo has a consistent object definition and shall create an active version of the object (or update and activate it).
