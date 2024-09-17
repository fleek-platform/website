---
order: 2
title: Storage
date: 2023-01-10
desc: Learn how to use the Storage service via the Fleek Platform SDK.
keywords: [services, documentation, getting started, storage]
tags:
  - Storage
  - Guide
  - Learn
  - Fleek
---

# Storage

The Fleek Platform SDK allows you to interface with the storage service to store files in a decentralized manner. Our service supports IPFS as our main storage protocol, complemented by Arweave and Filecoin as a backup layer. This approach ensures a high-performing and highly available service. Filecoin acts as the default backup layer, but modifications can be implemented in the storage settings.

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

Here is a list of the available methods for the Fleek Platform SDK Storage Service:

```sh
Method                      Description
-----------------------------------------------------------------------------------------------------------------
uploadFile                  Upload a file to IPFS
uploadDirectory             Upload a directory to IPFS
uploadVirtualDirectory      Upload a virtual directory to IPFS
get                         Get a file by CID
getByFilename               Get a file by Filename
list                        List files
delete                      Delete a file by CID
```

## UploadFile

The `uploadFile` is an asynchronous function designed to upload a file to Fleek Platform Storage Service.

### Function Signature

```typescript
async ({ file, onUploadProgress }: UploadRawFileArgs): Promise<UploadPinResponse>
```

### Parameters

The file parameter is an instance of IpfsFile, a type that represents the file to be uploaded.

```typescript
type UploadRawFileArgs = {
  file: FileLike;
  // A callback or handler for the upload progress
  onUploadProgress?: (uploadProgress: UploadProgress) => void;
};
```

```typescript
type UploadProgress = {
  loadedSize: number;
  totalSize: number;
};
```

```typescript
type FileLike = {
  name: string;
  stream: () => ReadableStream;
};
```

### Returns

```typescript
type UploadPinResponse = {
  pin: {
    cid: string;
    size: number;
  };
  duplicate: boolean;
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

const result = await fleekSdk.storage().uploadFile({
  file,
  onUploadProgress,
});

const onUploadProgress = ({ loadedSize, totalSize }: UploadProgress) => {
  if (loadedSize > 0) {
    const currentTime = DateTime.now();
    const elapsedMillis = currentTime.diff(startedTime).as('milliseconds');

    const bytesPerSecond = loadedSize / (elapsedMillis / 1000);
    const remainingBytes = totalSize - loadedSize;
    const remainingSeconds = remainingBytes / bytesPerSecond;
    const remainingTime = remainingSeconds * 1000;

    // Does something with remainingTime
  }
};
```

## list

The `list` is an asynchronous function designed to get a list of files uploaded to a projects storage.

### Function Signature

```typescript
async (): Promise<StoragePin[]>
```

### Parameters

Not required.

### Returns

```typescript
type StoragePin = {
  cid?: string;
  size?: number;
  filename?: string;
  filecoinDealIds?: string;
  arweavePin?: ArweavePin;
  arweaveId?: string;
};
```

```typescript
type ArweavePin = {
  cid: string;
  bundlrId: string;
  price: runtime.Decimal;
  createdAt: Date;
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

const result = await fleekSdk.storage().list();
```

## Get

The `get` is an asynchronous function to retrieve a file by it's CID.

### Function Signature

```typescript
async ({ cid }: GetPinArgs): Promise<StoragePin>
```

### Parameters

```typescript
type GetPinArgs = {
  cid: string;
};
```

### Returns

```typescript
type StoragePin = {
  cid?: string;
  size?: number;
  filename?: string;
  filecoinDealIds?: string;
  arweavePin?: ArweavePin;
  arweaveId?: string;
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

const res = await fleekSdk.storage().get({
  cid: '<CID>',
});
```

## GetByFilename

The `getByFilename` is an asynchronous function to retrieve a file by it's name and extension.

### Function Signature

```typescript
async ({ filename, extension }: GetPinByFilenameArgs): Promise<StoragePin[]>
```

### Parameters

```typescript
type GetPinByFilenameArgs = {
  filename: string;
  extension: string;
};
```

### Returns

```typescript
type StoragePin = {
  cid?: string;
  size?: number;
  filename?: string;
  filecoinDealIds?: string;
  arweavePin?: ArweavePin;
  arweaveId?: string;
}[];
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

const res = await fleekSdk.storage().getByFilename({
  filename: '<FILENAME>',
  extension: '<EXTENSION>',
});
```


## Delete

The `delete` is an asynchronous function designed to delete a storage file by it's CID.

:::warn
Given the immutable nature of data in IPFS distributed network—where each piece of content is identified by a unique hash that points to the same content whenever available—we regret to inform you that we cannot offer a traditional deletion option. Despite this fact, rest assured that once we stop pinning certain items, they will no longer be visible in your storage list. Learn more about IPFS [here](https://docs.ipfs.tech)
:::

### Function Signature

```typescript
async ({ cid }: DeletePinArgs)
```

### Parameters

```typescript
type DeletePinArgs = {
  cid: string;
};
```

### Returns

```typescript
type Response = {
  status: number;
  // TODO: provide type
  body: Record<string, unknown>;
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

const result = await fleekSdk.storage().delete();
```

## UploadDirectory

Upload a directory to Fleek Platform Storage IPFS.

:::warn
It's intended for Node.js only, due to file system requirements. Use the [uploadVirtualDirectory](#uploadvirtualdirectory) for browsers, also useful for Nodejs.
:::

### Function Signature

```typescript
async ({ path, options, onUploadProgress }: UploadDirectoryArgs): Promise<UploadPinResponse>
```

### Parameters

```typescript
type UploadDirectoryArgs = {
  path: string;
  options?: UploadDirectoryOptions;
  onUploadProgress?: (uploadProgress: UploadProgress) => void;
};
```

### Returns

```typescript
type UploadPinResponse = {
  pin: {
    cid: string;
    size: number;
  };
  duplicate: boolean;
};
```

## UploadVirtualDirectory

Upload a virtual directory to Fleek Platform Storage IPFS.

### Function Signature

```typescript
async ({
    files,
    directoryName,
    onUploadProgress,
  }: UploadVirtualDirectoryArgs): Promise<UploadPinResponse>
```

### Parameters

```typescript
type UploadVirtualDirectoryArgs = {
  files: FileLike[];
  directoryName: string;
  onUploadProgress?: (uploadProgress: UploadProgress) => void;
};
```

```typescript
type FileLike = {
  name: string;
  stream: () => ReadableStream;
};
```

### Returns

```typescript
type UploadPinResponse = {
  pin: {
    cid: string;
    size: number;
  };
  duplicate: boolean;
};
```
