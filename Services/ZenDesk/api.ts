import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const PORT = 3331;

const app = new Hono();

const requiredEnvVars = [
  'PRIVATE_ZENDESK_EMAIL',
  'PRIVATE_ZENDESK_API_KEY',
  'PRIVATE_ZENDESK_HOSTNAME',
];

requiredEnvVars.forEach((varName) => {
 if (!varName || !process.env[varName]) {
    console.error(`Oops! Environment variable ${varName} is not set.`);

    process.exit(1);
 }
});

const generateApiToken = ({ email }: { email: string }) => {
  const formatted = `${email}/token:${process.env.PRIVATE_ZENDESK_API_KEY}`;

  return Buffer.from(formatted).toString('base64');
};

const zendeskAuthToken = generateApiToken({
  email: process.env.PRIVATE_ZENDESK_EMAIL as string,
});

app.get('/health', (c) => c.text('✅ Running!'));

app.post(
  '/ticket',
  zValidator(
    'form',
    z.object({
      name: z.string().min(2),
      email: z.string().email(),
      subject: z.string(),
      comment: z.string().min(30),
    }),
  ),
  async (c, next) => {
    const { email, name, subject, comment } = await c.req.parseBody();

    try {
      const body = {
        ticket: {
          subject,
          comment: {
            body: comment,
          },
          requester: {
            name,
            email,
          },
        },
      };
      
      const response = await fetch(`https://${process.env.PRIVATE_ZENDESK_HOSTNAME}.zendesk.com/api/v2/tickets.json?async=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${zendeskAuthToken}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return c.json(
        {
          data,
        },
        200,
      );
    } catch (error) {
      console.log('[debug] error');

      c.json(
        {
          message: 'Oops! Failed for some reason...',
        },
        500,
      );
    }

    await next();
  },
);

console.log(`🤖 Server listening in port ${PORT}...`);

export default {
  port: PORT,
  fetch: app.fetch,
};
