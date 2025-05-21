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

:::note
When importing the SDK (version 3 and above), you should explicitly specify the environment, e.g. for server-side (Node.js) use the @fleek-platform/sdk/node in the import statement. If not specified, the import defaults to the browser version.

```ts
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
```

:::

## Methods

Here is a list of the available methods for the Fleek Platform SDK IPFS Service:

```sh
Method              Description
-----------------------------------------------------------------------------------------------------------------
createRecord        Create an IPNS Record.
getRecord           Get an IPNS Record.
publishRecord       Publish an IPNS Record.
listRecords         List IPNS records.
deleteRecord        Delete an IPNS record.
```

## CreateRecord

The IPNS `createRecord` let's a user create an IPNS Record.

### Function Signature

```typescript
async (): Promise<IpnsRecord>
```

### Parameters

Not applicable.

### Returns

Returns a Promise which resolves to a IpnsRecord type, containing an id, name and the hash.

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

### Usage Example

```typescript
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';

// The Fleek SDK should be authenticated
// with a valid Project ID
const accessTokenService = new PersonalAccessTokenService({
  personalAccessToken: '<PAT>',
  projectId: '<PROJECT-ID>',
});

const fleekSdk = new FleekSdk({
  accessTokenService,
});

const record = await fleekSdk.ipns().createRecord();
```

## GetRecord

The `getRecord` method allows you to get an IPNS record.

### Function Signature

```typescript
async ({ name }: GetRecordArgs): Promise<IpnsRecord>
```

### Parameters

```typescript
type GetRecordArgs = {
  name: string;
};
```

### Returns

Returns a Promise which resolves to a IpnsRecord type, containing an id, name and the hash.

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

### Usage Example

```typescript
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';

// The Fleek SDK should be authenticated
// with a valid Project ID
const accessTokenService = new PersonalAccessTokenService({
  personalAccessToken: '<PAT>',
  projectId: '<PROJECT-ID>',
});

const fleekSdk = new FleekSdk({
  accessTokenService,
});

const record = await fleekSdk.ipns().getRecord({
  name: record.name,
});
```

## PublishRecord

To publish an IPNS record, you need to provide the IPNS record name and the IPFS hash you want to associate with it. Initially, all records are created with an empty IPFS hash. To add it, you will need to publish it.

### Function Signature

```typescript
async ({ hash, id }: PublishRecordArgs): Promise<IpnsRecord>
```

### Parameters

```typescript
type PublishRecordArgs = {
  id: string;
  hash: string;
};
```

### Returns

Returns a Promise which resolves to a IpnsRecord type, containing an id, name and the hash.

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

### Usage Example

```typescript
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';

// The Fleek SDK should be authenticated
// with a valid Project ID
const accessTokenService = new PersonalAccessTokenService({
  personalAccessToken: '<PAT>',
  projectId: '<PROJECT-ID>',
});

const fleekSdk = new FleekSdk({
  accessTokenService,
});

const record = await fleekSdk.ipns().publishRecord({
  id: record.id,
  hash,
});
```

:::warn
It is important to note that IPNS propagation can take anywhere from 1 to 30 minutes.
:::

## ListRecords

To list all the records associated with a project, use the `listRecords` method.

### Function Signature

```typescript
async (): Promise<IpnsRecord[]>
```

### Parameters

Not applicable.

### Returns

Returns a Promise which resolves to a list of IpnsRecord type, containing an id, name and the hash.

```typescript
type IpnsRecord = {
  // The IPNS record ID on Fleek DB
  id: string;
  // The name of the IPNS record
  name: string;
  // The IPFS CID associated with the record
  hash: string;
}[];
```

### Usage Example

```typescript
// The Fleek SDK should be authenticated
// with a valid Project ID
const records = await fleekSdk.ipns().listRecords();
```

## DeleteRecord

To delete an IPNS record, use the `deleteRecord` method.

### Function Signature

```typescript
async ({ id }: DeleteRecordArgs): Promise<IpnsRecord>
```

### Parameters

```typescript
type DeleteRecordArgs = {
  id: string;
};
```

### Returns

Returns a Promise which resolves to a IpnsRecord type, containing an id, name and the hash.

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

### Usage Example

```typescript
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';

// The Fleek SDK should be authenticated
// with a valid Project ID
const accessTokenService = new PersonalAccessTokenService({
  personalAccessToken: '<PAT>',
  projectId: '<PROJECT-ID>',
});

const fleekSdk = new FleekSdk({
  accessTokenService,
});

await sdk.ipns().deleteRecord({
  id: record.id,
});
```

:::warn
Remember that IPNS propagation can take from 1 to 30 minutes.
:::
