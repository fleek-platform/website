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

Projects help categorize your work and certain services, including [Storage](/docs/cli/storage) and [IPNS](/docs/cli/ipns), require authentication with a projectId to interact with them. The SDK makes it easy to get the projectId needed for the services that call for it.

:::note
When importing the SDK (version 3 and above), you should explicitly specify the environment, e.g. for server-side (Node.js) use the @fleek-platform/sdk/node in the import statement. If not specified, the import defaults to the browser version.

```ts
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
```
:::

## Create a project

Start by creating a `Project` with a descriptive name to facilitate management of sites, storage, and functions.

```typescript
const projectId = await fleekSdk.projects().create({
  name: 'My Project',
});
```

## List projects

Use the `list` method to gather information about the user accounts `Projects`.

```typescript
const projects = await fleekSdk.projects().list();
```

This returns a list of projects:

```json
[
  {
    "id": "cldn4lfcy0002lg0835mekajd",
    "name": "fleek"
  },
  {
    "id": "cdawndf4fladfcfa2wnay8s25",
    "name": "My Project"
  }
]
```

## Get project

Use the `get` method to retrieve a `Project` by its `id`.

```typescript
const project = await fleekSdk.projects().get({
  id: 'clfk15m6p0002l608gvtp9gm5',
});
```

This returns a the project details:

```json
{
  "id": "clfk15m6p0002l608gvtp9gm5",
  "name": "My Project"
}
```
