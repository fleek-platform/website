---
order: 2
title: Installation
date: 2023-01-10
description: Find all the information on how to set up and start interacting with Fleek's Command Line Interface (CLI). Install, authenticate, and manage projects directly from your command line.
keywords: [services, documentation, getting started]
tags:
- Accounts
- Guide
- Learn
- Fleek
---

# Installation

This package requires a minimum of Node.js 18. To install the CLI, run:

```bash copy
npm install -g @fleekxyz/cli
```

:::info

Incase this returns an access error (EACCES), run:
```bash copy
sudo npm install -g @fleekxyz/cli
```

:::

### Usage

The Fleek CLI command has the following structure:

```bash copy
fleek <service> <command> [options and parameters]
```

To view all available services and commands, you can use:
```bash copy
fleek help
```

### Authentication

All the services in the Fleek CLI require authentication. To do this, you have to run:

```bash copy
fleek login
```
This will trigger the login process, and we use Web3Auth to manage authentication. Once the flow is completed, you will be greeted like this:

```bash copy
fleek login
🔗 Opening browser on https://app.fleek.xyz/login.html?verificationSession=... 
🧑‍💻 Please login to continue
✅ Successfully logged in.
```

If at any point you want to log out, you can do so:

```bash copy
fleek logout
✅ Successfully logged out.
```

### Projects

As explained [here](/docs/Projects), to interact with services, you need to have a project. This can be created and managed via the CLI too!

To create a project, you can do it like this:

```bash copy
fleek projects create
$ ? Enter project name: › 
```

When you enter a correct name, you will be automatically switched to it. Additionally, you can switch between different projects using the 'switch' command, which will prompt a selector:

```bash copy
fleek projects switch
❯   project-1
    project-2
    project-3
```
