---
title: 'Preparing for Fleek Beta V0.4.0: Actions Needed'
date: 2023-05-22
desc: 'Fleek CLI/SDK beta users: prepare for the release of v0.4.0, avoiding any potentially application-breaking changes!'
thumbnail: './betav040prep.png'
image: './betav040prep.png'
author: 'Fleek'
---

As we continue to roll out the Fleek beta, internally we are in the final stages of testing for the release of version 0.4.0. While this version has yet to be finalized and released, **it's important to not that it will introduce breaking changes that we want to inform our users about early**.

This change implies that **any versions before 0.4.0 will become outdated**. Previous versions will no longer be supported, which means that a simple update to your current CLI/SDK versions will be necessary to continue to use the Fleek beta!

---

## How Do Users Prepare for v0.4.0 Release?

**The focus of the v0.4.0 release is a significant and potentially application-breaking change in the form of an update to our GQL layer**. This will unify all our beta services under a single GQL interface, streamlining your experience and making our services even more user-friendly. Don’t worry– the update process is simple!

When version 0.4.0 is officially live, users will need to update the following:

- **SDK version**: If you are using our SDK, you will need to run `npm install` on your project.

- **CLI version**: To update the CLI version, simply execute the command `npm install @fleekzyx/cli`.

No changes will be needed at the code level for those who already have an implementation in place– all methods will continue to work as expected!

---

That’s all for now 👋

As we near the release of v0.4.0, we wanted to give a quick warning about some potential application-breaking changes that will be introduced. When we have a set date for the release, we will announce preemptively to give some warning before the changes officially go into effect!

As always, if you have any questions or concerns regarding this update, open a ticket in our [Discord](https://discord.gg/fleek) server and chat with our support team. We're here to assist you every step of the way.

For more resources, and to follow us on social media, check out our [Linktree](https://linktr.ee/fleek)!
