---
title: 'Non-Fungible Apps (NFA): Details Page & MVP Scoping'
date: 2023-05-04
desc: 'Get caught up on our Non-Fungible Application development progress, with highlights on the new Details Page, Verification Integrations, and MVP Release Scoping!'
thumbnail: './nfadetailspage.png'
image: './nfadetailspage.png'
author:
  - 'Fleek'
---

Time for another NFA update!

As we continue to make progress in our Non-Fungible App (NFA) development, we want to update our community about specific milestones and features they should be excited for.

Specifically, we are in the midst of discussions to define the minimum viable product (MVP) scope. In parallel, we are finishing the incorporation of new user homepage functionalities, like the new details pages, to enhance the overall experience surrounding NFAs.

Let’s get into some details on each of these, and more:

---

### Detail Page: Initial Version Completed

The initial version of the detail page has been completed, although its integration has been temporarily paused to accommodate new design elements. This update will require modifications to our GraphQL implementation. You can see the first implementation of the Details Page below but keep in mind, with some UI changes anticipated, **this is not the final version:**

<iframe width="600" height="350" src="https://www.youtube.com/embed/fmshT7s0J-c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

You can find the PR of the initial Details Page [here](https://github.com/fleekxyz/non-fungible-apps/releases/tag/v0.0.7).

### Verification Integrations & QA Environment

The database layer for verification integrations has been set up, and we are currently working on connecting it to the appropriate handlers. Our next step involves deploying the verification integrations to the AWS development environment.

We are also in the process of setting up an AWS server for the Ethereum node in the QA environment. As discussions regarding the MVP scope progress, we will be updating the QA documentation accordingly.

### Testnet Release for v1: MVP Scoping

On the topic of MVP scoping, progress is moving steadily toward release!

In terms of remaining work for the MVP release, the team is in progress on the above-mentioned Details Page, integrating Fleek and ENS verifications, as well as polishing the minting, creating access points, exploration, and detail page functionalities.

This is the version currently in scope without user home page-type features. As we approach release, we are having key discussions to address some specific improvements, such as:

- Making access points more like prints that anyone can make from NFAs and optionally add a custom domain
- Surface these prints in wallets so any user not just protocol owners can have them in their wallet to access
- Access the app via the NFA and ideally have them run locally

All of the above will be included in a public beta release once the testing on testnet and feedback is in. These are all discussions the team continues to have daily, and are open to community input on any of the above! Hop into our [Discord](https://discord.gg/fleek) server, or open a discussion post in our [GitHub](https://github.com/fleekxyz/non-fungible-apps), to contribute.

---

That’s all for this week!

May is an exciting month for the NFA team as we move closer and closer to the official testnet release. Stay tuned for more information on how to participate soon.

For the most up to date information, and to contribute to discussions and conversations surrounding the project, star our [GitHub](https://github.com/fleekxyz/non-fungible-apps) repository and follow along!

For more Fleek resources and information, please visit our [LinkTree](https://linktr.ee/fleek)!
