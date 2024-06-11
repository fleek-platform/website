---
title: 'Fleek v0.4.0: Unified GraphQL Interface, Automatic IPNS Deployments, App Credentials'
date: 2023-05-30
desc: 'Dive into actions you need to take to ensure your apps continue to work as expected, and everything else included in this version, with the roll-out of v0.4.0!'
thumbnail: './v040-thumbnail.jpg'
image: './v040-thumbnail.jpg'
author: 'Fleek'
---

We gave a little warning earlier this week– we’re rolling out a few updates to the SDK & CLI beta which will result in actions needed from users!

---

## Unified GraphQL Service

The highlight of the Fleek v0.4.0 release is a **substantial, application-disrupting change in the form of an upgrade to our GQL layer**. This will consolidate all our beta services under a single GQL interface, enhancing your experience and making our services even more user-friendly.

As outlined in the [pre-warning](https://blog.fleek.xyz/post/preparing-for-fleek-beta-v040/), users will just need to update the following to ensure their services continue to work as expected:

**SDK**: Run the command `npm install @fleek-platform/sdk` on your project

**CLI**: Run the command `npm install @fleek-platform/cli` in the CLI

**Previous versions of the Fleek beta will stop working with the debut of v0.4.0, so make sure to update your apps ASAP**. If you encounter any issues, open a ticket and chat with our support team in [Discord](https://discord.gg/fleek)!

---

## Sites IPNS Record: Automatic Deployments

The other major enhancement in the Fleek v0.4.0 release is simplifying the Sites IPNS record process. Previously, when creating a site deployment, we would provide you with an IPFS hash, which could then be used to manually create an IPNS record. However, any new deployment would necessitate manual updating of the IPFS hash — a tedious step that had to be repeated with every deployment.

In this update, we've automated this workflow. You can now create an IPNS record with your site as an option, directly through both the CLI and the SDK. **Whenever your site is updated, your IPNS record will be updated simultaneously**. Furthermore, if you've set your record to ENS, there will be no need for additional updates.

<iframe width="600" height="350" src="https://www.youtube.com/embed/q20DUZV_rUs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Application Credentials: A Step Towards the Browser SDK

The final update in the v0.4.0 release relates to the distinction between Personal Access Tokens (PAT) and Application Credentials. We're implementing this change to enable the safe integration of the browser SDK, removing the potential risk of PAT exploits upon debut.

While using a PAT in a node environment poses no issues, **if a PAT was used within a browser SDK environment, it could end up granting unauthorized users access and control over your activities on the CLI, SDK, API, and more** — a serious potential security issue!

With v0.4.0, the system will perform an environment check with each request you make, verifying whether you're operating in a node environment. If it is detected that you are operating in a browser sdk environment, users will be encouraged to provide their application credentials to our application authentication system, where you’ll then you'll receive a PAT with limited access capabilities.

This is an important milestone in enabling the full browser SDK environment. We want to open this feature to the public in a safe way, and this change to how PATs are handled in different environments is a major step in that direction.

---

## Improvements and Fixes

In addition to the Unified GraphQL service, and the other changes we're bringing with this version, we’ve also squashed some bugs and made some improvements to make your beta experience even smoother:

- Can now name apps created in the CLI to allow you to distinguish between projects
