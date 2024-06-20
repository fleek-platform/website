---
title: 'Best Practices for Building IPFS-hosted Websites'
date: 2023-02-23
desc: ' However, there are still some differences and best practices to keep in mind when deploying an IPFS website so that you can ensure your website is working correctly at all times.'
thumbnail: './best-practices-ipfs.png'
image: './best-practices-ipfs.png'
---

IPFS-hosted websites are gaining popularity as a way to host your site. Although the technology is still early, there's been some significant progress and it's an exciting to see fully fledged applications and sites performantly living on this technology.

However, there are still some **differences and best practices to keep in mind** when deploying an IPFS website so that you can ensure your website is working correctly at all times.

---

## Making Your IPFS Website Offline-first

When hosting assets on IPFS, you must consider that it might take some time the first time you load it. The best way to ensure your site is available and provides a smooth user experience is to make it offline first. This means you build your website so that it can be used even when there's no internet connection (bear in mind this applies for following visits to the site, it still requires an internet connection to cache the resources in the first place).

The first step in building an offline-first website is using the Service Worker API. This will allow you to intercept requests made by users on your site so that if they don't have access to the network (or have a slow internet connection), their request will be fulfilled by an asset stored locally on their device rather than being sent over the network and back again - saving both time and bandwidth.

This can be especially handy for building a progressive web app. A progressive web app (PWA) is a website that works similarly to an application, allowing it to be added to a user's home screen on mobile devices so they can access it like any other application - even when offline!

---

## Good Manifest File Settings on IPFS

The web app manifest is a simple JSON file that the browser reads. It specifies how it should behave when installed on the user's desktop or mobile device. It includes the app name, the icons the app should use, and the URL that should open when it launches.

There are a few fundamental properties that you should add to your manifest:

- `short_name` and/or `name`: When both are provided, `short_name` will be used on the home screen, launcher, or other places where space may be limited. `name` is used when the app is installed.
- `icons`: The `icons` property is an array of images. Each one must include the `src` and `sizes` properties. On Android, you can use a [maskable icon](https://web.dev/maskable-icon/).

You can check [mdn web docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) and web for further reading on manifest files and web.dev [blog post on app manifest](https://web.dev/add-manifest/) for a more practical, example-driven approach.

---

## Accessing Sites and Assets Properly from IPFS: Use Relative Paths

When accessing your website from a public gateway, you might encounter a couple of issues when loading assets. The TL;DR? You need to **use relative paths**.

This is because they're probably loaded from an incorrect URL, like `ipfs.io/my-image.jpg` instead of `ipfs.io/ipfs/$hash/my-image.jpg`. Therefore, this error should only occur on IPFS gateways. If you're using a domain for accessing your site, this shouldn't happen.

However, using public gateways might be handy for previewing your site on a Pull request (you can check Fleek's CLI approach for publishing your site from a [GithubAction here](/docs/cli/)). You have to make sure your assets are loaded using relative paths.

If your app has hard-coded absolute paths (a common practice in an `index.html` file), converting these to relative paths should allow the browser to resolve the path correctly:

```
<script src='./build/bundle.js'></script>
```

If you're using create-react-app, check **"building for relative paths"** doc [here](https://create-react-app.dev/docs/deployment/#building-for-relative-paths).

---

## Avoiding App-breaks When Changing Routes on IPFS: Use a Hash Router

IPFS gateway urls are formatted like this `ipfs.io/ipfs/$hash`. Your site might think that the root of your application is `ipfs.io` instead of `ipfs.io/ipfs/$hash`. For this reason, we recommend apps use hash routing to minimize such errors when using an IPFS gateway.

To add a hash router in react, [you can check this guide](https://reactrouter.com/web/api/HashRouter).

---

## Using IPNS to Resolve IPFS Hashes

IPFS is, by nature, immutable. Adding a file to IPFS creates a hash based on the data with which the CID is constructed. However, there are many cases where content-addressed data needs to be regularly updated. Luckily IPNS allows you to create a mutable pointer to IPFS CIDs. IPNS names can be considered links that can be updated over time while retaining the verifiability of content addressing.

There are three common operations you can do with IPNS, especially useful if you are a developer or a user:

- Creating an IPNS record:
  - Creates a name and signs it with a private key.
  - You can create an IPNS name using Fleek CLI by running: `fleek ipns create`
- Publishing an IPNS record:
  - This will map your IPNS record to an IPFS CID so that gateways can resolve it and direct users to the content
  - You can publish an IPNS record by running: `fleek ipns publish <ipnsName> <ipfsCID>`

You can also check our [Fleek IPNS section](/docs/sdk/ipns/) and [Fleek CLI](/docs/cli/) docs for further reading.

## Securing API Keys on Static Frontends

When building an IPFS-hosted site that requires **API keys for authentication or accessing external services**, it’s important to keep the keys secure. API Keys should never be stored in Frontend code, as they can be easily accessed by anyone who views the code.

However, some services have API keys that can be **safely exposed in your Frontend code without compromising security**. This is because these keys are designed to allow public access to specific resources and don’t need to be hidden. However, ensuring that the API calls are only made from your site’s URL is essential.

To achieve this, many services offer the option only to **allow requests from a whitelist of approved domains**. When a request is made from an unapproved domain, it will be rejected, even if the correct API key is used.

Overall, while some services allow API keys to be stored in the Frontend code, it is still important to take measures to **restrict access to your API**, so please refer to the documentation of the service you’re trying to integrate.

---

## Conclusion ⚡

This article has covered some best practices for hosting your website on IPFS. We hope you find these tips helpful and are inspired to experiment!

For more resources, visit our [LinkTree](https://linktr.ee/fleek).
