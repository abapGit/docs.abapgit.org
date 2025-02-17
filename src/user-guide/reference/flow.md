---
title: abapGit Flow
category: reference
order: 90
---

BETA FEATURE

The abapGit flow page helps mirroring branches/pull requests into/from transports by doing filtered git operations. This way, it is possible to work on multiple branches in one system, or pull multiple branches into a system.

:::warning
Filtered git operations is not a real git thing, it's something else than git. It is a workable compromise to work with git in a multi user system
:::

The flow page gives an overview of all features that a developer is working on across their favorite repositories.

![](/img/flow_2.png)

## Enabling

To enable a repository to work with flow, go to the local repository settings and tick "Flow Page".
Furthermore, developers must set their favorite repositories, so abapGit knows which parts each developer is working on.

![](/img/flow_1.png)
