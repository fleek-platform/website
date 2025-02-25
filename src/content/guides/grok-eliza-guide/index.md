---
title: 'How to deploy a Twitter Grok AI agent on Fleek'
date: 2025-02-25
desc: 'Learn how to deploy a Grok AI agent with Eliza'
thumbnail: './grok-thumbnail.png'
image: './grok-thumbnail.png'
author:
  - 'Tobiloba Adedeji'
---

Grok, built by xAI, is a cutting-edge conversational AI designed to give helpful, truthful answers with a dash of humor and an outside perspective on humanity. It’s powered by a large language model (LLM)—think massive neural networks trained on vast amounts of text to understand and generate human-like responses.

The latest iterations, like Grok-3, pack advanced reasoning, real-time data access (via platforms like X), and multimodal capabilities (handling text, images, and more).

In this guide, we will go over how to deploy a Grok Eliza AI agent on Fleek.

## Prerequisites

1. An [XAI API key](https://x.ai/api) and credits in your account.
2. A [Fleek account](https://fleek.xyz/) if you don’t already have one.
3. A Twitter account with existing authentication and login status

No prior knowledge of AI agents or Eliza is required to participate.

## How to get your Grok API key

To get a Grok API key:

1. Navigate to the [XAI console](https://x.ai/api) and then sign in to the console.

2. Click on the key icon on the sidebar, you should see the below page:

![XAI Console](./x-api-key.png)

3. Next, click on "Create API key". Note that you must have API credits in your account for the API key to be valid.

![Credits page](./credits-page.png)

## Deploy your AI agent from Fleek

Start by going to [fleek.xyz/eliza/](https://fleek.xyz/eliza/). You'll find three deployment options. Go ahead and select the “Start with a template” option:

![Get started page](./options-page.png)

Next, select a template that fits your preferences, e.g., C-3PO template.

1. Click on the C-3PO button, the form on the page will be filled instantly with the necessary details.

2. Go to the “Model providers” section and click to open the dropdown.

3. After opening the dropdown menu, scroll through the options until you find "Grok". It should appear as shown below:

![Model providers](./models.png)

4. After selecting Grok, no additional configuration is necessary. However, you have the option to customize your experience by adding an avatar or updating the name as desired.

![Avatar](./avatar.png)

5. Once ready, scroll to the bottom and click the "Continue to settings" button.

6. Fill in all the necessary information on this panel. You'll notice that some fields are already completed, which you can skip.

![Settings page](./settings.png)

7. Once completed, examine your agent details carefully to ensure all provided information is correct.

![Reviews page](./reviews.png)

**Note:** Advanced users can switch to the "JSON" (Characterfile) tab to manually edit or modify configuration details.

8.  After review, click "Deploy agent" at the bottom. Your agent should be active in a few seconds.

Great! Your agent will be live on X and ready to interact. Tag it for responses or head back to edit its Characterfile anytimet:

![Agent tweet](./agent-tweet.png)

For more resources:

- [AI Agents doc](/docs/ai-agents/)
- [Deploy an AI Agent guide](/guides/eliza-guide/)
- [Deploy a Telegram AI Agent with OpenAI](/guides/telegram-ai-agent)
- [Deploy a Discord AI Agent with DeepSeek](https://fleek.xyz/guides/deploy-ai-agent-deepseek-fleek)
