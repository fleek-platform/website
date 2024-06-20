---
order: 5
title: Gateway
date: 2023-01-10
desc: Learn how to set up and configure a private gateway on Fleek, serving content from your storage via a custom domain.
keywords: [services, documentation, getting started]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

# Gateways

A gateway is a service offered by the Fleek Platform that enables you to deliver your content to your users via a custom domain. This means you can serve your content through a domain like **https://mydomain.com** rather than **https://ipfs.io/ipfs/<hash>**.

Gateways are private since they only permit files pinned in the user account to be served. By allowing you to set up a custom domain, it adds an additional branding opportunity and control of your app business.

## Creating a private gateway

To create a private gateway you will need to have a Fleek project and a custom domain. Currently we are making mandatory that each private gateway has at least one custom domain associated with it to avoid abuse.

To create a gateway using the CLI you will need to run the following command:

```sh
fleek gateways create
```

Then, you have to follow the wizard:

```sh
✔ Enter private gateway name (eg. first): … my-first-gateway
✅ Success! The private gateway "my-first-gateway" was created.
```

Next, you'll have to set up the correct DNS Records to make sure that your domain points to the CDN pull zone. Should be very familiar with custom [domain](docs/cli/domains/) configuration.

The CLI will provide you with the DNS records you need to add to your domain DNS settings.

```sh
> Update DNS records for "ipfs.my-gateway.online":
> CNAME @ <your-pullzone-id>.fleekcdn.xyz
```

Once you've set up your DNS records, you should validate them. To start this process, press any key in the CLI. This will activate a verification procedure to ensure the DNS records are properly configured.

```sh
> Press any key as soon as you configure your domain provider for verification.
✅ Success! The Domain "ipfs.my-gateway.online" was verified.
```

Now that your domain is verified, you can start using it to serve your content. For example, Fleek Storage content will now appear under **ipfs.my-gateway.online/ipfs/<cid>**.

## Gateway Settings

To access the Gateway settings, use the **gateways detail** command.

```sh
fleek gateways detail
```

```sh
✔ Choose existing private gateway: › beefy-clever-autumn

ID                         Slug                 Name                    Created At
------------------------------------------------------------------------------------------------
cljqwfv790002lc08g6nmf8e0  beefy-clever-autumn  my-first-gateway  2023-07-06T08:41:58.963Z

> You can access your content through domains bellow:
> https://ipfs.my-gateway.online/ipfs/<cid>
```

## Adding a custom domain to an existing gateway

To add a domain to an existing gateway you will need to run the following command:

```sh
fleek domains create
```

Next, you'll have to select the private gateway option, the gateway you want to assign it to, and respond to the wizard prompts.

```sh
✔ Choose what do you want domain create for: › Private gateway
✔ Choose existing private gateway: › my-first-gateway
✔ Enter domain name (eg. example.com): … my-new-domain-ipfs.my-gateway.online
```

The maining process should be familiar to the previous steps.

1. Creates the domain

```sh
> Success! Domain "my-new-domain-ipfs.my-gateway.online" successfully created.
```

2. Requests for the DNS record settings update

```sh
> Update DNS records for "my-new-domain-ipfs.my-gateway.online":
> CNAME @ <your-pullzone-id>.fleekcdn.xyz
> Press any key as soon as you configure your domain provider for verification.
```

3. Once verified, provides a confirmation message

```sh
> Success! Domain "my-new-domain-ipfs.my-gateway.online" was verified.
```
