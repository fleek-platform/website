---
order: 5
title: Gateway
date: 2023-01-10
description: Learn how to set up and configure a private gateway on Fleek, serving content from your storage via a custom domain.
keywords: [services, documentation, getting started]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

# Gateways

## Creating a private gateway

To create a private gateway you will need to have a Fleek project and a custom domain. Currently we are making mandatory that each private gateway has at least one custom domain associated with it to avoid abuse.

To create a gateway using the CLI you will need to run the following command:

```shellscript filename="Creating a Gateway" copy
> fleek gateways create
✔ Enter private gateway name (eg. first): … my-first-gateway
> Success! Private gateway "my-first-gateway" successfully created.
```

The next step will be to configure the custom domain for your gateway.

```shellscript filename="Configuring the custom domain" copy
> fleek gateways create
✔ Enter private gateway name (eg. first): … my-first-gateway
✔ Enter domain name (eg. example.com): … ipfs.my-gateway.online
> Success! Domain "ipfs.my-gateway.online" successfully created.
```

Now that the domain is created you will need to set up the correct DNS records to make sure that your domain points to the CDN pull zone. The CLI will provide you with the DNS records you need to add to your domain.

```shellscript filename="Setting up the DNS records" copy
> fleek gateways creat
✔ Enter private gateway name (eg. first): … my-first-gateway
✔ Enter domain name (eg. example.com): … ipfs.my-gateway.online
> Success! Domain "ipfs.my-gateway.online" successfully created.
> Update DNS records for "ipfs.my-gateway.online":
> CNAME @ <your-pullzone-id>.fleekcdn.xyz
> Press any key as soon as you configure your domain provider for verification.
```

If you need help configuring your DNS records, you can find more information in our [DNS records guide](/guides/dns-records).

Once you have confured your DNS records, you can verify your domain. To do this, you will need to press any key in the CLI. This will trigger a verification process that will check if the DNS records are correctly configured.

```shellscript filename="Finish" copy
> fleek gateways create
✔ Enter private gateway name (eg. first): … my-first-gateway
✔ Enter domain name (eg. example.com): … ipfs.my-gateway.online
> Success! Domain "ipfs.my-gateway.online" successfully created.
> Update DNS records for "ipfs.my-gateway.online":
> CNAME @ <your-pullzone-id>.fleekcdn.xyz
> Press any key as soon as you configure your domain provider for verification.
> Success! Domain "ipfs.my-gateway.online" was verified.
```

Now that your domain is verified, you can start using it to serve your content. The content will no appear under `ipfs.my-gateway.online/ipfs/<cid>`

## Exploring the private gateway settings

At any moment you can access the private gateway settings by running the following command:

```shellscript filename="Gateway settings" copy
> fleek gateways detail
WARN! Fleek CLI is in beta, use it at your own discretion
✔ Choose existing private gateway: › beefy-clever-autumn

ID                         Slug                 Name                    Created At
------------------------------------------------------------------------------------------------
cljqwfv790002lc08g6nmf8e0  beefy-clever-autumn  my-first-gateway  2023-07-06T08:41:58.963Z

> You can access your content through domains bellow:
> https://ipfs.my-gateway.online/ipfs/<cid>
```

## Adding a custom domain to an existing gateway

To add a domain to an existing gateway you will need to run the following command:

```shellscript filename="Adding a custom domain" copy
> fleek domains create
```

And you need to select the private gateway option and then select the gateway you want to add the domain to and then follow the wizard like in the creation.

```shellscript filename="Adding a custom domain" copy
> fleek domains create
✔ Choose what do you want domain create for: › Private gateway
✔ Choose existing private gateway: › my-first-gateway
✔ Enter domain name (eg. example.com): … my-new-domain-ipfs.my-gateway.online
> Success! Domain "my-new-domain-ipfs.my-gateway.online" successfully created.
> Update DNS records for "my-new-domain-ipfs.my-gateway.online":
> CNAME @ <your-pullzone-id>.fleekcdn.xyz
> Press any key as soon as you configure your domain provider for verification.
> Success! Domain "my-new-domain-ipfs.my-gateway.online" was verified.
```
