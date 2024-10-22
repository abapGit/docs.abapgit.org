---
title: Background Mode
category: repo settings
order: 40
---

## Background Mode

abapGit can pull or push in background mode. This setting can be activated in the repository settings.

::: warning
If credentials are required for accessing the repository, you will have to maintain username and password in the background settings. These credentials will be stored as plain text (see below). 
:::

* Navigate to a repository, go to the repository settings, and select "Background":

![](/img/background_setting_1.png)

![](/img/background_setting_2.png)

* Here you can define the action that will be executed in background mode, by default the setting is "Do Nothing". 

![](/img/background_2.png)

* To activate an automatic pull for a repository, select "Automatic pull". After saving, a background icon will appear next to the branch name

![](/img/background_3.png)

* You can run the action immediately by clicking on "Run background logic". Note: this will execute the background logic for **ALL** repositories with background mode enabled.

### List of Repositories with Background Mode

* To get an overview of all repositories that have background mode enabled, navigate from the Repository List to "Settings > Database Utility"

![](/img/background_5.png)

* The relevant repositories will have the type "BACKGROUND".

![](/img/background_4.png)

### Defining a Job

* To periodically run the background logic, you can define a job with transaction `SM36`.
* Create a step for the program `ZABAPGIT` (or `ZABAPGIT_STANDALONE`, depending on which version of abapGit you are using). This will execute *all* defined background activities.
* You can check the log of the job with transaction `SM37`

### Custom background modes

Implement interface `ZIF_ABAPGIT_BACKGROUND` in a global class, and it will automatically show up in the abapGit background settings, making it possible to configure and run for a repository. While using the standalone version of abapGit implement the include `ZABAPGIT_BACKGROUND_USER_EXIT`.
All implementations of the interface as well as the local include will be determined automatically.
Both ways of adding a plugin can exist in parallel, but due to the restrictions of dynamic method calls global classes are available within the developer version only. Same is true for include based implementations, which are executed by the standalone version only.
