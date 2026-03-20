---
title: PR Tests
category: testing
order: 15
---

In order to test a pull request (PR) for abapGit, you need to follow these steps:

1. Install the latest developer version of abapGit

This means pulling the main branch of https://github.com/abapGit/abapGit into your test system (with no diffs afterwards).

2. Change repository settings to the PR

Go to the repository settings, [remote settings](/user-guide/repo-settings/remote.html). Then under Head > Type, select "Pull request". Pick the PR you want to test and save.

3. Pull changes of PR

When you return to the package view, you will see diffs for all the changes included in the PR. Pull the changes and restart abapGit.

4. Test changes

Now you can test the fixed functionality or new feature of the pull request.

5. Revert to main

When done with testing, select the main branch and pull it into your system again.

PS: If pulling fails because abapGit is trying to change itself, please use the [abapGit standalone version](/user-guide/getting-started/install.html) to perform the pulls.
