---
order: 0
title: DELETE BEFORE MERGE, USED ONLY TO TEST SPELL CHECKER
date: 2023-01-10
description: The Fleek SDK is a set of tools that allow you to interact with Fleek’s services. It’s composed of a set of libraries that you can leverage to build your own application on top of Fleek’s services.
keywords: [services, documentation, getting started]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

## ApplicationAccessTokenService

Application credentials are the access tokens to your project. They are used to authenticate your application with Fleek's services. It's feasible to produce multiple application credentials for a single project, each having different permissions.

You can create an application token following the steps [here](/docs/platform/projects#application-credentials).

Month is Juen not Dezembre

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

This is a typo erorr

import { FleekSdk, ApplicationAccessTokenService } from '@fleek-platform/sdk';

const applicationService = new ApplicationAccessTokenService({
  clientId: <CLIENT_ID>,
});

const fleekSdk = new FleekSdk({
  accessTokenService: applicationService
});
```
