import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { rateLimiter } from 'hono-rate-limiter';
import {
  getUserValue,
  getRateLimitUserPaths,
  uptimeToHumanFriendly,
} from './utils';
import { csrf } from 'hono/csrf';
import router from './routes';

const PORT = 3331;

const app = new Hono();

const requiredEnvVars = [
  'PRIVATE_ZENDESK_EMAIL',
  'PRIVATE_ZENDESK_API_KEY',
  'PRIVATE_ZENDESK_HOSTNAME',
  'SUPPORT_ALLOW_ORIGIN_ADDR',
  'SUPPORT_RATE_LIMIT_WINDOW_MINUTES',
  'SUPPORT_RATE_LIMIT_MAX_REQ',
  'SUPPORT_RATE_LIMIT_PATHS',
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

export const zendeskAuthToken = generateApiToken({
  email: process.env.PRIVATE_ZENDESK_EMAIL as string,
});

export const ZENDESK_ROUTES = {
  REQUESTS: `https://${process.env.PRIVATE_ZENDESK_HOSTNAME}.zendesk.com/api/v2/requests`,
  UPLOADS: `https://${process.env.PRIVATE_ZENDESK_HOSTNAME}.zendesk.com/api/v2/uploads`,
  TICKETS: `https://${process.env.PRIVATE_ZENDESK_HOSTNAME}.zendesk.com/api/v2/tickets.json?async=true`,
};

if (!process.env.SUPPORT_ALLOW_ORIGIN_ADDR)
  throw Error(
    'Oops! Missing environment variable, expected ALLOW_ORIGIN_ADDR.',
  );

if (!process.env.SUPPORT_RATE_LIMIT_PATHS)
  throw Error(
    'Oops! Missing environment variable, expected SUPPORT_RATE_LIMIT_PATHS',
  );

const timeWindow = getUserValue({
  userValue: process.env.SUPPORT_RATE_LIMIT_WINDOW_MINUTES,
  subject: 'TimeWindow',
});

const maxNumberAttempts = getUserValue({
  userValue: process.env.SUPPORT_RATE_LIMIT_MAX_REQ,
  subject: 'MaxNumberAttempts',
});

const limiter = rateLimiter({
  // `timeWindowInMins` minutes
  windowMs: timeWindow * 60 * 1000,
  // Maximum of 5 requests per `timeWindowInMins` window
  limit: maxNumberAttempts,
  standardHeaders: 'draft-6',
  keyGenerator: (c) =>
    c.req.header('x-real-ip') ?? c.req.header('x-forwarded-for') ?? '',
});

const rateLimitUserPaths = getRateLimitUserPaths(
  process.env.SUPPORT_RATE_LIMIT_PATHS,
);

for (const path of rateLimitUserPaths) {
  app.use(path, limiter);
}

const allowedOrigins = process.env.SUPPORT_ALLOW_ORIGIN_ADDR.split(',');

app.use(
  '*',
  cors({
    origin: [...allowedOrigins],
  }),
);

app.use(
  csrf({
    origin: [...allowedOrigins],
  }),
);

app.get('/health', (c) => {
  return c.json({
    message: 'OK',
    uptime: uptimeToHumanFriendly(process.uptime()),
  });
});

app.post(
  '/ticket',
  zValidator(
    'form',
    z.object({
      name: z.string().min(2).optional(),
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

      const response = await fetch(ZENDESK_ROUTES.TICKETS, {
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
      console.error(error);

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

app.route('/', router);

console.log(`🤖 Server listening in port ${PORT}...`);

export default {
  port: PORT,
  fetch: app.fetch,
};
