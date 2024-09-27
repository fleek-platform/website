---
title: 'A Beginners Guide to Intel SGX: Understanding and Leveraging Secure Enclaves'
date: 2024-09-27
desc: 'Discover how Intel SGX enhances security with protected memory enclaves, safeguarding sensitive data across various applications.'
thumbnail: './sgxbegguide.png'
image: './sgxbegguide.png'
author:
  - 'Fleek'
---

*Welcome to our guide on Intel Software Guard Extensions (SGX). If you're a developer diving into SGX for the first time, this guide is for you. We'll explore what SGX is, how it works, and how you can leverage it in your applications—highlighting real-world examples like our very own Fleek Edge SGX.*

---

## **1. Introduction**

### **What is SGX?**

Intel Software Guard Extensions (SGX) are a set of security-related instruction codes that are built into modern Intel CPUs. SGX allows applications to run code and processes inside secure, isolated environments called *enclaves*. These enclaves protect sensitive data and operations from being accessed or tampered with, even if the rest of the system is compromised.

### **Why is SGX important?**

In today's world, data breaches and cyberattacks are increasingly common. Protecting sensitive data is crucial, especially when dealing with personal information, financial data, or intellectual property. SGX provides a hardware-based solution to enhance application security by isolating critical computations and data.

At Fleek, we've leveraged SGX in our [Fleek Edge SGX](https://fleek.xyz/blog/announcements/introducing-fleek-edge-sgx/) service to enhance the security and performance of edge computing applications. This real-world application showcases the practical benefits of using SGX in modern software solutions.

### **What you'll learn in this guide**

- Fundamental concepts of computer security and trusted execution environments.
- How Intel SGX works and its key features.
- Setting up an SGX development environment.
- Building your first SGX application.
- Deep diving into SGX features like remote attestation and data sealing.
- Understanding real-world applications, including Fleek Edge SGX.

---

## **2. Background Concepts**

### **Basics of computer security**

Before diving into SGX, it's essential to understand some fundamental security concepts:

- **Encryption:** Transforming data into a coded format to prevent unauthorized access.
- **Trusted Computing:** A technology designed to make computers more secure by integrating hardware and software protections.
- **Attack Vectors:** Paths or methods used by attackers to gain unauthorized access to systems.

### **Trusted execution environments (TEEs)**

A Trusted Execution Environment is a secure area of a processor. It ensures that code and data loaded inside it are protected, preserving confidentiality and integrity. TEEs provide an isolated environment that runs in parallel with the main operating system, offering a higher level of security.

A Trusted Execution Environment is a secure area of a processor. It ensures that code and data loaded inside it are protected concerning confidentiality and integrity. TEEs provide an isolated environment that runs in parallel with the main operating system, offering a higher level of security.

### **Relevance of TEEs in decentralized environments**

In decentralized environments—such as blockchain networks, peer-to-peer systems, and distributed applications—the traditional notions of trust and security are challenged:

- **No central authority:** There's no single entity responsible for security; trust is distributed among participants.
- **Data spread across nodes:** Sensitive data may be processed and stored on multiple nodes, increasing exposure risks.
- **Potentially untrusted participants:** Nodes in the network may not fully trust each other.

**How TEEs Help:**

- **Secure computation:** TEEs enable secure processing of data on untrusted nodes by isolating computations in a protected enclave.
- **Data privacy:** Sensitive information remains confidential, as it is encrypted and processed within the enclave.
- **Attestation and trust:** TEEs provide mechanisms for nodes to prove they are running trusted code, fostering trust without central oversight.
- **Tamper resistance:** Hardware-based protections prevent unauthorized access or modifications to code and data within the TEE.

By leveraging TEEs like Intel SGX, developers can enhance security in decentralized environments, ensuring that applications maintain integrity and user data remains private—even when operating across untrusted or distributed systems.

### **Threat Models Addressed by SGX**

SGX is designed to protect against:

- **Malicious operating systems:** Even if the OS is compromised, enclaves remain secure.
- **Physical attacks:** Protection against certain hardware-based attacks.
- **Insider threats:** Preventing unauthorized access from users with system-level privileges.

---

## **3. Understanding Intel SGX**

### **How SGX Works**

SGX introduces the concept of **enclaves**, which are protected areas of execution in memory. Here's how it works:

