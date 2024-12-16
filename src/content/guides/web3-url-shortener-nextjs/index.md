---
title: 'Building a Web3 URL shortener with Next.js on Fleek'
date: 2024-12-16
desc: 'In this guide we’ll use Next.js, Ethereum, and Fleek to create a Web3 URL shortener that lives on-chain. No central point of failure, no problem.'
thumbnail: './web3-url-image.jpg'
image: './web3-url-image.jpg'
author:
  - 'Tobiloba Adedeji'
---

Traditional URL shorteners rely on centralized services, making them vulnerable to censorship, data breaches, and single points of failure. A decentralized, Web3-driven URL shortener addresses these issues by storing link mappings on the blockchain, ensuring immutability, transparency, and censorship resistance.
In this guide, we’ll build a fully decentralized URL-shortening service using Next.js, Ethereum smart contracts, and Fleek’s edge-optimized hosting. By the end, you’ll have a streamlined Next.js app that enables users to shorten, store, and resolve URLs seamlessly.

---

## Why a Web3 URL Shortener?

**Key Benefits:**

- **Decentralization:** Store shortened URLs on a blockchain for resilience and immutability.
- **Censorship Resistance:** No single authority can arbitrarily remove links.
- **Transparency:** Users can verify that shortened URLs map to the correct destination.

---

## Prerequisites

Ensure you have:

