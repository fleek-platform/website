---
title: 'Introducing Fullstack Next.js Support on Fleek: Build, Deploy, and Scale Dynamic Apps with Ease'
date: 2024-11-04
desc: Fullstack Next.js support is live on Fleek. Deploy apps with SSR and SSG on an edge-optimized platform for top performance and control.
thumbnail: ./njsthumb.jpeg
image: ./njsthumb.jpeg
---

Today, we're excited to launch support for fullstack **Next.js apps and sites** on Fleek! With this release, developers can now effortlessly deploy apps and experience **server-side rendering (SSR)** and **static site generation (SSG)** functionality directly within Fleek's edge-optimized platform, unlocking unparalleled scalability, performance, and control.

## **Why Next.js on Fleek?**

At Fleek, we’re committed to empowering developers with innovative tools that are reliable and cutting-edge. With our new [**Next.js support**](https://fleek.xyz/docs/cli/fleek-next-adapter/), deploying full-stack applications to Fleek has never been easier. Developers can now build apps and sites leveraging Fleek’s robust infrastructure coupled with Next.js’s powerful framework — simplifying the developer experience while optimizing for performance and cost.

## **Key Features in This Release**

For this release, we’ve focused on the core features that developers require to build and scale Next.js apps seamlessly on Fleek. Here’s what’s available starting today:

- **App Router & Pages Router**: Full compatibility with Next.js's app and page routing systems ensures that applications of any size can run smoothly on Fleek’s edge network.
- **Route Handlers**: Define custom server-side route handlers for more flexibility in handling requests.
- **Dynamic Routes**: Create dynamic routes within your app, enabling personalized content and advanced routing logic.
- **Static Site Generation (SSG)**: Pre-render pages at build time, optimizing load speeds and improving user experience.
- **Server-Side Rendering (SSR)**: Generate pages on request, ensuring content is always up-to-date without sacrificing performance.
- **Middleware**: Run code before a request is completed, allowing you to handle redirects, authorization, and more, at the edge.

---

## **How to Get Started**

Get started deploying a Next.js application on Fleek with the `**fleek-next` CLI\*\* tool. Here are the steps to get your app or site up and running:

1. **Install the [Fleek CLI](https://fleek.xyz/docs/cli/)**: Install the `fleek-next` package, a tailored CLI tool optimized for Fleek’s infrastructure. Simply run `npm i @fleek-platform/next` on your terminal.
2. **Set Your Edge Runtime**: In your server-side code, set `export const runtime = 'edge';` to ensure compatibility with Fleek’s edge network.
3. **Build**: Use `fleek-next build` to build your application. If you’re working outside your project’s root directory, simply add the `-p` or `--projectPath` flag to specify your file path.
4. **Deploy**: Finally deploy your application using `fleek functions deploy --bundle=false --path .fleek/dist/index.js --assets .fleek/static`. This command will prompt you to add the function name, so ensure that you run `fleek functions create -–name <function-name>` beforehand.

For more details, check out the [Getting Started Guide](https://fleek.xyz/docs/cli/fleek-next-adapter/), [GitHub](https://github.com/fleek-tools/fleek-nextjs-boilerplate), or [Docs](https://fleek.xyz/docs/platform/frameworks/), or try the setup via [NPM](https://www.npmjs.com/package/@fleek-platform/next).

---

## **Looking Ahead**

And this is just the beginning. Our **Phase 2 release** will bring even more power to Next.js apps on Fleek, including **Incremental Static Regeneration (ISR)**, **Image Optimization**, **Streaming Support**, and more.

Here’s what’s coming:

- **Incremental Static Regeneration (ISR)**: Imagine the best of both worlds—high-speed static performance with real-time updates. ISR will allow your app to serve pre-rendered pages lightning-fast while staying fresh with the latest data on demand. No more full rebuilds; just seamless updates exactly when and where you need them.
- **Image Optimization**: Fully optimized images, served at edge speed. Next.js on Fleek will handle image resizing, compression, and format conversion automatically, so your media-heavy apps load faster and look sharper. This means smoother UX and a boost in site performance across devices—your users will love it.
- **Streaming Support**: With Streaming, Fleek takes your app’s interactivity to a new level, sending content to users as it’s generated. This opens the door to interactive experiences that load fast and keep audiences engaged, even with complex or data-rich applications.
- **Lazy Loading, Caching & More**: Performance is a non-negotiable, and Fleek is working on bringing you even more control with fine-tuned caching strategies, lazy loading for route handlers enabling optimized page loads, and advanced edge configurations. These optimizations mean users won’t just experience your app—they’ll be _immersed_ in it.

---

## **A New Era for Web Development on Fleek 🌐**

At Fleek, our mission is to empower developers by creating open-source tools and infrastructure that enable you to build unstoppable and performant apps, without compromise. The addition of fullstack Next.js on Fleek represents another step toward that vision — unlocking access to dynamic content on an unstoppable, edge-optimized developer platform.

We believe in an internet where developers retain full control of their IP, non-negotiable performance, and an open-source codebase. By supporting Next.js with Fleek’s infrastructure, we’re enabling anyone to push the limits of what's possible in web development and create a new standard of accessibility, sovereignty, and transparency.

Our releases are a testament to our mission of advancing the open web and making powerful, open-source tools accessible to all builders, innovators, and dreamers. Join us in shaping the future of the internet—one open, unstoppable, and developer-first deployment at a time. We’d also like to give a special shout out to [OpenNext](https://opennext.js.org/), [next-on-pages](https://github.com/cloudflare/next-on-pages), and [Vercel](https://vercel.com/) for enabling us to bring fullstack Next.js to Fleek.

## **Join the Fleek Community**

Ready to explore Next.js on Fleek? Join our exclusive builder channel in [Discord](discord.gg/fleek) to share feedback, follow our updates on [X](https://x.com/fleek), and don’t hesitate to show us what you’re cooking up. Together, we’re building the unstoppable future of the internet.

**### Get started building on Fleek:**

- [Sign Up](https://app.fleek.xyz/)
- [Getting Started with Next.js on Fleek](https://fleek.xyz/docs/cli/fleek-next-adapter/)
- [Fleek CLI](https://fleek.xyz/docs/cli/)
- [Fleek SDK](https://fleek.xyz/docs/sdk/)
- [Templates](https://app.fleek.xyz/templates/)
- [Deploying Next Contentlayer with Fullstack Next.js on Fleek](https://fleek.xyz/guides/deploy-nextjs-fullstack-fleek-adapter-guide/)
- [Deploying Fumadocs with Fullstack Next.js](https://fleek.xyz/guides/deploy-fumadocs-fullstack-nextjs-on-fleek-guide/)
- [Beginners guide to SSR](https://fleek.xyz/blog/learn/server-side-rendering-explained/)
- [Edge SGX](https://fleek.xyz/docs/cli/edge-sgx/)
- [Fleek Functions](https://fleek.xyz/docs/cli/functions/)