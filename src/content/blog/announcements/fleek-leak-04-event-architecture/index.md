---
title: 'Fleek Leak 04: Diving into Our Event-driven Architecture'
date: 2023-03-09
desc: "In this Fleek Leak, we take a look at our new event-driven architecture, and how it enables Fleek's long term expansibility."
thumbnail: './fleekleakmar9.png'
image: './fleekleakmar9.png'
---

Time for another Fleek Leak! This week we are giving our usual approach a little bit of color and a spin! Other than our usual updates, **Fleek Leaks we will start including thematic dives– technical implementations and architecture design choices** of Fleek.xyz!

While it’s important to build up in features, it’s also to set **great foundations that allow Fleek.xyz to grow in capability and flexibility over time**, compared to its legacy counterpart (fleek.co!).

Today, the leak is a dive into our **event-driven Architecture,** and how it enables us to build a highly flexible platform, with highly granular and reactive flows.

---

## What Does it Mean to Build Fleek to be Event-driven?

![Flow events step by step details for fleek site deploy](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/flow-events.png)

In a nutshell, **for every key process that occurs or action in Fleek, there will be an event emitted**. If there is an event for every action performed on each flow and feature of Fleek (New deploy, New upload, Failed upload, Domain set, DNS configured), **then there can be listeners waiting to execute a reaction**.

While simple in concept, it allows us to **manage complex sequential operations in an efficient asynchronous manner**. Fleek.xyz is now fully microservice-based, and all of these services need to connect with each other.

While we could have made all this API-based, this event bus acts as a more flexible and efficient backbone for our service system based on action and reactions.

Let’s imagine a simple deployment flow of a site on Fleek:

1. The CI/CD triggers a new deploy.
2. The Sites’ Service emits an event when the new version is uploaded.
3. The Domains service listens to the event, updates needed records, and emits an event both notifying and measuring usage.
4. The site's service listens to that event and informs the user that the deployment is done!

To have all those independent services (Storage, Sites, Domains, etc…) play that particular sequence, you must not only know the sequence… **But all instruments have to play the same song in rhythm and communicate with each other** (notes being events, the musical sheet being the sequence, and Fleek’s Event handler acting as the orchestra director). For that, we have:

- **Events**, triggered upon each granular action as a serverless log.
- **Listeners**, configurable to wait for specific event logs.
- **Reactions**, or triggers that listeners execute based on said event log.

---

## Approaching Our Platform from a Flexible, Sandbox Approach.

Setting a solid event-driven architecture is not just a matter of avoiding future technical debt. By having all our actions and features be granularly logged, we **can easily create new flows, speeding development of new features**, among other perks that we can introduce in the future thanks to this:

1. We can build feature-specific, and not flow-specific services (domain, services, storage, etc.) instead of having them be a single rigid module.
2. We can provide sturdier and cleaner experiences (e.g. if you drop mid-flow during your DNS setup, we can react and keep your progress).
3. We can more easily update flows to support new features (e.g. after a deployment not only update DNS, but your ENS domain).
4. We can generate extremely specific notifications along each flow.
5. We can log and react to failures in an extremely precise way.

That is why our events architecture is one of the most foundational updates so far. While a silent update for users, it is the **core to our vision of building Fleek as a fully modular and extensible platform**.

Today, it helps us build a future-proofed platform where all infrastructure services can react to each other. In the future it can enable other amazing features such-as **custom event-driven outbound reactions, connecting Fleek to external services.** Possibilities are endless, and we can’t wait to show them to you!

---

Thanks for joining us this week on this deep dive! Stay tuned for our next release, and hop into our community if you have any feedback or feature requests. Remember that you can always hop by our [Discord](https://discord.gg/fleek) to drop your thoughts or report any bugs you’ve found.