1. **Frontend Skills**: Familiarity with React or Next.js.
2. **Node.js & npm**: Installed on your system.
3. **Fleek Account & CLI**: Sign up at [Fleek](https://app.fleek.xyz/) and install the [Fleek CLI](https://fleek.xyz/docs/cli/).
4. **Reown Project**: Create one at [Reown](https://reown.com/).
5. **Test Crypto Wallet**: Required for contract interactions.
6. **Web3 Basics**: Understanding of smart contracts and blockchain fundamentals.

---

## Step 1: Project Setup

- **Initialize a Next.js Project:**

```bash
npx create-next-app@latest
```

- **Answer the prompts as follows:**

```bash
Project name? web3-url-shortener
Use TypeScript? No
Use ESLint? No
Use Tailwind CSS? Yes
Use `src/` directory? Yes
Use App Router? No
Use Turbopack? No
Customize import alias? No
```

- **Install Dependencies:**

```bash
npm install wagmi ethers @tanstack/react-query @rainbow-me/rainbowkit

# fleek-next adapter
npm install @fleek-platform/next
```

- **Ensure `@fleek-platform/next` is v2 or above.**
- **Login to Fleek:**

```bash
fleek login
```

- **Follow the on-screen instructions.**
- **Create Directories:** In src/, create directories `lib` and `abi`.
- **Run Development Server:**

```bash
npm run dev
```

---

### Smart Contract Setup

- **Contract source code:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract UrlShortener {
    // Maps a short code (e.g. "abc123") to a full URL
    mapping(string => string) private shortToLong;

    event URLShortened(string indexed shortCode, string longUrl);

    /**
     * @notice Create a shortened URL by mapping a short code to a long URL.
     * @param shortCode The short code (unique identifier)
     * @param longUrl The long URL to map to
     */
    function setURL(string calldata shortCode, string calldata longUrl) external {
        require(bytes(shortCode).length > 0, "Short code cannot be empty");
        require(bytes(longUrl).length > 0, "Long URL cannot be empty");
        // In a production scenario, you'd probably want some uniqueness checks,
        // or handle collisions differently. For now we allow overwriting.

        shortToLong[shortCode] = longUrl;
        emit URLShortened(shortCode, longUrl);
    }

    /**
     * @notice Retrieve the long URL for a given short code.
     * @param shortCode The short code to look up
     * @return longUrl The long URL that the short code points to
     */
    function getURL(string calldata shortCode) external view returns (string memory) {
        return shortToLong[shortCode];
    }
}
```

The above `UrlShortener` smart contract allows users to create and manage shortened URLs. It maps unique short codes to long URLs, enabling efficient URL storage and retrieval. Users can set a mapping using the setURL function and retrieve the original URL with getURL. The contract includes basic validations and emits an event when a new URL is shortened. I deployed my contract already and the address is: `0x2729D62B3cde6fd2263dF5e3c6509F87C6C05892`

- **Chain:** Arbitrum Sepolia Testnet
- **ABI Source Code:** [URLShortener](https://github.com/tobySolutions/shortener/tree/main/smart-contract)
- **RPC URL:** Obtain from [Alchemy](https://alchemy.com/) or another provider.
- **Arbitrum Sepolia Faucet:** [Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)

### .env Setup:

Create a `.env` in the project root:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x2729D62B3cde6fd2263dF5e3c6509F87C6C05892
NEXT_PUBLIC_RPC_URL={{YOUR-ARBITRUM-SEPOLIA-RPC-URL}}
```

---

## Configuring the ABI and Contract

- **Add ABI:**

Create `src/abi/URLShortener.json` with:

```json
{
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "shortCode",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "longUrl",
          "type": "string"
        }
      ],
      "name": "URLShortened",
      "type": "event"
    },
    {
      "inputs": [
        { "internalType": "string", "name": "shortCode", "type": "string" }
      ],
      "name": "getURL",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "string", "name": "shortCode", "type": "string" },
        { "internalType": "string", "name": "longUrl", "type": "string" }
      ],
      "name": "setURL",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
```

- **Contract Config File:**

In `src/lib/contract.js:`

```js
import { ethers } from 'ethers';
import urlShortenerJson from '../abi/URLShortener.json';

export function getSignerContract(signer) {
  if (!signer) {
    console.error('No signer provided to getSignerContract');
    throw new Error('No signer available');
  }

  const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!address) {
    throw new Error('Contract address not configured');
  }

  return new ethers.Contract(address, urlShortenerJson.abi, signer);
}
```

- **Wagmi Config:**

```js
import { http} from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = {{REOWN-PROJECT-ID}};

export const config = getDefaultConfig({
  appName: {{REOWN-APP-NAME}},
  projectId: projectId,
  chains: [arbitrumSepolia],
  transports: {
    [arbitrumSepolia.id]: http(),
  },
  ssr: false,
});
```

Replace `{{REOWN-PROJECT-ID}}` and `{{REOWN-APP-NAME}}` with your details from Reown.

---

## Step 2: Building the Frontend

**Providers Setup:**

Below, I show how to set up web3 providers properly in a Next.js application to handle client-side rendering correctly.

The key is splitting the providers into two parts to safely handle web3 functionality that must run only in the browser.

**Create `src/lib/providers.js`**:

```js
'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Web3Providers = dynamic(() => import('./Web3Providers'), {
  ssr: false,
});

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <Web3Providers>{children}</Web3Providers>;
}
```

**Create `src/lib/Web3Providers.jsx`**:

```jsx
// Web3Providers.jsx
'use client';

import { WagmiProvider } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../lib/wagmi';

export default function Web3Providers({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#0E76FD',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

**Modify `_app.js`**:

In `pages/_app.js:`

```js
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import Providers from '../lib/providers';

function App({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default App;
```

## Main UI (`pages/index.js`):

This page handles connecting a wallet, entering a long URL and short code, and writing to the blockchain. We will do a similar split to what we did above. The key reasons for this split:

- Web3 code needs `window.ethereum` which only exists in the browser
- `ssr`: `false` prevents server-side rendering of web3 code
- Main page component can still be server-rendered for better performance
- Prevents "window is not defined" errors
- Cleanly separates browser-only code from server-compatible code

**In `pages/index.js`**:

```js
import dynamic from 'next/dynamic';

// Import the client component with SSR disabled
const URLShortenerApp = dynamic(() => import('../lib/URLShortenerApp'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-dark-1 px-4 sm:px-6 lg:px-8">
      <URLShortenerApp />
    </div>
  );
}
```

**Create `src/lib/URLShortenerApp.jsx`**:

```jsx
'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, useWalletClient, useChainId } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getSignerContract } from './contract';

export default function URLShortenerApp() {
  const [shortCode, setShortCode] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [status, setStatus] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();

  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.ethereum &&
      isConnected &&
      walletClient
    ) {
      console.log('Setting up ethers provider...');
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      ethersProvider
        .getSigner()
        .then((newSigner) => {
          console.log('Signer obtained:', newSigner);
          setSigner(newSigner);
        })
        .catch((error) => {
          console.error('Error getting signer:', error);
          setSigner(null);
        });
    } else {
      console.log('Conditions not met for signer setup:', {
        windowExists: typeof window !== 'undefined',
        ethereumExists: !!window?.ethereum,
        isConnected,
        hasWalletClient: !!walletClient,
      });
      setSigner(null);
    }
  }, [isConnected, walletClient]);

  useEffect(() => {
    if (isConnected && chainId !== 421614) {
      setStatus(
        'Please switch to the Arbitrum Sepolia testnet in your wallet.',
      );
      console.log('Wrong chain ID:', chainId);
    } else {
      setStatus('');
    }
  }, [isConnected, chainId]);

  async function shortenURL() {
    console.log('Starting shortenURL function...');
    setStatus('');

    if (!isConnected) {
      alert('Please connect your wallet first.');
      return;
    }

    if (chainId !== 421614) {
      alert('Please switch to the Arbitrum Sepolia testnet in your wallet.');
      return;
    }

    if (!shortCode || !longUrl) {
      alert('Please enter both a short code and a long URL.');
      return;
    }

    if (!signer) {
      console.error('No signer available');
      alert('No signer available. Please ensure your wallet is connected.');
      return;
    }

    try {
      setStatus('Transaction pending...');
      console.log('Getting contract instance...');
      const contract = getSignerContract(signer);

      const tx = await contract.setURL(shortCode, longUrl);
      console.log('Transaction sent. Hash:', tx.hash);
      setStatus(`Transaction sent. Hash: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      const newLink = `${window.location.origin}/${shortCode}`;
      setGeneratedLink(newLink);
      setStatus('Transaction successful!');
    } catch (error) {
      console.error('Detailed error in shortenURL:', error);
      setStatus(`Error occurred: ${error.message || 'Unknown error'}`);
    }
  }

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  return (
    <div className="rounded-xl w-full max-w-md space-y-8 border border-gray-dark-4 bg-gray-dark-2 p-10 shadow-2xl">
      <h1 className="werey text-3xl text-center font-extrabold text-yellow-dark-9">
        Web3 URL Shortener
      </h1>
      <div className="flex items-center justify-center gap-4 sm:flex-row">
        <ConnectButton />
      </div>
      <div className="mt-8 space-y-6">
        {isConnected && (
          <p className="text-sm text-center text-gray-dark-11">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="shortCode" className="sr-only">
              Short code
            </label>
            <input
              id="shortCode"
              type="text"
              placeholder="Short code (e.g. abc123)"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              className="rounded-md w-full border border-gray-dark-6 bg-gray-dark-3 px-3 py-2 text-black text-gray-dark-12 placeholder-gray-dark-8 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-dark-9"
            />
          </div>
          <div>
            <label htmlFor="longUrl" className="sr-only">
              Long URL
            </label>
            <input
              id="longUrl"
              type="text"
              placeholder="Long URL (e.g. https://example.com)"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="rounded-md w-full border border-gray-dark-6 bg-gray-dark-3 px-3 py-2 text-black text-gray-dark-12 placeholder-gray-dark-8 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-dark-9"
            />
          </div>
        </div>
        <div>
          <button
            onClick={shortenURL}
            className={`rounded-md text-sm flex w-full justify-center border border-transparent px-4 py-2 font-medium ${
              isConnected && !status.includes('Transaction pending')
                ? 'bg-yellow-600 text-gray-dark-1 hover:bg-yellow-dark-10 focus:outline-none focus:ring-2 focus:ring-yellow-dark-9 focus:ring-offset-2'
                : 'bg-yellow-900 cursor-not-allowed text-gray-dark-8'
            }`}
            disabled={!isConnected || status.includes('Transaction pending')}
          >
            {status.includes('Transaction pending')
              ? 'Processing...'
              : 'Shorten'}
          </button>
        </div>
      </div>
      {status && (
        <div className="mt-4 text-center">
          <p
            className={`break-words font-medium ${
              status.includes('Error')
                ? 'text-red-dark-11'
                : 'text-yellow-dark-11'
            }`}
          >
            {status}
          </p>
        </div>
      )}
      {generatedLink && (
        <div className="mt-4 text-center">
          <p className="font-medium text-yellow-dark-9">
            Shortened URL:{' '}
            <a
              href={generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {generatedLink}
            </a>
            <button
              onClick={copyToClipboard}
              className="text-sm text-yellow-400 rounded ml-2 hover:text-yellow-dark-10 focus:outline-none focus:ring-2 focus:ring-yellow-dark-9 focus:ring-offset-2"
            >
              Copy
            </button>
          </p>
          {copySuccess && (
            <p className="mt-2 text-yellow-dark-11">{copySuccess}</p>
          )}
        </div>
      )}
    </div>
  );
}
```

## Dynamic Route for Redirection (`pages/[shortCode].js`):

```js
// pages/[shortCode].js
import { ethers } from 'ethers';
import urlShortenerJson from '../abi/URLShortener.json';

export const runtime = 'experimental-edge';

export async function getServerSideProps(context) {
  const { shortCode } = context.params;

  // Debug info object
  const envCheck = {
    hasRpcUrl: !!process.env.NEXT_PUBLIC_RPC_URL,
    hasContractAddress: !!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    shortCode: shortCode,
    rpcUrlStart: process.env.NEXT_PUBLIC_RPC_URL?.slice(0, 10) + '...',
    timestamp: new Date().toISOString(),
  };

  try {
    // Check environment variables
    if (
      !process.env.NEXT_PUBLIC_RPC_URL ||
      !process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    ) {
      return {
        props: {
          error: 'Missing environment configuration',
          debug: envCheck,
        },
      };
    }

    // Initialize provider with timeout
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL,
      undefined,
      { timeout: 30000 },
    );

    envCheck.providerInitialized = true;

    // Initialize contract
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      urlShortenerJson.abi,
      provider,
    );

    envCheck.contractInitialized = true;

    // Add a custom request timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Contract call timeout')), 30000),
    );

    // Race between contract call and timeout
    const longUrl = await Promise.race([
      contract.getURL(shortCode),
      timeoutPromise,
    ]);

    envCheck.longUrlReceived = !!longUrl;

    if (longUrl && longUrl !== '') {
      const fullUrl = longUrl.startsWith('http')
        ? longUrl
        : `https://${longUrl}`;
      return {
        redirect: {
          destination: fullUrl,
          permanent: false,
        },
      };
    }

    // URL not found case
    return {
      props: {
        error: 'URL not found',
        debug: {
          ...envCheck,
          contractCallCompleted: true,
          urlFound: false,
        },
      },
    };
  } catch (error) {
    // Error handling
    const errorInfo = {
      ...envCheck,
      message: error.message,
      type: error.constructor.name,
      code: error.code,
    };

    return {
      props: {
        error: 'Error retrieving URL',
        debug: errorInfo,
      },
    };
  }
}

export default function ShortCodePage({ error, debug }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-dark-1">
      <div className="rounded-xl w-full max-w-md border border-gray-dark-4 bg-gray-dark-2 p-8 shadow-2xl">
        <h1 className="text-2xl mb-4 font-bold text-yellow-dark-9">Error</h1>
        <p className="mb-4 text-red-dark-11">{error}</p>
        {debug && (
          <pre className="text-xs mb-4 overflow-auto text-gray-400">
            {JSON.stringify(debug, null, 2)}
          </pre>
        )}
        <a
          href="/"
          className="text-yellow-dark-9 hover:text-yellow-dark-10 hover:underline"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
```

One final thing is to ensure that your `tailwind.config.js` matches the below:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
```

---

## Step 3: Deploying to Fleek

- **Adjust Edge Runtime:**

For server-side and dynamic routes, ensure you have: `export const runtime = 'edge'` within the files.

- **Build with Fleek:**

  1.**Build the Application:**

```bash
npx fleek-next build
```

This generates a `.fleek` directory.

2.**Create a Fleek Function:**

```bash
fleek functions create
```

3.**Name your function** (e.g., `web3-url-shortener-next-js`).

4.**Deploy to Fleek:**

```bash
fleek functions deploy --noBundle --name web3-url-shortener-next-js --path .fleek/dist/index.js --envFile .env
```

After a successful deployment, Fleek will provide a URL to access your application.

---

## Conclusion

You’ve successfully built and deployed a decentralized URL shortener that:

- Stores mappings on-chain.
- Enables trustless, censorship-resistant link shortening.
- Uses Fleek for edge deployment and a streamlined Web3 experience.

This foundation can be extended or integrated into larger Next.js Apps. Experiment with custom UI, track analytics, or integrate other smart contracts to enhance your Web3 URL shortener. View what the final result should look like here: [https://shortener.on-fleek.app/](https://shortener.on-fleek.app/)

You can go to the Github repo to view the full code: [https://github.com/tobySolutions/shortener](https://github.com/tobySolutions/shortener)
