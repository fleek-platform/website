---
order: 7
title: Edge SGX
date: 2024-09-11
desc: Get started with using the SGX service integrated into Fleek Network from the CLI and unlock a new level of security features
keywords: [services, documentation, getting started, sgx]
tags:
  - Accounts
  - Guide
  - Learn
  - Fleek
---

# Fleek Edge SGX

:::warn
The Fleek Edge SGX service is still in alpha and not recommended yet to be be used in production.
:::

## What is Fleek Edge SGX?

Fleek's Edge SGX service is a decentralized, edge-optimized tool that provides secure compute capabilities using Intel's SGX Trusted Execution Environments (TEEs). It allows developers to seamlessly integrate private, encrypted data processing into their applications without worrying about hardware or complex infrastructure management.

## Why Fleek Edge SGX?

Fleek Edge SGX is used to ensure that sensitive data remains encrypted and secure during processing, making it ideal for privacy-focused applications. It offers remote attestation for verified security, edge optimization for faster performance, and reduces development time, cost, and complexity by handling the infrastructure and scaling needs for developers.

:::info
The V0 alpha supports WASM, with future plans to add more languages.
:::

### SGX & TEEs: How encryption works

In typical SGX implementations, private data is "sealed" using a unique Sealing Key that is only available inside the enclave. Once sealed, the data can be stored externally, but it can only be decrypted inside the specific enclave that sealed it. To send private data to an enclave, you would encrypt it with the enclave’s public key, ensuring the data remains protected, even in untrusted environments.

Fleek enhances this by using a "Shared Sealing Key," generated within the first node's enclave and securely shared with other trusted enclaves through remote attestation. This enables all nodes in the network to decrypt the same data, ensuring redundancy and preventing issues if a node goes offline. Data is encrypted once and can be decrypted in any enclave within the network. To add another layer of security, the hash of the WASM program is included with the data, ensuring that only the expected program can access it.

### Remote attestation

Fleek leverages [Intel SGX DCAP ECDSA Attestations](https://www.intel.com/content/dam/develop/public/us/en/documents/intel-sgx-dcap-ecdsa-orientation.pdf) to verify the trustworthiness of enclave-to-enclave communications. This is integrated with mutual TLS (mTLS), where both parties verify certificates and encryption before a secure connection is established. The connection is only trusted if remote attestation is successful, ensuring that the same program is running in both enclaves.

This approach ensures highly secure communications and prevents unauthorized access or tampering of sensitive data within the network.

## How to use Fleek Edge SGX

:::info
For a deep dive on how to use this service with Fleek, follow this guide [here](https://fleek.xyz/guides/getting-started-fleek-functions-edge-sgx/).
:::

Using Fleek’s Edge SGX service is straightforward and similar to the process for our JavaScript service:

1. Install the [Fleek CLI](https://fleek.xyz/docs/cli/)

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
   curl fleek-test.network/services/3 --data '{"hash": "<hash>", "decrypt": true}'
   ```

This makes an IPFS request and runs tasks that will then give us a response with the data as a string and a stringified object with some information like the signature and more. We have an example response below that shows what the reponse looks like:

```bash
{"hash":"eac455244d7970f5428070c1f28d144c2e5033689de98b1b826b5b4eb6a38a14","tree":"eac455244d7970f5428070c1f28d144c2e5033689de98b1b826b5b4eb6a38a14","signature":"3cf56fe96dcbd1e77c77e6867958a8d8e22cac3c310f1670288403950840f53109e26ef284db7edc3453b316e6d20fb2cf5873f601d96e5badc6e88d3d4b5f0201"}
Hello, world! From, SGX WASM <3
```
