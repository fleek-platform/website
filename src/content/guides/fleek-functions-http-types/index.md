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

To understand Fleek Function types, it is best to take a look into how they are applied in real-world use cases, which is why we will be focusing on the <u>[fleek-function-utils](https://github.com/gabrielmpinto/fleek-function-utils)</u> library and its usage.

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

The wrapper function is an asynchronous utility designed to enhance another function, fn, that processes HTTP requests. It accepts a request object and optional opts for logging. If the request's query contains debug=true, the function captures logs and returns them alongside the response or error details. If not in debug mode, it simply returns the result of the function or the error encountered. It uses wrapLogger to handle logging and error capturing for better debugging and monitoring.

```jsx
import { wrapLogger as wrapLogger, LoggerOptions } from './logger';
import { HttpRequest, HttpResponse } from './types';

export type WrapperOptions = {
  log?: LoggerOptions;
};

export const wrapper = async (
  fn: (request: HttpRequest) => Promise<HttpResponse>,
  request: HttpRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  opts?: WrapperOptions,
) => {
  const debug = request?.query?.debug ?? false;
  const { logs } = wrapLogger();

  try {
    const response = await fn(request);

    return debug
      ? {
          body: {
            success: true,
            result: response,
            logs,
          },
        }
      : response;
  } catch (error: unknown) {
    let errorMsg;
    if (error instanceof Error && error.message) {
      errorMsg = {
        message: error.message,
        name: error.name,
        cause: error.cause,
        stack: error.stack,
      };
    } else {
      errorMsg = error;
    }

    return debug
      ? {
          body: {
            success: false,
            error: errorMsg,
            logs,
          },
        }
      : error;
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
- <u>[Webpack](https://webpack.js.org/guides/getting-started/#basic-setup)</u>
- Code editor of your choice
- Your terminal

A lot of the steps necessary to have everything in place for this were outlined in this <u>[sister guide article](https://fleek.xyz/guides/running-bundled-webpack-functions-on-fleek/)</u>.

Essentially the steps are:

1. Set up your directory and create an `src` folder within it that contains an `index.js` file in it. Also run the below commands:

```
npm init -y
npm install webpack webpack-cli --save-dev
```

2. Ensure you have the Fleek CLI and Webpack installed.

3. In your `webpack.config.js`, paste the below:

```jsx
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    library: {
      type: 'module',
    },
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'none',
  experiments: {
    outputModule: true,
  },
};
```

4. Then, run the below command:

```
npm run build
```

5. The above generates a `dist` folder that contains a `bundle.js` file within it, you can move on to creating the Fleek Function:

```
fleek functions create --name fleek-function-types
```

6. Then you deploy the function:

```
fleek functions deploy \
--name fleek-function-types \
--path ./dist/bundle.js
```

For more insights on creating and deploying a Fleek Function, you can check <u>[here.](https://fleek.xyz/docs/cli/functions/#create-a-fleek-function)</u> After the above steps, you should have something similar to what was outlined above. The `wrapper ` should perform as expected.

---

In this guide, we've explored how Fleek Function types can enhance your serverless edge functions by providing type safety and robust handling of HTTP requests and responses. You can ensure that your HTTP interactions are well-structured and less prone to runtime errors.

We explored the fleek-function-utils library, which offers practical utilities for debugging and applying these types. Specifically, we examined the wrapper function, an asynchronous utility that simplifies handling HTTP requests, logging, and debugging. Using these types offers several benefits:

- **Type safety**: Ensures that the structure of HTTP requests and responses is consistent, reducing the likelihood of runtime errors due to unexpected data formats.
- **Error handling**: Simplifies the detection and handling of errors, providing detailed error messages and stack traces.
- **Enhanced debugging**: Allows for comprehensive logging and debug mode, making it easier to trace and fix issues.
- **Code readability**: Improves code readability and maintainability by clearly defining the shape of HTTP interactions.

To learn more about Fleek Functions, their use cases and advantages they provide, check out our <u>[docs](https://fleek.xyz/docs/cli/functions/)</u>, <u>[blog](https://fleek.xyz/blog/)</u>, join our <u>[Discord server](http://discord.gg/fleek)</u> and follow us on <u>[X](https://x.com/fleek)</u>!
