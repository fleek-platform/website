---
draft: false
title: SDK
sidebarCollapsible: false
sidebar_position: 8
date: 2023-01-10T09:00:00.000+00:00
description: The Fleek SDK is a set of tools that allow you to interact with Fleek’s services. It’s composed of a set of libraries that you can leverage to build your own application on top of Fleek’s services.
category: Documentation
keywords: [services, documentation, getting started]
tags:
- Accounts
- Guide
- Learn
- Fleek
---

## Introduction

The Fleek SDK is a set of tools that allow you to interact with Fleek’s services. It’s composed of a set of libraries that you can leverage to build your own application on top of Fleek’s services.

All of the code snippets provided in these docs are based on Typescript. We strongly encourage Typescript to get the most out of the type of safety that the SDK provides.

## Installation

The SDK is available as an npm package.

```bash copy
pnpm install @fleekxyz/sdk
```

```bash copy
npm install @fleekxyz/sdk
```

```bash copy
yarn install @fleekxyz/sdk
```

## Authentication
To authenticate, you must provide an `Access Token Service`. Currently, there are two `Access Token Service` available `PersonalAccessTokenService` and `ApplicationAccessTokenService`, but we’re working on adding more services.

### Available Authenticaition options

|*Auth method*|*Web Environment*|*Node Environment*|
|:----------:|:-----------:|:----:|
|`PersonalAccessTokenService`|❌|✅|
|`ApplicationAccessTokenService`|✅|❌|

### Updating `AccessTokenService`

If you need to access multiple projects or switch between them, you will need to create a new instance of the `SDK` with the desired `projectID`

```typescript copy
import { FleekSdk, PersonalAccessTokenService } from '@fleekxyz/sdk';

const newAccessTokenService = new PersonalAccessTokenService({
	personalAccessToken: '<your-personal-access-token>',
	projectId: '<your-project-id>',
})

const fleekSdk = new FleekSdk({ accessTokenService: newAccessTokenService });
```

### Personal Access Token Service

The personal access token (PAT) is ment to be used in Backend Node.js environment and should be kept private, you should use an environment variable to store it.

#### *Parameters*
  |*parameters*|*description*|
  |:----------:|:-----------:|
  |`personalAccessToken`|Private PAT, generated from the `CLI`.|
  |`projectId` (Optional)|Project Id is required for IPFS and IPNS service |

  This method of authentication relies on a `personalAccessToken` which can be obtained from the Fleek CLI:

  ```bash copy
  fleek pat create
  ```

#### Example
```typescript copy
import { FleekSdk, PersonalAccessTokenService } from '@fleekxyz/sdk';

const patService = new PersonalAccessTokenService({
    personalAccessToken: '<your-pat>',
    projectId: '<your-project-id>' // Optional
})

const fleekSdk = new FleekSdk({ accessTokenService: patService })
```

### Application Access Token

Application credentials are the keys to your project. They are used to authenticate your application with Fleek's services. You can create multiple application credentials for a single project, and each application credential can have different permissions.

You can create an application token following the steps [here](/docs/Projects/application-credentials).

### *Parameters*
|*parameters*|*description*|
|:----------:|:-----------:|
|`clientId`|Client Id, generated from the `CLI`.|
|`authAppsServiceUrl` (Optional)| |

This method of authentication relies on a `clientId` which can be obtained after creating an application from the CLI:

```shellscript filename="Create an Application and Generating a ClientId" copy
> fleek applications create
> ✔ Type name of new application: … app
> ✔ Type white label domains separated by comma … your-app-domain.com
> Success! Successfully created. Your new application has client's ID: client_FYMego6wIogtm36sUFQb
```

### Example
```typescript copy
import { FleekSdk, ApplicationAccessTokenService } from '@fleekxyz/sdk';

const applicationService = new ApplicationAccessTokenService({
    clientId: '<your-client-id>',
})

const fleekSdk = new FleekSdk({ accessTokenService: applicationService })
```
