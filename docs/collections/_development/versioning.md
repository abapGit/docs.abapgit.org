---
title: Versioning
category: read-first
order: 50
---

abapGit is continuously developed and updated. The main branch always represents the latest [development version](guide-install.html) and corresponds to the published [standalone version](guide-install.html). 

abapGit does not have a predefined release cycle. However, we strive to tag a new version once a month (or two).

## Version

abapGit follows [semantic version](https://semver.org/) format. The community has settle on releasing enhancements and changes as minor versions. A more granular approach to release every change as a patch is adding too much overhead. 

Example release sequence: `1.118.0 > 1.119.0 > 1.120.0` 

## Changelog

All additions, changes, fixes, and removals that are relevant to abapGit users are listed in the [changelog](guide-changelog.html). 

Reorgs, refactoring, or changes related to testing or repo actions are omitted from the changelog.

Since abapGit is enforcing a linear history, you can find all changes in [commit list](https://github.com/abapGit/abapGit/commits/main) of the main branch.

## Process

The following steps need to be taken to create a new abapGit version:

1. Create a new branch name like the new version. For example, `v1.121.0`.
1. Update `zif_abapgit_version`(https://github.com/abapGit/abapGit/blob/main/src/zif_abapgit_version.intf.abap) and increase the minor version of constant `c_abap_version` by one. Example: `'1.120.0' > '1.121.'`.
1. Update `changelog.txt`(https://github.com/abapGit/abapGit/blob/main/changelog.txt) and add a section at the top for the new version.
1. Compile a list of the relevant pull requests (see above) based on a comparison between the most recent tag and `main`. For example, [`v1.120.0` vs `main`](https://github.com/abapGit/abapGit/compare/v1.120.0...main).
1. Label each change (PR) corresponding to the legend (`*`: fixed, `!`: changed, `+`: added, `-`: removed).
1. Create a new, draft pull request from the new branch.
1. Have the changes reviewed by someone else.
1. On the release day, update the date in the changelog, and merge the pull request.

The merge will trigger a GitHub action to automatically tag the new release and perform some downstream tasks (like updating the `build` repository).