- **Enclave creation:** Developers define specific parts of their application to run inside an enclave.
- **Memory encryption:** Data within the enclave is encrypted in memory, preventing unauthorized access.
- **Isolation:** Enclaves are isolated from the rest of the system, including the OS and hypervisor.

### **Key Features of SGX**

1. **Memory encryption engine (MEE):**
    - Encrypts and decrypts data as it moves in and out of the enclave.
    - Protects against memory snooping and cold boot attacks.
2. **Secure remote attestation:**
    - Allows a remote party to verify that the enclave is genuine and running trusted code.
    - Facilitates secure communication between enclaves and external entities.
3. **Sealing (secure storage):**
    - Enables enclaves to securely store data persistently.
    - Sealed data can only be unsealed by the same enclave or another enclave with the same sealing identity.

### **Limitations and Considerations**

- **Performance overhead:** Enclaves have limited memory, and switching between enclave and non-enclave code can introduce overhead.
- **Known vulnerabilities:** While SGX provides robust security, it's not immune to all types of attacks (e.g., side-channel attacks like Spectre and Meltdown).
- **Development complexity:** Writing code for enclaves requires careful consideration to avoid vulnerabilities.

---

## **4. How to execute code in TEE using Fleek**

To use the new SGX integration we need to have our code compiled to [WASM (Web Assembly](https://webassembly.org/getting-started/developers-guide/). Wasm can be compiled from C, C++, or Rust. We have an example function written in Rust that we will compile to wasm to show this integration.

The purpose of this guide is to walk you through the process of compiling your code to WASM, deploying it to Fleek with the SGX integration, and decrypting it by making a call to the deployed function from a Fleek Function with the required parameters.

Before we get into setting things up, you need to have the following:

1. An account on [app.fleek.xyz](http://app.fleek.xyz/)

2. [Fleek CLI](https://fleek.xyz/docs/cli/)

3. [Sgxkit](https://github.com/fleek-network/lightning/tree/sgx-alpha/lib/sgxkit)

4. [Rust](https://www.rust-lang.org/tools/install)

5. Code editor of your choice

---

### **Installation Guide**

The SGX integration is available on the Fleek CLI version 2.10.0. To install the Fleek CLI on your machine, run:

```bash
npm i -g @fleek-platform/cli
```

You can confirm your Fleek CLI version by running:

```bash
fleek version
```

⚠️: Please ensure you are on CLI version >= 2.10.0

Then login into your Fleek account from your Fleek CLI with the command:

```bash
fleek login
```

Finish off by following the generated link to grant access to your account.

### Setup

1. Start by creating a directory and initializing a Rust project:

```bash
mkdir fleek-sgx-example-calculation
cd fleek-sgx-example-calculation
cargo init
```

2. Our directory should look like below:

```plaintext
fleek-sgx-example-calculation
├── src
│   └── main.rs
└── Cargo.toml
```

3. Edit your `Cargo.toml` to use the git dependency for Sgxkit and it should look like below:

```plaintext
[package]
name = "fleek-sgx-example-calculation"
version = "0.0.0"
edition = "2021"

[dependencies]
sgxkit = { git = "https://github.com/fleek-network/lightning", rev = "21542ac506c6cb8c281d6428f25055d5a8ce8b7e" }

[profile.release]
lto = "fat"
codegen-units = 1
```

The Sgxkit library will be released on [crates.io](https://crates.io/) very soon for public usage.

4. Install the package for the wasm bindings supported by the Fleek Edge SGX integration

```bash
rustup target add wasm32-unknown-unknown
```

### Compiling to WASM

In your `main.rs` file, paste the below code:

```rust
use std::io::Write;
use sgxkit::io::OutputWriter;

fn main() {
    let mut writer = OutputWriter::new();

    let a = 8;
    let b = 7;
    let result = a * b;
    
    writer
        .write_all(format!("The result of {} * {} = {}\n", a, b, result).as_bytes())
        .unwrap();
}
```

Build the `main.rs` example using custom-made bindings and encodings that are compatible with the SGX integration on Fleek Network:

```bash
cargo build -r --target wasm32-unknown-unknown
```

The above command compiles the `fleek-sgx-example-hello` binary from the Rust into a WebAssembly (`.wasm`) file, optimized for release. It targets the WebAssembly format (`wasm32-unknown-unknown`), and the output is stored in the `target/wasm32-unknown-unknown/release/` directory.

We will then deploy the `wasm` file from that directory and while deploying we will see the file binary being encrypted.
If the above command fails with a permissions error on UNIX-based systems like MacOS or Linux, try it with a `sudo` prefix:

```bash
sudo cargo build -r --target wasm32-unknown-unknown
```

### Encrypt and upload WASM

We have to upload the wasm generated to be stored on Fleek Network so we can call it, decrypt it, and use it via an IPFS URL.
Start by creating the Fleek Function first:

```bash
fleek functions create --name fleekwasmcalc
```

You should see something similar after deploying successfully:

```plaintext
Encrypting code: [████████████████████████████████████████] 100% | ETA: 0s | 100/100

Uploading code to IPFS: [████████████████████████████████████████] 100% | ETA: 0s | 182559/182559

✅ Success! The deployment has been successfully created.

> You can call this Fleek Function by making a request to the following URL
🔗 https://howling-keyboard-gigantic.functions.on-fleek.app
> You can also call this Fleek Network URL directly for increased performance (please keep in mind you will not be able to deactivate this link)
🔗 https://fleek-test.network/services/3

🔗 Blake3 Hash: fdab03dbbc61be6331eadac4912e63e46f5a97ac0a4095034a8df64bdd837aaf 
🔗 Invoke by sending request to https://fleek-test.network/services/3 with payload of {hash: <Blake3Hash>, decrypt: true, inputs: "foo"}
🔗 Example: curl fleek-test.network/services/3 --data '{"hash": "fdab03dbbc61be6331eadac4912e63e46f5a97ac0a4095034a8df64bdd837aaf", "decrypt": true, "input": "foo"}'
```

Now you can make a request with cURL to the Fleek Function. The command below makes the request with all the necessary parameters:

```bash
curl fleek-test.network/services/3 --data '{"hash": "fdab03dbbc61be6331eadac4912e63e46f5a97ac0a4095034a8df64bdd837aaf", "decrypt": true}'
```

You will get a response from the call that should look like what is shown below:

```bash
{"hash":"7a5ace0b0efad024b9da038feb91e81e56f0222c684f49298d00f11d78a9f831","tree":"7a5ace0b0efad024b9da038feb91e81e56f0222c684f49298d00f11d78a9f831","signature":"b932aacbafbf33b7061a3569b4dd30b927106b3d82cace99fdb4b6fc2e82a4ad7492304d5ea86a2819c4ca99586574c55846452e1cf38fa871aa696b0012650301"}
The result of 8 * 7 = 56
```

---

## **5. Deep Dive into SGX Features**

### **Secure Remote Attestation**

**What is remote attestation?**

Remote attestation allows a remote party to verify that:

- The enclave is genuine.
- The code running inside the enclave is trustworthy.

**How it works:**

1. **Enclave generates a quote:**
    - Contains measurements of the enclave's code.
    - Signed using Intel's attestation key.
2. **Verification by remote party:**
    - The remote party sends the quote to Intel's Attestation Service (IAS).
    - IAS verifies the quote and confirms the enclave's integrity.

**Use Cases:**

- **Secure cloud computing:** Verifying that cloud-based enclaves are secure before processing sensitive data.
- **Distributed systems:** Ensuring trust between nodes in a network.

### **Data Sealing and Unsealing**

**Sealing data:**

- Enclaves can encrypt data for storage outside the enclave.
- Sealed data is bound to the enclave's identity.

**Unsealing data:**

- Only the enclave that sealed the data (or an enclave with the same identity) can unseal it.

### **Performance Optimization**

- **Minimize enclave transitions:**
    - Frequent calls between untrusted and trusted code can slow down performance.
- **Keep enclaves small:**
    - Limit the code and data within the enclave to what's necessary.
- **Efficient memory usage:**
    - Enclave memory is limited; use it wisely.

---

## **6. Debugging and Testing SGX Applications**

### **Debugging Enclaves**

- **Use SGX debug mode:**
    - Allows enclaves to be debugged but is not secure for production.
- **Debugging tools:**
    - GDB can be used with special considerations.
    - Intel provides debugging extensions in the SDK.

**Common Pitfalls:**

- **Invalid pointers:**
    - Ensure pointers passed between untrusted and trusted code are properly managed.
- **Stack size limitations:**
    - Enclave stack sizes are limited; avoid deep recursion or large stack allocations.

### **Security Testing**

- **Code reviews:**
    - Regularly review enclave code for vulnerabilities.
- **Static analysis tools:**
    - Use tools to detect common security issues.
- **Vulnerability scanning:**
    - Test your application against known attack vectors.

---

## **7. Real-World Applications and Use Cases**

### **Case Study: Fleek Edge SGX**

**Introduction to Fleek**

At Fleek, we're dedicated to building infrastructure for the decentralized web. Our platform simplifies deploying and managing applications on Web3 technologies.

**Overview of Fleek Edge SGX**

With [Fleek Edge SGX](https://fleek.xyz/blog/announcements/introducing-fleek-edge-sgx/), we've integrated Intel SGX into our edge computing platform to enhance security and performance.

**Challenges Addressed:**

- **Securing Edge Computing Environments:**
    - Edge nodes are often in less secure locations. SGX helps protect sensitive computations.
- **Protecting Sensitive Data:**
    - Data processed at the edge is vulnerable. Enclaves ensure data remains confidential.

**Implementation Details:**

- **Isolation of Workloads:**
    - Each edge computation runs within its own enclave, preventing cross-application attacks.
- **Secure Communication:**
    - Remote attestation ensures that only trusted enclaves participate in the network.

**Benefits Realized:**

- **Enhanced Security:**
    - Strong protection against a range of attack vectors.
- **Improved Trust:**
    - Users can trust that their data and computations are secure.
- **Performance Optimization:**
    - Secure local processing reduces the need to send data back to centralized servers.

**Implications for Developers:**

- **Building Secure Applications:**
    - Developers can leverage Fleek Edge SGX to deploy secure edge applications without managing the underlying infrastructure.
- **Focus on Innovation:**
    - With security handled, developers can focus on building features and improving user experience.

### **Other Use Cases**

- **Secure Databases:**
    - Protecting sensitive data within databases using SGX enclaves.
- **Confidential Cloud Computing:**
    - Cloud providers offering SGX-enabled instances for secure computation.
- **Blockchain and Cryptography:**
    - Securely managing cryptographic keys and operations within enclaves.

---

## **8. Conclusion**

### **Recap of Key Points**

- **Intel SGX** provides a hardware-based solution for secure computation.
- **Enclaves** protect code and data from unauthorized access.
- **Real-world applications**, like Fleek Edge SGX, demonstrate the power of SGX in enhancing security.
- **Developers** can leverage SGX to build more secure applications, especially in environments where security is paramount.

### **Further Resources**

- **Intel SGX official documentation:** Intel SGX Developer Reference
- **Fleek edge SGX blog post:** [Introducing Fleek Edge SGX](https://fleek.xyz/blog/announcements/introducing-fleek-edge-sgx/)
- **Books and tutorials:**
    - *"Intel SGX Explained"* by Victor Costan and Srinivas Devadas.
    - Online tutorials and courses on trusted execution environments.

We encourage you to explore SGX in your projects. Start by setting up your development environment and writing simple enclave applications. As you become more comfortable, consider how SGX can enhance the security of your applications, just as we've done with Fleek Edge SGX.

---

## **9. Appendix**

### **Glossary of Terms**

- **Enclave:** A secure area of execution in memory protected by SGX.
- **Trusted Code:** Code that runs inside an enclave.
- **Untrusted Code:** Regular application code that interacts with the enclave.
- **Remote Attestation:** A process to verify the integrity of an enclave remotely.
- **Sealing:** Securely storing data so that only the enclave can access it.

### **Frequently Asked Questions**

**Q:** *Can I use SGX on virtual machines or cloud instances?*

**A:** Yes, many cloud providers offer instances with SGX support. However, ensure that the cloud environment exposes SGX features to the virtual machines.

**Q:** *Is SGX only for applications written in C/C++?*

**A:** While the SGX SDK primarily supports C/C++, there are wrappers and libraries for other languages like Rust and Java.

**Q:** *What happens if someone tries to tamper with the enclave?*

**A:** The hardware protections ensure that any tampering attempts result in the enclave being destroyed, preventing data leakage.

### **Troubleshooting Tips**

- **Enclave Creation Fails:**
    - Ensure SGX is enabled in your BIOS settings.
    - Verify that the SGX driver is correctly installed.
- **Compilation Errors:**
    - Check that all SGX SDK environment variables are set.
    - Ensure you're using the correct compiler flags.

---

**Thank you for reading!**

If you have any questions or need assistance, feel free to reach out on our [Discord server](https://discord.gg/fleek) or [read our latest blog](https://fleek.xyz/blog/announcements/introducing-fleek-edge-sgx/) about the new Fleek SGX features.