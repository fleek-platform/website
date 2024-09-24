---
title: 'Building with ENS and IPFS: A Developer Guide'
date: 2024-07-24
desc: 'Learn how to leverage IPFS and ENS to build powerful onchain apps and websites'
thumbnail: './ipfsens.png'
image: './ipfsens.png'
author:
  - 'Fleek'
---

Mass adoption of onchain infrastructure shouldn’t rely on a leap of faith; reliable and gradual steps in the form of progressive decentralization are the key. For the digital world, IPFS is the first step in unlocking websites and apps away from the shackles of centralized storage providers. The next step is their digital identity i.e. domain mapping.

From Ukranians losing access to social media to cryptocurrency exchanges’ websites being blocked in India, centralized domains are the weakest link on the internet.

Onchain domains like ENS built on blockchains using smart contracts are a reliable alternative. Integrating these domains with IPFS’ distributed storage gives us **onchain websites and apps**. These offer a way out of centralization and provide a censorship-free interface for the internet.

However, building these apps, hosting them on IPFS, and integrating them with ENS is a tedious task. This is where Fleek comes in–bridging the gap between ENS and IPFS to make deploying **onchain websites and apps** simple.

**In this blog, we will explain how ENS and IPFS help build onchain websites and why you should consider building one.**

## **Risks associated with the centralized hosting servers**

First, let’s learn the risks associated with centralized hosting servers and service providers. Understanding these risks will give an overview of the problems that onchain websites are solving.

**1. Single point of failure**

