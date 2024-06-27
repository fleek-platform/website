---
title: 'Github Actions CI/CD Support on the CLI Beta'
date: 2023-02-08
desc: 'Configure a Github action for your repository that automatically builds and deploy your Fleek site to IPFS upon each commit.'
thumbnail: './ci-cd-2.png'
image: './ci-cd-2.png'
---

Releases are hitting a weekly cadence over here! ⚡️ And this week, after previously releasing Sites Deployments on the CLI beta, we’re following-up with the first automated **CI/CD deployment flow integration: Github Actions**.

The TL;DR? With one command, you can configure a Github action for your repository that automatically builds and deploy your Fleek site to IPFS **upon each commit**, outputting the hash. As always, you can now find a how-to on this at [our documentation](/docs/)!

---

## Automatic Deployments with Github Actions

![](https://storage.fleek.ooo/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/ci-code.png)

Today we’re integrating the first managed CI/CD pipeline option with Github Actions. With a quick command, you can **create a configuration .yaml file** that sets up a Github Action on your repository which will trigger **automatic Fleek deployments each time a new commit is sent!**

        > fleek sites ci
        ? Select provider you want to use for building and deploying your sites › - Use arrow-keys. Return to submit.
        ❯   GitHub Actions - Generator of Github Actions YAML file

Just open up your project on the CLI, and use the fleek sites ci command. It will create the .yaml file and a Github workflows directory in your local repository, which you can commit to Github enabling the Action. From there, each commit you do will trigger the action, and generate an IPFS hash for the new deployment. **Here's a quick video on how to use this feature:**

<iframe width="600" height="350" src="https://www.youtube.com/embed/KZvYrllpb-4?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

In the future, with the help of the CI you will be able to update domains and other important records that are related to a deployment.

---

## Honorable Mentions & Fixes

We’ve also squashed quite a few bugs and packaged more improvements that we found thanks to all testers and their feedback. If you encounter anything on this release, give our Support repo a visit and open up an issue for the team.

Some rapid-fire additions and fixes on this release:

- New cli command to list sites `fleek sites list`
- Automatic browser opening removed
- Catch SIGKILL on site init and escape gracefully
- Improve sites deploy success message
- Fix an infinite loading in login
- Add ipfs gateway url to success message of sites deploy

Found a bug, or want to suggest a feature? Visit our [Discord](https://discord.gg/fleek) and open an issue.

---

That’s all for today! A flash-release expanding our Sites Deployment features. What’s next in line for our release calendar? We’re working on adding custom domain management to the CLI next! Stay tuned to our [Twitter](https://twitter.com/fleek) or [Discord](https://discord.gg/fleek) to find out more about it.
