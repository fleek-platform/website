---
title: 'How to use Fleek Function types'
date: 2024-08-08
desc: 'Using different types of Fleek Functions for HTTP requests and responses'
thumbnail: './fftypes.png'
image: './fftypes.png'
author:
  - 'Fleek'
---

Fleek Functions, being on-chain serverless edge functions, use HTTP requests and responses as their primary means of access when users interact with them. In this guide, we will take a pragmatic look at how Fleek function types can be used within your Fleek Functions.

If you are reading this, it is expected that you already know what HTTP and <u>[Fleek Functions](https://fleek.xyz/docs/platform/fleek-functions/)</u> are, and that you have a Fleek account; you can sign up <u>[here](https://app.fleek.xyz/)</u> if you don’t have an account already.

As you follow along, you will notice a few Fleek Function aliases which you may already be familiar with. If not, you can take a look <u>[here](https://fleek-network.github.io/js-docs/fleek-node-api.html#Type%20Aliases)</u> to see the type aliases provided by the Fleek runtime which we interact with via Fleek Functions.

Let's get into the different types of Fleek Functions, and their use cases.

---

## Exploring Fleek Function types

Fleek Function types help maintain the consistency of data types involved in the exchange of data within the server runtime; this enables the correct data to be read and taken in by the edge functions and the correct response to be outputted by them.

For example:

- An HTTP request must have an HTTP request method.

- An HTTP response must have a status code.

The above are some things that may seem trivial, but when dealing with serverless runtime APIs within edge functions like Fleek Functions, they need to be taken into consideration. As systems scale, these seemingly mundane things tend to have a huge impact on your Fleek Functions.

To understand Fleek Function types, it is best to take a look into how they are applied in real-world use cases, which is why we will be working with the <u>[fleek-function-utils](https://github.com/gabrielmpinto/fleek-function-utils)</u> library and its usage.

The library has utilities for debugging Fleek Functions and types for HTTP requests and responses. Without further ado, let’s step into the library’s code to see what is happening there.

In this part, we will see:

- The Fleek Function types
- Fleek Function types being applied to a higher order function called `wrapper`

```jsx
export type HttpRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

export type HttpRequest = {
  method: HttpRequestMethod;
  path: string;
  headers?: Record<string, string>;
  query?: Record<string, unknown>;
  body?: unknown;
};

export type HttpResponseHeaders =
  | Record<string, string>
  | Record<string, string[]>
  | [string, string][]
  | [string, string[]][];


export type HttpResponse = {
  status: number;
  headers: HttpResponseHeaders;
  body: unknown;
};
```

These type definitions are useful for ensuring that HTTP request and response objects adhere to a specific structure, providing type safety and reducing the likelihood of runtime errors. You can take a look at the code via <u>[this GitHub link](https://github.com/gabrielmpinto/fleek-function-utils/blob/main/src/types.ts)</u> and you can also cross reference with the type aliases from the Fleek runtime <u>[here.](https://fleek-network.github.io/js-docs/fleek-node-api.html#Type%20Aliases)</u>

---

## Applying the types

The below code is an asynchronous function designed to be a Fleek Function. It processes HTTP requests and checks if the request method is "GET." If the request method is not "GET," it returns a 400 status code with a message indicating that only GET requests are allowed. If the request method is "GET," it returns a 200 status code with a personalized greeting using the name parameter from the query string, defaulting to "World" if no name is provided. This demonstrates handling different HTTP methods and query parameters in Fleek functions

```tsx
import { HttpRequest, HttpResponse } from 'fleek-function-utils';

export const main = async (params: HttpRequest): Promise<HttpResponse> => {
  if (params.method !== 'GET') {
    return {
      status: 400,
      headers: {},
      body: 'Only GET requests are allowed',
    };
  } else {
    return {
      status: 200,
      headers: {},
      body: `Hello, ${params.query?.name || 'World'}!`,
    };
  }
};
```

### HttpRequest and HttpResponse types:

- **HttpRequest**: Defines the structure of an HTTP request, including method, path, headers, query parameters, and body.
- **HttpResponse**: Describes the structure of an HTTP response, specifying status, headers, and body.

The above code in the library is linked <u>[here.](https://github.com/gabrielmpinto/fleek-function-utils/blob/main/src/wrapper.ts)</u>

### Example usage

To setup the environment to test this out, you will need to have a few things in place:

- <u>[Fleek CLI](https://fleek.xyz/docs/cli/)</u>
- <u>[esbuild](https://esbuild.github.io/getting-started/#install-esbuild)</u>
- Code editor of your choice
- Your terminal

A lot of the steps necessary to have everything in place for this were outlined in this <u>[sister guide article](https://fleek.xyz/guides/running-bundled-webpack-functions-on-fleek/)</u>.

Essentially the steps are:

1. Set up your directory and create an `src` folder within it that contains an `index.ts` file in it. Also run the below commands:

```bash
npm init -y
npm install --save-exact --save-dev esbuild
```

2. Ensure you have the Fleek CLI and esbuild installed.

3. In your `package.json`, add the script below:

```js
  "scripts": {
    "build": "esbuild --bundle index.ts --platform=neutral > bundle.js"
  },
```

4. Then, run the below command:

```bash
npm run build
```

5. The above generates a `bundle.js` file, you can move on to creating the Fleek Function:

```bash
fleek functions create --name fleek-function-types
```

6. Then you deploy the function:

```bash
fleek functions deploy --name fleek-function-types --noBundle --path bundle.js
```

For more insights on creating and deploying a Fleek Function, you can check <u>[here.](https://fleek.xyz/docs/cli/functions/#create-a-fleek-function)</u> After the above steps, you should have something similar to what was outlined above. The `main` function should perform as expected.

---

In this guide, we've explored how Fleek Function types can enhance your serverless edge functions by providing type safety and robust handling of HTTP requests and responses. You can ensure that your HTTP interactions are well-structured and less prone to runtime errors.

We explored the `fleek-function-utils` library, which offers practical utilities for debugging and applying these types. Using these types offers several benefits:

- **Type safety**: Ensures that the structure of HTTP requests and responses is consistent, reducing the likelihood of runtime errors due to unexpected data formats.
- **Error handling**: Simplifies the detection and handling of errors, providing detailed error messages and stack traces.
- **Enhanced debugging**: Allows for comprehensive logging and debug mode, making it easier to trace and fix issues.
- **Code readability**: Improves code readability and maintainability by clearly defining the shape of HTTP interactions.

To learn more about Fleek Functions, their use cases and advantages they provide, check out our <u>[docs](https://fleek.xyz/docs/cli/functions/)</u>, <u>[blog](https://fleek.xyz/blog/)</u>, join our <u>[Discord server](http://discord.gg/fleek)</u> and follow us on <u>[X](https://x.com/fleek)</u>!