Centralized servers can go down for a variety of reasons ranging from security lapses to excess traffic. An <u>[AWS outage in 2017](https://www.forbes.com/sites/ryanwhitwam/2017/02/28/amazon-s3-outage-has-broken-a-large-chunk-of-the-internet/?sh=4db3d0f8c467)</u> broke a large chunk of the internet.

**2. Censorship:**

Centralized systems are susceptible to government or corporate censorship. The <u>[Great Firewall of China](https://protonvpn.com/blog/great-firewall-china/)</u> or Turkey’s ban of <u>[Wikipedia](https://www.nytimes.com/2020/01/15/world/europe/turkey-wikipedia-access-restored.html)</u> are classic examples.

**3. Lack of portability:**

Moving domains between providers is a huge headache, especially since they are tightly bundled with their provider-specfic services.

For example: AWS and its content-delivery network — <u>[CloudFront](https://aws.amazon.com/cloudfront/)</u>.

Apart from this, large corporations like AWS and Cloudflare have access to internet traffic and user data that flows through their servers. This access can lead to major privacy risks and data monopolies.

## **Understanding Onchain websites**

Onchain websites operate on a network of distributed nodes rather than being hosted on a single server or within a centralized infrastructure. This structure is often powered by a onchain file storage system like IPFS or Arweave which provides a transparent way to host and store data.

Websites hosted on IPFS are resistant to censorship or takedowns, unlike those relying on traditional hosting. Content remains available as long as even one node on the IPFS network hosts it. IPFS websites are also portable across providers and borders since all files use a unified format called content identifiers.

### **Why are onchain websites important?**

Onchain websites are integral to achieving an open and democratic internet. They tackle and solve risks of centralization by:

**1. Eliminating single points of failure:** Building on peer-to-peer networks adds immunity to websites from any single points of failure like DDoS attacks or server outages.

**2. Avoiding censorship:** No central authority or company can impose restrictions or censor content stored and hosted on onchain websites.

**3. Maintaining data integrity:** Tampering data and content is impossible, courtesy of verifiable transparency facilitated by public blockchain.

**4. Facilitating global access:** Onchain websites enable unrestricted global access and ensure content is available everywhere, regardless of local censorship rules.

**5. Improving portability:** There are no vendor lock-ins or private algorithms that onchain websites need to abide by. Hence, onchain websites can be moved across protocols and storage providers.

💡Read more to learn how Fleek enables <u>[Progressive web apps (PWAs)](https://blog.fleek.xyz/post/builders-stack-pwas/)</u>

---

## **How does ENS help in building onchain websites?**

Ethereum Name Service (ENS) is a onchain naming protocol on Ethereum that maps human-readable domain names to blockchain-based identifiers. ENS maps '.eth' domains to identifiers like blockchain addresses, content hashes, and metadata records.

By mapping blockchain data to human-readable names and domains, ENS is the GPS needed to navigate the onchain internet.

For onchain websites, in particular, ENS plays a key role:

1. Provides **censorship-resistant** domain names that point to onchain hosting platforms like IPFS.

2. Automates domain control using **smart contracts**, eliminating all central authorities.

3. Enables **discoverability by reverse resolution** i.e. associating metadata and public addresses with an ENS name.

4. Integrates seamlessly with dApps, crypto wallets, and other web3 components, ensuring more **intuitive website management**.

5. Ensures the owners have **full control** over the website with the ability to update, transfer, or sell their domains.

> 💡Learn more onchain domains — <u>[ENS, and Unstoppable Domains](/guides/builders-stack-decentralized-domains/)</u>

---

## **How do IPFS and ENS complement each other?**

IPFS and ENS are the building blocks of a public digital infrastructure. They enable permissionless innovation for developers and creators to innovate, build, and distribute their work and data — without any central authority.

While IPFS secures data by distributing it across a wide network of nodes, ENS makes it simpler for users to find that data.

The synergy between IPFS and ENS opens up a lot of possibilities like:

- **Independent media platforms** for journalism and activism without any surveillance or control.
- **Open-source** code repositories and package registries which are tamper-proof.
- **Marketplaces and e-commerce** running on a peer-to-peer model without any intermediaries.
- **Secure messaging platforms** where people are identified using their ENS names.
- **Estate management** with secure legal documents stored on IPFS, executed via smart contracts.

💡Start hosting websites on IPFS using Fleek <u>[easy-to-deploy templates](https://blog.fleek.xyz/post/fleek-templates-guide/)</u>

---

### **How do you link IPFS stored to ENS domain names?**

Fleek streamlines the linking of an ENS domain (.eth) to IPFS-hosted sites. When hosting a site on IPFS through Fleek, your IPFS content hash associated with an ENS domain can be updated on each deployment. This ensures that the ENS domain always points to the latest version of the site hosted on IPFS.

Integrating IPFS and ENS using Fleek essentially means setting the ENS name's content record to point to your website's IPFS hash or CID.

### **Steps to link ENS domains to IPFS-hosted websites**

To link ENS domains to IPFS-hosted websites now, follow these steps:

1. Navigate to your site deployed on <u>[Fleek.xyz](http://fleek.xyz/)</u>

2. Go to the domains section of the settings, click the **"connect ENS domain" button**.

## **Build & experience onchain websites using Fleek**

Onchain websites are poised to reshape how information is accessed and transmitted on the internet. They stay online irrespective of policies, outages, or bans placed by central authorities. The adoption of IPFS storage and ENS domains is steadily rising, and the need for permissionless innovation and anti-censorship grows.

The current onchain infrastructure is far from being a developer's playground. However, with Fleek, developers can outsource the complexities and focus on building onchain websites, their business logic, and beyond.

**Try out our full suite of IPFS-powered storage, hosting, and publishing tools. Get started with** <u>[Fleek](https://fleek.xyz/)</u> **today.**

---

## **FAQs - Frequently Asked Questions**

### **1. If I have a self-hosted website on IPFS, can I use Fleek to link that to my ENS?**

Yes, you can use Fleek to link your self-hosted website on IPFS by updating the domain's content record.

### **2. What happens if I lose access to my private keys or ENS ownership somehow?**

If you don't have any backup or recovery options set up, then yes, losing access to private keys means the ENS domain is permanently inaccessible.

### **3. Are onchain websites currently supported across all major browsers?**

Brave is currently one of the only browsers that provide native support to IPFS. Apart from that, browsers like Chrome, Firefox, Opera, and Edge have extensions using which IPFS-hosted websites and content can be accessed.
