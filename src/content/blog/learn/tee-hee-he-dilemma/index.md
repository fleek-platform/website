---
title: 'The Tee-Hee-He Takeaway: How to Properly Verify the Trust of AI Agents with TEEs'
date: 2024-11-09
desc: 'Autonomous & sovereign X accounts controlled by AI agents are  an innovative approach to demonstrating the potential of both AI agents and trusted execution environments (aka TEEs), with the latter being leveraged to verifiably secure the credentials and thus independence of the former.'
thumbnail: './TEE-Dilemma-1280x720.jpg'
image: './TEE-Dilemma-1280x720.jpg'
author:
  - 'Fleek'
---

Last week, the world of AI was introduced to a novel concept — an AI agent autonomously & independently operating an X account, verified by a third-party and with no human involvement — the handle in question: Tee-Hee-He. It's an innovative approach to demonstrating the potential of both AI agents and trusted execution environments (aka TEEs), with the latter being leveraged to verifiably secure the credentials and thus independence of the former — but further exploration from the team led to some unanswered questions and outright concerns.

You can read more about it here: https://medium.com/@tee_hee_he/setting-your-pet-rock-free-3e7895201f46

The concept was well documented — once the initial account credentials were created within the TEE, human involvement became impossible for 7 days (or so it seemed). After that period, the TEE-secured credentials were revealed to the 'admin' enabling further tuning of the model, migration of the agent, or other optimizations. However, after deeper review of the code and blog posts published, we couldn’t help but start to wonder if crypto and AI’s newest overnight celebrity and the related claims being made were entirely genuine.

Our intention here is in no way to call anybody out, but rather to ensure TEE-hee-he is safe, and that TEE’s as a whole do not catch a bad wrap because of poorly communicated marketing or vulnerabilities created by the use of ZKPs, rather than the code or TEE’s themself. After all, that's the exact purpose of TEEs — trust hardware, and nothing else.

---

## **Remote Attestation is No Laughing Matter**

The majority of the issues we uncovered with Tee-hee-he involve the claims and code regarding remote attestation, a critically important step when leveraging TEE’s and a key part of the inherent trust assumption associated with TEEs.

Let’s take a look at the [post](https://phala.network/posts/truth-of-AI-Agent) breaking down the approach to remote attestation

Specifically step 4: “After the boot, the CVM does nothing other than load the right program (defined in a docker-compose file)”— this is arguably the most important step of a Remote Attestation. After verifying that the enclave is secure,, you can then prove its running the correct program. Typically this would be done by rebuilding the enclave and matching the MRENCLAVE.

The problem is this program cannot be reproducibly built because the docker-compose file was used to pass in environment variables that they did not want to be public. The solution in Phala’s article was to build a ZKP to prove that the correct Docker image was set up in the docker compose file.(https://github.com/h4x3rotab/partial-ra-zkp/blob/main/methods/guest/src/main.rs)

This particular ZKP proves that the correct string is set on the image field in the docker compose without exposing the environment sections containing the secrets

```
version: '3.9'
services:
  twitter:
    image: teeheehee/err_err_ttyl@sha256:50c3f8a00bbc47533504b026698e1e6409b4938109506c4e5a3baaae95116eb7
    volumes:
      - /var/run/tappd.sock:/var/run/tappd.sock
    environment:
# ....
```

Since its a string check the problem is the following would also pass that ZKP.

```
version: '3.9'
services:
  twitter:
  #  image: teeheehee/err_err_ttyl@sha256:50c3f8a00bbc47533504b026698e1e6409b4938109506c4e5a3baaae95116eb7
  image: my_malicious/image@sha256:50c3f8a00bbc47533504b026698e1e6409b4938109506c4e5a3baaae95116eb7
    volumes:
      - /var/run/tappd.sock:/var/run/tappd.sock
    environment:
# ....
```

Even if that line was commented out and another image was loaded instead, the attestation would still pass. So it unfortunately doesn’t prove anything either.

If they hypothetically wrote a better ZKP that proves the entirety of the docker-compose file besides just the environment section, would that solve the problem? Well not exactly. Let’s take a closer look at what environment variables do in the codebase.

Take a look at this line:
https://github.com/tee-he-he/err_err_ttyl/blob/main/run.sh#L4
One of the first lines that ran in this program provides these environment variables full shell access to the docker container. So something like this:

```
version: '3.9'
services:
  twitter:
    image: teeheehee/err_err_ttyl@sha256:50c3f8a00bbc47533504b026698e1e6409b4938109506c4e5a3baaae95116eb7
    volumes:
      - /var/run/tappd.sock:/var/run/tappd.sock
    environment:
    - TWEET_PROMPT_TEMPLATE_URL=$(sed -i 's/(( current_timestamp >= timeout_unix ))/true/g' ./timerelease.sh && echo 'url.com/to/tweet/template')
# ....
```

This would make the agent immediately print its login details when it started. And the previously referenced remote attestation would, again, still pass. In theory, almost anything can be rewritten with that environment variable. All in all, this proves very little — the enclave could be running any program.

The main takeaway is that if you cannot reproducibly build a program running in an enclave you probably shouldn’t trust the remote attestation. As a community dedicated to pushing the innovation of TEE’s forward, we should be very careful when accepting things like ZKP as a replacement for this crucial step and, by extension, how that could impact the long-term perception of TEEs. Leveraging ZKP in this manner opens a surface area of risk — there’s a good chance it is insecure, obscuring what’s happening under the hood, and harder to audit — and the previously mentioned environment variable is a perfect example of this risk. While we don’t think there was any maliciousness going on here, we do think it can be dangerous to pass off a process like ZKP in place of remote attestation. Both of these technologies are relatively new to many and TEEs are already fighting an uphill battle getting people comfortable with using them.

## **Tee-Hee-He Makeover: Remote Attestation Edition**

Luckily all these issues can be addressed with proper remote attestation. To demonstrate this, we rewrote the Tee-Hee-He framework using Rust, augmenting it with proper remote attestation to verifiably prove the code running in the enclave. We also made it highly customizable — if you want to deploy your own TEE Agent check out the repo<LINK TO REPO>

We set up a build and deploy flow with Gramine, check the readme in the enclave for instructions. We looked into using Dstack for this step but the added complexity of this abstraction did not seem worth it here, it would amount to more code that would need to be audited and trusted. The actual rust portion of the app is built using Nix so it can be reproducibly built on any machine. The only sensitive data that is in the configs is the initial password for the X and email accounts. But the first thing the Agent does is change these passwords so there is no concern here. The sensitive API keys for the AI models are delivered after the bot is started up one time, so the MRENCLAVE of the app is not affected by this.

If you want to deploy your own version of the agent you can fork the repo, modify the prompts.toml to give your bot personality, modify the config.toml to set rules on things like tweet frequency, and deploy the bot on a TEE enabled machine. Upon initial start, you would simply make one request to it to deliver the API key and it would take off from there. Now if you made your fork public then anyone could build it, confirm the agent is trustworthy, and eradicate any concerns regarding the risk of sensitive data.

For more information about how the remote attestation is done check this readme<LINK TO CURRENTLY UNFINISHED README>
