---
order: 9
title: Remote Attestation
date: 2025-02-14
desc: Retrieve a raw text output representing the TDX quote for your agent.
---

# Remote Attestation

:::note
We're improving the UX for TDX quotes in the coming weeks to make the process more intuitive. Your feedback is welcome as we refine this feature.
:::

## Getting a TDX Quote

A new "Settings" panel has been added for each agent on the Agents tab on [fleek.xyz/agents](https://fleek.xyz/agents). One of the available settings is "Remote Attestation". This allows you to retrieve a raw text output representing the TDX quote for your agent.

### How to use:

1. Navigate to the Agents tab on [fleek.xyz/agents](https://fleek.xyz/agents)
2. Locate the agent for which you want a TDX quote.
3. Go to the settings tab
4. You will see the panel that says “Remote attestation”
5. Select "Copy hash".
6. You will see a text output similar to the below:

![quote](./tdx.png)

You can then go ahead to copy the above binary and verify the attestation using a tool like [proof.t16z.com/](https://proof.t16z.com/) which then gives you the below:

![proof](./proof.png)
