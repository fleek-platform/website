---
title: 'NFT Metadata: Storage & Formatting Best Practices'
date: 2023-03-02
desc: 'In this guide, we go over the basic aspects of NFT metadata, the standards to follow, and some of the available options you have as a developer to store them on decentralized web3 protocols'
thumbnail: './nft-metadata-ipfs.png'
image: './nft-metadata-ipfs.png'
---

NFTs are a popular way to own and trade unique digital assets, and many new applications are also arising for NFTs. However, ensuring the authenticity, ownership, and the characteristics themselves of these assets **requires storing metadata, such as the asset’s creator, transaction history, name, description, and more**. All of which are usually specified in… JSON format!

Saving all that data on-chain and on the contracts themselves, would be extremely expensive and inefficient. Therefore while each item or NFT in a collection, and it’s current owner/logic exists on-chain, **the metadata is referenced in each NFT record but stored in a JSON file somewhere else.**

Even though creators can store the metadata using a centralized storage server, like Amazon Web Services (AWS), the choice of a web2 provider comes with several risks of centralization and censorship. Let's dive into **the web3 storage options for NFT metadata you can use to mitigate these risks**, and the basic practices you need to follow.

---

## Current Challenges with Storing NFT Metadata

The biggest concerns when using a centralized storage solution are the **lack of permanence and the introduction of a single point of failure**. If the server hosting the metadata goes down or has a security breach, the metadata associated with the NFT can be lost or manipulated. This potentially renders the NFT worthless.

It can also raise questions about ownership, privacy, and data control. Since the centralized storage solution owners **have complete control over the metadata, this allows them to manipulate or censor the data**. These concerns make a decentralized approach to storing NFT metadata a compelling solution.

A clear example of why NFTs metadata shouldn’t be stored using regular web 2.0 storage solutions is the [FTX NFT issue](https://cointelegraph.com/news/nfts-minted-on-ftx-break-highlighting-web2-hosting-flaws) after FTX crashed. As you can see in the image below, the `uri` property (which refers to the metadata file) points to FTX’s website, **which now only points to the restructuring website, meaning the metadata for this NFT is now lost.** _Image provided via @jacobdotsol on Twitter_.

![NFT FTX Meta data](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/nft-ftx-meta.png)

The owners of this NFT can now not see the image alongside the properties and attributes specified in the metadata file.

![Broken FTX NFT shown on an external NFT platform interface](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/nft-broken-ftx.png)

This issue could have been easily avoidable if, instead of using web 2.0 storage, they had used a **decentralized storage solution like [IPFS](https://ipfs.io/) or [Arweave](https://www.arweave.org/) for saving the metadata file**, that way, a central party couldn’t modify them, and their permanence is ensured either by the network itself (e.g. Arweave) or by the Content Addressability of IPFS which makes for more trustworthy file linking.

---

## Why Decentralized Storage Protocols like IPFS and Arweave are the Solution for Storing NFT Metadata

As exposed in the FTX NFT case, the metadata file is an essential part of the NFT. While web 2.0 storage is unreliable, we have a few web3 options that are ideal for this use-case: **Arweave and IPFS are just some of them!** When a file is stored, it’s saved across a network of nodes, this means no single point of failure, and it can be modified by a central party making it more secure and resilient to attacks.

In the case of **[Arweave](https://www.arweave.org/), files are stored in perpetuity,** and content is addressed by its transaction ID, a hash generated after the file is stored. On this network in particular, in contrast to IPFS, the perpetuity is ensured by the network itself and not the addressability of the content itself.

Last but not least, [IPFS](https://ipfs.io/) main characteristic (content addressability) makes it a highly reliable NFT metadata storage layer. Files on IPFS are referenced by CIDs, or unique hash defined by the content itself, not URLs. **As long as the content is the same, the hash will always be the same. As long as somebody pins the metadata file on IPFS, your NFT will always retrieve the same file.** No broken URLs, or URL changes.

---

## Metadata: Standard Formatting & Best Practices

Metadata follows a **standardized JSON formatting to allow any application that surfaces a user’s account’s NFTs to read these characteristics** and go from NFT#0001... to an actual image with descriptors defined by its characteristics (e.g. Green Dog with a hat!)

In order to allow external applications like OpenSea to pull off-chain metadata specifically for ERC721 and ERC1155 assets correctly, you will need to implement a `tokenURI` method in your contract, it should return an HTTP or IPFS URL, which should return a JSON blob containing the metadata for your token, here is a list of the commonly used properties:

- image: Url to the image of the item, it can be an Arweave URL `ar://<hash>` or an IPFS URL `ipfs://<hash>`
- image_data: Raw svg image data. This will be used if the `image` property isn’t available
- external_url: Url to your site
- description: a human-readable item description.
- attributes: List of attributes for the item
- name

In the end, it might look something like this:

![NFT Metadata Sample Code](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/code-1-nft.png)

You can also check the [Official ERC721 metadata standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) and [Open Sea’s guide for Metadata standards](https://docs.opensea.io/docs/metadata-standards), which covers metadata structure, attributes, numeric traits, and general good practices.

**The number one best practice** to follow when setting your storage’s metadata on your NFT contract is to **always use the IPFS / Arweave file hash** to reference your files via their unique content identifiers. Using http gateway urls to IPFS/Arweave/other files counters the benefits of storing your metadata on these protocols that we detailed above.

---

## Quick Example: Storing NFT Metadata with the CLI Beta

Today we’ll cover how to store your NFT metadata using IPFS via the CLI. We will soon also enable this feature via our SDK, and expand our storage options to [Arweave](https://www.arweave.org/use), [Filecoin](https://filecoin.io/) and other alternative decentralized storage protocols.

You can pin a file on IPFS using Fleek’s CLI by running the command `fleek ipfs add ./your-file-location` will output an IPFS CID and a link to a public gateway so you can open it on a browser.

    > fleek ipfs add hello.txt
    > Success! QmNTCRYiZbtzDGEYtsTKwwtDVQF1XgvebudpRzcXVf5dYM

    > You can visit through the gateway:
    https://ipfs.io/ipfs/QmNTCRYiZbtzDGEYtsTKwwtDVQF1XgvebudpRzcXVf5dYM

![Fleek ipfs demo code sample](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/code-nft-2.png)

---

We hope you find it helpful when considering storing NFT metadata and following the best practices. As we said above, we'll soon expand this guide with examples using our SDK and you will see more storage options coming to Fleek's CLI beta!

If you have any questions or need help storing data on IPFS, hop on our [Discord](https://discord.gg/fleek) and jam with the team!

For more resources, you can visit our **[LinkTree](https://linktr.ee/fleek)**.
