---
title: 'What is ENS (Ethereum Name Service)? A Beginners Guide'
date: 2024-07-24
desc: 'Learn about the Ethereum Name Service (ENS), how it works, and its benefits for onchain hosting and simplifying interactions in the Ethereum ecosystem.'
thumbnail: './ensbegguide.png'
image: './ensbegguide.png'
author:
  - 'Fleek'
---

The Ethereum Name Service (ENS) is a chain naming system based on the Ethereum blockchain. Its primary purpose is simplifying interactions within the Ethereum ecosystem by mapping human-readable names to machine-readable identifiers. Put simply, ENS lets you use a memorable name like 'example.eth' in situations where you'd previously have used a long, hard-to-remember crypto address.

ENS has many uses. It simplifies cryptocurrency transactions and can serve as an onchain identity service. Most useful for website owners, ENS domains play a pivotal role in onchain web hosting, where they do the same job as the traditional domain name system. It allows web users to enter a domain name in their browser to load an onchain website hosted on a distributed file storage platform, like the Interplanetary File System (IPFS).

However, unlike DNS domains, ENS is onchain, resistant to censorship, and resilient. In this article, we'll explore what ENS is, how it works, and its role in secure, onchain hosting.

## ENS: The Building Blocks

To understand how an ENS domain name works, you should be aware of the system's key components. These components include the Ethereum blockchain, smart contracts, the ENS Registry, and ENS Resolvers. Let's explore each of these elements in more detail.

### Ethereum Blockchain

You may be familiar with the Ethereum blockchain because of its native cryptocurrency, Ether, or the many other crypto tokens based on the blockchain. However, unlike the Bitcoin blockchain, Ethereum is a general-purpose distributed computing platform. It can run many distributed applications besides crypto tokens, including a name service.

The blockchain ensures ENS records are immutable and secure, making them resistant to tampering, censorship, and downtime.

### Smart Contracts

Smart contracts are self-executing programs that run code on the Ethereum network. They are stored on the blockchain and automatically execute when predetermined conditions are met. ENS uses smart contracts to manage the registration and resolution of domain names.

### ENS Registry

The ENS Registry is a smart contract that records the domain names and subdomains of the Ethereum name service. It stores information such as the domain owner (the owner's public key) and, most importantly, the resolver responsible for processing lookups.

### ENS Resolvers

Resolvers translate human-readable names into machine-readable addresses, such as Ethereum addresses, content hashes, and metadata. When a name like 'example.eth' is queried, a resolver returns the correct Ethereum address associated with that name, or, in the case of onchain hosting, the correct IPFS CID or IPNS address—more on that in the next section.

### ENS DAO

The ENS system is governed by a Decentralized Autonomous Organization (DAO) called the ENS DAO. This community-driven entity makes decisions regarding the development, management, and operation of the ENS protocol.

The ENS DAO is composed of ENS token holders who participate in the governance process by proposing and voting on various initiatives, such as protocol upgrades, fee adjustments, and resource allocation. Each member's voting power is proportional to the number of ENS tokens they hold.

## How ENS Translates Names to Addresses

When a user wants to resolve an ENS name to an Ethereum address, the following process takes place:

- The user queries the ENS Registry for the resolver associated with the domain name.
- The ENS Registry returns the address of the resolver smart contract.
- The user calls the resolver contract, passing the domain name as a parameter.
- The resolver contract looks up the Ethereum address linked to the domain name and returns it to the user.

This process ensures that ENS names can be efficiently translated into their corresponding Ethereum addresses and other records, making it easier for users to interact with the Ethereum network.

### ENS and Onchain Hosting

In the case of onchain hosting, we use ENS to translate the human-readable address into a machine-readable address that points to a website's content. To achieve this, ENS is used with IPFS, a distributed file storage system.

Each site stored on IPFS has a unique content identifier (CID). With the CID, you can retrieve the site from any node in the IPFS network that has a copy. CIDs are immutable, which means you need a new CID every time the site's content changes. To get around this inconvenience, IPFS has its own name service called the Interplanetary Name System (IPNS).

Here's how it works with ENS:

- The website owner creates their website's content and hosts it on IPFS. The IPFS network generates a unique CID for the content.
- Next, they create an IPNS record that points to the CID of their website's content. When the website content changes, this IPNS record can be updated to point to new CIDs.
- The website owner sets the ENS domain's resolver to point to the IPNS address. This way, the ENS domain is associated with the dynamic IPNS address rather than a static CID.
- When users want to access the onchain website, they query the ENS Registry for the resolver associated with the domain name.
- The resolver contract looks up and returns the IPNS address associated with the domain name.
- The user's browser or application uses the IPNS address to retrieve the current IPFS CID.
- The user's browser or application then uses this IPFS CID to retrieve the website's content from the IPFS network, ensuring they always get the latest version of the website.

[Onchain hosting providers](https://fleek.xyz/docs/platform/domains/) oversee the hosting, domain management, and IPNS updates. A compatible browser (or browser plugin) takes care of the lookup. From a site user's perspective, the experience is much the same as on the traditional web—they enter an address, and the browser loads the page.

By combining ENS with IPFS, users can create and access onchain websites resistant to censorship and single points of failure. The ENS domain acts as a human-readable pointer to the website's content, while IPFS ensures that the content is stored and distributed.

## Comparing ENS with Traditional DNS

To better understand ENS, it's helpful to compare it with the traditional Domain Name System (DNS) used on the internet.

DNS is a hierarchical system that maps human-readable domain names (e.g., <u>[www.example.com](http://www.example.com/)</u>) into IP addresses (e.g., 192.0.2.1). When a user types a DNS name into their web browser, DNS servers are queried to resolve the domain name to an IP address, enabling the browser to connect to the correct server and load the requested website.

DNS is a complex, hierarchical network, but the basics of how the domain name system works are as follows.

- The site owner registers a domain name with a domain name registrar. Registrars manage the registration process and the sale—more accurately, the leasing—of domains to site owners.
- The registrar sends the registration information to a registry. Registries manage the domain names for a particular top-level domain, like .com. They associate the registered domain with the name servers provided by the site owner through the registrar.
- The site owner configures their web host or DNS host with DNS records that map the domain to an IP address.
- When a user enters a domain name or clicks a link in their web browser, the browser queries DNS servers. There are many levels of caching and recursion, but a successful lookup ultimately depends on root servers managed by organizations coordinated by ICANN, TLD servers managed by a registry, and authoritative domain servers managed by the DNS host.

While a DNS works similarly to ENS, the main difference is the dependence on centralized registrars, registries, and DNS hosting providers. Such dependence can make a site inaccessible if its DNS servers fail or it declines to provide the correct IP address. Because ENS is entirely onchain, it does not have this limitation.

Here are the key differences between ENS and DNS.

- **Decentralization:** While DNS is managed by a centralized authority (ICANN), ENS is onchain and governed by smart contracts on the blockchain and the ENS DAO.
- **Security:** ENS records are stored on a blockchain, making them resistant to tampering, censorship, and downtime. DNS names, on the other hand, are more vulnerable to attacks such as cache poisoning and DDoS.
- **Functionality:** In addition to mapping names to addresses, ENS can associate other metadata with domain names, such as content hashes and text records. This enables a broader range of applications beyond simple name resolution.

## Deploy an Onchain Website Today

Fleek makes it easy to host fully onchain websites using an ENS domain and IPFS file storage. We provide everything you need to host censorship-resistant, secure, and resilient sites based on modern web frameworks. <u>[Deploy a site onchain today](https://fleek.xyz) and [add an ENS domain](https://fleek.xyz/docs/platform/domains/).
