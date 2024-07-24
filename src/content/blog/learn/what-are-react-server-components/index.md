---
title: 'What Are React Server Components?'
date: 2024-07-24
desc: 'Learn about React Server Components, their benefits, limitations, and how they can improve performance for static sites and onchain hosting.'
thumbnail: './reactserver.png'
image: './reactserver.png'
author:
  - 'Fleek'
---

React Server Components (RSCs) are a relatively new React component paradigm that allows developers to render components on the server rather than the client. The React team introduced this new approach to improve performance, reduce bundle sizes, and enhance security by keeping sensitive data on the server.

RSCs are particularly beneficial in frameworks like Next.js, which support react server components in their latest versions. By rendering components on the server and sending only the necessary HTML to the client, React apps can minimize the amount of JavaScript that needs to be downloaded, parsed, and executed by the browser.

## React Client Components vs. Server Components: Key Differences

Let's look at the main differences between client and server components. A client component is a traditional React component that runs in the browser, handling user interactions, managing state, and accessing browser-specific APIs. It is rendered on the client side and can re-render in response to state changes or user interactions. Client components typically access data via an API.

In contrast, a server component is rendered exclusively on the server, and its JavaScript code is never sent to the client. Server components are designed to handle data fetching and rendering tasks on the server, benefitting from its computational power and proximity to data sources.

These differences have significant implications for web development. Client components are responsible for the application's interactive parts, using React hooks to manage state and side effects. They can handle user inputs and update the UI accordingly.

Server components, however, do not have access to browser APIs and do not re-render on the client. They are ideal for static content or data-heavy components that do not require immediate interactivity.

## Server Components vs. Server-Side Rendering

It's important to understand that React Server Components and Server-Side Rendering (SSR) are distinct concepts, although they share some similarities.

### Server-Side Rendering

SSR involves rendering the entire React component tree on the server and sending the generated HTML and the necessary JavaScript to the client.

Once the client has the initial HTML, it can run the JavaScript code and fetch data in a process known as hydration. The primary focus of SSR is to improve the initial page load time and provide better SEO by delivering pre-rendered HTML to the client.

### React Server Components

A React Server Component is a component rendered on the server and sent as HTML to the client. However, it is part of a more extensive architecture that allows for server-rendered content to be seamlessly integrated with client-rendered content. React Server Components can fetch data and perform other server-side tasks before sending the HTML to the client, which improves performance and reduces the amount of JavaScript sent to the client.

Instead, RSCs focus on rendering individual components on the server and leveraging server-side resources for data fetching and computation.

While SSRs and RSCs serve different purposes, they can complement each other in a React application. SSR can render the initial page load, providing a fast and SEO-friendly experience, while RSCs can be used for specific components that benefit from server-side rendering and data fetching.

Web developers can also mix server and client components as necessary via the 'use client' directive.

## Why Use React Server Components?

React Server Components offer several compelling advantages, making them an attractive choice for developers. One of the primary benefits is the reduction in client-side JavaScript bundle sizes. Since RSCs do not send their code to the client, less JavaScript is downloaded and executed by the browser. Initial page load is faster and performance is improved, especially on slower networks or less powerful devices.

RSCs also enable efficient data fetching by allowing components to access server-side resources directly. There is no need for additional client-side processing or multiple client-server round trips, resulting in improved data fetching efficiency and reduced latency.

RSCs also enhance security by keeping sensitive data and logic on the server, preventing exposure to the client.

## The Limitations of Server Components

Despite the benefits of React Server Components, you should be aware of their limitations. One significant constraint is the inability to use certain React features and hooks within RSCs. Since RSCs do not re-render on the client, they cannot utilize hooks like useState, useReducer, useEffect, and useContext to manage state and side effects.

Additionally, RSCs cannot access browser-specific APIs such as window, document, localStorage, and sessionStorage. Any functionality that requires interaction with the browser environment must be handled by client components.

RSCs also cannot directly handle user interactions through event handlers like onClick or onChange, as event handling is inherently a client-side activity.

## Performance Benefits of Using Server Components

One of the most compelling reasons to adopt React Server Components is the potential for significant performance improvements. By rendering components on the server and sending only the necessary HTML to the client, RSCs enable faster initial page loads and a quicker First Contentful Paint (FCP).

Additionally, RSCs enable server-side caching of rendered results, which can be reused across users and requests. This caching mechanism reduces the rendering and data fetching required for each request, improving performance, SEO, TTI (time to interactive), and reducing server costs.

## React Server Side Components and Decentralized Hosting

RSCs can be rendered when a browser request is received, allowing dynamic components to retrieve data from a database or API at request time. But they can also be rendered in advance in a static site generation process. Static site generation allows developers to generate component HTML at build time and distribute it via a CDN or a decentralized storage solution like IPFS.

By leveraging RSCs' performance benefits, decentralized sites can offer a better user experience with faster load times and more responsive interfaces.

If you'd like to try React Server Components on a onchain hosting platform, you can easily launch a <u>[static Next.js app on Fleek's IPFS hosting](https://fleek.xyz/blog/learn/server-side-nextjs-on-fleek/)</u>. For those interested in diving deeper into the React server components paradigm, the <u>[official React documentation](https://react.dev/reference/react)</u> provides a <u>[comprehensive guide and additional resources](https://react.dev/reference/rsc/server-components)</u>.
