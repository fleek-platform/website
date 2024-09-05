---
title: 'Introducing Fleek Edge SGX: decentralized, edge-optimized, and dev friendly SGX capabilities' 
date: 2024-09-05
desc: Discover Fleek's Edge SGX service—decentralized, edge-optimized, and secure Intel SGX compute solution for privacy-focused applications with WASM support. 
thumbnail: ./sgxservicefleek.png
image: ./sgxservicefleek.png
---

# Seamlessly add permissionless, performant, and hassle free Intel SGX capabilities into any protocol, app, or use case

We are excited to debut Fleek’s Edge SGX Service powered by Fleek Network. It’s an easy-to-use and highly performant private and verified compute solution built for developers who are looking to add SGX capabilities to their projects without worrying about hardware or devops or any of the other complexities typically associated with SGX and TEE (trusted execution environment) development.

Today we released the V0 Alpha Preview of the Edge SGX service. The goal of the alpha preview is to allow developers to start testing and building with the Edge SGX service over the next few weeks while we work on some finishing touches and improve the DevEx based on early feedback. We highly recommend not using V0 in production environments. The V0 alpha supports WASM in the execution environment, with future support for additional languages on the way.

For more technical details on the SGX integration, you can check out the Fleek Network SGX integration announcement post.

Now let’s jump in.

Key benefits and advantages of Fleek’s Edge SGX service

Recently there has been a lot of renewed excitement around using SGX and TEE’s, especially within the web3 space, as a much more cost-effective alternative for private and/or verified compute needs. One of the main reasons driving this is cost, because alternatives like ZK (zero knowledge) compute can be prohibitively expensive for the vast majority of use cases.

However, for those developers interested in adding SGX or TEE capabilities to their projects, the current options are very time, cost and resource-intensive, require specialized skills, and offer very unfriendly devex. Fleek’s Edge SGX service now offers an alternative option that we believe can be a better, faster, and cheaper way for most developers to add SGX capabilities to their protocols, apps, and use cases.

Below are a few of the unique benefits and advantages of Fleek’s Edge SGX service:

### 1. Private and secure compute with TEEs

Fleek’s Edge SGX service utilizes Intel’s SGX Trusted Execution Environments (TEEs) to ensure that sensitive data remains encrypted and secure, even from the nodes processing the requests. The data is only decrypted inside the enclave, and our unique implementation of a “Shared Secret Encryption Key” across nodes ensures that encrypted data can be handled by any node in the network without compromising security. This guarantees that your data remains private and secure, regardless of where it’s processed.

### 2. Remote attestation for verified security

Our SGX service is verifiable via **remote attestations** using Intel SGX DCAP ECDSA, ensuring that communications between enclaves are trusted and secure. This also enables secure enclave-to-enclave communications via mutual TLS connections, with full verification before data is exchanged. The remote attestation guarantees that each node running your program is fully verified before any sensitive data is shared. This remote attestation approach also reduces the reliance on Intel.

### 3. Edge optimization for superior performance

Unlike traditional SGX implementations, Fleek’s edge-optimized approach ensures that secure compute happens as close to the user as possible, reducing latency and improving overall performance. By distributing secure enclaves across Fleek’s decentralized edge network, requests are handled efficiently, delivering fast, scalable, and secure compute resources globally.

### 4. Reduced cost and overhead + faster time to market

By leveraging Fleek’s Edge SGX rather than trying to integrate SGX into your own stack, developers will save significant development time and costs as well as eliminate all the devops and infra-maintenance work related to upkeep and scaling their own SGX-related infrastructure and usage (Fleek’s Edge SGX service auto-scales). Using Fleek’s Edge SGX service also significantly reduces the complexity of your own code base and allows you to focus on the unique parts of your app/product. All the above results in projects being able to add SGX capabilities to their protocol or app in a fraction of the time, at a much lower cost, with way less headaches, and lightning-fast performance.


### 5. Seamless WASM support (with other languages on the way)

The SGX service currently supports WASM, making it easy for developers to compile their existing applications and deploy them securely on Fleek’s platform. By including the hash of your WASM program with your encrypted data, Fleek’s SGX service ensures that only the intended program can access the data, preventing any tampering or unauthorized access. We plan on adding additional language support in subsequent releases.

### 6. Content-addressable data for integrity

In addition to security, Fleek’s SGX service leverages content-addressed mechanisms. The encrypted data is matched to the hash of your WASM program, ensuring that only the program you uploaded can access your sensitive information. This extra layer of protection guarantees that the data remains safe, even if an attacker attempts to run a different program.

---

## How to use Fleek’s edge-optimized SGX service

Using Fleek’s Edge SGX service is simple and follows a similar process to our Javascript service:

1. Get the [Fleek CLI](https://fleek.xyz/docs/cli/)

2. Run this command to auth your CLI tool:

```bash
fleek login
```

3. Run this command to deploy:

```bash
fleek functions deploy --name Myfunction --path my.wasm --sgx
```

4. You can invoke this function at https://fleek-test.network/services/3 with a payload containing hash, inputs, and whether its encrypted or not (always yes with the current tool), and any inputs you need:

```bash
curl fleek-test.network/services/3 --data '{"hash": "<hash>", "decrypt": true, "input": "foo"}'
```

---

## The roadmap for Fleek’s Edge SGX service

This is just the beginning for Fleek’s support of SGX. Our V0 alpha release is designed for developers to test and explore, but it is not yet production-ready. Over the coming weeks and months, we’ll roll out several exciting updates:

### 1. Open-source libraries 

Expect full open-source releases of our enclave-to-enclave remote attestation libraries, including a Ra-TLS library written in Rust. These will make it easier for developers to implement secure communications in their own SGX enclaves.

### 2. Expanded WASM support  

We’re working to support additional execution environments and streamline the developer experience with Fleek’s CLI, which will soon automate the encryption and deployment process for SGX-enabled applications.

### 3. Beta and beyond 

While this V0 alpha preview is a powerful first step, we encourage you to avoid using it in production builds just yet. When we move beyond alpha, we will deploy a new Shared Sealing Public Key, so anything encrypted with the current alpha key will need to be re-uploaded. Stay tuned for more updates as we move toward a full release.

---

As Fleek progresses towards offering a comprehensive full-stack developer experience, the integration of Intel SGX processors is a pivotal step in enabling secure, scalable, and privacy-preserving applications on our platform. 

You can start building with our Edge SGX service in alpha at the links below. Don’t hesitate to reach out in [Discord](https://discord.gg/fleek) with any questions or feedback. 

- [Fleek CLI](https://fleek.xyz/docs/cli/)
- [GitHub ReadMe & Examples](https://github.com/fleek-network/lightning/tree/sgx-alpha/lib/sgxkit#readme)
- [Fleek Network SGX Integration Technical Overview](https://fleek.xyz/blog/announcements/fleek-network-intel-sgx-integration/) 
- [Discord](https://discord.gg/fleek)



