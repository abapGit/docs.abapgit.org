---
title: Package Structure
category: read-first
order: 60
---

## Package Structure

Various conventions for packages,

### `/src/git/`

Raw git client

Does not know about UI, objects or repositories, everything is file based.

Ideally possible to run and use standalone

### `/src/ui/core/`

UI framework

Does not know about objects or repositories

Ideally possible to run and use standalone

### `/src/http/`

Raw http client

Does not know about UI, objects or repositories

Ideally possible to run and use standalone

### `/src/json/`

Don't do any manual changes in this folder, its a renamed copy of https://github.com/sbcgua/ajson via https://github.com/abapGit/ajson_mirror