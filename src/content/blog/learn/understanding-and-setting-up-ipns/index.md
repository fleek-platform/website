---
title: 'Understanding IPNS — InterPlanetary Name System: A Developers Guide'
date: 2024-07-24
desc: 'Learn how IPNS enhances IPFS with mutable content addressing and enables the creation of dynamic websites and applications on the onchain web.'
thumbnail: './ipnslearn.png'
image: './ipnslearn.png'
author:
  - 'Fleek'
---

InterPlanetary File System (IPFS) redefines how information can be stored, accessed, and shared across the internet. A key enabler of this is IPFS’ usage of content-based addressing, where each piece of content on IPFS is identified by a unique hash or content identifier (CID).

CIDs are unique labels in IPFS that serve to identify and address data. They are generated based on the content's cryptographic hash to ensure content authenticity. Any alteration in the content results in a different CID.

While CIDs make the content on the web more resilient and immutable, it presents challenges when it comes to updating or modifying content. From difficulty in content discovery to challenges related to collaborative efforts, CIDs’ immutability is a logistical nightmare.

This is where the InterPlanetary System (IPNS) comes into play. Let’s explore what IPNS is, how it works, and how it helps in onchain hosting:

---

## **IPNS brings mutable addressing to IPFS**

<u>[The InterPlanetary Naming System or IPNS](https://docs.ipfs.tech/concepts/ipns/)</u> is a global namespace within the IPFS ecosystem. It leverages Public Key Infrastructure (PKI) to create mutable pointers called IPNS names to immutable CIDs.

This makes it possible to update the pointer to a new CID every time a change is published. As a result, content can be updated without changing the link shared with users.

**In other words, IPNS can be thought of as a system used to create links that can be updated over time, while still retaining the verifiability that comes with content addressing.**

### **How IPNS works**

In IPNS, a name is generated by hashing a public key associated with an IPNS record. This name is then distributed across the IPFS network so it can be resolved to retrieve the content. Here’s what the process looks like:

- **Key generation:** A cryptographic key pair consisting of a public and private key is generated using built-in commands provided by the IPFS.
  - The public key is used to derive the IPNS name and can be publicly shared without compromising security.
  - The private key, on the other hand, is used to update content and the IPNS records associated with it.
- **Host the file on IPFS**: Next, publish the content on IPFS to get the CID that the IPNS record will point to. An IPNS record is a data structure that maps the IPNS name to the current version of the content on IPFS and ensures that anyone resolving the content gets access to the most up-to-date content.
- **Use the <u>`[ipfs name publish](https://docs.ipfs.tech/how-to/publish-ipns/#publishing-ipns-names-with-kubo)’</u> command:** This command creates the IPNS name and records and propagates the file through transport protocols like <u>[Distributed Hash Table (DHT)](https://docs.ipfs.tech/concepts/dht/)</u> or <u>[PubSub](https://blog.ipfs.tech/25-pubsub/)</u> so it can be retrieved.
- **Resolving the IPFS name**: Resolving an IPNS name involves querying the network to retrieve the current IPNS record associated with that name, which in turn points to a CID on IPFS. In other words, it refers to following a mutable link to access the latest version of the content.
- **Caching:** To improve efficiency, resolved IPNS records can be cached locally for a period (defined by the record's Time-to-live or TTL). This reduces the need for frequent network queries for popular or frequently accessed IPNS names.

Alternatively, developers can create an IPNS record without manually handling cryptographic keys or IPNS naming conventions with a simple function call using <u>[Fleek’s IPNS SDK](https://hosting.fleek.xyz/sdk/ipns/)</u>.

In addition to making record creation easy, Fleek’s SDK also abstracts away the complexity associated with publishing, updating, querying, listing, and deleting IPNS records. This allows developers to focus on building their applications without needing to dive into the lower-level details of IPNS and IPFS.

### **Why use IPNS for onchain content delivery**

IPNS offers several key advantages for onchain content delivery such as:

- **Content mutability**: IPNS allows updates to content without changing the CID itself. This allows for the creation of dynamic IPFS-hosted websites and applications that don’t require users to continually remember new addresses.
- **Secure versioning:** Every content version stored on IPFS has its own unique hash, effectively acting as a fingerprint. This allows for tracking and accessing all previous content versions.
- **Persistent access:** As long as the content remains accessible on the IPFS network, it can be retrieved using its IPNS address. This eliminates the risk of content disappearing due to server shutdowns or censorship attempts.

While IPNS offers distinct advantages like dynamic updates, other options like <u>[Ethereum Name Service (ENS)](https://ens.domains/)</u> also exist.

## **IPNS and ENS: Creating a user-friendly onchain web**

While IPNS names solve the issue of content mutability on IPFS, they’re still not human-readable. For example, an IPNS name might look something like this:

/ipns/QmTzQ1N9nBcghB4zDd9fNCTDhLx9Zs4tW3A9H2m7YyKgVH.

This is where the Ethereum Name Service (ENS) comes into play for users within the Ethereum ecosystem. ENS allows you to map a human-readable name, like example.eth, to various resources, including IPNS addresses.

Here’s how ENS and IPNS can be used in tandem to create a more accessible and user-friendly onchain web:

- **Content hosting on IPFS**: A user uploads content to IPFS and receives a unique content hash for accessing that content.
- **Mutable addressing with IPNS:** The user creates an IPNS record that points to the IPFS content hash. This IPNS address can be updated to point to new versions of the content without changing the address itself.
- **Human-readable names with ENS:** The user associates an ENS domain (e.g., example.eth) with their IPNS address. This step requires interacting with the Ethereum blockchain to update the ENS record.

### **Using IPNS on Fleek**

There are a few ways you can leverage IPNS on <u>[Fleek](https://fleek.xyz/)</u>.

**1. Fleek SDK**

Developers can use [Fleek SDK](https://hosting.fleek.xyz/sdk/ipns) for IPNS to manage IPNS records. The SDK allows authenticated users to create, publish, list, and delete IPNS records within a selected project.

Operations include:

- Creating an IPNS record, which generates an object with an ID, name, and associated IPFS CID,
- Publishing an IPNS record by associating an IPFS hash with it,
- Listing all IPNS records tied to a project; and
- Deleting an IPNS record using its ID.

This SDK simplifies managing mutable pointers to CIDs, facilitating dynamic content updates for data stored on IPFS..

**2. Fleek CLI**

Alternatively, developers can use <u>[Fleek CLI](https://hosting.fleek.xyz/cli/)</u> interacting with IPNS records.

Similar to the SDK, key functionalities of the CLI includes creating an IPNS record and signing it (with Fleek managing the private key), publishing a record to advertise it across nodes, resolving an IPNS record to retrieve the associated CID, and listing all IPNS records within a project.

Fleek provides developers with command-line tools for straightforward IPNS record management, including updates and deployment associations, enhancing the experience of content management on IPFS.

Both these processes eliminate the need for manual updates and transactions for each content change, significantly reducing the time and cost associated with maintaining up-to-date onchain websites.

## **Is IPNS the missing piece for onchain hosting?**

IPNS represents a significant advancement in the realm of onchain hosting, offering a dynamic solution to the challenge of mutable content addressing on the immutable IPFS (InterPlanetary File System) network.

It facilitates the creation of dynamic, onchain websites and applications by enabling stable, persistent identifiers that can point to updated content without changing the identifier itself.

However, despite its potential, IPNS is not without its shortcomings, which have implications for its broader adoption in onchain hosting solutions.

One of the primary challenges is the process of creating and managing the IPNS records itself. The process can be complex and daunting for developers new to the IPFS ecosystem.

However, with Fleek, developers can interact with IPNS through a more intuitive interface, reducing the complexity and technical barriers associated with direct IPNS usage.

<u>[Sign in](https://fleek.xyz/)</u> and get started with building and hosting applications leveraging IPNS today on Fleek.xyz

---

## **FAQs**

### **What are the benefits of IPNS?**

IPNS allows for the creation of dynamic content under a stable, persistent identifier. That means developers can update or modify content without changing its access link, facilitating easier content management and discoverability.

### **Can IPFS gateways resolve IPNS names?**

Yes. You can use IPFS gateways to resolve IPNS names using path resolution or subdomain resolution. However, when you use an IPFS gateway to resolve IPNS names, you’re relying on it to provide accurate content.

### **How does one set up an IPNS name?**

To set up IPNS in the conventional way, you need to create cryptographic key pairs, publish content to the IPFS, and use IPFS’ built-in commands. Alternatively, you can also use

<u>[Fleek’s SDK](https://hosting.fleek.xyz/sdk/ipns/)</u> to streamline the process.
