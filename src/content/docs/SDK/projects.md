---
draft: false
title: Projects 
sidebarCollapsible: false
sidebar_position: 2
date: 2023-01-10T09:00:00.000+00:00
description: Create, list, and retrieve project details using the SDK, ensuring seamless integration with IPFS storage & IPNS services.
category: Documentation
keywords: [services, documentation, getting started]
tags:
- Accounts
- Guide
- Learn
- Fleek
---

Some services, such as **IPFS storage** & **IPNS** will require you to authenticate with a `projectId` to interact with them. You can use the SDK to obtain the `projectId` required to use the services that need it.

## Create a project

```typescript copy
const projectId = await fleekSdk.projects().create({ name: 'My Project' });
```

## List projects

```typescript copy
const projects = await fleekSdk.projects().list();
```
This returns a list of projects:
```json
[
    { id: 'cldn4lfcy0002lg0835mekajd', name: 'fleek' },
    { id: 'cdawndf4fladfcfa2wnay8s25', name: 'My Project' },
]
```

## Get project

 ```typescript copy
const project = await fleekSdk.projects().get({ id: 'clfk15m6p0002l608gvtp9gm5' })
```
This returns a the project details:
```json
{ id: 'clfk15m6p0002l608gvtp9gm5', name: 'My Project' } 
```

