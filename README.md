![](public/images/repo-banner.png?202404161720)

# ⚡️Fleek.xyz Website

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

This repository contains the source code and assets for the Fleek.xyz website, which is built using the [Astro.js framework](https://astro.build) for enhanced performance and speed. The project leverages Tailwind CSS for styling, providing a modern and responsive design, and TypeScript for type safety and scalability, ensuring a robust and maintainable codebase.


## 📒 Content

- [Setup](#setup)
    - [Requirements](##requirements)
    - [Install](##install)
    - [Develop](##develop)
    - [Build](##build)
    - [Preview](##preview-locally)
    - [Contribution guideline](##contribution-guideline)
- [Instructions](#instructions)
    - [Blog](##blog)
        - [New post](##new-post)
    - [Admonitions](##admonitions)
    - [Images](##images)

# Setup

## ⚙️ Requirements

- Nodejs
- NPM, Yarn or PNPM
- Some experience with CLI

Learn how to install Nodejs in your operating system by following the instructions [here](https://nodejs.org/en/download/package-manager/).

## 🤖 Install

Install the project dependencies in your local environment.

```
npm install
```

## 👷‍♀️Develop

Start a local HTTP server for development work. It supports hot-reload and you'll be able to see your edits everytime you save the files:

```
npm run dev
```

## 🏗️ Build

Run the build command to create the distribution version. The files will be saved in the `/dist` directory by default.

```
npm run build
```

💡 By default, the development server is available in the address [http://localhost:4321](http://localhost:4321).

Tweak environment settings (src/settings.json), such as the site URL. Declare the `NODE_ENV` with value `prod` or `production` to switch environment target settings.

## 🙈 Preview locally

You can preview the distribution build locally by starting the preview HTTP server

```
npm run preview
```

💡 By default, the local site will be available in the address [http://localhost:4322](http://localhost:4322).

## 🙏 Contribution guideline

Create branches from the `develop` branch and name it in accordance with conventional commits [here](https://www.conventionalcommits.org/en/v1.0.0/).

Here's an example:

```txt
test: 💍 Adding missing tests
feat: 🎸 A new feature
fix: 🐛 A bug fix
chore: 🤖 Build process or auxiliary tool changes
docs: ✏️ Documentation only changes
refactor: 💡 A code change that neither fixes a bug or adds a feature
style: 💄 Markup, white-space, formatting, missing semi-colons...
```

Find more about contributing [TODO:OPEN-SOURCE-CONTRIBUTION-DOC](https://TODO:OPEN-SOURCE-CONTRIBUTION-DOC), please!

# Instructions

[TODO] Write instructions intro

## Blog

### New post

A blog post is organized as a directory that should include all the necessary image assets.

The directory should be named after the slug, a system-friendly name, e.g. "My short title" would become "my-short-title". Additionally, the markdown filename containing all the text should be named as "index.md".

For example, let's assume the creation of an hypothetical blog post named "My Blog post".

1) Create the directory with corresponding slug "my-blog-post" in the `src/content/blog` location, as follows:

```sh
src/content/blog/my-blog-post
```

2) Create the file named "index.md" in the directory.

```sh
src/content/blog/my-blog-post/index.md
```

The "index.md" is a markdown file where the text content and story is going to be stored.

3) Set the "index.md" markdown header values, that include title, category, date, etc

```markdown
---
title: My Blog post
slug: my-blog-post
category: Announcements
date: 2024-01-31
desc: A short description about my blog post
thumbnail: "./thumbnail.jpg"
image: "./main-image.jpg"
author: "Fleek"
---
```

4) Write the content, including any image references

```markdown
---
title: My Blog post
slug: my-blog-post
category: Announcements
date: 2024-01-31
desc: A short description about my blog post
thumbnail: "./thumbnail.jpg"
image: "./main-image.jpg"
author: "Fleek"
---

Dive into a world of concise knowledge and thought-provoking ideas. Whether you're a seasoned reader or a curious newcomer, this blog post promises to captivate your mind and leave you pondering long after you've finished reading. So grab your favorite beverage, find a cozy spot, and let's explore together!

## My subtitle 1

In the world where text is text, I show you an image:

![My image](./my-image.jpg)
```

## Admonitions

[TODO] Write admonitions intro

```
:::note
This is a note
:::

:::success
This is a success
:::

:::warn
This is a warning
:::

:::danger
This is a danger
:::

:::info
This is a info
:::

```

To learn more read the directives [here](https://github.com/Microflash/remark-callout-directives)

## Images

Local images are kept in `src/images` when possible so that the build process can transform, optimize and bundle them. Files in the `/public` directory are always served or copied into the build folder as-is, with no processing.

When importing images, you have to provide query parameters such as width, height and format. This settings are used by the build process to generate optimized images. Also, the optimizer doesn't have support for Typescript, meaning that you have to use the `// @ts-ignore` to ignore the import line.

The import name convention is camel-case and to use the prefix img, e.g. imgMyImage.

```ts
// @ts-ignore
import imgFleekLogo from "@images/globe-with-bolt.jpg?w=480&h=480&format=webp";
```

Place the image in the <img> src field:

```html
<img src={imgFleekLogo} alt="Image text replacement" />
```

To generate responsive images, e.g. [SrcSet](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images):

```ts
// @ts-ignore
import avif from '@images/example.jpg?w=500;900;1200&format=avif&as=srcset'
// @ts-ignore
import webp from '@images/example.jpg?w=500;900;1200&format=webp&as=srcset'
// @ts-ignore
import fallback from 'example.jpg?w=700'

const html = `<picture>
    <source srcset="${avif}" type="image/avif" />
    <source srcset="${webp}" type="image/webp" />
    <img src="${fallback}" />
</picture>
`
```
