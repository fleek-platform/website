---
title: 'NFA Update: ENS, LayerZero, 3DNS'
date: 2023-08-29
desc: 'An update on the new NFA release timeline, and a look at our updated ENS, LayerZero, and 3DNS-based design'
thumbnail: './nfastimeline.png'
image: './nfastimeline.png'
author:
  - 'Fleek'
---

We have some good news and bad news for y’all in relation to the release of [Non-Fungible Applications (NFAs)](https://github.com/fleekxyz/non-fungible-apps). First, the bad news: As we gear up for the Fleek platform Alpha, rolling out over the next week, we've made a decision to delay the launch of NFAs slightly. Why? **We didn’t feel that the last iteration of NFAs was going to deliver good enough value for app developers and end users, and we believe there's a better path forward.**

What does the new path look like? Here’s the good news:

- **We’re now building NFAs on top of [ENS](https://ens.domains/) names (rather than having a separate NFT).**
- **The new NFA’s also leverage the omni-chain capabilities of [LayerZero](https://layerzero.network/) open-edition NFTs.**
- **As well as verifiable DNS records through [3DNS](https://3dns.box/).**
- **Making NFAs simpler, more usable, easier to verify & integrate, and multichain.**

So now, any web3 project already using ENS can easily turn on NFA capabilities. And if they already use Fleek, it will be as simple as a click of a button ⚡

Expect a first version to launch in late September or October (depending on some external timelines out of our control). We promise it will be worth the (extra) wait. Now let’s dive in a bit deeper.

---

## NFAs Revamped: Leveraging ENS, LayerZero, and 3DNS

Our revamped strategy is super simple:

1. **Use ENS name NFTs as the master NFAs rather than creating a separate NFT.**
2. **Store the metadata for builds and modules as text records directly in the ENS name**
3. **Verifying the DNS associated with the app via 3DNS (and having the ENS name NFT own the 3DNS NFT for that domain via ERC6551)**.
4. **Mint the NFA prints (the one's users mint/hold) using LayerZero’s open-edition omni-chain NFTs, allowing users to hold them on any LayerZero-supported network.**

---

## Why The Switch to ENS?

Using ENS is a no-brainer because:

1. It streamlines the NFA creation process for a lot of projects by using an existing NFT (ENS name) that they essentially already use to represent their app.
2. By using ENS, **we can eliminate the necessity and complexity of creating new contracts/standards,** which require expensive audits, upkeep, and new trust assumptions.
3. ENS already has built-in features for **IPFS/IPNS,** as well as a ton of integrations to wallets and other projects that might play an important role in surfacing, accessing, and minting NFA’s (similar to the role they play with other NFTs or ENS names).
4. It simplifies the NFA architecture and helps eliminate certain aspects of it, such as verification of ENS owners (bc now the ENS name NFT is the owner, so it’s auto-verified)

**How**: We're using ENS name NFTs as the master NFAs, saving each NFA’s build metadata and modules in the corresponding ENS name as text records that point to IPFS/IPNS hashes, just like we do for the IPFS sites themselves today.

## Why LayerZero?

Bringing in LayerZero for the NFA prints takes things to another (omnichain) level:

1. **Prints aren’t restricted to living on just one network**
2. **Prints can live on a different network than the master NFA (the ENS name)**
3. **Even with being on different chains, the print NFA’s always verifiably read from the master NFA (the ENS name)**
4. **Users can mint print NFA’s super cheap or even free, even with having the ENS name on Ethereum.**

**How**: LayerZero will act as our multi-chain connector, making sure prints are versatile and accessible across supported networks. Each print will have its metadata tied to its main ENS name’s token ID. Developers will be able to choose which chains their NFAs are available for users to mint from. Similar to [holographic](https://www.holograph.xyz/) NFTs, but we would deploy print contracts on each Layer-Zero-compatible chain, with the appropriate NFA data.

## Why 3DNS?

[3DNS](https://3dns.box/) is a new and exciting project that helps take NFAs (and decentralized frontend hosting as a whole) even further:

1. With **3DNS we can ensure verifiable DNS records and updates on NFAs.**
2. It's already compatible with ENS and adds a new dimension to DNS records– turning them into NFTs that the ENS name can own via erc6551 (token-bound accounts).
3. All updates to the DNS records associated with the domain happen on chain, and can only be changed by the owner of the domain NFT (which in this case would be the ENS name)
4. Forcing DNS record changes on-chain provides better security to end users by reducing chances of a hack/malicious updates resulting in loss of funds

**How**: 3DNS, compatible with Internet Corporation for Assigned Names and Numbers ([ICANN](https://www.icann.org/)), will operate as the on-chain name server. This will bring ENS-type benefits to DNS names, while still providing the traditional DNS benefits (ICANN compatible, works natively in all browsers, etc.).

---

## [Bonus] Can PWA’s Fit In With NFA’s?

Yes definitely. With [friend.tech](http://friend.tech/) and the current issues plaguing web3 apps in traditional app stores (ex. Apple), the recent resurgence in PWA’s is definitely worth paying attention to. And we think there could be a lot of synergies between PWA’s and NFA’s. Any PWA could be an NFA, and any NFA could become a PWA. You could now potentially imagine a future where there is a decentralized, permissionless app store (which could be built on top of the NFA collection), where you could discover and mint/install ‘apps’ on your phone home screen or in a wallet, but where the app is hosted/loaded on-chain and accessed with no central operator. Def a lot to still explore and figure out, but the future looks bright (and decentralized) 🤙.

---

And that’s about all for this update! We just wanted to be transparent on why NFAs won’t be introduced with the new platform initially, and give everyone a heads-up on where development is currently. We’re super excited about the new direction NFAs are headed and can’t wait to roll out the finished product.

If you have any questions about NFAs, the new ENS-oriented approach with LayerZero + 3DNS, or anything else related to the new Fleek platform, our team is always open to chat in our [Discord](http://discord.gg/fleek) server.

Follow along with the release of the new Fleek.xyz platform [here](https://twitter.com/fleek)!
