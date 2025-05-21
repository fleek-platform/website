---
title: 'Fleek v0.5.0: Custom Domains for Private IPFS Gateways Release'
date: 2023-07-06
desc: 'With the latest update to the Fleek CLI & SDK, add a custom domain on top of your private IPFS storage gateway for an extra layer of branding, personalization, and security'
thumbnail: './betav050.png'
image: './betav050.png'
author:
  - 'Fleek'
---

Quick update today for y’all bringing a highly requested feature to the CLI and SDK v0.5.0: Custom Domains for Private IPFS Gateways. Set a custom domain on top of your private IPFS storage gateway to have a customized endpoint for surfacing your files on Fleek.

For more information on using `fleek gateways create` and setting custom domains for your private IPFS gateways check out our [docs](https://fleek.xyz/docs/platform/gateways/) ⚡

Let’s get into some details:

---

## Private IPFS Gateways: Connecting Custom Domains

With this update, we're giving you more options for your storage gateway. Before, when storing files through the Fleek CLI, you'd get an IPFS.io.cid URL to access the content, using a shared IPFS gateway to view/resolve files.

Now, you can set up a custom domain for a private gateway for another layer of:

- **Privacy & Branding**: Only your content is served, and you are not responsible for the content of others on the same gateway.
- **Reliability & Performance**: Unlike public gateways, which are resource-locked, we provide a consistent file propagation experience.

**The gateways will only serve your user-uploaded content, and you can also whitelist the domains that you work with**. The big takeaway from this: private gateways are now faster and offer a more personalized & secure experience.

![](https://storage.fleek-internal.com/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/pgggdemo.gif)

For step-by-step instructions on getting started with Custom IPFS Gateway Domains, check out our [docs](https://fleek.xyz/docs/platform/gateways/).

---

That’s all this time! The team has heard you guys asking for this to be added for a little while, so we’re pumped to finally bring it to you.

We’re always looking for more features the community wants to see added to the platform– if you have any suggestions, reach out to the team on [Discord](https://discord.gg/fleek).

We’re gearing up for an exciting summer– stay tuned 🤙
