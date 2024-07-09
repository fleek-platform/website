---
order: 4
title: IPNS
date: 2023-01-10
desc: Learn how to pin a file on IPNS using the service's primary methods. Upload files individually, in bulk, or directly from your local system.
keywords: [services, documentation, getting started]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

# IPNS

The Fleek Platform SDK helps you create mutable pointers to CIDs known as InterPlanetary Name System (IPNS) names. IPNS names can be thought of as links that can be updated over time, while retaining the verifiability of content addressing. In this case in particular, they are mostly used to represent IPFS files (through their hashes).

:::warn
If you're authenticating the Fleek Platform SDK with a Personal Access Token (PAT), you must provide a Project ID to the [PersonalAccessTokenService](/docs/cli/pat/).
:::

## Create an IPNS Record

```typescript
// The Fleek SDK should be authenticated
// with a valid Project ID
const record = await fleekSdk.ipns().createRecord();
```

This returns an object with the following properties:

```typescript
type IpnsRecord = {
  // The IPNS record ID on Fleek DB
  id: string;
  // The name of the IPNS record
  name: string;
  // The IPFS CID associated with the record
  hash: string;
};
```

Initially, all records are created with an empty IPFS hash. To add it, you will need to publish it.

You can query the record by name:

```typescript
// The Fleek SDK should be authenticated
// with a valid Project ID
const record = await fleekSdk.ipns().getRecord({
  name: record.name,
});
```

## How to Publish an IPNS Record

To publish an IPNS record, you need to provide the IPNS record name and the IPFS hash you want to associate with it.

```typescript
// The Fleek SDK should be authenticated
// with a valid Project ID
const record = await fleekSdk.ipns().publishRecord({
  id: record.id,
  hash,
});
```

:::warn
It is important to note that IPNS propagation can take anywhere from 1 to 30 minutes.
:::

## List All Records

To list all the records associated with a project, use the `listRecords` method.

```typescript
// The Fleek SDK should be authenticated
// with a valid Project ID
const records = await fleekSdk.ipns().listRecords();
```

## Delete a Record

To delete an IPNS record, use the `deleteRecord` method.

```typescript
// The Fleek SDK should be authenticated
// with a valid Project ID
await sdk.ipns().deleteRecord({
  id: record.id,
});
```

:::warn
Remember that IPNS propagation can take from 1 to 30 minutes.
:::
