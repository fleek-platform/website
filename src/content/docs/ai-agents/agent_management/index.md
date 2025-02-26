---
order: 10
title: Agent Management
date: 2025-02-14
desc: You can edit characterfiles of your AI agents after they have been deployed.
---

# Agent Management on Fleek

Users can edit characterfiles of your agents, start and stop them manually, have agent drafts and see indicators on agents that are associated with a project.

## Edit AI agent characterfile

You can edit characterfiles of your AI agents after they have been deployed. Start by navigating to [fleek.xyz/eliza](https://fleek.xyz/eliza). If you have deployed agents previously, you will see a list of agents in the sidebar on the screen. Select any of the three deployment options if you have not deployed any agents. To edit a characterfile:

1. Click on the agent’s name and you should see a tab similar to the below:

![view](./view.png)

2. Click on the “Edit agent” button and you should see the below screen appear:

![editing](./editing.png)

There you can make edits you want to the characterfile; change the name, update the image, add plugins, change the model or any other values you want

3. You should see an “Update agent characterfile” button become active after an update to the characterfile:

![edited](./edited.png)

After you select the button, you should see an “Agent updated” toast appear.

## Start / Stop agents

Deployed agents can be started and stopped directly from both the [Fleek dashboard](https://app.fleek.xyz/) and the [Eliza deployment page](/eliza).

AI Agents have three states:

- Active
- Inactive
- Draft (Not published yet)

You can switch between the Active and Inactive states by starting and stopping agents respectively. Draft agents are still in the inactive state as the draft state is for agents that have not been published.

### From the Eliza deployment page

Agents can be easily start or stopped the agent's "Settings". You just click on the agent and navigate to the "Settings" tab:

![settings](./eliza-page-start.png)

Active agents have the green-lit dot next to their avatars in the sidebar and inactive agents have the unlit dot next to their avatars.

![active and inactive](./active-and-inactive.png)

### From the Fleek dashboard

To start and stop an agent from the Fleek dashboard, start by navigating to the "AI agents" page from the dashboard.

Click on the three-dotted icon to open up the modal menu. Depending on the current state (start or stop) of the agent you will see either the start or stop option in the menu.

![Start and stop](./start-and-stop.png)

## Draft AI agents

The draft state is for agents that are being worked on and are not currently running. Agents that are in active development mode on [Eliza deployment page](/eliza) are immediately tranferred to the draft state.

You can identify draft state agents by an icon beside them and they look like the below example. You also see the agent creation form with all the current details of the agent that is being worked on.

![Agent draft](./agent-draft.png)
