---
order: 0
title: Overview
date: 2023-01-10
desc: The Fleek SDK is a set of tools that allow you to interact with Fleek’s services. It’s composed of a set of libraries that you can leverage to build your own application on top of Fleek’s services.
keywords: [services, documentation, getting started]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

# Overview

The Fleek Platform SDK is a TypeScript library that allows you to interact with Fleek’s services. It’s composed of methods that you can leverage to build your own application on top of Fleek’s services.

:::warn
Fleek.co users migrating to the new Fleek Platform, please check the [migrating from Fleek.co to Fleek-platform SDK](#migrating-from-fleekco-to-fleek-platform-sdk) section.
:::

## Install

The SDK is available as an NPM package.

```sh
npm install @fleek-platform/sdk
```

## Authentication

Authentication requires providing an access token. There are currently two methods available: the ApplicationAccessTokenService and PersonalAccessTokenService. These services differ in their application, depending on whether you're deploying them in a client-side or server-side context.

### Available methods

The table below outlines the available methods in the left column alongside the corresponding target environments for Web or Node.js applications.

```sh
Method                          Web       Node
PersonalAccessTokenService      ❌        ✅
ApplicationAccessTokenService   ✅        ❌
```

## Multiple instance support

You can create concurrent instances by providing the Personal Access Token and Project ID on library instantiation. This is important for navigating between projects.

In the example below, we share a Personal Access Token (PAT) and a different Project ID (PID) for each new instance of FleekSdk.

```typescript
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';

const accessTokenServiceA = new PersonalAccessTokenService({
  personalAccessToken: <PAT>,
  projectId: <PROJECT_ID_A>,
});

const accessTokenServiceB = new PersonalAccessTokenService({
  personalAccessToken: <PAT>,
  projectId: <PROJECT_ID_B>,
});

const fleekSdkInstanceA = new FleekSdk({
  accessTokenService: accessTokenServiceA,
});

const fleekSdkInstanceB = new FleekSdk({
  accessTokenService: accessTokenServiceB,
});
```

Instance method calls are tied to the Project ID designated during the Fleek Platform SDK instantiation. For example, files added to the storage service will appear under the matching instance Project ID.

## PersonalAccessTokenService

The personal access token (PAT) is intended for use in a Backend Node.js environment and should be kept private. For example, you can store the token in an environment variable, but you wouldn't want to commit the token into a repository history.

### Parameters

```sh
Parameters                           Description
--------------------------------------------------
personalAccessToken                  The Private PAT obtained from user account dashboard or CLI
projectID (Optional)                 A Project ID required for IPFS and IPNS services
graphqlServiceApiUrl (Optional)      The GraphQL Service API URL, which defaults to the main Fleek Platform GraphQL Service API
```

This method of authentication relies on a `personalAccessToken` which can be obtained from the CLI [pat create](/docs/cli/pat) command.

### Usage example

```typescript
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';

const personalAccessTokenService = new PersonalAccessTokenService({
  personalAccessToken: <PAT>,
  projectId: <PROJECT_ID>, // Optional
});

const fleekSdk = new FleekSdk({
  accessTokenService: personalAccessTokenService,
});
```

## ApplicationAccessTokenService

Application credentials are the access tokens to your project. You can use this authentication method if you want to upload files or directories
to the Fleek Storage. For other SDK methods you need to use the PersonalAccessTokenService.

You can create an application token following the steps [here](/docs/platform/projects#application-credentials).

### Parameters

```sh
Parameters                           Description
--------------------------------------------------
clientID                             The Client ID generated in the applications CLI service
authAppsServiceUrl (Optional)        The Applications Authentication Service URL
```

This method of authentication relies on a `clientId` which can be obtained after creating an application from the CLI [application create](/docs/cli/applications/#create) command.

### Usage example

```typescript copy
import { FleekSdk, ApplicationAccessTokenService } from '@fleek-platform/sdk';

const applicationService = new ApplicationAccessTokenService({
  clientId: <CLIENT_ID>,
});

const fleekSdk = new FleekSdk({
  accessTokenService: applicationService
});
```

## Migrating from Fleek.co to Fleek Platform SDK

The Fleek.co's [SDK](https://www.npmjs.com/package/@fleekhq/sdk) and [Storage](https://www.npmjs.com/package/@fleekhq/fleek-storage-js) features are part of Fleek Platform SDK, which brings enhanced performance, new features, and broader support for all your development needs.

Learn how to migrate to Fleek Platform with these steps or consult our [SDK docs](/docs/sdk) for a deep dive.

### Fleek Storage JS

If you use [Fleek Storage Js](https://www.npmjs.com/package/@fleekhq/fleek-storage-js) to interact with Fleek Storage, migrate to the Fleek Platform, implementing the following changes:

```js
# Old syntax
import { Fleek } from '@fleekhq/sdk';

const sdk = new Fleek({
  apiKey: '<YOUR-API-KEY>',
  assetCanisterId: '<YOUR-ASSET-CANISTER-ID>',
});
```

```js
# New syntax
import { FleekSdk, ApplicationAccessTokenService } from '@fleek-platform/sdk';

# Using the Application Token
# Learn more about the available token services
# by following the link below
const applicationService = new ApplicationAccessTokenService({
  clientId: <APPLICATION-CLIENT-ID>,
});

const fleekSdk = new FleekSdk({
  accessTokenService: applicationService
});
```

Learn more by reading the SDK documentation [here](/docs/sdk).

### Fleek.co's SDK

If you use [Fleek.co's SDK](https://www.npmjs.com/package/@fleekhq/sdk) to interact with Fleek APIs and Internet Computer, migrate to the Fleek Platform, implementing the following changes:

```js
# Old syntax
import { Fleek } from '@fleekhq/sdk';

const sdk = new Fleek({
  apiKey: '<YOUR-API-KEY>',
  assetCanisterId: '<YOUR-ASSET-CANISTER-ID>',
});

# Using IPFS
await sdk.ipfs().add(...);
```

```js
# New syntax
import { FleekSdk, ApplicationAccessTokenService } from '@fleek-platform/sdk';

# Using the Application token service
# Learn more about the available token services
# by following the link below
const applicationService = new ApplicationAccessTokenService({
  clientId: <APPLICATION-CLIENT-ID>,
});

const fleekSdk = new FleekSdk({
  accessTokenService: applicationService
});

# Using Storage
# It'll default to IPFS
const result = await fleekSdk.storage().uploadFile({
  file,
  onUploadProgress,
});
```

Support for Internet Computer asset canister has been deprecated. You must use the Fleek Platform [Storage](/docs/sdk/storage), which includes similar methods as follows:

```js
# Deprecated feature
const items = await sdk.assets().listAll();
const item = await sdk.assets().get(key);
```

```js
# Storage feature
const items = await fleekSdk.storage().list();

# Get by CID
const item = await fleekSdk.storage().get({ cid });
```

Learn more about [Storage](/docs/sdk/storage) and feature coverage by reading the SDK's Storage documentation [here](/docs/sdk/storage).
