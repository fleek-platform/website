---
order: 5
title: Domains
date: 2023-01-10
desc: Set up a custom domain for your Fleek site easily with our CLI guide. Add, verify, and manage effortlessly.
keywords: [services, documentation, getting started]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

# Domains

With Fleek Domains, you can create a custom web address for your site that reflects your brand or organization.

To get started, you should have a domain name registered and access to the DNS Settings. Once ready, you'll have the ability to add, list and manually very a domain on Fleek Domains.

## Add a custom domain

To add your domain using the Fleek Platform CLI, use the domains create command. It'll start a process to add, set up and verify a domain.

```sh
fleek domains create
```

The first step is to select the site you want to assign the custom domain. Since the Fleek Platform allows you to customize domains for Sites or Gateways used for other means such as storage, you have to select "Site".

```sh
? Select the domain name purpose: ›
❯   Site
    Private Gateway
```

Then, you have to choose the site to add the domain.

```sh
> fleek domains create
✔ Choose site to add domain to › fleek-demos-blog-2
```

After selecting the site, you'll be asked to input the custom domain address. Ensure this is the domain you own or have DNS control over.

```sh
✔ Enter domain name (eg. example.com) … fleekdemos.online
✅ Success! The domain "fleekdemos.online" was successfully added.
```

Now that the domain is set up, you'll have to arrange the correct DNS records to verify your domain directs to the CDN pull zone. The CLI will provide you with the DNS records required to add to your domain.

```sh
> fleek domains create
> Update DNS records for "fleekdemos.online":
> CNAME @ <your pullzone>
```

Once you've set up your DNS records, you should validate them. To start this process, press any key in the CLI. This will activate a verification procedure to ensure the DNS records are properly configured.

```sh
> Press any key as soon as you configure your domain provider for verification.
✅ Success! The domain "fleekdemos.online" was verified.
```

That's it! Once DNS propagation is complete, your domain will be ready to use.

## List domains

You can always list the domains you have added to your site. To do this, use the domains **list** command. This will list all the domains you've added to your site and show the status of each.

```sh
fleek domains list
```

It'll output a table containing the list details.

```sh
Hostname             Created At                   Verified
----------------------------------------------------------
fleekdemos.online    2023-03-01T09:43:09.698Z     ✅
```

## Domain details

You can check the details for the configuration of your domain at any moment, this can help if you are changing DSN provider for example.

```sh
fleek domains detail fleekdemos.online
```

To do this, you can use the domains details command. We use the domain name as an identifier for the domain to avoid using internal IDs.

```sh
Hostname           CreatedAt                 Verified
-----------------------------------------------------
fleekdemos.online  2023-03-01T09:43:09.698Z  ✅

> Configure your domain provider according to following table:
Type   Name      Value
----------------------------------------------------
CNAME  hostname  <your pullzone>
```

## Manual verification

If you encounter difficulties verifying your domain during the setup process, you can do so manually.

```sh
fleek domains verify fleekdemos.online
```

To proceed, use the domains verify method. This will display the domains available for verification, allowing you to choose the one you wish to verify.

```sh
✔ Choose a domain you want to verify › fleekdemos.online

✅ Success! The domain "fleekdemos.online" was verified.
```

## Delete a domain

To delete domains, you can run the domains delete command. This will prompt the wizard for confirmation before deleting the domains.

```sh
fleek domains delete
```

You should expect to receive a confirmation message.

```sh
✔ Enter domain name (eg. example.com) … fleekdemo.online

✅ Success! The domain "fleekdemo.online " was deleted.
```
