---
title: Development Guidelines
category: read-first
order: 20
---

## Object Types

abapGit is merged into a [stand-alone version](https://docs.abapgit.org/guide-install.html). For this reason, the only allowed object types for *new* repository objects are classes and interfaces. In particular, function groups or modules must *not* be included.

Exceptions for existing objects:
- Transaction `ZABAPGIT`
- Program `ZABAPGIT` and its includes
- Function group `ZABAPGIT_PARALLEL` for parallel serialization (only availble in developer version)
- MIME objects `ZABAPGIT_*` for UI (CSS, JS, and fonts)

## Conventions

### Prefixing
Variables are prefixed using the standard setting in [abapOpenChecks Naming Conventions](http://docs.abapopenchecks.org/checks/69/)

### Downport
abapGit is targeted for version 702, so the code should only contain expressions/statements that works on 702.
[abaplint](https://abaplint.org) will automatically check every PR for language syntax that is not available on 702.

### Pretty Printer
Use pretty printer, keywords upper case + indentation, [abapOpenChecks](http://docs.abapopenchecks.org/checks/06/) can be used for checking this

### Dynpros
For user interface, we are moving towards everything in HTML, ie. new dynpro screens or use of dynpro screens should not be added to the source code.

### abaplint
Pull requests must pass all abaplint configured checks before they can be merged.

### Internationalization (I18N)
abapGit supports only English language. Neither objects nor text literals are translated. Therefore, all objects shall be set to English as the original language
and text literals in the code shall be maintained in English. 

Since there's only one language, using the `##NO_TEXT` pragma is not required and will actually lead to lint errors. The exception are global class and interface definitions,
where the pragmas are added automatically by `SE24/SE80`. 
