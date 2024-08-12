---
title: 'Fleek Changelog - March 11th, 2024: Automatic Phishing Detection, Application Credentials, Image Improvements'
date: 2024-03-11
desc: 'An overview of all the latest changes to the Fleek Open Beta, including new phishing detection measures, in-app application credential creation, and image handling improvements'
thumbnail: './fleekchangelog01mar11.png'
image: './fleekchangelog01mar11.png'
author: 'Fleek'
---

We're back with a new update to the Fleek platform, this time packed with new features and enhancements rolled out throughout February, aiming to streamline your development process and improve the security of all projects deployed on Fleek for end users.

In this recap, we’ll cover the new phishing protection mechanisms, refined application credentials management, and improved image handling improvements that were rolled out to the Fleek platform last month ⚡

Or, you can just try all the new features yourself on [Fleek](https://fleek.xyz/) **which is now in Open Beta**– anyone can now create an account and start trying the new platform, no whitelist required 🤙

Let’s get into what the devs were cookin’ throughout February:

---

## Phishing Protection: Automatic Phishing Detection

The main focus for the dev team this month was the implementation of a new process to identify potential phishing sites among all websites deployed and hosted on Fleek. This system mirrors the one already in place on Fleek.co, where each website undergoes a phishing analysis in the deployment process. This mechanism aims to protect the product and the service we provide from malicious actors and ensure all end-users enjoy a better experience using sites deployed on Fleek.

Sites flagged for phishing are automatically removed, alongside the associated user account and all related resources. In cases where a site's status is ambiguous, we conduct a manual review and maintain a list for such instances internally. In the manual review process, we work with a group of trustee sources to whom we delegate the review to determine if the site is phishing.

Anyone flagged for deploying a phishing site on Fleek will find themselves on a blocklist to prevent individuals associated with phishing activities from registering or signing into the platform in the future. Users who believe their site was mistakenly flagged can reach out to our Support team for assistance and manual review.

To track the success of all of our new phishing protection efforts, we’ve added a few new metrics to our tracking system. This now includes the number of phishing sites:

- Automatically detected
- Manually detected
- Deleted for phishing (manually and automatically)

As well as the penetration rate, or the ratio of manually deleted sites against the total sites that make it through the automatic phishing detection. This data-driven approach enables us to continually refine our detection strategies, ensuring Fleek remains a secure platform for both developers and users of sites deployed on Fleek.

Alongside the new automatic phishing detection tools, we’ve also added an edge rule to all pullzones on Fleek restricting access to just its custom domain. This will reduce potential phishing entry points, as sites with pullzones can no longer be accessed via the pullzone URL (i.e. fleekcdn.xyz).

Our goal with this update is to proactively eliminate both the deployment of phishing sites and the users who create them on Fleek. We’ll keep you updated on the success of the new phishing detection efforts in future changelogs 🤙

---

## Application Credentials

We’ve also now added the ability to create application credentials directly within the Fleek UI.

Anyone can now interact with the SDK directly from a client in a secure way, through whitelisted domains, allowing only those with the application credentials to access the specified domains. Creating and managing Application Credentials can be done in the `Application Credentials` tab within the settings of your Fleek project:

<video width="100%" height="auto" autoplay loop>
 <source src="/videos/blog/appcreds_webenc.mp4" type="video/mp4">
 Your browser does not support the video tag.
</video>

---

## Image Improvements

We've made several improvements to how images are handled on the platform in this update as well. All images should now have overall improved quality and reliability:

- Default avatars are now assigned on account creation.
- Custom avatars are now cached immediately
- Template image previews have been fixed, resolving the issue of constant loading.

---

## Bug Fixes and Improvements

Also included in this release:

- Delete flows for sites and projects are now simplified.
- Removed unnecessary dot displayed on delete modal.
- Enhanced deployment pipeline reducing cases where the deployment got stuck.
- New flow for self-managed deployment on the UI.
- Username is now pre-filled on account creation.
- ENS configuration modal now comes with the exact record to paste into the content hash.
- ENS validation now takes into consideration the `IPFS://` and `IPNS://` prefixes.
- Environment variable names can be created with up to 150 characters
- Fixed bug where modal was not appearing after creating a domain for a PGW
- ENS modal now displays the content hash in smaller screen resolutions.

For more details on all the new features, bug fixes, and improvements made in this release, check out our [docs](/docs/)!

---

That’s a wrap for February, folks!

The team has been heads down rolling out new improvements to make the Fleek experience smoother and more secure for all end-users, as well as some behind-the-scenes work on cool new features to debut soon.

Got feedback or need some help navigating the new updates? Chat with the team and join the conversation in our [Discord](https://discord.gg/fleek) community. Also, follow along with all the new updates coming to the Fleek platform on [X](https://twitter.com/fleek)!

See you in the next changelog Fleek Freaks ⚡
