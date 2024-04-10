---
draft: false
title: IPNS | CLI 
sidebarCollapsible: false
sidebar_position: 8
date: 2023-01-10T09:00:00.000+00:00
description: Learn to create, publish, and manage IPNS records on Fleek, facilitating dynamic updates to IPFS content. Master the steps with our CLI guide from authentication to resolving records.
category: Documentation
keywords: [services, documentation, getting started]
tags:
- Accounts
- Guide
- Learn
- Fleek
---

### What is IPNS?

The InterPlanetary Name System (IPNS) is a system for creating mutable pointers to CIDs known as names or IPNS names. IPNS names can be thought of as links that can be updated over time, while retaining the verifiability of content addressing. In this case in particular, they are mostly used to represent IPFS files (through their hashes).

If you want to know more about IPNS and how it works you can read it [here](https://docs.ipfs.tech/concepts/ipns/#interplanetary-name-system-ipns)

### Creating an IPNS record

Creating an IPNS record refers to the creation of an IPNS record and signing it with a private key. Note: Currently Fleek holds the private key with wich all records ar being sigend, in future iterations there will be an option for the user to manage their own keys.

To create an IPNS record using the CLI you need to be authenticated, with a project selected and use the `create` command.

You can optionally associate an IPNS record to a Fleek site, this means everytime you deploy your site the IPNS record will be updated so it points to the site CID.

```shellscript filename="Creating an IPNS record with Site"  copy
> fleek ipns create
> ✔ Do you want to assign new IPNS record to the site? … yes
> ? Choose existing site: ›
> ❯   next-site
> Success! IPNS record created.
> k51qzi5uqu5dh37ejd3k1mp4tcvwvrmapdfflramb7jki3h3fx2yxea1iahzsw
> This record will be automatically published when site next-site will be deployed.
> https://ipfs.io/ipns/k51qzi5uqu5dh37ejd3k1mp4tcvwvrmapdfflramb7jki3h3fx2yxea1iahzsw
```

If you don't want to associate the IPNS record with a site, you can use it freely to point to any valid IPFS CID.


```shellscript filename="Creating an IPS record"
❯ fleek ipns create
> ✔ Do you want to assign new IPNS record to the site? … no
> Success! IPNS record created.
> k51qzi5uqu5dlnp70jxn79ncjowtomxcg6h0nkhspjzibfx83aqiozdg75oyrk
> You can now publish this record with the following command:
> fleek ipns publish --name k51qzi5uqu5dlnp70jxn79ncjowtomxcg6h0nkhspjzibfx83aqiozdg75oyrk --hash <ipfsCid>
> https://ipfs.io/ipns/k51qzi5uqu5dlnp70jxn79ncjowtomxcg6h0nkhspjzibfx83aqiozdg75oyrk
```

After creating the IPNS you can update it with a CID and publish it to the different nodes so it can be resolved.

### Publishing a record

Publishing an IPNS record means advertising it so that other nodes can resolve it, thus mapping the record to a CID so that the gateway can resolve to it and direct user to the set content.

To publish an IPNS record you can do as follows

To publish an IPNS record with a CID using the CLI you need to be authenticated, with a project selected and use the `publish` command.
    
```shellscript filename="Creating an IPNS record" copy
> fleek ipns publish k51qzi5uqu5didozh8jmvbnowwj2d545yacagcply19yvjz8rhn0i1hrbw2thy QmRG4xcsmoZuXqKuPz3uVBgvo3GZ6k1kLZWhmvzuKtDr9s
WARN! Fleek CLI is in beta phase, use it under your own responsibility
> IPNS record published. You can visit it here:
https://ipfs.io/ipns/k51qzi5uqu5didozh8jmvbnowwj2d545yacagcply19yvjz8rhn0i1hrbw2thy
WARN! IPNS propagation can take up to 30 minutes.
```

### Resolving an IPNS record

Fleek comes with a built in resolver for IPNS that allows you to get the CID based on an IPNS record.

You can use the resolver to see if what is mapped to a record (yours or someones elses).

To resolve an IPNS record using the CLI you need to be authenticated, with a project selected and use the `resolve` command.
    
```shellscript filename="Creating an IPNS record" copy
> fleek ipns resolve k51qzi5uqu5didozh8jmvbnowwj2d545yacagcply19yvjz8rhn0i1hrbw2thy
> Success! /ipfs/QmRG4xcsmoZuXqKuPz3uVBgvo3GZ6k1kLZWhmvzuKtDr9s
```

### Listing records

If at any time you want to check all the IPNS records that were created / published with this project you can do so

To list all the IPNS record using the CLI you need to be authenticated, with a project selected and use the `list` command.

```shellscript filename="Creating an IPNS record" copy
> fleek ipns list

id                         name                                                            hash                                          
-----------------------------------------------------------------------------------------------------------------------------------------   
clcuq190y0000jt08mpjw7pdz  k51qzi5uqu5didozh8jmvbnowwj2d545yacagcply19yvjz8rhn0i1hrbw2thy  QmRG4xcsmoZuXqKuPz3uVBgvo3GZ6k1kLZWhmvzuKtDr9s
```

