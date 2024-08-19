import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { ZENDESK_ROUTES, zendeskAuthToken } from './api';

const router = new Hono();

router.post('/upload', async (c) => {
  const body = await c.req.parseBody();
  const file = body.file;

  if (!file || !(file instanceof File)) {
    return c.json({ message: 'No valid file uploaded' }, 400);
  }

  // Additional file size validation
  const maxFileSize = 5 * 1024 * 1024; // 5 MB

  if (file.size > maxFileSize) {
    return c.json({ message: 'File size exceeds limit' }, 400);
  }

  try {
    const response = await fetch(
      `${ZENDESK_ROUTES.UPLOADS}?filename=${file.name}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${zendeskAuthToken}`,
          'Content-Type': file.type,
        },
        body: file,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new FileUploadError(`File upload failed: ${errorText}`);
    }

    const data = await response.json();
    return c.json({ token: data.upload.token }, 200);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return c.json({ message: error.message || 'File upload failed' }, 500);
    } else {
      console.error('Unknown error', error);
      return c.json({ message: 'File upload failed' }, 500);
    }
  }
});

router.post(
  '/request',
  zValidator(
    'json',
    z.object({
      email: z.string().email(),
      subject: z.string().optional(),
      comment: z.string(),
      name: z.string(),
      userId: z.string(),
      uploadTokens: z.array(z.string()).optional(),
      tags: z.array(z.string()),
    }),
  ),
  async (c) => {
    const {
      email,
      subject = 'Untitled ticket (details in description)',
      comment,
      tags,
      name,
      userId,
      uploadTokens,
    } = await c.req.json();

    const requestBody = {
      request: {
        subject,
        tags,
        via_id: 5,
        comment: {
          body: comment,
          uploads: uploadTokens ?? [], // Default to empty array if undefined
        },
        requester: {
          name,
          email,
          locale_id: 1,
          external_id: userId,
        },
      },
    };

    try {
      const response = await fetch(ZENDESK_ROUTES.REQUESTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${zendeskAuthToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      await response.json();
      return c.json({ message: 'Form submitted successfully' }, 200);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error submitting form:', error);
        return c.json(
          { message: error.message || 'Form submission failed' },
          500,
        );
      } else {
        console.error('Unknown error', error);
        return c.json({ message: 'Form submission failed' }, 500);
      }
    }
  },
);

class FileUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileUploadError';
  }
}

export default router;
