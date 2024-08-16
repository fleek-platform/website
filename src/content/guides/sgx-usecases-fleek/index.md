---
title: 'Use cases and what to build with Intel SGX on Fleek'
date: 2024-08-15
desc: '10 use cases alongside examples of what can be built with Intel SGX on Fleek'
thumbnail: './usecasessgx.png'
image: './usecasessgx.png'
author: 'Fleek'
---

One of the core goals on the Fleek roadmap is to offer a comprehensive full-stack developer experience. Integrating Trusted Execution Environments (TEEs) powered by Intel’s Software Guard Extensions (SGX) processors into Fleek Network opens many possibilities for developers looking to build secure and scalable applications or protocols.

In this blog post, we will be exploring several use cases that can be built with SGX on Fleek, getting the best of both worlds; the performance and scalability of Fleek Network’s onchain edge-optimized cloud with the top-notch security and verifiability guarantees provided by SGX for your applications. To understand what TEEs and SGX are and within Fleek, check <u>[this deep dive](https://fleek.xyz/guides/understanding-tees-and-sgx-fleek/)</u> by our engineering team.

Below are 10 use cases alongside examples of what can be built with each one:

---

## 1. Confidential data processing

**Use Case**: Applications that require processing sensitive data without exposing it to potential threats, such as financial transactions, personal health information, or proprietary business data.

**What to Build**: Develop an onchain healthcare application that securely processes patient data across a distributed network. Using SGX, you can ensure that data remains confidential throughout the processing lifecycle, even in a public cloud environment. As an example, you can have a case where users come to the application to input medical history records and information about themselves. Information like that can be encrypted such that it can only be decrypted in the enclaves within Fleek Network to prevent malicious access and grant access to programs that can access the enclaves to decrypt needed information on demand.

## 2. Privacy-preserving smart contracts

**Use Case**: Blockchain-based applications where transaction data must remain private while still being verified by the network.

**What to Build**: Create an onchain finance (DeFi) platform that enables privacy-preserving transactions. SGX enclaves can take users' programs that utilize private information and run them in the secure environment provided to users within the TEE. These programs can be remotely attested and reproduced to other enclaves within other nodes.

## 3. Trusted oracles for blockchain

**Use Case**: Bridging the gap between onchain and offchain data with high integrity and security guarantees.

**What to Build**: Develop a trusted oracle service that fetches and verifies off-chain data before providing it to smart contracts on the blockchain. Using SGX, you can ensure that the data is retrieved and processed in a secure environment, preventing tampering or unauthorized access. Other benefits of this beyond providing that encrypted information to other nodes that have the same program running include easy tracing of information back to the source, prevention of data loss as the information gets reproduced easily, remote attestation to verify data program genuineness, and the data can be proven on the smart contract to have come from a secure enclave.

## 4. Secure multi-party computation (MPC)

**Use Case**: Scenarios where multiple parties need to compute a function over their inputs without revealing those inputs to each other.

**What to Build**: Build a collaborative data analytics platform that allows multiple organizations to perform joint analysis on their combined datasets. With SGX, each party’s data remains encrypted and private, while the analysis is performed in a secure enclave.

## 5. Secure data management

**Use Case**: Storing sensitive data securely, ensuring that it can only be accessed under specific, authorized conditions.

**What to Build**: Design a secure file storage system that uses SGX to encrypt and seal files before storing them in the cloud. This system can ensure that only authorized users can decrypt and access the files, even if the storage infrastructure is compromised.

## 6. Building blocks for protocols

**Use Case**: Build powerful protocols with the ability to maintain security across all entities.

**What to Build**: Build an AVS (Actively Validated Service) that leverages both the capabilities provided by SGX in combination with the Fleek Network to create an even more resilient protocol, with operations such as validation, maintaining a resilient onchain system that is secure, authenticated, and encrypted. Most protocols have an AVS that serves as their powerhouse. A protocol infrastructure equipped with the encryption and decryption paradigms of enclaves provided by SGX has proactiveness guaranteed.

## 7. Onchain identity management

**Use Case**: Protect user identities and personal information within onchain systems.

**What to Build**: Develop an identity management system that securely manages user credentials and personal data using SGX. This system can ensure that identity data is protected from unauthorized access and only shared with trusted parties. Verification of proof of existence can be supported here by having people be able to upload their proof of identification and having the system cross-reference that with securely stored information on Fleek Network enclaves to have the system gain identity management.

## 8. AI model verification and integrity assurance

**Use Case**: Ensuring the correct AI model is executed, preventing the use of cheaper or less accurate alternatives.

**What to Build**: Create a platform that uses SGX to securely verify and attest that the intended AI model was run, ensuring transparency and trust in AI-driven decisions. In certain scenarios when running multiple AI models within a system, a wrong model could be interacted with which in most cases cannot be proven. Having SGX enclaves that can grab information on AI models within the system, store them, and then use them later on to identify the models will help to know which models are running and ensure that system requirements are met.

## 9. Secure content delivery networks (CDNs)

**Use Case**: Protecting sensitive media content and user data during delivery across distributed networks.

**What to Build**: Develop a secure CDN that leverages SGX to encrypt and decrypt content on the edge servers, ensuring that media files are only accessible to authorized users. This approach can protect intellectual property and prevent unauthorized access or piracy, even as content is distributed globally.

## 10. Fleek Functions

**Use Case**: Leverage <u>[Fleek Functions](https://fleek.xyz/blog/announcements/introducing-fleek-functions/)</u> to interact with and manage data in a serverless environment while maintaining their modular nature.

**What to Build**: Leverage Intel SGX with Fleek Functions by creating an authentication service that encrypts sensitive user or API data within an enclave. Store this data securely alongside the logic for operations like managing storage references. Fleek Functions are able to query, retrieve, and interact with sensitive data, while maintaining its privacy via the enclave.

---

As Fleek progresses toward offering a modern, end-to-end experience for full-stack developers, the integration of Intel SGX processors within Fleek Network will arm developers with powerful tools to build performant, secure, scalable, and privacy-preserving applications. From confidential data processing to privacy-preserving smart contracts, from secure content delivery to AI model verification, the opportunities for innovation are plenty.

You can learn more about Fleek, Fleek Network, and Fleek Functions, and how TEEs and SGX are integral to Fleek’s onchain edge network in our <u>[docs](https://fleek.xyz/docs/)</u>, by joining our <u>[Discord](https://discord.com/invite/fleek)</u> Server or following <u>[Fleek](https://x.com/fleek)</u> on X ⚡
