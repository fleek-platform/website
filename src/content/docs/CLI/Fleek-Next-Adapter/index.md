---
order: 4
title: Fleek Next Adapter
date: 2023-01-10
desc: An overview of the Fleek Next Adapter, a tool that simplifies the deployment of Next.js applications to Fleek.
---

# Fleek Next adapter

:::info
Install the [Fleek CLI](/docs) and [login](/docs/cli/#login) locally on your machine to be able to deploy your application.
:::

The Fleek Next.js adapter enables seamless deployment of server-side Next.js applications on Fleek, allowing users to host fullstack Next.js apps straight from the terminal with optimized performance and edge compatibility. With this adapter, you can deploy your Next.js app as a [Fleek Function](/docs/cli/functions), leveraging the edge runtime of the [Fleek Network](/docs/infrastructure/) to power your application efficiently.

We are going to walk you through the adapter, features it offers, and how to deploy your Next.js app with it on Fleek. This adapter supports both JavaScript and TypeScript Next applications.

You need to make sure that your **Node.js version is at least 18, check that your [Fleek CLI version](/docs/cli/#install) is at least version 3 and that you have a working Next.js application setup**.

## Install

:::note
You can use pnpm as well for installation.
:::

To install the CLI open your terminal and run the command below:

```sh
# Using npm
npm install @fleek-platform/next

# Global installation
npm install @fleek-platform/next -g
```

## CLI usage

To prepare your Next.js application for deployment on Fleek, follow these steps:

1.  **Configure edge runtime**:
    For routes with server-side code, add the following code to ensure they are configured to be optimised for edge runtimes:

    ```js
    export const runtime = 'edge';
    ```

2.  **Build the application**: Use the Fleek Next.js adapter to build and deploy your app from the command line.

    ```sh
    npx fleek-next build

    # or if installed globally
    fleek-next build
    ```

3.  If running this command outside of your project’s root directory, specify the path with the `-p` or `--projectPath` flag:

    ```sh
     fleek-next build -p path/to/my/repo
    ```

### Build command options:

- **-p, --project-path <path>**: Path to your Next.js project’s root directory. Defaults to the current directory.
- **-s, --skipBuild**: Skips the build step, allowing you to build the application separately if needed. Default is false.
- **-i, --skipInstallation**: Skips dependency installation. Default is false.
- **-c, --clean**: Clears any previous build artifacts before building.
- **-v, --verbose**: Enables detailed logging.

## Deploying your Next.js application

:::info
To learn about support for Next.js features on Fleek, see the [documentation](/docs/platform/frameworks#nextjs-on-fleek)
:::

1. Before you can deploy your Next.js application you will first need to create a Fleek function with the below command:

   ```bash
   fleek functions create
   ```

2. You then note the name of the Fleek Function you just created because you will use it in the next step. Deploying your Next.js application after all the above steps is as simple as one command:

   ```sh
   fleek functions deploy --bundle=false --path .fleek/dist/index.js --assets .fleek/static
   ```

   :::warn
   Fleek Functions do not support runtime environment variables yet. Use build-time variables instead.
   :::

The above command will prompt you to [login to your Fleek account](/docs/cli/#login) from your CLI if you are not already logged in.

If you are logged in, you will :

1. Be prompted to choose a project on your Fleek account to deploy your application from:

   ```bash
   ✔ Select a project from the list: › First Project

   ✅ Success! You have switched to project "First Project".
   ```

2. Choose a Fleek Function to deploy your application to which should match the one you created above:

   ```bash
   ✔ Select function from the list › stuff
   ✅ Success! Assets uploaded successfully
   ```

The below is what you should expect to see while deploying:

:::note
The URLs below are for a demo Next.js deployment. You will get your own Fleek URL.
:::

```bash
Transforming code: [████████████████████████████████████████] 100% | ETA: 0s | 100/100

Uploading code to IPFS: [████████████████████████████████████████] 100% | ETA: 0s | 1105317/1105317

✅ Success! The deployment has been successfully created.

> You can call this Fleek Function by making a request to the following URL
🔗 https://brief-disease-harsh.functions.on-fleek.app
> You can also call this Fleek Network URL directly for increased performance (please keep in mind you will not be able to deactivate this link)
🔗 https://fleek-test.network/services/1/ipfs/bafybeig3v4ffebr3hnukpfl5mutflxqgqaizn4l4vp2ffkfnvjuhmynj4i
```
