---
title: Uninstall
category: getting-started
order: 30
---

Here's how to completely uninstall abapGit:

## Developer Version

To remove the developer version, run the standalone version of abapGit and use it to uninstall the developer version.

## Standalone Version

Follow these steps to remove the standalone version including objects that were genereated by abapGit:

* Delete ABAP program `ZABAPGIT_STANDALONE` using `SE38` or `SE80`
* Delete enqueue object `EZABAPGIT` via `SE11`
* Delete transparent table `ZABAPGIT` via `SE11`
* Delete MIME objects `ZABAPGIT_CSS_COMMON` and `ZABAPGIT_JS_COMMON` in transaction `SMW0` (if present)
* Delete interface `ZIF_APACK_MANIFEST` using `SE24` or `SE80` (optional, cloned repositories may still use this interface)
