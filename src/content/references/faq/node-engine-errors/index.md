---
title: 'Node engine errors'
date: 2023-03-16
desc: 'Node engine mismatch errors indicate the selected Docker image lacks the required Node.js versions'
thumbnail: './node-engine-errors.png'
image: './node-engine-errors.png'
---

If you are getting node engine mismatch errors, don't worry. It only means the docker image you selected does not have the required node version.

However, you can use [any docker image published on dockerhub](https://hub.docker.com/search), you don't need to use the ones we provide if they are not fit for your project!

Try choosing an official docker image on the "Docker Image Name" field on your build settings, for example, one that usually does the trick is "node:lts" (no fleek/ prefix)
Make sure the image you choose has the dependencies your project needs, for a React app for example, you'd only need node!

This way, you can specify exactly what node version you want to use 😁️

You can also opt to build your own docker image which satisfies all the dependencies your project has and publish it on dockerhub in order to use it on fleek.
