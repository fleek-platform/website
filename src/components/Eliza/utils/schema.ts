import { z } from 'zod';
import { CLIENT_NAMES, MODEL_PROVIDER_NAMES } from './constants';
import type { Character } from './types';

/** Schema for the form builder, which is
 * slightly different than the final characterfile.
 * We need it due to how React Hook Form handles arrays.
 */
export const characterFormSchema = z.object({
  name: z.string().min(3, 'Name is required, minimum of 3 characters'),
  username: z.string().optional(),
  plugins: z.array(z.string()),
  modelProvider: z.enum(MODEL_PROVIDER_NAMES, {
    errorMap: (_, __) => {
      return { message: 'Select a model provider' };
    },
  }),
  clients: z
    .array(z.enum(CLIENT_NAMES))
    .min(1, 'At least one client is required'),
  settings: z.object({
    secrets: z.record(z.string().min(1, 'value is missing')),
    voice: z.object({
      model: z.string().min(3, 'Voice model is required'),
    }),
  }),
  bio: z.array(
    z.object({
      name: z.string().min(3, 'Bio is required, minimum of 3 characters'),
    }),
  ),
  lore: z.array(
    z.object({
      name: z.string().min(3, 'Lore is required, minimum of 3 characters'),
    }),
  ),
  knowledge: z.array(z.object({ name: z.string() })).optional(),
  messageExamples: z
    .array(
      z
        .array(
          z.object({
            user: z.string().min(1, 'User is required'),
            content: z.object({
              text: z.string().min(1, 'Message example is required'),
            }),
          }),
        )
        .min(2),
    )
    .min(1, 'At least one message example is required'),
  postExamples: z.array(
    z.object({
      name: z
        .string()
        .min(3, 'Post example is required, minimum of 3 characters'),
    }),
  ),
  style: z.object({
    all: z.array(
      z.object({
        name: z
          .string()
          .min(3, `Style for 'All' is required, minimum of 3 characters`),
      }),
    ),
    chat: z.array(
      z.object({
        name: z
          .string()
          .min(3, `Style for 'Chat' is required, minimum of 3 characters`),
      }),
    ),
    post: z.array(
      z.object({
        name: z
          .string()
          .min(3, `Style for 'Post' is required, minimum of 3 characters`),
      }),
    ),
  }),
  topics: z.array(z.string().min(1)).min(1, 'At least one topic is required'),
  adjectives: z
    .array(z.string().min(1))
    .min(1, 'At least one adjective is required'),
});

export type CharacterFormSchema = z.infer<typeof characterFormSchema>;

/** Schema for the characterfile JSON file */
export const characterfileSchema = z.object({
  name: z.string().min(3, 'Name is required, minimum of 3 characters'),
  username: z.string().optional(),
  plugins: z.array(z.string()),
  modelProvider: z.enum(MODEL_PROVIDER_NAMES, {
    errorMap: (_, __) => {
      return { message: 'Select a model provider' };
    },
  }),
  clients: z
    .array(z.enum(CLIENT_NAMES))
    .min(1, 'At least one client is required'),
  settings: z.object({
    secrets: z.record(z.string().min(1, 'value is missing')),
    voice: z.object({
      model: z.string().min(3, 'Voice model is required'),
    }),
  }),
  bio: z.array(z.string().min(3, 'Bio is required, minimum of 3 characters')),
  lore: z.array(z.string().min(3, 'Lore is required, minimum of 3 characters')),
  knowledge: z.array(z.string()).optional(),
  messageExamples: z
    .array(
      z
        .array(
          z.object({
            user: z.string().min(1, 'User is required'),
            content: z.object({
              text: z.string().min(1, 'Message example is required'),
            }),
          }),
        )
        .min(2),
    )
    .min(1, 'At least one message example is required'),
  postExamples: z.array(
    z.string().min(3, 'Post example is required, minimum of 3 characters'),
  ),
  style: z.object({
    all: z.array(
      z.string().min(3, `Style for 'All' is required, minimum of 3 characters`),
    ),
    chat: z.array(
      z
        .string()
        .min(3, `Style for 'Chat' is required, minimum of 3 characters`),
    ),
    post: z.array(
      z
        .string()
        .min(3, `Style for 'Post' is required, minimum of 3 characters`),
    ),
  }),
  topics: z.array(z.string().min(1)).min(1, 'At least one topic is required'),
  adjectives: z
    .array(z.string().min(1))
    .min(1, 'At least one adjective is required'),
}) satisfies z.ZodType<Character>;

export type CharacterfileSchema = z.infer<typeof characterfileSchema>;
