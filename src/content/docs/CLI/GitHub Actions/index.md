---
order: 10
title: GitHub Actions
date: 2023-01-10
desc: Create a GitHub Action for deploying a Fleek Site
keywords: [services, documentation, getting started]
tags:
  - CLI
  - Guide
  - Learn
  - Fleek
  - GitHub
  - CI/CD
---

# GitHub Actions

Use custom GitHub Actions to deploy your site to Fleek instead of using the CLI's [Site deploy](/docs/cli/sites#deploy-a-site) command. This approach is suitable if you have an existing repository that you want to deploy on [Fleek Platform](https://fleek.xyz).

The Fleek-platform CLI can generate a GitHub Action (yaml) for deploying a [Fleek Site](/docs/cli/site) by automating the process of building and publishing it. It ensures that your latest changes are quickly and consistently pushed whenever you update the repository, e.g. on main branch update.

### Create a GitHub Action for Fleek Sites deployment

First, ensure that you have initialized a [Fleek Site](/docs/cli/sites#initialize-the-fleek-site), if you haven't done already you can learn about it [here](/docs/cli/sites#initialize-the-fleek-site).

After initializing a Fleek Site, you can run the `ci` (Continuous Integration) command:

```sh
fleek sites ci
```

A wizard will guide you to create a GitHub Action configuration file of type `json`, `js` or `ts`, e.g. `fleek.config.json`.

The process saves the file in the local GitHub Workflows directory. You can optionally customize the path.

```sh
.github/workflows/fleek-deploy.yaml
```

### Configure the GitHub repository settings

On [Create a GitHub Action](#create-a-github-action) completion, the wizard will display the `token` and `projectId` to have configured in the GitHub repository settings, e.g. [GitHub Secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).

Here's an example:

```sh
Name              Value
-------------------------------------------
FLEEK_TOKEN       <PERSONAL-ACCESS-TOKEN>
FLEEK_PROJECT_ID  <PROJECT-ID>
```

:::note
You can create your own GitHub Action with any necessary customizations; The Fleek-platform CLI's generated GitHub Action provides a starting point for deploying your site to Fleek.
:::

Next, you can navigate to the GitHub's Actions tab. Commit and push a change to your repository in order to trigger the Fleek CI to be executed.

You can access the Actions tab of you repository at `https://github.com/<ORGANIZATION>/<REPOSITORY-NAME>`, e.g. for the Fleek's Website [repository](https://github.com/fleek-platform/website) you'd access it [here](https://github.com/fleek-platform/website/actions).

### Migrating from Fleek.co to Fleek-platform CLI

Users migrating from Fleek.co should adapt their setup to use the Fleek Platform instructions described [here](#create-a-github-action-for-fleek-sites-deployment).

Alternatively, you can use the following as a reference to perform the required changes.

1. Backup the original Fleek deploy yaml file.

```sh
git mv .github/workflows/deploy.yml .github/workflows/deploy.yml.bak
```

You can delete this file later. But keep it as a reference to move any customization to the new GitHub Action.

2. Remove the secret `FLEEK_API_KEY` from GitHub's repository secrets, read the documentation [here](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)

3. Generate a new GitHub Action as instructed [here](#create-a-github-action-for-fleek-sites-deployment)

4. Use the step 1's backup file to copy any custom steps or commands onto the new GitHub Action file

Next, you can navigate to the GitHub's Actions tab. Commit and push a change to your repository in order to trigger the Fleek CI to be executed.

You can access the Actions tab of you repository at `https://github.com/<ORGANIZATION>/<REPOSITORY-NAME>`, e.g. for the Fleek's Website [repository](https://github.com/fleek-platform/website) you'd access it [here](https://github.com/fleek-platform/website/actions).

5. When happy, feel free to delete the backup file

```sh
git rm .github/workflows/deploy.yml.bak
```
