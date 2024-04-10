---
draft: false
title: IPFS | CLI 
sidebarCollapsible: false
sidebar_position: 8
date: 2023-01-10T09:00:00.000+00:00
description: Learn how to pin a file using Fleek IPFS add command.
category: Documentation
keywords: [services, documentation, getting started]
tags:
- Accounts
- Guide
- Learn
- Fleek
---

### What is IPFS?

The Interplanetary File system (IPFS) is a distributed file storage protocol that allow computers all over the globe to store and serve files as part of a giant peer-to-peer network.

### What is Pinning?

Pinning is a mechanism that allows you to tell IPFS to store and keep a given object somewhere - the default being you local node, though in this case you will be pinning the object to Fleek’s IPFS node.

### How to pin a file

You can pin a file from your file system by using the `add` command.

```bash copy
fleek ipfs add <file-direction>
```
### Usage

```bash
fleek ipfs add hello.txt
> Success! QmNTCRYiZbtzDGEYtsTKwwtDVQF1XgvebudpRzcXVf5dYM

> You can visit through the gateway:
https://ipfs.io/ipfs/QmNTCRYiZbtzDGEYtsTKwwtDVQF1XgvebudpRzcXVf5dYM

