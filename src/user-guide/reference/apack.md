---
title: APACK
category: reference
order: 80
---

Packages with a class that implements `ZIF_APACK_MANIFEST` (the interface is automatically created at the initial start of abapGit) can define metadata that is interpreted by clients which support the APACK package and dependency management framework.

:::info
APACK including dependencies is currently only supported by abapGit for ABAP Development Tools (ADT). Please also see the [respective tutorial](https://developers.sap.com/tutorials/abap-environment-abapgit.html) for details.
:::

Such an APACK implementation class must reside in the top-level ABAP package which is serialized by abapGit so that it can be detected properly. After the class is instantiated, it needs to have the field `ZIF_APACK_MANIFEST~DESCRIPTOR` populated with the respective APACK metadata.

**Note:** Don't put any functionality in such implementation classes, only use them to advertise APACK metadata.

The metadata follows the [POM format by Apache Maven](https://maven.apache.org/pom.html#Maven_Coordinates) and specifies additional information as well:

- `group_id`: Unique name for your organization or project, e.g. `github.com/abapGit`
- `artifact_id`: The name for the project, needs to be unique together with the specified `group_id`, e.g. `abapGit`
- `version`: The version of your project, should adhere to the [semantic versioning concept](https://semver.org/), e.g. `1.85`
- `repository_type`: Currently fixed to `abapGit` as it's currently the only supported repository type and is set automatically during serialization
- `git_url`: The URL where your main repository is located, e.g. `https://github.com/abapGit/abapGit.git`
- `dependencies`: Optional, only needs to be filled if this project has dependencies to other projects. You only need to specify `group_id`, `artifact_id`, `version`, and `git_url` to identify the dependency. `target_package` is ignored during serialization. **Note:** Be sure to specify the `git_url` for each dependency properly as this is currently the only way how dependencies can automatically be resolved.

If such an implementation class is detected during the serialization process, a corresponding `.apack-manifest.xml` file will be created on the top level of the Git repository. This contains the APACK metadata information.

### APACK in Namespaces

If your project is using a namespace, then using `ZIF_APACK_MANIFEST` will not work (since it's not part of the namespace, obviously). Simply copy `ZIF_APACK_MANIFEST` to `/namespace/ZIF_APACK_MANIFEST` and use this interface in your APACK implementation class (requires abapGit v1.126.0 or higher).

### Transporting APACK implementation classes

The interface `ZIF_APACK_MANIFEST` is automatically created as a local object, i.e. in package `$TMP`. If you intend to transport projects containing an implementation class to follow-on systems, you either need to remove the implementation class from the transport or ensure that `ZIF_APACK_MANIFEST` is available on each follow-on system to avoid syntax errors. So, either let abapGit create it in all systems (don't do that on production) or change the package assignment to a package with the same transport target as your projects and transport them together.

### Examples

See the sample code on GitHub (uses `IF_APACK_MANIFEST` which is exclusively available on the SAP Cloud Platform ABAP Environment. However, the descriptor format is compatible with `ZIF_APACK_MANIFEST`.):

- [YY Data Service](https://github.com/SAP/abap-platform-yy)
- [JSON ABAP Konverter](https://github.com/SAP/abap-platform-jak) (specifies a dependency on the YY Data Service)
