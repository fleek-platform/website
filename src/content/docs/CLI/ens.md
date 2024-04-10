---
draft: false
title: ENS | CLI 
sidebarCollapsible: false
sidebar_position: 8
date: 2023-01-10T09:00:00.000+00:00
description: Learn how to link your Fleek site to an ENS name with our step-by-step CLI guide. Set, verify, and manage your ENS domain.
category: Documentation
keywords: [services, documentation, getting started]
tags:
- Accounts
- Guide
- Learn
- Fleek
---

### Linking an ENS Name

To link a Fleek site to an ENS name, you will need to set the ENS name's content record to the IPFS hash or IPNS record of your site. This can be done via the ENS app.

To begin, you will need to acquire an [ENS](https://app.ens.domains/) domain of your liking, an Ethereum wallet (such as Metamask), and a enough ETH for a couple transactions.

Once you have your ENS domain, you will need to set up the content record to point to your site. To get the record you can use the CLI to configure the domain

To add an ENS domain to a site you have to run the `fleek ens create` command, remember that you need to have a site created before hand.

```shellscript filename="Adding an ENS" copy
> fleek ens create
WARN! Fleek CLI is in beta, use it at your own discretion
? Choose existing site: › 
❯   test-site-19-7
```

Once you have selected your site an IPNS record will be created (if the site does not have one). This record will be automatically updated after every deploy keepin the reference up to date.

After it you need to set up the ens record, where we run some validations to make sure the ENS record is valid.

```shellscript filename="Adding an ENS" copy
> fleek ens create
WARN! Fleek CLI is in beta, use it at your own discretion
? Choose existing site: › 
❯   test-site-19-7
✔  IPNS record created for site test-site-19-7
✔ Choose existing IPNS: › k51qzi5uqu5dlp68uef1tc9owq1p4hriilwi4egcjt6bn8qfi285zjv4d7e32v
? Enter ENS name (eg. example.eth): › my-ens.eth
```

Having validated the ENS name, you can now set up the `Content Hash` on the ENS app. The instructions will appear on the CLI.

```shellscript filename="Adding an ENS" copy
> fleek ens create
WARN! Fleek CLI is in beta, use it at your own discretion
? Choose existing site: › 
❯   test-site-19-7
✔  IPNS record created for site test-site-19-7
✔ Choose existing IPNS: › k51qzi5uqu5dlp68uef1tc9owq1p4hriilwi4egcjt6bn8qfi285zjv4d7e32v
? Enter ENS name (eg. example.eth): › my-ens.eth
> Please follow this link and update "Content Hash" record to ipns://k51qzi5uqu5dlp68uef1tc9owq1p4hriilwi4egcjt6bn8qfi285zjv4d7e32v
> https://app.ens.domains/my-ens.eth?tab=records
> Press any key as soon as you configure your ENS.
```

### List domains

At any moment you can list the ENS you have added to your site.

To do this, you can use the ```ens list``` method. This will list all the ENS you have added to your site and the status of each.

```shellscript filename="Listing ENS" copy
> fleek ens list
WARN! Fleek CLI is in beta, use it at your own discretion

ENS        Status   Created At              
--------------------------------------------
test.eth  VERIFIED  2023-07-25T09:34:37.891Z
```

### ENS details

You can check the detils for the configuration of your ENS at any moment, this can help if you are changing DSN provider for example.

To do this, you can use the ```ens detail``` method where you need to pass the ens name as a parameter. We use the ens name as an identifier for the ens to avoid using internal IDs.

```shellscript filename="ENS Details" copy
fleek ens detail
WARN! Fleek CLI is in beta, use it at your own discretion
✔ Choose existing ENS: › test.eth

ENS        Status   Created At              
--------------------------------------------
test.eth  VERIFIED  2023-07-25T09:34:37.891Z

> Configure your ENS according to following table:

Name          Value                                                                
-----------------------------------------------------------------------------------
Content Hash  ipns://k51qzi5uqu5dguh71fgl1wh25q155rpy36dltvjt67ccu3s7gzvyj3awqb2zvh
```
