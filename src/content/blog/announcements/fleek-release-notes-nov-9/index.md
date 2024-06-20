---
title: 'Fleek v0.0.3 Changelog: Project, Site, and Gateway Delete Options, QoL Improvements'
date: 2023-11-09
desc: 'Dive into the changes coming with Fleek Alpha v0.0.3, including Project, Site, and Gateway Delete Options.'
thumbnail: './fleekchangelog1109.png'
image: './fleekchangelog1109.png'
author:
  - 'Fleek'
---

It's been about two weeks, meaning it’s time for another bi-weekly update to the Fleek.xyz Alpha 🤙

The highlight for this release: Project, Site, and Gateway delete functionality! We’ve also done our usual bi-weekly bug-squashing to clean up your experience and fix a few minor issues.

Did you see the performance data from Fleek Network Testnet Phase {1}? Last week, the Foundation released the results from the successful Phase {1} performance testing period. Dive into the full performance analysis [here](https://blog.fleek.network/post/fleek-network-phase-1-recap/)!

Let’s get into the changes coming to the Fleek.xyz alpha with v0.0.3:

---

## Delete Options: Projects, Sites, Gateways

A heavily requested feature is here– quickly and easily delete any Project, Site, or Gateway directly in the Fleek.xyz UI. **When deleting any of the above, the user must go through a few confirmations to verify the removal of things like Domains, IPNS records, or anything else associated with the project**.

**_IMPORTANT: Deleting a Project, Site, or Gateway is not reversible! Make sure you understand all warnings before progressing._**

### Project Delete

To delete a Project, head to the project dashboard, where you’ll need to acknowledge that deleting your project means the removal of the project’s:

- Sites
- Domains linked to the sites
- IPNS keys linked to the site
- Private Gateways
- Domains linked to Private Gateways
- Files Stored

<video width="100%" height="auto" autoplay loop>
 <source src="./project-delete.mp4" type="video/mp4">
 Your browser does not support the video tag.
</video>

### Site Delete

When deleting a site, go to the site overview and click the `Delete Site` option on the general settings page. Deleting your site means the removal of all associated resources and means content for that site will no longer be served, **including the domains and IPNS record linked to it**.

<video width="100%" height="auto" autoplay loop>
 <source src="./site-delete-updated.mp4" type="video/mp4">
 Your browser does not support the video tag.
</video>

### Gateway Delete

For Private Gateways, you’ll be prompted to **remove the gateway and all domains associated with it**:

<video width="100%" height="auto" autoplay loop>
 <source src="./delete-gateway.mp4" type="video/mp4">
 Your browser does not support the video tag.
</video>

## Other Fixes and Improvements

Alongside the new delete options, we’ve also added a ton of quality-of-life improvements and other fixes to the platform with v0.0.3 including:

- Now correctly handle the canceling state for deployments
- Now mapping the error when the git repository fails to be cloned correctly
- Added a new dropdown to select the type of storage for the project
- Files with special characters in the name are now rendering correctly on private gateways
- Fixed an error where users were stuck in the UI and unable to log in
- Added a button to add an organization to the verified GitHub account in the GitHub account selector

---

That’s all for this week! This is a smaller QoL update to bring a heavily requested feature and clean up a little behind the scenes as we prepare for the **next major feature addition– Template Submissions** ⚡

Follow along with the release of the Fleek.xyz platform on [X](https://twitter.com/fleek) and join the community of testers in our [Discord](http://discord.gg/fleek) server!

See you again in about two weeks for the next update 🤙
