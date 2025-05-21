---
title: 'Fleek v0.6.0: ENS Domains Release'
date: 2023-07-25
desc: 'Discover the Fleek v0.6.0 beta, introducing a straightforward way to connect your ENS Domains to Fleek-deployed sites via our CLI & SDK.'
thumbnail: './betav060.png'
image: './betav060.png'
author:
  - 'Fleek'
---

Today we’ve brought one of Fleek.co’s all-time user-favorite features to the Fleek.xyz beta: **Connect your ENS Domains to your Fleek-deployed sites directly through the Fleek CLI & SDK**.

Just like on the old platform, point Fleek to your ENS, approve, and we’ll handle the rest, as our backend will set an IPNS record once, and update the IPFS content hash associated to it on each deployment to always keep your ENS site up-to-speed.

In a future release, we will also enable the use of IPFS directly with ENS (for those who might prefer not to use IPNS). As a reminder, the main reason for IPNS is to avoid gas fees associated with updating the IPFS hash on-chain every deployment. But as ENS L2/off-chain support matures and gas fees reduce, we feel more projects might prefer to use the IPFS hash directly, as it removes a point of centralization (IPNS keys). So we will give users both options.

For a step-by-step guide on starting with ENS Domains, check out our [docs](https://fleek.xyz/docs/platform/domains/) ⚡

Let’s get into some details:

---

## ENS Domains: Link To Your Fleek-Deployed Sites

Since ENS domains can reference multiple resources using the same address, ENS Domains represent not only the site’s web address, but also their overall identity, wallet/bank, payment processor, and more for Fleek.co users. It became one of our most popular features on the legacy platform for those reasons (which you can learn more about here), so we’re excited to bring it to the Fleek.xyz beta.

Now with v0.6.0, you can super quickly link your site to ENS domains directly in the Fleek CLI & SDK. Check it out:

![](https://storage.fleek-internal.com/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/ensdemo.gif)

This brings ENS support in the Fleek.xyz Beta to parity with the current Fleek.co experience: you only need to set your ENS name and IPNS record once, and Fleek will auto-update it on every deployment forever. Seamless, and with no need to do manual content updates on the ENS UI.

---

That’s all this week. Short and sweet 🤙

Stay tuned for more feature releases as we get closer and closer to the full release of Fleek.xyz. For more information on our plans for the rollout of the new platform, give our [Timelines and Milestones blog](https://fleek.xyz/blog/announcements/fleek-platform-update/) a read!

Also, check out our release from last week for a guide on setting up a custom domain for your private IPFS storage gateway ⚡

If you want to jam with the team on anything we’ve mentioned here, hop in our [Discord](https://discord.gg/Fleek) or reach out on [Twitter](https://twitter.com/fleek).
