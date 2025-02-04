---
title: Data Config
category: reference
order: 79
---

## Data Config

abapGit can serialize and deserialize data from any SAP table. The data is serialized in JSON format with the `TABU` object type.

### Configuration

From the "Repository View", use "Advanced > Data Config" to add the tables you want to include in your repository. Optionally, you can specify if initial values should be serialized, and provide a where condition to filter the data.

:::warning 
For safety reasons, by default only customer-defined customizing tables are supported.

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
