---
order: 0
title: Quick start
date: 2023-01-10
desc: Find all the information on how to set up and start interacting with Fleek's Command Line Interface (CLI). Install, authenticate, and manage projects directly from your command line.
keywords: [services, documentation, getting started]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

# Quick start

The Fleek Platform CLI is a command-line interface, that let users interact with all our product services directly from your terminal. A user can login, deploy sites, interact with our storage service and much more. It's the simplest and fastest way to get up and running with Fleek Platform from scratch.

In the next steps, we’re going to install the CLI, create a project and deploy a simple page.

## Install

To install the CLI launch your terminal and run:

```sh
# You need to have Nodejs >= 18.18.2
npm install -g @fleek-platform/cli
```

Once installed, you can use the Fleek Platform CLI from any directory on your system.

For example, to confirm the installation, you can run:

```sh
fleek version
```

## Usage

Get all the available command list by running:

```
fleek
```

The Fleek Platform CLI employs the following command execution order:

```sh
fleek <service> <command> [options and parameters]
```

To list all sub-commands for a service, append help to your desired command. Here are some examples:

```sh
fleek help
fleek <service> help
fleek <service> <command> help
```

## Login

All the services in the Fleek CLI require authentication. To utilize any of our services you must login into Fleek Platform.

Setup or login into a Fleek account by running the command:

```sh
fleek login
```

Once logged-in to the Fleek Platform via the browser, go back to the terminal.

```sh
🤖 Please follow the link to log in to Fleek Platform.
🔗 https://app.fleek.xyz/login/xxxxxxx
```

Once successful, you'll receive a confirmation message.

```sh
✅ Success! You are now logged in to the Fleek Platform.
```

When ready to log out, you can run the command:

```sh
fleek logout
```

## Create a project

Start a new project for deploying a basic page. Run:

```sh
fleek projects create
```

Remember, you can always find help for any service command by appending **help**. For example:

```sh
fleek projects help
```

## Set up a simple page

Before moving forward, we need a page to deploy. Create a new directory in your preferred location. For illustration, we've opted for the directory **~/fleek-quick-start**, but you can choose whichever is your preference.

```sh
mkdir ~/fleek-quick-start
```

Change directory to the newly created directory.

```sh
cd ~/fleek-quick-start
```

Create a simple html page inside ~/fleek-quick-start.

```sh
echo "Hello world" > index.html
```

Next, we're going to set up a Fleek site to deploy our simple html page.

## Setup a Fleek site

Before deploying your page to Fleek Platform, you need to set up a site. Execute the command and follow the CLI instructions.

```sh
fleek sites init
```

You'll have to enter a name for the new site.

```sh
? Enter the name of your new site:
```

In the context of Node.js, you'll need to specify the directory from which the site will be deployed. You might already be familiar with popular JavaScript frameworks, which often use the build output directories, such as **dist** or **output**.

For our example, we'll input . (a dot), indicating the current directory since we've navigated to ~/fleek-quick-start.

```sh
Please specify the directory containing the site files to be uploaded > .
```

Typically, most JavaScript projects have a build command to generate the distribution files, e.g. npm run build. We can reply “n”, as we’ll deploy a simple html page.

```sh
Would you like to include the optional "build" command? › n
```

When you're presented with the choice of format for the Fleek Site configuration, select your preferred option. For simplicity, we're opting for JSON in this case.

```sh
Select a format for saving the site's configuration > JSON
```

If the operation is successful, expect to see a confirmation message.

```sh
✅ Success! The Fleek configuration file has been successfully saved
```

## Deploy the Fleek Site

To deploy, run the sites deploy command in the directory containing your site setup.

```
fleek sites deploy
```

Expect a confirmation message once the operation is successfully completed.

```
> Site IPFS Content Identifier (CID): xxxxx
💡 You can access it through the gateway:
🔗 https://<SLUG>.on-fleek.app
```

Another option is to configure your own custom gateway or choose from various gateways, including the main IPFS gateway at https://ipfs.io/ipfs/ YOUR-CID.

## Logout

To log off at any moment, simply proceed as follows:

```sh
fleek logout
```

```
✅ Successfully logged out.
```
