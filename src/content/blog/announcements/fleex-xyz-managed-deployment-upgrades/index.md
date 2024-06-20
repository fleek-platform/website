---
title: 'Exploring the Upgrades in Managed Deployments on Fleek.xyz ⚡'
date: 2023-06-09
desc: "We're taking the managed deployments feature you know and love from Fleek.co, and supercharging it to better fit developer needs!"
thumbnail: './manageddeploymentupgrade.png'
image: './manageddeploymentupgrade.png'
author:
  - 'Fleek'
---

With the new iteration of Fleek, [Fleek.xyz](https://fleek.xyz/), we take all the lessons we’ve learned from our time running Fleek.co and address them across all pillars of the new platform. More than just an upgrade, it's reflection and action on the lessons we’ve learned, streamlining build workflows to fit current developer needs and optimize for enterprise-level users.

**Managed Deployments allow anyone to deploy their site to IPFS and configure a GitHub action for your repository that automatically updates and redeploys your site upon each commit**. Devs can monitor the status of their deployment and rest easy knowing their site will update its IPFS hash without having to do this manually. Contrary to unmanaged deploys, which the developer has to build themselves before Fleek deploys it.

Users have always been able to do this on the Fleek.co platform but now, with the rollout of the Fleek.xyz platform, **we’re supercharging this feature with a few upgrades and improvements through a brand-new architecture**.

---

## New Source Code Pipeline

With the Fleek.xyz platform, **we’re leveraging state machines and ECS, as well as simple Content Addressable aRchive (CAR) packing**, to create a pipeline that turns source code provided by users into a CAR file. This new architecture addresses some limitations that the previous platform had while creating a variety of benefits and new features not previously possible.

Let’s explore a few:

### Extended Max Build Time

Unlike Fleek.co, which has a hardcoded maximum build time of 15 minutes, Fleek.xyz offers the possibility to **increase the max build time for users**. This provides greater flexibility for complex projects that require more time to build.

### Improved Resource Control

Fleek.xyz not only measures build time but also CPU time and a variety of other metrics, like success vs failed builds. These metrics provide valuable insights into the build process and help to identify potential areas for improvement for developers.

Fleek.xyz also allows for **granular control of the resources it’s tracking**. This means that teams can easily upgrade CPU and memory to fit their team needs, providing more tailored and efficient resource management.

### Greater Source Flexibility and Compatibility

Unlike the Fleek.co pipeline, which only supports GitHub, **Fleek.xyz is git provider agnostic**. This feature offers greater flexibility and compatibility, allowing teams to use a variety of source code repositories without being tied to a single provider.

---

We’re bringing a fresh experience to managed deployments with Fleek.xyz, offering a range of features aiming to amplify the developer experience across the board. It's not just about doing the same thing better, but about innovating and adapting to the evolving needs of developers and teams. While Fleek.co remains a solid choice until sunsetting, we know Fleek.xyz's advancements make it a powerful upgrade to start using today, no matter the size of your project.

If you haven’t tried the Fleek.xyz beta yet– there’s no better time! For detailed instructions on how to get started, check out our [docs](/docs/)!

For more information on Fleek.xyz and what we’re building, check out our [Blog](/blog/) and [Social Media](https://linktr.ee/fleek).
