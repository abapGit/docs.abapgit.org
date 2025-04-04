---
title: Troubleshooting
category: getting-started
order: 60
---

The most common issues with abapGit are listed here

## Connection Types

There are several ways to connect from your SAP system to a git server. For example:

- SAP System > HTTP/S > Git Server
- SAP System > HTTP/S > Proxy > Git Server
- SAP System > Exit( RFC Destination ) > HTTP/S > Git Server
- SAP System > Exit( RFC Destination + Proxy ) > HTTP/S > Git Server

Be sure to check all areas.

## HTTP Errors

### 401 - Unauthorized and 403 - Forbidden

Reading public repositories typically does not require authentication to the git server. However, accessing private repositories or trying to update repositories in general will require authentication.

- Check your user and password
- Check if the server requires a token as the password (for example, GitHub)
- Test your credentials using a command line tool (git, curl, etc)

### 404 - Not Found

- Check if the git servers requires `.git` at the end of the repository URL (for example, GitLab)
- Check if it's a private repository that requires authentication

### 407 - Proxy Authentication Required

Also: `ICM_HTTP_SSL_ERROR`, `SSSLERROR_SSL_READ`, `SSSLRC_CONN_CLOSED`

- Check the proxy configuration in abapGit [Global Settings](/user-guide/setup/settings-global.html)
- Check the [SSL Setup](/user-guide/setup/ssl-setup.html)
- Use the [SSL Test Tool](/user-guide/setup/ssl-test.html) to verify the connection

### 411 - Connection Failed

Also: `NIECONN_REFUSED`

- Check SAP system parameters in [SAP Note 510007](https://me.sap.com/notes/510007)

### 421 - Misdirected Request

Also: `ICM_HTTP_SSL_PEER_CERT_UNTRUSTED`, `SSSLERR_PEER_CERT_UNTRUSTED`

- Check the [SSL Setup](/user-guide/setup/ssl-setup.html)
- Use the [SSL Test Tool](/user-guide/setup/ssl-test.html) to verify the connection

## SAP GUI

Try to run the latest version of SAP GUI. Older version are known to have issues. SAP GUI for Windows is the most used and tested client.

- Check the [SAP GUI Setup](/user-guide/setup/sapgui.html)

## Supported Object Types

Which object types are supported in your system depends on the combination of abapGit and SAP releases. 

- Check "Debug Info" from the tools menu on the repository overview (shows the object types supported in your system)
- Check the [List of Supported Object Types](/user-guide/reference/supported.html) (most recent release)
- Check [Requests for Supporting New Object Types](https://github.com/abapGit/abapGit/issues/5912) (unchecked means "not supported")

## User Exits

Behaviour of abapGit can be changed using [User Exits](/user-guide/reference/exits.html). 

- Check "Debug Info" from the tools menu on the repository overview (shows which exits are active in your system)
- In case of issues, deactivate all exits to narrow down the root cause.

## SAP ABAP Development Tools (ADT)

If you are using the ADT abapGit plugin provided by SAP, check [SAP BTP, Working with abapGit](https://help.sap.com/docs/btp/sap-business-technology-platform/working-with-abapgit).

## SAP Cloud Solutions

You can find tips for connections from SAP Cloud solutions [here](https://github.com/abapGit/abapGit/issues/6206#issuecomment-2047638552).