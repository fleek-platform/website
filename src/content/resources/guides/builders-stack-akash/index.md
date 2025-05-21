---
title: 'Build3rs Stack: Akash'
date: 2023-02-24
desc: 'The builders guide to Akash Network, the most important features, applied use-cases, and why it’s important to understand what you can build with it as a web3 developer.'
thumbnail: './akash-builders-stack.png'
image: './akash-builders-stack.png'
---

Welcome to the Build3rs Stack, our web3 infrastructure overview series! In this piece we will talk in depth about **the [Akash Network](https://akash.network/), its most important features, applied use-cases**, and why it’s important to understand what you can build with it as a web3 developer.

In a nutshell, Akash is an open, decentralized network where people can **buy and sell computing resources (like storage or computing power)**. The main purpose of Akash is to provide a decentralized, user-owned, alternative to the traditional web2 cloud, which makes it the perfect choice for web3 developers who don’t want their dApp’s to rely on web2 cloud providers.

---

## TL;DR: What is Akash Network and How Does it Work?

!["Sovereign Infrastructure that Scales" slogan with black color background](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/preview.png)

Imagine a **marketplace for cloud computing that operates in a decentralized and open-source environment** - that’s exactly what Akash Network is! The platform provides a solution for developers who want to create decentralized applications (web3 apps) that are also cost-effective, highly efficient, and adaptable cloud-based infrastructure.

You can **host any containerized application, run on Akash’s decentralized network**. The network itself holds and distributes the computing and storage offered by its node providers, and then the Akash Platform allows you to do deployments to this cloud network, manage workloads, and do any app/operation through containerized computing instances. You submit workloads to providers, and they execute it for you in exchange for AKT.

One important aspect of Akash is that **anyone can become a cloud provider**. Anyone can sell their excess bandwidth on the Akash blockchain-based marketplace to maximize their output of unused resources. The network also strives for interoperability with major existing cloud infrastructure and cloud-based apps, making it a viable partner for major cloud service providers.

---

## Akash in Features: Computing and Hosting.

Akash’s features directly correlate with what you might imagine from traditional web providers. It provides **leasable decentralized infrastructure** so that you can host any application, computing, or server-type of operation on web3 cloud.

- Execute on-demand cloud computation.
- Hosting cloud-native applications / docker containers.
- Ephemeral and permanent storage.

Since **you can run any cloud-native application**, the folder of use-cases with Akash is massive. From hosting a website served from Akash or a game’s server, to running a service that executes a computing operation for you (e.g. Server-side rendering!). Storage usually is ephemeral on Akash, depending on the needs of the app, but as of a recent update, Akash can [store permanently](https://akash.network/blog/akash-network-unlocks-persistent-storage-through-mainnet-3-upgrade/) for the length of the lease of the resources.

---

## How can you use it as a builder? Applied use-cases.

Let’s see more in depth some real use-cases with examples using Akash’s features to understand the value of the network and when you can use it.

**Hosting Nodes - (e.g. [IPFS](https://github.com/akash-network/awesome-akash/tree/master/ipfs))**

This is the best example of a container server app, running an IPFS node itself that you can interact with, running on an Akash provider.

**Server-hosted CI - (e.g. [Jenkins](https://github.com/akash-network/awesome-akash/tree/master/jenkins))**

One potential use-case for deploying Jenkins on Akash Network is to improve the speed and reliability of software development processes running a decentralized CI/CD using compute from Akash to process builds.

**Web Hosting - (e.g. [Balancer](https://github.com/akash-network/awesome-akash/tree/master/balancer))**

Or deploy a server hosting your frontend for DApps or simple websites! Here is an example from Akash for hosting Balancer’s frontend, a DEX. While in this case a frontend is being hosted on the network, you can also host more complex instances such as your game’s server itself.

You can also check out the repository [Awesome Akash](https://github.com/akash-network/awesome-akash) with a list of all the deployment examples to keep understanding with real applied use-cases.

---

## Getting Started with Akash Network

There are many ways to get started with Akash, whether you build and deploy your own container directly, or use one of Akash providers in the ecosystem. Let’s review some of them.

**In short your development flow will be:**

1. Defining your app/service Docker image, CPU, Memory, and Storage requirements, price and placement (in an SDL).
2. Deploying your app/service to Akash without any server setup to instantly receive bids from providers on the network.
3. Accepting a bid and notifying the provider to publish your deployment to the world.

First of all, it’s important to take a look at the [development official documentation](https://docs.akash.network/) to understand the basics and get started. Then, explore **how to make your first deployment** to the network:

- [Learn everything about setting up a Stack Definition Language (SDL)](https://docs.akash.network/readme/stack-definition-language)
- [Guide to run the CLI](https://docs.akash.network/guides/cli/detailed-steps) - start with the setup environment.
- [Deploy with Cloudmos](https://cloudmos.io/cloud-deploy) - deploy any container/SDL to Akash with Cloudmos.
- [Create your first deployment](https://docs.akash.network/guides/cli/detailed-steps/part-7.-create-your-deployment) - guide to how to deploy with Akash.
- [SDK javascript](https://github.com/akash-network/akashjs) - JS library to interact with Akash Network.
- [See all available integrations with Akash](https://docs.akash.network/deploy)
- [Core Community Groups ](https://akash.network/community/akash-insiders/)- Community groups working on standards related to Akash.

---

## Wrapping it up ⚡

We hope this guide has helped you to take your first steps in Akash and understand how you can use it when building web3 apps!. Follow [Akash](https://akash.network/) on twitter for more updates.

Don't forget to check out the previous and upcoming Build3rs Stack to stay up to date with new technologies in infra-stack! And join our discord to follow our features!

For more resources visit [our LinkTree](https://linktr.ee/fleek).
