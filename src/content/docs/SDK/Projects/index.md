---
order: 1
title: Projects
date: 2023-01-10
desc: Create, list, and retrieve project details using the SDK, ensuring seamless integration with IPFS storage & IPNS services.
keywords: [services, documentation, getting started]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

# Projects

Projects help categorize your work and certain services, including [Storage](/docs/sdk/storage) and [IPNS](/docs/sdk/ipns), require authentication with a projectId to interact with them. The SDK makes it easy to get the projectId needed for the services that call for it.

:::note
When importing the SDK (version 3 and above), you should explicitly specify the environment, e.g. for server-side (Node.js) use the @fleek-platform/sdk/node in the import statement. If not specified, the import defaults to the browser version.

```ts
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
```
:::

## Create

Start by creating a `Project` with a descriptive name to facilitate management of sites, storage, and functions.

### Function Signature

```typescript
async ({ name }: CreateProjectArgs): Promise<Project>
```

### Parameters

```typescript
type CreateProjectArgs = {
  name: string;
}
```

### Returns

Returns a Promise which resolves to a Project type, to name a few, containing an id, avatar, name, etc.

```typescript
type Project = {
    avatar: File;
    backupStorageOnArweave: boolean;
    backupStorageOnFilecoin: boolean;
    createdAt: Date;
    id: string;
    name: string;
    updatedAt: Date;
}
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

const projectId = await fleekSdk.projects().create({
  name: 'My Project',
});
```

## List

Use the `list` method to gather information about the user accounts `Projects`.

### Function Signature

```typescript
async (): Promise<Project[]>
```

### Parameters

Not applicable.

### Returns

Returns a Promise which resolves to a list of Project type, to name a few, containing an id, avatar, name, etc.

```typescript
type Project = {
    avatar: File;
    backupStorageOnArweave: boolean;
    backupStorageOnFilecoin: boolean;
    createdAt: Date;
    id: string;
    name: string;
    updatedAt: Date;
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

const projects = await fleekSdk.projects().list();
```

## Get

Use the `get` method to retrieve a `Project` by its `id`.

### Function Signature

```typescript
async ({ id }: GetProjectArgs): Promise<Project> 
```

### Parameters

```typescript
type GetProjectArgs = {
  id: string;
}
```

### Returns

Returns a Promise which resolves to a Project type, to name a few, containing an id, avatar, name, etc.

```typescript
type Project = {
    avatar: File;
    backupStorageOnArweave: boolean;
    backupStorageOnFilecoin: boolean;
    createdAt: Date;
    id: string;
    name: string;
    updatedAt: Date;
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

const project = await fleekSdk.projects().get({
  id: '<PROJECT-ID>',
});
```

## Update

Use the `update` method by:

### Function Signature

```typescript
async ({ id }: GetProjectArgs): Promise<Project> 
```

### Parameters

```typescript
type UpdateProjectArgs = {
  where: {
    id: string,
  };
  data: {
    name?: string;
    avatar?: File;
    backupStorageOnArweave?: boolean;
    backupStorageOnFilecoin?: boolean,
  };
};
```

### Returns

Returns a Promise which resolves to a Project type, to name a few, containing an id, avatar, name, etc.

```typescript
type Project = {
    avatar: File;
    backupStorageOnArweave: boolean;
    backupStorageOnFilecoin: boolean;
    createdAt: Date;
    id: string;
    name: string;
    updatedAt: Date;
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

const project = await fleekSdk.projects().update({
  where: {
    id: '<PROJECT-ID>',
  },
  data: {
    name: '<NEW-PROJECT-NAME>',
    avatar: new File([yourImage], '<YOUR-IMAGE-DESCRIPTION>'),
  },
});
```
