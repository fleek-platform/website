---
order: 5
title: Domains
date: 2023-01-10
description: Set up a custom domain for your Fleek site easily with our CLI guide. Add, verify, and manage effortlessly.
category: Documentation
keywords: [services, documentation, getting started]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

### Introduction

In this documentation, we will guide you through the process of setting up a custom domain for your Fleek site. With a custom domain, you can create a unique web address for your site that reflects your brand or organization.

To get started, you'll need a custom domain. Once you have that, you can follow our step-by-step guide to configure your domain and connect it to your Fleek site.

We'll cover the following topics:

- Adding a domain to Fleek
- Listing your current domains
- Manually Verifying your domain

### Add a custom domain

The first step is to add a domain. To do this, you will need a project and a site to configure it on. Once you have these, you can choose from the different interfaces available to set up the domain.

To add your domain using the command-line interface (CLI), use the `domains create` method. This will trigger a wizard to add, set up, and verify your domain.

The first step is to select the site you want to add the domain to. You can choose from the list of sites you have access to.

```shellscript filename="Adding a Domain" copy
> fleek domains create
WARN! Fleek CLI is in beta, use it at your own discretion
✔ Choose site to add domain to › fleek-demos-blog-2
```

Once you have selected the site, you will be prompted to enter the domain you want to add.

```shellscript filename="Adding a Domain" copy
> fleek domains create
WARN! Fleek CLI is in beta, use it at your own discretion
✔ Choose site to add domain to › fleek-demos-blog-2
✔ Enter domain name (eg. example.com) … fleekdemos.online
> Success! Domain "fleekdemos.online" successfully added.
```

Now that the domain is created you will need to set up the correct DNS records to make sure that your domain points to the CDN pull zone. The CLI will provide you with the DNS records you need to add to your domain.

```shellscript filename="Adding a Domain" copy
> fleek domains create
WARN! Fleek CLI is in beta, use it at your own discretion
✔ Choose site to add domain to › fleek-demos-blog-2
✔ Enter domain name (eg. example.com) … fleekdemos.online
> Success! Domain "fleekdemos.online" successfully added.
> Update DNS records for "fleekdemos.online":
> CNAME @ <your pullzone>
> Press any key as soon as you configure your domain provider for verification.
```

If you need help configuring your DNS records, you can find more information in our [DNS records guide](/guides/dns-records).

Once you have confured your DNS records, you can verify your domain. To do this, you will need to press any key in the CLI. This will trigger a verification process that will check if the DNS records are correctly configured.

```shellscript filename="Adding a Domain" copy
> fleek domains create
WARN! Fleek CLI is in beta, use it at your own discretion
✔ Choose site to add domain to › fleek-demos-blog-2
✔ Enter domain name (eg. example.com) … fleekdemos.online
> Success! Domain "fleekdemos.online" successfully added.
> Update DNS records for "fleekdemos.online":
> CNAME @ <your pullzone>
> Press any key as soon as you configure your domain provider for verification.
> Success! Domain "fleekdemos.online" was verified.
```

That is it! Once the DNS propagation is complete, your domain will be ready to use.

### List domains

At any moment you can list the domains you have added to your site.

To do this, you can use the `domains list` method. This will list all the domains you have added to your site and the status of each.

```shellscript filename="Listing Domains" copy
> fleek domains list
WARN! Fleek CLI is in beta, use it at your own discretion
Hostname           Created At                 Verified
------------------------------------------------------
fleekdemos.online  2023-03-01T09:43:09.698Z  ✔
```

### Domain details

You can check the detils for the configuration of your domain at any moment, this can help if you are changing DSN provider for example.

To do this, you can use the `domains details` method where you need to pass the domain name as a parameter. We use the domain name as an identifier for the domain to avoid using internal IDs.

:::info

This command might prompt you to select a listed domain.

:::

```shellscript filename="Listing Domains" copy
> fleek domains detail fleekdemos.online
WARN! Fleek CLI is in beta, use it at your own discretion
Hostname           CreatedAt                 Verified
-----------------------------------------------------
fleekdemos.online  2023-03-01T09:43:09.698Z  ✔
> Configure your domain provider according to following table:
Type   Name      Value
----------------------------------------------------
CNAME  hostname  <your pullzone>
```

### Manual verification

If during the setup process you couldn't verify your domain, you can do it manually.

To do this, you can use the `domains verify` method. This will list the domains available for verification and you can select the one you want to verify.

```shellscript filename="Listing Domains" copy
> fleek domains verify fleekdemos.online
WARN! Fleek CLI is in beta, use it at your own discretion
✔ Choose a domain you want to verify › fleekdemos.online
> Success! Domain "fleekdemos.online" was verified.
```

### Delete a domain

To do this, you can use the `domains delete` method. This will prompt the wizzerd for domains deletion.

```shellscript filename="Listing Domains" copy
> fleek domains delete
WARN! Fleek CLI is in beta, use it at your own discretion
✔ Enter domain name (eg. example.com) … fleekdemo.online
> Success! Domain "fleekdemo.online " successfully removed.
```
