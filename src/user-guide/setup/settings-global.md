---
title: Global Settings
category: setup
order: 40
---

Global settings in abapGit are valid system-wide and for all users. You can maintain the settings from the repository list or repository view by selecting "Global Settings" > "Global".

![abapGit](/img/settings-global-4.png)
![abapGit](/img/settings-global-5.png)


Note: Global settings are relevant for online projects, only.

![abapGit](/img/settings-global-6.png)

## Proxy Settings

If your server is behind a proxy, you can maintain the proxy host and port here. Do not enter any "http://" or "https://" prefix for the proxy host. Just enter the host name or its IP address.

If your proxy requires you to login, set the proxy authentication flag. Then abapGit will prompt you for your proxy user and password, when an online connection is required.

In case the proxy should not be used for all repositories, exceptions can be maintained. Enter each exception on a separate line. Patterns are allowed, for example `*.sap.internal*`.

## Commit Message Settings

Each commit to an online repository requires a commit message. The corresponding settings define the maximum length for the comment (message header) and body. Defaults are set to 50/72 according to the "[Rule of Well Formed Git Commit Messages](https://www.midori-global.com/blog/2018/04/02/git-50-72-rule)".

You can also maintain a default for the comment. Variables $OBJECT and $FILE will be replaced by the number of objects or files contained in the commit.

By default, the [commit page](/user-guide/projects/online/stage-commit.md#commit) contains fields for "Author Name" and "Author Email" which you can enter in case they are different from the committer. If the author is always the same as the committer, these fields are not required and you can use the "Hide Author Fields" option to remove them from the commit page.

## Development Internal Settings

Note: These settings are only available when using the [Development Version](/user-guide/getting-started/install.md#install-developer-version) of abapGit.

![abapGit](/img/settings-global-7.png)

### Enable Critical Unit Tests
The developer version of abapGit might contain unit tests that impact system settings (like creating/deleting test objects). By default, these test are disabled.

### Enable Experimental Features
There might be features that are not completely implemented or tested yet but already included in the developer version. By default, these features are disabled.

