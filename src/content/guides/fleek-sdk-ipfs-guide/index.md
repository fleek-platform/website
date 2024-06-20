---
title: 'How to Use Fleek SDK to Pin Files on IPFS: A Step-by-Step Integration Guide for Developers'
date: 2024-03-22
desc: 'How to build an app that can pin files to IPFS in minutes using the Fleek SDK.'
thumbnail: './ipfsguide.png'
image: './ipfsguide.png'
author:
  - 'Olayinka Oshidipe'
---

How to build an app that can pin files to IPFS in minutes using the Fleek SDK.

We’re huge fans of IPFS and we know our devs love it. This article is part of our continued effort to give you the easiest access to the protocol in every way possible– including through the Fleek SDK 🤙

The [Fleek SDK](/docs/sdk) provides convenient methods for integrating decentralized storage functionality directly into your applications, enabling tasks such as file uploads and interactions with IPFS. In this guide, we'll be taking a look at **how to create a NodeJS app using the Fleek SDK to interact with IPFS** through a step-by-step process.

_For more details on getting started with the Fleek SDK check out our [docs](/docs/)_

### What is IPFS?

[IPFS (InterPlanetary File System)](https://ipfs.tech/) is a decentralized protocol for storing and sharing data on the internet. IPFS enables developers to create websites and applications that are resilient to server outages and censorship. It also offers a distributed approach to data storage, where files are spread across a network of peers instead of relying on a single server. With IPFS, developers can build decentralized web hosting, store data immutably, and share content offline.

Let’s walk through accessing these benefits by building a basic NodeJs app that enables us to pin files to IPFS– using the **Fleek SDK:**

---

## **Requirements:**

- **[Fleek SDK](/docs/sdk)**
- Account on [Fleek.xyz](https://app.fleek.xyz)
- NodeJs 18+
  - Head to the [Node Official Website](https://nodejs.org/en) for help getting started with NodeJs

After creating or logging into your account on [Fleek.xyz](https://app.fleek.xyz), follow these steps to get started with the Fleek SDK:

1. **Install the [Fleek CLI](/docs/cli/)**:

Begin by opening your terminal and installing the Fleek CLI by running:

```
npm install fleek
```

_If you’ve never used the Fleek CLI before, our docs have you covered! They go over all the basics that you’ll need for this guide– from installation to authentication and project management. [Check it out here](/docs/cli/)_

2. **Set Up Your Project Environment**

For this project, you’ll want to create a new folder and navigate into it:

- Initialize a new npm project by running:

```
npm init --yes
```

- Run this command to Install the necessary packages:

```
npm install @fleek-platform/sdk

npm install -D typescript tsx @types/node dotenv
```

- Create a tsconfig.json file with the following configuration:

```json
{
  "compilerOptions": {
    "module": "esnext",
    "allowJs": true,
    "checkJs": true,
    "outDir": "dist",
    "sourceMap": true,
    "target": "es2017",
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

3. **Generate a Personal Access Token (PAT)**

- Open your terminal and run:

```
fleek pat create
```

- If not logged in, you'll be prompted to do so. Once logged in, you'll receive your PAT, which will look something like this: `pat_jSzFpdfdfsjn8pO2XoWOow` Copy and paste your PAT in front of PAT in your .env file.

_If you aren’t familiar with Fleek’s PATs, check out our docs [here](/docs/cli/pat/) for more details on how to create and use them_

4. Create and Retrieve your Project ID

- Open your terminal and run:

```
fleek projects create
```

You’ll be prompted to assign a name to your project, once done, you’ll get:

`Success! New projects created on Fleek`

While still on your terminal, run:

```
fleek projects list
```

- You’ll get a list of all your projects, and their corresponding project ids on your terminal. Your project id should look like this: `cltyij4567890123`
- Copy that and paste it in front of the `PROJECT_ID` in your `.env` file.

**5. Import SDK and Initialize PAT Service**

With your PAT and `PROJECT_ID` successfully generated and imported into your .env file as outlined earlier, we're just about ready to dive into building our app.

- The first step is to create an index.ts file.
- Import the necessary modules into your index.ts file:

```javascript
import fs from 'fs';
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import dotenv from 'dotenv';
dotenv.config();
```

- Create an instance of the Personal Access Token (PAT) service:

```javascript
const pat = process.env.PAT || '';
const project_id = process.env.PROJECT_ID || '';
const patService = new PersonalAccessTokenService({
  personalAccessToken: pat,
  projectId: project_id,
});
const fleekSdk = new FleekSdk({ accessTokenService: patService });
```

6. **Upload a File to IPFS**

After you’ve set up your PAT with the SDK, you should be all set to start uploading files to IPFS through your new NodeJS app:

- Define an asynchronous function to upload a file to IPFS:
  - Typescript:

```typescript
async function uploadFileToIPFS(filename: string, content: Buffer) {
  const result = await fleekSdk.ipfs().add({
    path: filename,
    content: content,
  });
  return result;
}
```

- JavaScript:

```javascript
async function uploadFileToIPFS(filename, content) {
  const result = await fleekSdk.ipfs().add({
    path: filename,
    content: content,
  });
  return result;
}
```

- Run the upload function with your desired file:

```javascript
const fileContent = fs.readFileSync('ss.png'); //reads file from root dir
uploadFileToIPFS('ss.png', fileContent)
  .then((result) => {
    console.log('File uploaded to IPFS:', result);
  })
  .catch((error) => {
    console.error('Error uploading file to IPFS:', error);
  });
```

- Full index.ts code:

```javascript
import fs from 'fs';
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import dotenv from 'dotenv';
dotenv.config();

const pat = process.env.PAT || '';
const project_id = process.env.PROJECT_ID || '';

const patService = new PersonalAccessTokenService({
    personalAccessToken: pat,
    projectId: project_id,
})

const fleekSdk = new FleekSdk({ accessTokenService: patService })

async function uploadFileToIPFS(filename: string, content: Buffer) {
    const result = await fleekSdk.ipfs().add({
        path: filename,
        content: content
    })
    return result;
    }

    const fileContent = fs.readFileSync('fleek.jpg');

    uploadFileToIPFS('fleek.jpg', fileContent).then( result => {
        console.log('File uploaded to IPFS:', result);
        console.log( 'IPFS URL:', `https://cf-ipfs.io/${result.cid}`)
    }).catch(error => {
        console.error('Error uploading file to IPFS:', error);
    }).finally(() => {
        process.exit();

});

```

- Run:

```
npx tsx index.ts
```

- You should get a response that looks like this on your terminal to confirm your file has been successfully uploaded:

```
File uploaded to IPFS: {
    cid:
CID (bafkreicosqi7xwleml3sdrojtitgxq2n52vvw5zeo67nwfnshycenuzmjy),
    size: 81833,
    path: 'fleek.jpg'

}
IPFS URL: https://cf-ipfs.io/bafkreicosqi7xwleml3sdrojtitgxq2n52vvw5zeo67nwfnshycenuzmjy
```

---

And just like that you’re done! You can use this NodeJS app to easily pin, manage, and access your files stored on IPFS using the listed CID.

This is just a super quick example of what you can build with the Fleek SDK. You can use the basics from this guide to integrate decentralized storage via IPFS directly into your apps in any way you want!

You can see a finished example of our NodeJS app through this [Github repo](https://github.com/fleekxyz/pin-files-to-ipfs-with-fleekSDK.git).

Learn more about the possible function types, more examples and use cases for the Fleek SDK in our [docs](/docs/sdk/ipfs/) 🤙

If you have any questions about using the Fleek SDK or any of the possible use cases reach out on [X](https://twitter.com/fleek) or in our [Discord](https://discord.gg/fleek) server ⚡
