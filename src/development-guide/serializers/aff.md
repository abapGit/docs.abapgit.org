---
title: Adding AFF support
category: serializers
order: 35
---

The [ABAP File Format (AFF)](https://github.com/SAP/abap-file-formats) is the preferred
format for object types for which SAP provides an AFF object handler.

For implementing AFF support for new object types already supported by AFF see the examples in the repository.

abapGit has been backwards compatible for 10+ years, and whishes to continue to support all users going forward.
This means reading old formats and writing new formats, and not breaking existing users, and users should not loose any data when switching to a new format.

Suggested approach:

* Read the old XML into the new AFF format carried by the INTF, https://github.com/abapGit/abapGit/tree/main/src/objects/aff_types
* Persist the object given the data in the INTF
* Serialize the object to AFF format

Make sure to test and keep old and new examples in https://github.com/orgs/abapGit-tests
