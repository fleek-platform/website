---
order: 3
title: IPNS
date: 2023-01-10
description: Learn how to pin a file on IPNS using the service's primary methods. Upload files individually, in bulk, or directly from your local system.
keywords: [services, documentation, getting started]
tags:
- Accounts
- Guide
- Learn
- Fleek
---

# IPNS

:::info
In case you are using the Fleek SDK with a PAT as the authentication service you need to make sure that the projectId is set in the PersonalAccessTokenService.
:::

## How to Create an IPNS Record

To create an IPNS record using the SDK, you need to be authenticated and have a project selected.

```typescript
const record = await sdk.ipns().createRecord();
```

This returns an object with the following properties:

```typescript
id: The IPNS record ID on Fleek DB.
name: The name of the IPNS record.
hash: The IPFS CID associated with the record.
```

Initially, all records are created with an empty IPFS hash. To add it, you will need to publish it.

You can query the record by name:

```typescript
const record = await sdk.ipns().getRecord({ name: record.name });
```

## How to Publish an IPNS Record

To publish an IPNS record, you need to provide the IPNS record name and the IPFS hash you want to associate with it.

```typescript
const record = await sdk.ipns().publishRecord({ id: record.id, hash });
```

:::info
It is important to note that IPNS propagation can take anywhere from 1 to 30 minutes.
:::

## List All Records

To list all the records associated with a project, use the `listRecords` method.

```typescript
const records = await sdk.ipns().listRecords();
```

## Delete a Record

To delete an IPNS record, use the `deleteRecord` method.

```typescript
await sdk.ipns().deleteRecord({ id: record.id });
```

:::info
Remember that IPNS propagation can take from 1 to 30 minutes.
:::
