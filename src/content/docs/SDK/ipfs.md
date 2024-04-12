---
draft: false
title: IPFS 
sidebarCollapsible: false
sidebar_position: 3
date: 2023-01-10T09:00:00.000+00:00
description: Learn how to pin a file on IPFS using the service's primary methods. Upload files individually, in bulk, or directly from your local system.
category: Documentation
keywords: [services, documentation, getting started]
tags:
- Accounts
- Guide
- Learn
- Fleek
---

:::info
In case you are using the Fleek SDK with a PAT as the authentication service you need to make sure that the projectId is set in the PersonalAccessTokenService.
:::

## How to pin a file

Here is a list of the available methods for the `IPFS` service:

| Method | Description |
| --- | --- |
| `add` | Uploads a file from a Buffer and a path representing the file location. |
| `addAll` | Upload an array of files, each one represented by a content and a path representing the file location. |
| `addFromPath` | Uploads a file from the local filesystem. |

<details>
<summary>`add`</summary>
***Parameters:***

> - `file`: Object of type `IpfsFile`

**Returns:**
> - `path`: Path of the file
> - `cid`: Content hash associated with the file
> - `size`: Size of the file

**Function types:**
```typescript
type IpfsFile = {
	path: string;
	content?: Buffer;
}

type UploadResult = {
    cid: CID;
    size: number;
    path: string;
}

add: (file: IpfsFile) => Promise<UploadResult>;
```

**Example:**
```typescript copy
// fleekSdk is an authenticated instance of FleekSDK
// with a selected projectId

const uploadToIPFS = async (filename: string, content: Buffer) => {
	const result = await fleekSdk.ipfs().add({
		path: filename,
		content: content,
	})
	
	return result
}
```
</details>

<details>
<summary>`addAll`</summary>
***Parameters:***

> - `files`: List of Objects of type `IpfsFile`
> - `options`: Optional Object with properties:
> - `wrapWithDirectory`: boolean if is folder

***Returns:***

> - `UploadResult[]`: List of Objects with properties:
>   - `path`: Path of the file
>   - `cid`: Content hash associated with the file
>   - `size`: Size of the file


***Function types:***
```typescript
type IpfsFile = {
	path: string;
	content?: Buffer;
}

type UploadResult = {
    cid: CID;
    size: number;
    path: string;
}

addAll: (
	files: IpfsFile[],
	options?: AddAllOptions
) => Promise<UploadResult[]>;
```

***Example:***
```typescript copy
// fleekSdk is an authenticated instance of FleekSDK
// with a selected projectId

import { type IpfsFile } from '@fleekxyz/sdk'

const uploadToIPFS = async (files: IpfsFile[]) => {
	const result = await fleekSdk.ipfs().addAll(
		files
	)
	
	return result
}
```
</details>

<details>
<summary>`addFromPath`</summary>

### ***Parameters***

> - `path`: String path of file in local filesystem
> - `options:` Optional Object with properties:
> - `wrapWithDirectory`: boolean if is folder

### **Returns**

> - `UploadResult[]`: List of Objects with properties:
>   - `path`: Path of the file
>   - `cid`: Content hash associated with the file
>   - `size`: Size of the file


### **Function types**
```typescript
type AddFromPathOptions = {
  wrapWithDirectory?: boolean;
}

type UploadResult = {
  cid: CID;
  size: number;
  path: string;
}

addFromPath: (
  path: string,
  options?: AddFromPathOptions
) => Promise<UploadResult[]>;
```

### **Example**
```typescript copy
// fleekSdk is an authenticated instance of FleekSDK
// with a selected projectId

const uploadToIPFS = async (filePath: string) => {
  const result = await fleekSdk.ipfs().addFromPath(filePath);

  return result
}
```
</details>
