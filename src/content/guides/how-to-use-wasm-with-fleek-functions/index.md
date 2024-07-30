---
title: 'How to use WASM in a Fleek Function'
date: 2024-07-30
desc: 'Everything you need to know to get started with WASM and Fleek Functions'
thumbnail: './wasm.png'
image: './wasm.png'
author:
  - 'Fleek'
---

One of the prime focuses for Fleek is building proper devtooling to provide all kinds of support to developers building using Fleek Functions.

In this guide, we will be integrating TypeScript with a Fleek Function using WASM. Fleek Functions use the <u>[JS Runtime Service](https://blog.fleek.network/post/fleek-network-developer-guide-js-runtime/)</u>, providing an execution environment for your JavaScript code and it is built on top of deno_core.

WebAssembly (WASM) is a binary instruction format designed as a portable target for compiling languages like C, C++, and Rust, enabling deployment on the web for client and server applications. You can learn more about building with WASM <u>[by checking out their docs](https://webassembly.org/)</u>.

_New to Fleek Functions_? Fleek Functions are lightning-fast, auto-scaling edge functions built on top of Fleek Network’s on-chain cloud infrastructure. Fleek Functions allow serverless execution of Javascript code which may provide a more performant, lower cost, easier to maintain, self-sovereign alternative to traditional serverless execution. You can find more info in our docs <u>[here](https://fleek.xyz/docs/platform/fleek-functions/)</u>.

---

## How can WebAssembly (WASM) and Fleek Functions work together

WebAssembly and Fleek Functions are designed to work together seamlessly. Fleek Functions rely on JavaScript and can load WebAssembly modules, call functions defined in WebAssembly, and interact with the memory and other resources used by WebAssembly. This integration allows developers to write performance-critical parts of their application in WebAssembly while using JavaScript for the rest of the function logic.

To use WebAssembly in a Fleek Function, you typically follow these steps:

1. **Compile your code**: Write the performance-critical part of your application in a language that compiles to WebAssembly (e.g., C, C++, or Rust). Compile this code to a .wasm binary module.
2. **Load the WebAssembly module**: Use JavaScript to fetch/import and instantiate the WebAssembly module.
3. **Call WebAssembly functions from JavaScript**: Once the WebAssembly module is instantiated, you can call its functions directly from JavaScript, passing arguments and receiving results as needed.

The focus of this guide is to ensure that we are able to provide a basic understanding and working example of how Fleek Functions and WASM can work together. With WASM, developers can expand the scope of their projects and bring valuable contributions to the Fleek ecosystem.

---

## Setup and requirements

1. An account on app.fleek.xyz
2. <u>[tsc](https://www.npmjs.com/package/tsc)</u> and <u>[rollup](https://rollupjs.org/introduction/#installation)</u> to bundle all necessary files properly
3. <u>[AssemblyScript](https://www.npmjs.com/package/assemblyscript)</u>
4. Code editor of your choice

## Use TypeScript in Fleek Functions using WASM

## Setup

1. Start by initializing an empty Node project -

```jsx
npm init -y
```

2. Start setting up the WASM directory in the same project -

```jsx
mkdir wasm
cd  wasm
npm init -y
touch index.ts
```

3. Add a basic addition function to the `index.ts` file. This function will be compiled to WASM and later be loaded into the Fleek Function -

```jsx
export function add(num1:number, num2: number): number{
	return num1 + num2;
}
```

4. Install AssemblyScript as a dependency here so we can compile the above typescript code to an optimized WASM module. To do so, run the following command in the terminal while being in the wasm directory -

```jsx
npm i assemblyscript --save-dev
```

5. Edit the `build` script in the `package.json` file accordingly to run the AssemblyScript compiler on the `index.ts` file we wrote and generate a WASM module. Here is how the complete `package.json` should look like -

```jsx
{
  "name": "wasm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "asc index.ts -b raw -o dist/index.wasm"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "assemblyscript": "^0.27.29"
  }
}

```

Now, to test the above script and generate a successful WASM module, head over to the terminal and run the following command -

```jsx
npm run build
```

This will generate a `dist` directory inside the `wasm` directory.

Congratulations!! You have successfully compiled typescript into WASM. It is now time to use the WASM module and import it into a Fleek Function.

---

## Building the Fleek Function

1. Start by making the `src` directory in which we will make the `main.ts` file. Please note that the first step here is to move to the previous directory as `src` and `wasm` need to exist at the same hierarchical level.

We will also be adding the type declaration file for `main.ts` here -

```jsx
cd ..
mkdir src
cd src
touch main.ts
touch declarations.d.ts
```

2. Now edit the `main.ts` file and import the WASM module to it. We will also import the `instantiate` function from the compiled `index.js` file in the bundled directory generated inside the `wasm` directory. `instantiate` will help setup and start the WASM environment in the Fleek Function and all the functions we created earlier can be added here. We will be using the `add` function here -

```jsx
import wasm from '../wasm/dist/index.wasm';
import { instantiate } from '../wasm/dist/index.js';

export async function main() {
  const { add } = await instantiate(await wasm(), { env: {} });
  return add(5, 6);
}
```

3. Finally, the typescript declaration file defines a module for importing .wasm files. It declares that any .wasm file can be imported, assigning it a type of any, and exports it as the default export. Add the following code to `declarations.d.ts` file -

```jsx
declare module "*.wasm" {
	const value: any;
	export default value;
}
```

4. Install typescript as a dependency for the project -

```jsx
npm i typescript --save-dev
npm i tsc
```

5. Generate tsconfig.json file for the project -

```jsx
npx tsc --init
```

Please ensure that your `tsconfig.json` file resembles the following -

```jsx
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

6. Install <u>[rollup](https://rollupjs.org/introduction/#overview)</u> as a dependency along with a few others to ensure that the typescript files we wrote can be bundled into javascript to be then deployed as a Fleek Function -

```jsx
npm i rollup @rollup/plugin-node-resolve@13.0.6 @rollup/plugin-typescript@11.1.6 @rollup/plugin-wasm@6.2.2
```

7. Make a new file called `rollup.config.js` and add the following code to it. This will generate a bundled javascript function in a new `dist `directory that can finally be deployed as a Fleek Function-

```jsx
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import wasm from '@rollup/plugin-wasm';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve(),
    typescript(),
    wasm({
      targetEnv: 'auto-inline',
      maxFileSize: 0,
    }),
  ],
};
```

8. Finally, let’s make all the subsequent edits to the scripts in the package.json file for the project so that we can bundle the Fleek Function using rollup -

```jsx
{
  "name": "fleek-functions-using-wasm",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "main": "./src/main.ts",
  "scripts": {
    "compile": "cd wasm && npm run build && cd ..",
    "build": "tsc && rollup -c",
    },
  "devDependencies": {
    "@fleek-platform/cli": "^2.8.6",
    "@rollup/plugin-node-resolve": "^13.0.6",
    "@rollup/plugin-typescript": "^11.1.6",
    "@rollup/plugin-wasm": "^6.2.2",
    "rollup": "^2.60.0",
    "typescript": "^5.5.4"
  },
  "license": "MIT",
  "dependencies": {
    "tsc": "^2.0.4"
  }
}
```

9. Compile and bundle by running the following commands on the terminal -

```jsx
npm run compile
npm run build
```

## Create and deploy the Fleek Function

1. Start by installing the Fleek Platform CLI -

```jsx
npm i -g @fleek-platform/cli
```

2. Now, log into the Fleek CLI -

```jsx
fleek login
```

3. After completing the login, create the Fleek Function by running the following command -

```jsx
fleek functions create --name fleekwasm
```

4. Deploy the Fleek Function -

```jsx
fleek functions deploy --name fleekwasm --path dist/main.js
```

This will return a simple output like the following -

```jsx
Bundling code: [████████████████████████████████████████] 100% | ETA: 0s | 100/100

Uploading code to IPFS: [████████████████████████████████████████] 100% | ETA: 0s | 1031/1031

✅ Success! The deployment has been successfully created.

> You can call this Fleek Function by making a request to the following URL
🔗 https://echoing-evening-thundering.functions.on-fleek.app

> You can also call this Fleek Network URL directly for increased performance (please keep in mind you will not be able to deactivate this link)
🔗 https://fleek-test.network/services/1/ipfs/bafkreiddfls57qt3sy33p5aoj4gyw57tdyz2vvqf7svbhwkgimazenons4
```

You can run the Fleek Function for the above code here - <u>https://fleek-test.network/services/1/ipfs/bafkreiddfls57qt3sy33p5aoj4gyw57tdyz2vvqf7svbhwkgimazenons4</u>

You can find a working repository for this code <u>[here](https://github.com/KanishkKhurana/wasm-with-fleek-functions)</u>

---

Amazing! With this you have successfully built a complete Fleek Function with WASM integrated into it and this can be expanded to more languages and use cases.

You can learn more about building with Fleek Functions <u>[here](https://fleek.xyz/docs/platform/fleek-functions/)</u>, including additional use cases and guides.
