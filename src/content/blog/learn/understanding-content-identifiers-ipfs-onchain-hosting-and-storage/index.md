---
title: 'Understanding IPFS Content Identifiers (CIDs): A Developers Guide'
date: 2024-07-24
desc: 'Explore how content identifiers (CIDs) enable onchain storage, permissionless sharing, and content-based addressing in the IPFS network.'
thumbnail: './cid.png'
image: './cid.png'
author:
  - 'Fleek'
---

The <u>[InterPlanetary File System (IPFS)](https://ipfs.tech/)</u> represents a radical departure from traditional, location-based data retrieval methods, paving the way for a more distributed, resilient, and efficient web. It introduces the concept of content-based addressing, a method that enables users to access information by what the content is.

**But what makes this possible? In this blog, we’ll dive deeper into content identifiers (CIDs), the key elements behind content addressing, and how they can be leveraged in a variety of ways.**

## **What are CIDs on IPFS?**

**A Content Identifier (CID) is a unique label used in onchain storage systems like the InterPlanetary File System (IPFS). It references content based on what it is (its cryptographic hash) rather than its location.**

Since the CID is derived from the hash of the content, any change to the content results in a new CID. This ensures the integrity of the content, as the CID will only resolve to the original, unaltered content.

Here’s why they’re integral to the IPFS ecosystem:

### **Enable content addressing**

CIDs help decouple content from its storage location and allow for it to be accessed without needing to know its specific location within the network. This approach contrasts with traditional web addressing, where content is retrieved from a specified location.

To understand this better, imagine a library where books are provided by its members and are given a unique identification number according to their content. When a reader requests a book using this identification number, they get a list of all the shelves containing a copy of the book.

Consider an alternative system where books are assigned identification numbers according to their shelf placements. In this scenario, readers can only locate books if they are stored in the specific shelf indicated in the records.

However, if the location of a book is modified or if the shelf is damaged, users risk losing access to the content. CIDs and content-addressing prevent this.

### **Facilitate permissionless sharing**

Another benefit that comes from implementing CIDs is that they enable permissionless sharing. Anyone with the CID can access the content without any central authorities.

Note: While CIDs may resemble cryptographic hashes, they’re both fundamentally different. Cryptographic hashes are a fixed string of characters uniquely representing the content, whereas CIDs build on this, incorporating additional information such as the codec, which specifies how to interpret the content.

---

## **Anatomy of an IPFS CID**

The generation of a CID involves several components that encapsulate different types of information about the content:

**Multicodec** identifies the content format and tells the IPFS which tool it should use to process it correctly.

**Multihash** is a special type of cryptographic hash that includes information about itself like the hashing algorithm used (e.g., SHA2-256, SHA3-512), length of hash output, etc.

**Multibase** designates the base encoding scheme (base58, base32) used to represent the CID's binary components like the multicodec, multihash, and version number. This allows CID to be decoded back to its original binary representation.

**Base encodings** are the textual representation of the CID in the specified base. This makes the CID portable and easy to use in various applications, from web URLs to command-line interfaces.

**Prefixes** include a CID’s version, encoding (multicodec), and hash type (multihash). This ensures CIDs are self-describing, allowing systems to understand how to interpret them independently.

Without the prefix, CIDs would lack context, preventing systems from processing them and making it impossible to verify if the content matches the identifier.

**Hash digest** is the output of the cryptographic hash and uniquely identifies the content within a CID. It’s part of a multihash component and ensures any change in the content results in a completely different CID, guaranteeing integrity. The actual hash function used depends on security requirements; "sha2-256" is todays default. You can earn more about the different types of hashing algorithms <u>[here](https://richardschneider.github.io/net-ipfs-core/articles/multihash.html)</u>.

## **Role of CIDs in onchain storage and hosting**

CIDs play an integral role in <u>[onchain storage](https://docs.fleek.xyz/docs/Storage)</u> and hosting as they provide a more secure, efficient, and resilient way to store and access content on the web. Here's an expanded look at the roles CIDs play:

### **Verification and integrity checks**

When a CID is created, the content itself is input into the hash function. This provides guarantees that anyone possessing the original content and its associated CID can recalculate the hash. If the newly computed hash matches the CID, there's absolute certainty that the content has not been tampered with.

This has broad implications– specifically, it provides protection against accidental corruption during data transmission or malicious attempts to deliver modified data. This mechanism works independently of the origin or path of the received data, removing trust away from traditional centralized intermediaries to the unyielding properties of the hashing process itself.

### **Deduplication**

De-duplication is a direct benefit of using CIDs. When multiple copies of the same content are added to the network, they all share the same CID. This means that the network needs to store only one copy of the content, significantly reducing storage requirements and optimizing network resources.

Imagine many users store several copies of the same popular video file. Instead of keeping numerous redundant copies, a CID-based system can recognize that all those files are truly the same based on their matching CIDs.

It can then retain only a single instance of the video data, linking that data to all the CIDs that represent it. This significantly reduces storage requirements.

### **Reduced naming issues**

Traditional website addresses, like those you see in your browser, rely on centralized naming systems like DNS.

These systems act like giant address books, managed by organizations, that translate human-readable names (e.g., www.example.com) into the actual locations (IP addresses) where content lives on servers. This means users need to trust these centralized services to always be available and accurate to find what they’re looking for.

CIDs (Content Identifiers) disrupt this model by making the content itself the address. A CID is generated through a process called cryptographic hashing, creating a unique fingerprint based on the data.

There's no need for external registries or translation services — if you have the CID, you have a direct path to wherever the content exists. This decentralization means there's no single point of control that can censor or block access to data.

## **CIDs — the backbone of IPFS and content-addressing**

In traditional hosting, you need a web address (URL) that points to a specific server.  CIDs turn this model on its head. Since it’s directly generated from the content itself, anyone with the CID can locate that data anywhere on the network.

CIDs also help create networks where every participant is both a user and potential host and enhance the system's overall resilience against control and suppression.

Overall, CIDs enable a multitude of benefits inherent to IPFS, including efficient data distribution, reduced redundancy through deduplication, and enhanced performance via caching.

However, setting up an IPFS node and working with the IPFS network requires plenty of technical know-how and resources. This is where Fleek comes in.

## **FAQs**

### **What is CID in IPFS?**

A CID (Content Identifier) acts like a digital fingerprint for your files within the IPFS network. It's a unique label that's generated based on the file's content itself. This means that the same file, regardless of its location within IPFS, will always have the same CID.

### **What is content addressing in IPFS?**

Content addressing is a way of storing and retrieving data based on its content, rather than its location. This means you can always find a file if you have its CID, even if the file is stored on multiple devices or the location of those devices changes.

### **What is the content of an IPFS hash?**

An IPFS hash contains a cryptographic fingerprint of the data you want to store. This fingerprint is crucial for making the CID and guarantees that your data hasn't been changed or corrupted.

### **How can I generate a IPFS CID for my file?**

To get your IPFS CID, you'll need to add your file to the IPFS network by either running your own IPFS node or using an online IPFS gateway. Once the file is uploaded, the system will generate a unique CID that you can use to locate and retrieve your content on the IPFS network.

### **How to access my IPFS CIDs?**

Through <u>[Fleek](http://fleek.xyz/)</u>, users can access, create, and manage all their IPFS CIDs in one dashboard. Furthermore, users can also automate CID updation using Fleek’s IPNS integrations.
