---
order: 5
title: Fleek Svelte Adapter
date: 2024-12-05
desc: An overview of the Fleek Svelte Adapter, the adapter made for deploying Sveltekit applications on Fleek.
---

# Fleek Sveltekit adapter

:::info
Install the [Fleek CLI](/docs) and [login](/docs/cli/#login) locally on your machine to be able to deploy your application.
:::

The Fleek Svelte Adapter enables deployments of Sveltekit applications on Fleek, allowing you to host your app with optimized performance and edge compatibility. This adapter is perfect for SvelteKit applications and works well with both JavaScript and TypeScript projects.

Here, we'll walk you through how to use the adapter, its features, and how to deploy your Svelte application to Fleek. Ensure your Node.js version is at least 18 and your Fleek CLI version is 3 or higher before proceeding.

## Install

:::note
You can use pnpm as well for installation.
:::

To install the adapter in your project:

```sh
# Using npm
npm install -D @fleek-platform/svelte-adapter
```

## Configure the adapter

After installation, you need to configure the adapter in your Svelte project by modifying the `svelte.config.js` file. Here's how:

```js
// svelte.config.js
import adapter from '@fleek-platform/svelte-adapter';

export default {
  kit: {
    adapter: adapter({
      // Optional configuration
      outDir: '.fleek', // Defaults to '.fleek'
    }),
  },
};
```

This configuration specifies that the output directory for your production build will be .fleek (the default), and it prepares the app for deployment on Fleek. `outDir` defaults to `.fleek` if not specified.

### Build output process

When running `npm run build`, the adapter performs a series of steps to prepare your SvelteKit app for deployment on Fleek. Here's a breakdown of the process:

1. **Production Build of SvelteKit App**:

   - The build process optimizes your app for production by compiling Svelte components into JavaScript.
   - It includes minification, tree-shaking, and bundling of JavaScript, CSS, and other assets to ensure a smaller and faster app.

2. **Static Assets**:

   - All static assets, such as images, stylesheets, fonts, and pre-rendered HTML, are stored in the `.fleek/static` directory.
   - These assets are made available through IPFS for decentralized distribution.

3. **Server-Side Functions**:
   - The server-side logic of your app, such as API endpoints or server-rendered pages, is bundled and stored in `.fleek/dist`.
   - The output is optimized for Fleek's serverless environment to handle requests lightning-fast.

### Deploying your application

Once the build process is complete, deploy to Fleek Functions with the following steps:

1. **Command Explanation**:

   ```bash
   fleek functions deploy --bundle=false --path .fleek/dist/index.js --assets .fleek/static
   ```

   - `--bundle=false`: Indicates that the files are already bundled, and Fleek doesn’t need to re-bundle them.
   - `--path .fleek/dist/index.js`: Specifies the entry point for the server-side functions.
   - `--assets .fleek/static`: Specifies the directory containing static assets for the app.

2. **IPFS Integration**:

   - Fleek integrates directly with IPFS, allowing your static assets to be hosted on a decentralized network. This ensures content integrity and global availability.

3. **Scalable Hosting**:
   - Your server-side functions run on Fleek’s serverless infrastructure, providing scalability and efficient resource utilization.
