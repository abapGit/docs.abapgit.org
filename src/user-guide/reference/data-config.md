---
title: Data Config
category: reference
order: 79
---

## Data Config

abapGit can serialize and deserialize data from any SAP table. The data is serialized in JSON format with the `TABU` object type.

### Configuration

From the "Repository View", use "Advanced > Data Config" to add the tables you want to include in your repository. Optionally, you can specify if initial values should be serialized, and provide a where condition to filter the data.

:::info
The data config is *not* saved locally. You must stage and push the Data Config, i.e. the files related to `TABU` objects, to your repository. If not and you exit abapGit, then next time the configuration changes are not there anymore.
:::

:::warning 
For safety reasons, by default only customer-defined customizing tables or tables that are included in the repository are supported.

You can allow other tables using a [exit `CHANGE_SUPPORTED_DATA_OBJECTS`](exits.md).
:::

![](/img/data-config-4.png)

![](/img/data-config-5.png)

### Result

For each table, two JSON files are created: One for the configuration (table name and where clause), and one for the data.

![](/img/data-config-6.png)

![](/img/data-config-1.png)

![](/img/data-config-2.png)

![](/img/data-config-3.png)
