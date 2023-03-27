---
title: User Exits
category: reference
order: 40
---

abapGit contains predefined user exits which can be used to modify the standard behavior.

## Overview

If the standalone version is installed, create include `ZABAPGIT_USER_EXIT` and add local class `ZCL_ABAPGIT_USER_EXIT` implementing `ZIF_ABAPGIT_EXIT`.

If the development version is installed create global class `ZCL_ABAPGIT_USER_EXIT` implementing `ZIF_ABAPGIT_EXIT`.

To support both versions with the same code, proceed as follows: 

1. Implement `ZCL_ABAPGIT_USER_EXIT` as global class and test with the developer version.
2. Cut & paste complete code of `ZCL_ABAPGIT_USER_EXIT` into include `ZABAPGIT_USER_EXIT` and change the beginning to a local class.
```abap
CLASS zcl_abapgit_user_exit DEFINITION
  FINAL
  CREATE PUBLIC.
```
3. Activate the include.

In either cases, add the object in a package different from the main abapGit code.

The list of user exits can change at any time, make sure to syntax check user exits after updating abapGit.

## Exits

### ADJUST_DISPLAY_COMMIT_URL

Can be used to set the URL to display a commit. There are default implementations for some providers:

| Provider  | Repo URL | Show Commit URL |
|-----------|----------|-----------------|
| github    | http(s)://github.com/<user\>/\<repo\>.git    | http(s)://github.com/<user\>/\<repo\>/commit/<sha1\>     |
| bitbucket | http(s)://bitbucket.org/<user\>/\<repo\>.git | http(s)://bitbucket.org/<user\>/\<repo\>/commits/<sha1\> |
| gitlab    | http(s)://gitlab.com/<user\>/\<repo\>.git    | http(s)://gitlab.com/\<user\>/\<repo\>/-/commit/<sha1\>  |

### ADJUST_DISPLAY_FILENAME

This exit can be used to change the path and filename displayed in the repository view (see [#5185](https://github.com/abapGit/abapGit/issues/5185)). For example, you can implement a logic to shorten the path avoiding output of repetetive details. 

### ALLOW_SAP_OBJECTS

Force allowing serialization of SAP objects.

### CHANGE_LOCAL_HOST

If the hostnames are not properly configured, this exit can be used to modify the settings.
This is especially useful when running abapGitServer on the local system.

### CHANGE_PROXY_AUTHENTICATION

Determine based on the repository URL if authentication is required when accessing the proxy.

### CHANGE_PROXY_PORT

Determine the proxy port from the repository URL.

### CHANGE_PROXY_URL

Determine the proxy URL from the repository URL.

### CHANGE_SUPPORTED_OBJECT_TYPES

Add or remove supported object types

### CHANGE_TADIR

Can be used to skip certain objects, or force a different object setup than currently in TADIR ([Example](https://gist.github.com/larshp/cca0ce0ba65efcde5dfcae416b0484f7)).

### CREATE_HTTP_CLIENT

Store username and password in RFC connection setup (see [#1841](https://github.com/abapGit/abapGit/issues/1841)).

### CUSTOM_SERIALIZE_ABAP_CLIF

Allows for a custom serializer to be used for global classes' CLIF sources. See [#2321](https://github.com/abapGit/abapGit/issues/2321) and [#2491](https://github.com/abapGit/abapGit/pull/2491) for use cases.
This [example implementation](https://gist.github.com/fabianlupa/999c8165b89131608b05cd371529fef5) forces the old class serializer to be used for specific packages.

As of [#4953](https://github.com/abapGit/abapGit/pull/4953), the exit offers a post-processing option. First, the exit is called with the optional parameter
`it_source` set to initial. If you do not return any serialization (`rt_source` is initial), then abapGit will serialize the object as usual and call the
exit a second time. This time `it_source` contains the complete source and can be modified in the exit as required. To use this option, use following code 
at the beginning of the exit:

```abap
" Ignore first call of exit
IF it_source IS INITIAL.
  RETURN.
ENDIF.
```

### DESERIALIZE_POSTPROCESS

Can be used for any postprocessing operation for deserialized objects. Since it is a postprocessing step, only logs can be added to II_LOG and one should not terminate the process by raising exception, which may lead to inconsistencies.

### DETERMINE_TRANSPORT_REQUEST

Set a transport request per repository. If set, no transport request popup appears and the transport is used for pull/delete (see [#5916](https://github.com/abapGit/abapGit/pull/5916)).

### GET_CI_TESTS

Add your own repositories to run a complete CI cycle (clone, pull, check, delete) when executing unit tests for object serializer classes (see [#3993](https://github.com/abapGit/abapGit/pull/3993)). 

### GET_SSL_ID

Possibility to change the default `ANONYM` SSL ID to something system specific.

### HTTP_CLIENT

Can be used for setting logon tickets eg. in connection with abapGitServer connections between SAP systems ([Example](https://gist.github.com/larshp/71609852a79aa1e877f8c4020d18feac)).

### ON_EVENT

This exit allows you to extend abapGit with new features that are not suitable for abapGit itself. For example, you can link to a new page from a wall message. Another use case is redirecting menu items to a custom page rather than standard abapGit, for example using a company-specific solution to replace "Advanced > Run Code Inspector" (see [#4722](https://github.com/abapGit/abapGit/issues/4722)).

### PRE_CALCULATE_REPO_STATUS

Can be used to modify local and remote files before calculating diff status. Useful to remove diffs which are caused by deployment between different system version (see also [abapgit xml stripper plugin](https://github.com/sbcgua/abapgit_xml_stripper_plugin)).

![diff sample](./img/deployment_diff_difference_sample.png)

The exit also receives a repo meta data snapshot (`zif_abapgit_persistence=>ty_repo`) to identify the repo and it's attributes in the current system (e.g. package). This can be used to enable/disable the exit for specific repos.

### SERIALIZE_POSTPROCESSING

This exit is called at the end of the serialize process and gives an opportunity to change the content of the serialzed files (see [#5194](https://github.com/abapGit/abapGit/issues/5194)).

### VALIDATE_BEFORE_PUSH

Perform custom validations just before pushing into remote while being on the "Commit Message" screen (see [#6013](https://github.com/abapGit/abapGit/pull/6013)).

### WALL_MESSAGE_LIST

Can be used to add a message at list level (repository list, see [#4653](https://github.com/abapGit/abapGit/issues/4653)).

### WALL_MESSAGE_REPO

Can be used to add a message at repo level (repository view, see [#4653](https://github.com/abapGit/abapGit/issues/4653)).
