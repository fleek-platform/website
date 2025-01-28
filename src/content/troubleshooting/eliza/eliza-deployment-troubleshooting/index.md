---
title: 'Troubleshooting for Eliza Deployments on Fleek'
date: 2025-01-15
desc: 'Common questions about deployment of the Eliza framework on Fleek.'
thumbnail: './eliza-references.png'
image: './eliza-references.png'
---

### How do I access my deployed agent’s dashboard on Fleek?

- Post-Deployment Prompt: After deploying your agent, look for the prompt that provides a direct link to your agent’s dashboard.
- Via Fleek Web Interface:

  - Go to [app.fleek.xyz](https://app.fleek.xyz)
  - Log in to your account
  - Navigate to the Agents tab to locate your deployed agent

- Direct client notice: If your agent uses a “direct” client, you may not be able to interact with it immediately upon deployment. Additional configuration could be required.

![live image](./live-image.png)

---

### How do I set up Twitter integration for my Eliza agent?

To integrate your Eliza agent with Twitter while avoiding account blocks, follow these steps:

1. **Use a VPN:** Connect to Oregon, as Twitter may block accounts logged in from locations different from where they were created. Fleek deployments are from Oregon-based servers.
2. **Create a Twitter Account:** Set up your account while connected to the VPN and complete Twitter's verification process.
3. **Log in via VPN:** Use the VPN to log in and confirm the account setup.
4. **Deploy Your Agent:** Use your Twitter credentials to connect your Eliza agent. After deployment, the VPN is no longer required.

This ensures smooth integration and avoids login issues.

---

### Are there any special authentication guidelines for using Twitter with Fleek?

- Enable Automation: Ensure automation is turned on for your deployments.
- Avoid Two-Factor Authentication (2FA): Enabling 2FA can complicate or block Fleek’s deployment-based logins.
- Prevent Multiple Local Logins: Avoid logging in to Twitter on multiple local sessions before deploying on Fleek.
- Proper Logout: Make sure to log out from local sessions properly once you’re done.
- Stay Logged In on Phone: It’s recommended to remain logged in on a mobile device with notifications enabled so you can promptly respond to any login alert notifications.

---

### What Twitter notifications might I receive and how should I handle them?

Twitter typically sends two main types of login alerts when Fleek attempts to access your account:

1.  Standard Login Alert

    - You’ll see a notification about a new login.
    - Open the notification, then tap “Got it” to acknowledge.

2.  Security Question Alert

    - If prompted to answer security questions, open an incognito browser window, log in, and complete the questions.
    - Wait about 20 minutes before retrying deployment on Fleek.

---

### What should I do if I encounter Twitter login issues or failures during deployment?

- Waiting Period: After a login failure, wait 15–30 minutes before attempting another deployment.
- Stop/Start Feature (Coming Soon):

1.  Stop your existing deployment.
2.  Wait 20 minutes.
3.  Restart it (without deleting).

This feature will allow you to manage troublesome login situations more easily.

---

### Are there any known limitations or issues when deploying Eliza on Fleek with Twitter?

- Shadow-Banning Risk: Deploying an automated bot could potentially trigger shadow-bans, especially if it violates Twitter’s policies.
- Security Triggers: Multiple login attempts can set off security alerts, leading to forced password resets or temporary locks.

---

## How much does it cost to deploy an agent using Fleek?

Deploying an agent on Fleek costs $20 per month per agent. You can find more details on the [pricing page](/pricing). Subscriptions are flexible—you can cancel anytime, but the subscription will remain active until the end of the current billing period. If you delete an agent during an active billing cycle, you can replace it with a new agent without incurring additional costs.

---

### How do I enable emoji usage in Eliza’s responses?

1.  Open your character file.
2.  Locate the "adjectives" array.

Update the array to include emoji-related prompts, for example:

```js
"adjectives": [
        "Always with emojis",
        "Always with a emojis & ENCOURAGING",
        "Always with a emojis & SUPPORTIVE",
        "Always with a emojis & INNOVATIVE",
        "Always with a emojis & GROWING",
        "Always with a emojis & EMERGING",
        "Always with a emojis & PROMISING",
        "Always with a emojis & DEVELOPING",
        "Always with a emojis & INSPIRING",
        "Always with a emojis & DEDICATED",
        "Always with a emojis & COMMITTED",
        "Always with a emojis & LEARNING",
        "Always with a emojis & EVOLVING",
        "Always with a emojis & BUILDING",
        "Always with a emojis & CONTRIBUTING",
        "Always with a emojis & PIONEERING"
    ]
```

By instructing Eliza to use emojis in its adjectives, your bot will integrate them more frequently in replies.

---

### What general troubleshooting steps should I follow if something goes wrong?

- Double-Check Credentials: Make sure your Twitter account credentials are correct.
- Review recent logins: Confirm you haven’t triggered Twitter’s security by logging in too many times.
- Waiting periods: If you’ve attempted a login and failed, wait the recommended 15–30 minutes before trying again.
- Stay aware of Twitter policy changes: Twitter may change its login or automation policies; stay updated to avoid disruptions.

---

### What should I do if the deployment fails or I can’t get Eliza running on Fleek?

1.  Verify API key and billing:

    - Check your model provider (e.g., OpenAI) to ensure you have sufficient funds.
    - Confirm all billing details are current and valid.

2.  Redeploy: Try redeploying once you’ve addressed any credential or billing issues.
3.  Contact Support: If problems persist, [Support](https://fleek.xyz/requests/new/) can help troubleshoot further.

---

### How should I manage my Eliza agent account for long-term use?

- Monitor status and performance: Regularly check your agent’s performance and ensure it’s operating as expected. You do this by viewing the agent’s logs.
- Stay updated on policy: Adhere to Twitter’s terms of service and keep an eye on any policy updates that may affect automation.
- Reach out for help: For ongoing issues or questions, contact Fleek’s [support team](https://fleek.xyz/support).

---

### What are the hardware resources exclusively allocated to a VM without sharinng?

Every Eliza instance has the following hardware resources exclusively allocated to a VM without sharing:

- 4 vCPUs (virtual CPUs)
- 4 GB of RAM

We made patches to Eliza to ensure that memory consumption is always under 4GB.

### Additional Information

- This FAQ will evolve as Fleek releases new features and best practices.
- Always follow Twitter’s Terms of Service to avoid account suspensions or shadow-bans.

---

Need more assistance?  
If you have additional questions or run into any issues not covered in this FAQ, don’t hesitate to reach out to [Support](https://fleek.xyz/requests/new/) or consult [the documentation](https://fleek.xyz/docs/ai-agents/).
