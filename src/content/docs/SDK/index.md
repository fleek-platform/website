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

## Install

The SDK is available as an NPM package.

```sh
npm install @fleek-platform/sdk
```

## Authentication

Authentication requires providing an access token. There are currently two methods available: the ApplicationAccessTokenService and PersonalAccessTokenService. These services differ in their application, depending on whether you're deploying them in a client-side or server-side context.

### Available Methods

The table below outlines the available methods in the left column alongside the corresponding target environments for Web or Node.js applications.

```sh
Method                          Web       Node
PersonalAccessTokenService      ❌        ✅
ApplicationAccessTokenService   ✅        ❌
```

## Multiple Instance Support

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

### Usage Example

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

Application credentials are the access tokens to your project. They are used to authenticate your application with Fleek's services. It's feasible to produce multiple application credentials for a single project, each having different permissions.

You can create an application token following the steps [here](/docs/platform/projects#application-credentials).

### Parameters

```sh
Parameters                           Description
--------------------------------------------------
clientID                             The Client ID generated in the applications CLI service
authAppsServiceUrl (Optional)        The Applications Authentication Service URL
```

This method of authentication relies on a `clientId` which can be obtained after creating an application from the CLI [application create](/docs/cli/applications/#create) command.

### Usage Example

```typescript copy
import { FleekSdk, ApplicationAccessTokenService } from '@fleek-platform/sdk';

const applicationService = new ApplicationAccessTokenService({
  clientId: <CLIENT_ID>,
});

const fleekSdk = new FleekSdk({
  accessTokenService: applicationService
});
```
