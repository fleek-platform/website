---
title: 'Build3rs Stack: IPFS'
date: 2023-03-04
desc: "The builder's guide to IPFS: how to use it in your project's Web3 infra-stack, and what you can achieve with it."
thumbnail: './ipfs-net.png'
image: './ipfs-net.png'
---

Welcome to the Build3rs Stack, our web3 infrastructure overview series! **This week we will cover [IPFS](https://ipfs.io/)**, the **I**nter**p**lanetary **F**ile **S**ystem Protocol! We’ll talk about how you can use this storage/content-addressing protocol to build on web3, and the features and options it can enable for you as a developer.

In brief, IPFS is a decentralized peer-to-peer protocol and network designed to create a distributed method for storing and sharing files with anonymous peers, without the necessity of centralized server or cloud storage infrastructure! IPFS introduces many fundamentals to Web3 development such as **[IPLD](https://ipld.io/docs/data-model/)**, a data model where files are content addressable, not referenced via URLs.

There’s a lot to cover, and we surely will only scratch the surface, but let’s dive in!

---

## TL;DR: What is IPFS and How Does it Work?

To understand the vision and main purpose of IPFS we need to first know the **difference between centralized & decentralized services**. Typically, centralized services store data on a single server that is managed and controlled by a single entity or organization.

Users access this server to access their data, but this approach can create a bottleneck when a large number of users try to access the data at the same time. On the other hand, IPFS uses a decentralized model to eliminate centralized points of risk, **distributing and serving the data across a network of p2p nodes.**

The IPFS network is joinable to anyone who runs the software on their computer and consists of many, independently **run nodes that can store data making it accessible to anyone who requests it**. Additionally, instead of specifying where the data is located when making a request (ex: https://examplesite.com/location/sublocation), **users simply query the network based on the requested content’s unique address, or hash**. Since the data is saved on multiple nodes, each one can contribute parts of the data to your request at the same time, much like when you download a file using a torrent.

Files are “pinned” on a node. Meaning, **knowing the hash of a file’s content, any node can choose to pin -or store locally- a copy of that file**. The more pins, the better the distribution and decentralization of the storage of that resource.

This method aims to **reduce delays, lower bandwidth usage, and prevent traffic jams that can happen when relying on a single, central server**. This system makes it easy to share files, and verify they haven't been changed. It also lets people keep track of different versions of a file, which is great for project versioning, or keeping records over time.

---

## IPFS in Features: File Storage & Decentralized Data Sharing

IPFS offers a powerful set of features for storing and accessing files in a decentralized, secure, and efficient way. As more people adopt IPFS, it has the potential to fundamentally transform the way we store and access data on the web.

- File storage
- Decentralized data sharing (gossiping)
- Trustless file retrieval

**File Storage:** IPFS is designed to store files or data in a distributed way, where the file is broken into smaller chunks, hashed, and stored across multiple nodes on the network. This allows for efficient and scalable storage of large files, as well as fast and reliable retrieval of files since the data is not bottlenecked by a single source.

**Decentralized Data Sharing (Gossiping):** Since IPFS is an open network where nodes are encouraged to seed files (download & host them), the network needs to have a robust way of content discovery. This is where gossiping comes in – in a nutshell, when searching for a new file, a node will chat with its peers, who chat with their peers, and so on, until the content (identified by CID) is found and returned to the original peer.

**Trustless File Retrieval:** Files on IPFS are broken into smaller chunks, each with their own unique CIDs as well. In order to facilitate trustless retrievals, [Merkle Trees](https://en.wikipedia.org/wiki/Merkle_tree) can be constructed using the hashes of each chunk to trustlessly the exact same content requested is the content that was delivered. In a network full of anonymous nodes, this eliminates the need to rely on trust in a counterparty.

Route data in IPFS refers to the process by which files are located and retrieved from the network - each file is assigned a unique content-addressed hash, which serves as a unique identifier for the file. When a user wants to retrieve a file, they send a request to the network, which uses a distributed routing algorithm to locate the node or nodes that have a copy of the file. The file is then retrieved from the nearest node, reducing latency and improving performance.

---

## How can you use it as a Builder? Applied Use-cases.

Let’s check out in depth the real use-cases to understand the value of IPFS with some examples and when you can use it.

**Distributed Package Management (e.g: [npm](https://www.npmjs.com/))**

Most package managers, including NPM, are typically centralized, meaning that they are stored and managed on a single server - By hosting software packages on IPFS, **they can be stored in a distributed manner that is publicly available**, providing more resilience and availability. Moreover, any changes to the package's versions, such as bug fixes, will result in a new CID value, allowing for easy verification of updates and tracking the development of packages over time.

**Decentralized Database (e.g: [Orbit DB](https://github.com/orbitdb/orbit-db))**

OrbitDB is a specific implementation of a decentralized database **that utilizes IPFS for data storage and IPFS Pubsub for synchronization between nodes**. One of the key benefits of Orbit is its ability to handle conflicts in a distributed environment: is particularly well-suited for use in decentralized applications (dApps), blockchain-based and offline-first web applications. Its Go and Javascript implementations make it accessible to a wide range of developers and users.

IPFS has a lot of example projects very helpful to understand more the applied features. You can check out the GitHub repo [with a full list of examples.](https://github.com/ipfs/awesome-ipfs)

**Hosting Static Websites (e.g: [Fleek Sites](https://fleek.xyz))**

IPFS is a great resource for hosting static website files. Users can download sites locally and access them forever, or use a gateway, such as https://ipfs.io/ipfs/ to access the site from IPFS in their browser. Alternatively, some browsers such as Brave are starting to adopt IPFS locally, allowing you to access websites using the IPFS protocol natively (ipfs://website-CID-here) rather than traditional HTTPS (https://website-link-here.com).

Going one step further, services such as Fleek & Spheron have sprouted to enable managed experiences for hosting IPFS websites accessible through traditional domains. [Check our documentation to try it out!](/docs/)

---

## Getting Started with IPFS

There are some ways to get started with IPFS, but this protocol is huge - **so here we will start with a quick guide about how to run a node with IPFS via CLI.**

**Step 1: Install IPFS**

The first step is to download and install IPFS on your device. IPFS is available for all major operating systems, including Windows, macOS, and Linux.

After that, run the following command to install IPFS:

    ./install-ipfs.bat

Wait for the installation to complete. Once it's done, you can proceed to the next step.

**Step 2: Initialize your IPFS Node**

Now that you have installed IPFS, you need to initialize your node. This will create a new IPFS repository on your computer and generate a unique identity for your node. Here's how to do it:

- Open a command prompt or terminal window and navigate to the IPFS folder.

- Run the following command to initialize your node:

      ipfs init

Wait for the initialization process to complete. Once it's done, you can proceed to the next step.

**Step 3: Start your IPFS node**

Now that you have initialized your IPFS node, you can start it and connect to the IPFS network. Here's how to do it:

- Open a command prompt or terminal window and navigate to the IPFS folder.
- Run the following command to start your node:

      ipfs daemon

Wait for the IPFS daemon to start. You should see a message like this:

    Initializing daemon...
    Successfully raised file descriptor limit to 2048.
    Swarm listening on /ip4/127.0.0.1/tcp/4001/...
    API server listening on /ip4/127.0.0.1/tcp/5001/...
    Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080/...
    Daemon is ready

And that’s it! Your IPFS node is now running and connected to the IPFS network.

Here we’ll give you a list of the most helpful resources to get started with IPFS - starting with the official documentation.

- [Read the official docs](https://docs.ipfs.tech/) - first of all you can read the developer documentation where you can find many resources and tools.
- [Install as a CLI](https://github.com/ipfs/js-ipfs#install-as-a-cli-user) - install IPFS globally with the CLI.
- [Browser IPFS extension](https://github.com/ipfs/ipfs-companion) - this simplifies your IPFS access by giving your browser support for resolving IPFS hashes.
- [IPFS Desktop Tutorial](https://docs.ipfs.tech/how-to/desktop-app/#install-ipfs-desktop) - with this guide you can learn the basics of adding files to IPFS.
- [Javascript SDK](https://github.com/ipfs/js-ipfs) - SDK to implement IPFS with Javascript.
- [Awesome IPFS](https://github.com/ipfs/awesome-ipfs) - full list of helpful resources on IPFS.
- [Fleek Documentation](/docs/) - Visit our docs to learn more about our CLI, its IPFS features, and more!

It’s important to note that given the lack of incentive at the IPFS protocol level, most people rely on pinning providers like Fleek to ensure files are stored multiple times on multiple nodes on the network. [Fleek Network](https://fleek.network/) will help address this by decentralizing IPFS and making it storage-layer agnostic. Learn more in [this article.](https://blog.fleek.network/post/how-fleek-network-helps-decentralize-ipfs/)

---

## Wrapping it up

We hope this guide offers you the necessary tools to get started with IPFS and understand more about this protocol and how you can use it. Follow [IPFS](https://twitter.com/IPFS) and [Protocol Labs](https://twitter.com/protocollabs) for more info and updates.

Don’t forget to take a look into our past Build3rs Stack series and the coming ones to stay up-to-date with web3 infra. Also join our discord to get in touch with us!

For more resources visit [our LinkTree](https://linktr.ee/fleek).
