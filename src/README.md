---
home: true
icon: home
title: Home
heroImage: /logo.svg
heroImageDark: /logo-dark.svg
heroText: false
actions:
  - text: 🚀 Getting started
    link: /user-guide/getting-started/install
    type: primary

copyright: false
footer: Theme by <a href="https://theme-hope.vuejs.press/" target="_blank">VuePress Theme Hope</a> | Copyright © 2017-present abapGit
---

<div style="height:100px"></div>

## Welcome to abapGit

abapGit is a git client for ABAP developed in ABAP. It requires ABAP version 702 SP 8 or higher.

Latest build: <a href="https://raw.githubusercontent.com/abapGit/build/main/zabapgit_standalone.prog.abap" download>zabapgit_standalone.prog.abap</a>

For questions, comments, bugs, feature requests, or other wishes please create an [issue](https://github.com/abapGit/abapGit/issues).

You can also [Ask abapGit Guru](https://gurubase.io/g/abapgit). It is an abapGit-focused AI designed to answer your questions.

## Security

abapGit is a tool to import and export code between ABAP systems. If a developer has a developer key to the system, the developer can perform these actions already. abapGit enables the developer to do mass export/changes/imports but not more than already possible to do manually.

Running automated security checks on the abapGit code will by design give a lot of errors, as abapGit will import, overwrite and change ABAP artifacts in the system in ways that might not be intended. Always review all code in remote repositories before importing to the target system, this is possible because abapGit is plain text unlike traditional transport files.

That being said, abapGit is used by multiple [organizations](/user-guide/other/where-used.md), all abapGit changes are reviewed via pull requests. And all 100+ [repository watchers](https://github.com/abapGit/abapGit/watchers) are automatically notified for every change to the code base, so potentially all changes are looked at by more people than traditional enterprise products.

## Support

It is a community effort to support the project, recommend [watching](https://help.github.com/articles/watching-and-unwatching-repositories/) the project to get a feeling about issue resolution. Everyone can suggest changes to abapGit via [pull requests](https://help.github.com/articles/about-pull-requests/).

![abapGit 1.99.0](/img/abapgit_1_99_0.png)

## Community vs. SAP Distribution of abapGit

This website is documenting the community version of abapGit (available on [GitHub](https://github.com/abapGit/abapGit)). The SAP version of abapGit available that is part of SAP Business Technology Platform and SAP S/4HANA Cloud is documented on [help.sap.com](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/d62ed9d54a764c53990f25f0ab6c27f9.html). When using the SAP version, please note that there are different capabilities and supported object types (as described by SAP). If the SAP version does not work correctly, open a [ticket with SAP support](https://me.sap.com/servicessupport/cases).

## License

The abapGit documentation is available under the [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) license.
