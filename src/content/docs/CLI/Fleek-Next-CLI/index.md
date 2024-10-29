---
order: 3
title: Fleek Next CLI
date: 2023-01-10
desc: An overview of the Fleek Next CLI, a tool that simplifies the deployment of Next.js applications to Fleek.
---

# Fleek Next adapter

:::info
Install the [Fleek CLI](/docs) locally on your machine to be able to deploy on your application.
:::

The Fleek Next.js adapter allows you to deploy your server-side Next.js application on Fleek. It lets users host Next.js apps (fullstack and static) directly from the terminal with an efficiency and edge-compatibility. The adapter helps deploy your Next.js app as a [Fleek Function](/docs/cli/functions) and this in turn offers up the edge runtime built on top the [Fleek Network](/docs/infrastructure/) that powers your Next.js applications.

We are going to walk you through the adapter, features it offers, and how to deploy your Next.js app with it on Fleek. This adapter supports both JavaScript and TypeScript Next applications.

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
    For routes with server-side code, add the following code to ensure they run on the edge:

    ```js
    export const runtime = 'edge';
    ```

2.  **Build the application**: Use the Fleek Next.js adapter to build and deploy your app from the command line

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

2. You then copy the name of the Fleek Function you just created because you will use it in the next step. Deploying your Next.js application after all the above steps is as simple as one command:

   ```sh
   fleek functions deploy bundle=false --name '<function_name>' --path .fleek/dist/index.js
   ```

The above command deploys a serverless function to Fleek without bundling any additional files. The below is what you should expect to see while deploying:

:::note
The URLs below are for a demo Next.js deployment. You will get your own Fleek URL.
:::

```bash
Transforming code: [████████████████████████████████████████] 100% | ETA: 0s | 100/100

Uploading code to IPFS: [████████████████████████████████████████] 100% | ETA: 0s | 40477/40477

✅ Success! The deployment has been successfully created.

> You can call this Fleek Function by making a request to the following URL
🔗 https://narrow-diamond-tinkling.functions.on-fleek.app
> You can also call this Fleek Network URL directly for increased performance (please keep in mind you will not be able to deactivate this link)
🔗 https://fleek-test.network/services/1/ipfs/bafkreidgfl3ub3vwca5lslotpsdbqggkuui7zlucyr5rj7qpg3iqiq3uee
```
