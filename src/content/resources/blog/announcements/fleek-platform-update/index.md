---
title: 'Fleek.xyz Platform Update'
date: 2023-06-30
desc: 'Get the latest on our summer plans for the incoming Fleek.xyz launch, from NFAs, to Fleek.co Sunsetting, new features, and more!'
thumbnail: './v1platformupdate.png'
image: './v1platformupdate.png'
author: 'Fleek'
---

We’ve been a bit quiet the past several weeks finalizing some revised plans/timelines for the new platform based on some [exciting updates to Fleek Network](https://blog.fleek.network/post/fleek-network-milestones-update). But now that that work is done, we want to get back in the rhythm of consistent communication/updates, starting now by laying out the new plan and some milestones to get excited for this summer.

**TLDR:** The new platform took a bit longer than originally anticipated. But the bright side is that extra time allowed us to work in some cool changes/updates, and better align the new Fleek Network direction. **The new Fleek platform will now launch in August** and the full sunsetting of and one-click migration off the legacy Fleek.co platform will happen at some point before the end of the year (we will provide plenty of heads-up).

Some updates/features of the new platform that we’re excited about are 1) NFA’s (**a V1 will be part of the platform launch in August**) and 2) we’ve replaced our use of centralized storage providers for IPFS (ex. IPFS nodes running on AWS/Digital Ocean) **with decentralized storage protocols (Filecoin & Arweave)**.

Not only does this align better with web3 and Fleek Network, it actually allows us to offer significantly lower storage costs to our users without sacrificing any performance or developer experience!

Keep reading for a look at everything we have planned for this summer, and some more details on the new features and updates coming to Fleek.xyz.

---

### Summer Milestones to Get Excited For:

**July-August**

1. Fleek.xyz UI Betas
2. Fleek.xyz Platform (V1 launch)
3. NFA’s V1 (part of new platform launch)
4. Filecoin & Arweave/Bundlr Storage (part of new platform launch)
5. Fleek Network Testnet (experimental features in new platform) .
6. Migrating From Fleek.co (one click migration in new platform).

**Q3-Q4**

1. Proper Next.js support
2. Cron Jobs
3. Serverless Functions
4. Server Side Rendering
5. Fleek.co Sunsetting

We will share a lot more details in the coming weeks/months as we approach the different milestones. But, feel free to reach out on [Discord](https://discord.gg/fleek) if you have any questions or want to jam on any ideas beforehand.

In the meantime below are a few questions people might be wondering:

---

### Is There Anything I Need to Worry About as a Current Fleek.co User?

Nope. With the new platform launching in August, **we’re moving the sunsetting of the legacy platform until sometime after Fleek.xyz’s launch** to give everyone plenty of time to make the migration/transition. Migrating will be as easy as one click on the new platform so it will only take a few seconds.

### What Does the New Decentralized Storage Setup Look Like?

Instead of hosting IPFS nodes on AWS/Digital Ocean, which requires storing all the files on centralized cloud platforms, we now separate out IPFS content addressing/routing (which most people use IPFS for) from storage. By doing so, **we can now utilize the benefits of IPFS (ex. content addressing/routing) on top of any storage/data layer (Filecoin, Arweave, etc.) without needing to redundantly store the files on both layers**. Not only is this setup more decentralized/web3 aligned, but it also allows IPFS users to get better guarantees on the storage of their files/data. In addition to the decentralized storage protocols, Fleek Network plays a significant role in how we will be able to do it in a [decentralized/trustless way](https://blog.fleek.network/post/how-fleek-network-helps-decentralize-ipfs/).

The cool part is Fleek users won’t even notice a difference. The performance and developer experience with this new decentralized storage setup is the exact same. **And besides the better security guarantees, it’s also a lot cheaper, so we will be able to pass on significant storage savings to our customers**.

### What’s the Latest on NFAs?

NFAs are now going to debut as a part of the new platform launch in August. They will be woven into the existing hosting flow so you can 1-click turn your site into an NFA.

For the past few months, we've been tweaking how NFAs work to ensure it’s a seamless and value-add product/experience for both app developers and end users of web3 apps/dapps. Those tweaks include:

- **Users Now Mint NFAs like they would any other NFT:** Before NFAs acted more like gateways/access points to the app, now every user essentially mints an NFT print of the app, which provides the user a more censorship-resistant & always-accessible version of the app that doesn’t need DNS in order to load/be usable (ex. can load through a wallet/locally in browser). It also provides some cool security/anti-phishing benefits we are working on.
- **Transitioned from a custom standard to ERC721:** allowing for easier integration in current apps/wallets/web experiences/interfaces.

Expect a more detailed update post on NFAs in the coming weeks.

### What Does the Fleek Network Testnet Mean for the Fleek Platform?

The plan is to gradually start surfacing certain Fleek Network-powered features into the new platform this fall, but making it clear they are ‘experimental features’ to start, and then gradually increasing the usage of Fleek Network in our infra/products as we approach/launch mainnet and the network/infra hardens.

Things to expect this year would be:

1. adding the Fleek Network CDN service as an option for existing hosting/storage products on the platform

2. leverage some of the edge compute services being built on Fleek Network to power some of the new features on the roadmap (ex. cronjobs, serverless functions, SSR, etc.).

---

Alright, that's all we’ve got for now.

If you have any questions or ideas about any of the topics we mentioned in this blog, feel free to reach out. You can find us on [Discord](https://discord.gg/fleek) - our support team is always around to help! Catch you later 🤙
