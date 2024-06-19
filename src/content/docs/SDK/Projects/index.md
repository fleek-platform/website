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

Certain services, including IPFS storage and IPNS, require authentication with a projectId to interact with them. The SDK makes it easy to get the projectId needed for the services that call for it.

## Create a project

```typescript
const projectId = await fleekSdk.projects().create({
  name: 'My Project',
});
```

## List projects

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
