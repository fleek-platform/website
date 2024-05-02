---
title: "Decentralized Databases 101: An Overview of the Available Options."
date: 2023-03-11
desc: "Three popular decentralized databases that have gained attention in recent years are Tableland (currently in open beta with a production launch set for 2023), Ceramic's ComposeDB (which recently entered `Beta` status), and Polybase."
thumbnail: "./ddbs.png"
image: "./ddbs.png"
---

With the rise of blockchain technology and the need for decentralized systems, decentralized databases have become popular for storing and managing data.

As a web3 developer, you might be tempted by storing data on-chain at first. However, this isn't a feasible option. **Storing a single MB on-chain can cost upwards of $10,000 on the Ethereum mainnet.** Decentralized databases have begun to establish themselves as an alternative, offering similar benefits at a fraction of the cost while maintaining decentralization. 

Three popular decentralized databases that have gained attention in recent years are [Tableland](https://tableland.xyz/) (currently in open beta with a production launch set for 2023), [Ceramic's ComposeDB](https://ceramic.network/) (which recently entered `Beta` status), and [Polybase](https://polybase.xyz/). In this blog post, we'll examine each of these and explore their unique features and how you can integrate them into your web3 apps. But first, let's dive into decentralized databases as a concept.

***

## What are Decentralized Databases?

Unlike regular databases, decentralized databases **store data across a network of nodes rather than a centralized location**. This distributed approach allows for increased censorship resistance and transparency.

Traditional databases are often centralized, meaning a single entity controls them. This can lead to issues with censorship, as the entity in control may have the power to access or manipulate data & information. **Decentralized databases, on the other hand, are distributed and do not rely on a single entity for control.** This means they are inherently more censorship-resistant, as no central authority can restrict access to information.

***

## Looking into Tableland

![An alian on the mountain with vehicle](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/tableland1.png)

[Tableland](https://tableland.xyz/) is a decentralized database platform that decomposes traditional relational databases into two components: an on-chain registry with access control logic (ACL) and a network of permissionless databases. Each table is minted as an ERC721 token on the base EVM-compatible layer, with an on-chain table owner who can set ACL privileges. 

The off-chain Tableland network manages the creation and mutation of the table. The link between on-chain and off-chain is all handled at the contract level, with the contract pointing to the Tableland network.

![app.js code sample with polygon mumbai testnet database](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/code1.png)

Tableland allows for read queries through the free gateway, which can come from a simple frontend request or non-EVM blockchains. Those with proper on-chain privileges can write to a specific table. The table owner can set rules for updating/inserting/deleting values and altering data. 

Tableland also allows for complex queries that join data from multiple tables to create a dynamic and composable relational data layer.

* [Documentation](https://docs.tableland.xyz/)
* [Quickstart](https://docs.tableland.xyz/quickstarts)

***

## Looking into Ceramic's ComposeDB

![ceramic logo with "The composable data network" message banner](https://assets.website-files.com/63dd4cd234594c8675690ca2/63f67cc47baeccbd3cd626a6_Frame%201.png)

ComposeDB on [Ceramic](https://ceramic.network/) is a powerful tool for building decentralized applications. Composites are groups of data moved that define the graph database schema for an application, **making it easy for different applications to reuse and share data.** Composites are created by developers in the community, and all feed into Ceramic’s ecosystem, allowing for instant interoperability without any integrations needed.

![app.js code sample about ComposeDB client](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/code2.png)

With **ComposeDB, every node must be backed by a SQL database, either SQLite or Postgres,** which will be used to index the data and construct the database for the data models in your Composite. Using the ComposeDB client, developers can easily make GraphQL queries and mutations against their Ceramic node. Composites and their underlying data models are designed to be reusable, making it simple to build complementary and interoperable apps.

* [Documentation](https://composedb.js.org/docs/0.4.x/introduction/)
* [Guides](https://composedb.js.org/docs/0.4.x/guides)

***

## Looking into Polybase

![Polybase logo with The web3 database slogan](https://framerusercontent.com/images/mEhXNmRzPmQr9t0ScyBfG6xRpM.png)

[Polybase](https://polybase.xyz/) uses zk-rollups combined with native indexing. This allows for setting decentralized database rules, fast queries, and scalable writes. 

![app.js code sample with polybase/client](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/code3.png)

It works like a NoSQL database, with validation rules written in JavaScript-like language, with an SDK for interacting with the data, similar to Firestore. You can also do row-level token gating and wallet-based permissions.

* [Documentation](https://polybase.xyz/docs/introduction)
* [Quickstart](https://polybase.xyz/docs/get-started)

***

## Which Decentralized Database Should I Choose?

This boils down to the specific use case of the database and personal preferences. **For example, Tableland uses SQL for querying the database, ComposeDB, on the other hand, uses Graphql, and Polybase features a NoSQL-like database.** Similar to plain old Web2 databases, there isn’t a single answer for which database should be used on a project.

Factors such as **data structure, scale and query complexity, and development team skills all play a role in determining the best-decentralized database for a particular project.** Additionally, it’s essential to consider the tradeoffs between security, performance, and ease of use when selecting a database. Ultimately, carefully evaluating the available options and considering project-specific requirements will help choose the most appropriate decentralized database for a given use case.

***

## Wrapping it Up

In conclusion, decentralized databases are becoming more popular due to their censorship resistance and transparency. Tableland, ComposeDB, and Polybase are three decentralized database options, but there are more compelling data-layer solutions, and balancing tradeoffs and thinking on your use-case needs is the best path to a good pick!

That’s all for today! I hope you now better understand the need for a decentralized database and the available options. You can learn more about [Tableland](https://tableland.xyz/), [Ceramic](https://ceramic.network/), and [Polybase](https://polybase.xyz/) by reading their official documentations.

For more resources visit [our LinkTree](https://linktr.ee/fleek).
