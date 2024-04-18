![](public/images/repo/repo-banner.png?202404161720)

# ⚡️Fleek.xyz Website

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

This repository contains the source code and assets for the Fleek.xyz website, which is built using the [Astro.js framework](https://astro.build) for enhanced performance and speed. The project leverages Tailwind CSS for styling, providing a modern and responsive design, and TypeScript for type safety and scalability, ensuring a robust and maintainable codebase.


## 📒 Content

- [Setup](#setup)
    - [Requirements](#%EF%B8%8F-requirements)
    - [Install](#-install)
    - [Develop](#%EF%B8%8Fdevelop)
    - [Build](#%EF%B8%8F-build)
    - [Preview (locally)](#-preview-locally)
    - [Preview (staging)](#-preview-staging)
    - [Contribution guideline](#-contribution-guideline)
- [Instructions](#-instructions)
    - [Blog](#-blog)
        - [New post](#-new-post)
        - [Create a Pull request](#-create-a-pull-request)
    - [Admonitions](#-admonitions)
    - [Images](#-images)
- [Development](#-development)
    - [Search server](#-search-server)
    - [Images (optimization)](#-images-optimization)

# Setup

## ⚙️ Requirements

- Nodejs
- NPM, Yarn or PNPM
- Some experience with CLI
- Docker (Optionally, if you want to run search server locally)

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

## 👀 Preview staging

You can preview the develop branch version by visiting the preview [here](https://rapping-jelly-echoing.on-fleek.app).

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

# 🎓 Instructions

Instructions for common tasks.

## 📝 Blog

### 🚩New post

A blog post is organized as a directory that should include all the necessary image assets.

The directory should be named after the slug, a system-friendly name, e.g. "My short title" would become "my-short-title". Additionally, the markdown filename containing all the text should be named as "index.md".

For example, let's assume the creation of an hypothetical blog post named "My Blog post".

#### 1) Create the directory with corresponding slug "my-blog-post" in the `src/content/blog` location, as follows:

```sh
src/content/blog/my-blog-post
```

#### 2) Create the file named "index.md" in the directory.

```sh
src/content/blog/my-blog-post/index.md
```

The "index.md" is a markdown file where the text content and story is going to be stored.

#### 3) Set the "index.md" markdown header values, that include title, category, date, etc

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

#### 4) Write the content, including any image references

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

## 🥷 Create a Pull request

You can create a PR (pull request) programmatically or by using the GitHub web interface.

In order to create a pull request (PR), you have to understand that the project has a file structure architecture, containing source-files for components, images, stylesheets and much more.

For our example we are going to create new content. The content is placed in the `src/content` directory for blog or docs.

Here's how to create a new blog post content using the GitHub web interface:

#### 1) Navigate the content source files (src/content) in the GitHub file explorer

```
src/content/blog
├── announcements
├── changelog-march-11
│   ├── fleekchangelog01mar11.png
│   └── index.md
└── fleek-release-notes-v004
    ├── Log-in-connections.png
    ├── fleekreleasenotes06.jpg
    └── index.md

4 directories, 5 files
```

#### 2) Expand the file tree if collapsed

Click on the file tree icon to expand it.

![File tree](public/images/repo/github-file-tree-collapsed.png?202404161822)

Once expanded you should see the file tree.

![File tree expanded](public/images/repo/github-file-tree-expanded.png?202404161824)

#### 3) Create a branch

Click on the drop-down menu and type a new name. Make sure that you follow the naming conventions in the [Contribution guidelines](#contribution-guidelines).

For example, in the image we see the creation of a branch named **docs/my-new-branch**

![New branch](public/images/repo/github-new-branch.png?202404161826)

Click in the "Create branch docs/my-new-branch from develop".

#### 4) Create a directory for the post content files

To create a new directory in a repository click “create a new file.” Type your new directory's name in the area where you would write the file name, and at the end of the file name type a "/" to initilize it as a direcvtory. After this you can create a new file in the directory.

![Create directory](public/images/repo/create-new-directory.png?202404161826)

#### 5) Create the "index.md"

Type the name "index.md" for the new filename.

![Create new file](public/images/repo/create-new-file.png?202404161826)

#### 6) Commit changes

Type a brief commit message following the [Contribution guidelines](#contribution-guidelines), such as:

```
docs: ✏️ Created document in post directory
```

If you wish, you can add more details in the "Extended description".

Select the option "Commit directly to the docs/my-new-branch branch" and commit it by pressing "Commit changes".

#### 7) Click the filename to open it

![Click filename to open](public/images/repo/click-in-filename-index-md.png?202404161826)

#### 8) Click in the option "Edit this file" to edit

In the right side of the window, locate the pencil icon and click it to start editing the file.

![Edit this file](public/images/repo/edit-this-file.png?202404161826)

#### 9) Start adding content to the file

Add content to the file. For example, here we have put the markdown header and some text.

```
---
title: "Put a title here"
slug: "put-a-title-here"
category: "Name of category"
date: 2024-03-11
desc: "A short description"
thumbnail: "./a-local-image.png"
image: "./a-local-image.png"
author: "Your name"
---

The content goes here
```

Learn more by reading the [New post](#new-post) section.

#### 10) Commit your changes

Everytime there's a new change, you can commit it. It'll store the changes in the repository branch you have created.

#### 11) Once happy create a pull request

You can create a pull request by visiting the [compare](https://github.com/fleekxyz/fleekxyz-website/compare).

Use the second drop box to select the branch name you have just created for your post content.

![Use compare to create a new pull request](public/images/repo/use-compare-to-create-pull-request.png?202404161849)

Press the "Create pull request" and fill up the following filds by providing a title for your pull request and a description.

To complete select "Create pull request".

![Pull request form](public/images/repo/pull-request-form.png?202404161849)

## 🎯 Admonitions

The concept of admonitions is often used in documentation and content creation to highlight important notes, warnings, tips, or other types of information in a distinctive way.

Here's the syntax to create admonitions in markdown content, such as a docs post:

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

# 👷‍♀️Development

## 🔎 Search

Search is provided by [Meilisearch](https://www.meilisearch.com/). The local search server is provided as a [Docker](https://www.docker.com/) image, which you have to have installed and running.

You can start a server locally by running the command:

```sh
npm run search:serve
```

## 📸 Images (Optimization)

The build process can optimize the images but that requires the user to use the correct image components. Use the instructions provided to optimize the images.

### 🪐 Astro

For astro components (<component-name>.astro) do:

```
---
import { Image } from 'astro:assets';
import localBirdImage from '../../images/subfolder/localBirdImage.png';
---
<Image src={localBirdImage} alt="A bird sitting on a nest of eggs." /> 
```

To learn more read [here](https://docs.astro.build/en/guides/images/)

### 🎁 Reactjs

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

Learn more [here](https://github.com/JonasKruckenberg/imagetools/)
