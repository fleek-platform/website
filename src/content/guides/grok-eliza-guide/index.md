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
2. A [Fleek account](https://app.fleek.xyz/) if you don’t already have one.
3. A Twitter account with your credentials ready

Little to no knowledge of Eliza or AI agents is welcome.

## How to get your Grok API key

To get a Grok API key:

1. Navigate to the [XAI console](https://x.ai/api) and then sign in to the console.

2. Click on the key icon on the sidebar, you should see the below page:

![XAI Console](./x-api-key.png)

3. Then click on “Create API key”. Note that you have to ensure that you need to have some API credits in your account to have a valid API key.

![Credits page](./credits-page.png)

## Deploy your AI agent from Fleek

Start by going to [fleek.xyz/eliza/](https://fleek.xyz/eliza/). On the page here you will see three deployment options. We would go ahead to use a template. So we select the “Start with a template” option:

![Get started page](./options-page.png)

Now, we will be using one of the template options available there. Say the C-3PO template. Now, to deploy our agent:

1. Click on the C-3PO button, the form on the page will be filled instantly with the necessary details.

2. Go to the “Model providers” section and click to open the dropdown.

3. With the dropdown open, scroll to look for “Grok”. You should see the below:

![Model providers](./models.png)

4. Now with Grok selected, you need not change anything, but, you can add an avatar and maybe update the name based on your preferences.

![Avatar](./avatar.png)

5. With that done, scroll to the bottom and click on the “Continue to settings” button.

6. On this page you will fill in all required information. Some of the other fields have been already filled in and you wouldn’t need to edit those:

![Settings page](./settings.png)

7. After all that, you review your agent details and confirm that all the provided information is correct:

![Reviews page](./reviews.png)

**Note:** you can switch tabs to the “JSON” (Characterfile) one in case there is anything you would like to edit or modify.

8. After reviewing the information to confirm that all is well you then scroll to the bottom to click the “Deploy agent” button and you should see your agent go live in less than 30 seconds.

Immediately after the deployment of your agent, you will see your agent already posting on X and you can even tag your agent to things for responses if need be. You can also go back to edit your Characterfile if you want to change anything about your agent:

![Agent tweet](./agent-tweet.png)

For more resources:

- [AI Agents doc](/docs/ai-agents/)
- [Deploy an AI Agent guide](/guides/eliza-guide/)
- [Deploy a Telegram AI Agent with OpenAI](/guides/telegram-ai-agent)
- [Deploy a Discord AI Agent with DeepSeek](https://fleek.xyz/guides/deploy-ai-agent-deepseek-fleek)
