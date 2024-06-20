---
title: 'NFAs: ENS Link and Access Points'
date: 2023-03-30
desc: 'Take a dive into the latest from the NFA team, including looks at our ENS integration and Access Point creation'
thumbnail: './nfasenslink.png'
image: './nfasenslink.png'
---

## TLDR; 

- Sprint 5 completed, focusing on Access Point creation flow, ENS integration, and contract hardening.
- Initial Access Point creation flow has been implemented as well as mint flow refinements, with a few final tweaks needed.
- ENS integration and verification complete, working to optimize gas costs.
- Successfully deployed developer environment on Goerli testnet, aiming to the subgraph and UI updated to use Goerli in next sprint
- Sprint 6 will concentrate on finalizing the Access Point creation flow, contract hardening, gas optimization, and ENS integration wrap-up, as well as off-chain verifications by Fleek

---

## Sprint 5 Update: AP Creation, ENS Integration, Migration

### Simple initial Access Point (AP) Creation Flow & Mint Flow Updates

Through Sprint 5, the team put a focus on creating the initial integration logic and basic UI for the Access Point creation flow. Although there are still a few tweaks needed based on the in-progress final design, **we've managed to create a functional initial flow for Access Point creation**. Users can easily create Access Points from either the new explore view (for a specific NFA on the page) or through the create tab (search for a specific NFA).

Note that the off-chain component for the AP creation still needs to be completed, which will map a custom domain to the content of the underlying NFA.

<iframe width="600" height="350" src="https://www.youtube.com/embed/e-vE1MI0BOE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

We've also made **a few UI changes to the mint & explore flows since the last bi-weekly update**. In addition to the _Explore_ page, listing recently minted NFAs, we've added _Create_ and _Learn_ tabs.  The Create tab now allows users to mint an NFA or Access Point, while the Learn page will be home to resources explaining everything you need to know to mint an NFA or access point (or both!).

Additionally, we've updated the Mint Flow adding validations for required fields like logo, name, and repo ensuring users input the necessary information to mint their NFA.

---

### Contracts: ENS Integration and Fleek Verifications

We've revamped the AWS stack, finally enabling us to build off-chain verification services. **Rather than completely relying on a boilerplate, this sprint we chose to rebuild from the ground up, leveraging some of the boilerplate services**. This approach allows us to better understand the code and create custom features necessary to verify NFA contract info and metadata.

A crucial aspect of the minting contract is ENS verification, which allows us to confirm that the person minting the NFA actually owns the ENS name they set as the NFA domain. We need to validate and be able to verify this on both the front end and the contract side. **Currently, with the initial ENS verification complete, we're exploring ways to optimize gas costs**. You can dive into the PR and see exactly how we're doing this process on our open-source [GitHub repo](https://www.google.com/url?q=https://github.com/fleekxyz/non-fungible-apps/pull/193&sa=D&source=docs&ust=1680120274691969&usg=AOvVaw2nxZSCws_Liao-3SK4k-0L)!

As we are using an upgradeable proxy pattern for the contracts, the team also [implemented](https://github.com/fleekxyz/non-fungible-apps/pull/194) a safeguard to prevent direct calls to the underlying implementation contract. To solve this, the implementation contracts will be deployed in a "paused" state, and a constructor changes the state when a call is made through the proxy.

---

### Ethereum Mainnet Transition

Finally, this sprint marked a major milestone on our journey to Ethereum Mainnet-- successful first deployment of the developer environment on the Goerli testnet!

It's our long-term goal to support any and all EVM chains, and this is a big first step. By the next bi-weekly update, we anticipate having our app fully working on the Goerli testnet. To do this, we still need to deploy the subgraphs on the testnet and tackle a few other tasks. **Expect to see a working app on the Goerli testnet in the next NFA update**!

Dive into the technicals yourself:

- [Implementation Contract](https://goerli.etherscan.io/address/0x03fBB4F0D28f27c33b99F1b80aF679F20cb5E159#code)
- [Proxy Contract](https://goerli.etherscan.io/address/0x8795608346eb475e42e69f1281008aeaa522479d#code)
- [Deployment PR](https://github.com/fleekxyz/non-fungible-apps/pull/195)

---

## What's Next?

That's all for this week 👋

In Sprint 6, we'll prioritize **finalizing the Access Point creation flow and do some contract hardening & gas optimization**. With the initial features on the contract side now complete, we're focusing on optimizing our product for audits and release. We also plan to wrap up our ENS integration and have a working app on the Goerli testnet.

Finally, we plan to pick up the [EIP framework](https://github.com/fleekxyz/non-fungible-apps/discussions/158) again and prep that for submission. We're still open to any community feedback, so dive into the framework on GitHub and let us know what you think!

Stay tuned for our next bi-weekly update, where we'll cover all of the above and give a little hint at what's to come next!

For more resources visit our [LinkTree](https://linktr.ee/fleek).
