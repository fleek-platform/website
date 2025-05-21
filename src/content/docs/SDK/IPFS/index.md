---
order: 3
title: IPFS
date: 2023-01-10
desc: Learn how to pin a file on IPFS using the service's primary methods. Upload files individually, in bulk, or directly from your local system.
keywords: [services, documentation, getting started]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

# IPFS

The Fleek Platform SDK helps you pin files to IPFS. The Interplanetary File system (IPFS) is a distributed file storage protocol that allow computers all over the globe to store and serve files as part of a giant peer-to-peer network.

:::warn
We're transitioning from using the IPFS service to our new Storage service. To help you make this change smoothly, there's a grace period and we've included warnings within our SDK code. We recommend reviewing our [Storage documentation](https://hosting.fleek.xyz/sdk/storage) to understand how to switch to the Storage service. You should start utilizing the Storage service over the IPFS service.
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
add                 Uploads a file from a Buffer and a path representing the file location.
addAll              Upload an array of files, each one represented by a content and a path for the file location.
addFromPath         Uploads a file from the local file system.
```

## Add

The `add` is an asynchronous function designed to upload a file to IPFS via the Fleek Platform Service.

### Function signature

```typescript
async (file: IpfsFile): Promise<UploadResult>
```

### Parameters

The file parameter is an instance of IpfsFile, a type that represents the file to be uploaded.

```typescript
type IpfsFile = {
  // A string representing the path of the file
  path: string;
  // The content of the file
  content?: Buffer;
};
```

### Returns

Returns a Promise which resolves to an UploadResult type, containing a CID, size and path.

```typescript
type UploadResult = {
  cid: CID;
  size: number;
  path: string;
};
```

### Usage example

Calling this method with an IpfsFile object would look something like the following:

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

const uploadToIPFS = async (filename: string, content: Buffer) => {
  const result = await fleekSdk.ipfs().add({
    path: '<FILENAME>',
    content: '<BUFFER_CONTENT>',
  });

  return result;
};
```

## AddAll

The `addAll` is designed to upload multiple files to IPFS. This function is asynchronous and returns a Promise that resolves to an array of UploadResult objects.

### Function signature

```typescript
addAll: (files: IpfsFile[], options?: AddAllOptions) => Promise<UploadResult[]>;
```

### Parameters

The files parameter is an array of IpfsFile.

```typescript
type IpfsFile = {
  // A string representing the path of the file
  path: string;
  // The content of the file
  content?: Buffer;
  // Options
  options?: AddAllOptions;
};
```

The options parameter is of type AddAllOptions, allowing customization of the upload behavior. Defaults to an empty object.

```typescript
type AddAllOptions = {
  basename?: string;
  wrapWithDirectory?: boolean;
  searchParams?: URLSearchParams;
};
```

### Returns

Returns a Promise which resolves to an array of UploadResult objects.

```typescript
type UploadResult = {
  cid: CID;
  size: number;
  path: string;
};
```

### Usage example

```typescript
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';

import { type IpfsFile } from '@fleek-platform/sdk';

// The Fleek SDK should be authenticated
// with a valid Project ID
const accessTokenService = new PersonalAccessTokenService({
  personalAccessToken: '<PAT>',
  projectId: '<PROJECT-ID>',
});

const fleekSdk = new FleekSdk({
  accessTokenService,
});

const uploadToIPFS = async (files: IpfsFile[]) => {
  const result = await fleekSdk.ipfs().addAll(files);

  return result;
};
```

## AddFromPath

The `addFromPath` is designed to upload a file or directory located at a given path to IPFS (InterPlanetary File System). This function is asynchronous and returns a Promise that resolves to an array containing a single UploadResult object.

### Function signature

```typescript
addFromPath: (path: string, options?: AddFromPathOptions) =>
  Promise<UploadResult[]>;
```

### Parameters

The options parameter is of type AddFromPathOptions, allowing customization of the upload behavior. Defaults to an empty object.

```typescript
type AddFromPathOptions = {
  wrapWithDirectory?: boolean;
};
```

### Returns

Returns a Promise which resolves to an array of UploadResult objects.

```typescript
type UploadResult = {
  cid: CID;
  size: number;
  path: string;
};
```

### Usage example

Calling this method with a path to a file or directory would be similar to:

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

const uploadToIPFS = async (filePath: string) => {
  const result = await fleekSdk.ipfs().addFromPath(filePath);

  return result;
};
```
