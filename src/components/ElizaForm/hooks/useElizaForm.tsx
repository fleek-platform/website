import { z } from 'zod';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CLIENT_NAMES, INITIAL_FORM, MODEL_PROVIDER_NAMES } from '../constants';

const characterSchema = z.object({
  name: z.string().min(3, 'Name is required, minimum of 3 characters'),
  username: z.string().optional(),
  plugins: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  ),
  clients: z
    .array(z.enum(CLIENT_NAMES))
    .min(1, 'At least one client is required'),
  modelProvider: z.enum(MODEL_PROVIDER_NAMES, {
    errorMap: (_, __) => {
      return { message: 'Select a model provider' };
    },
  }),
  settings: z.object({
    secrets: z.record(z.string().min(3, 'value is missing')),
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

export type CharacterSchema = z.infer<typeof characterSchema>;

export const FormProviderCharacterBuilder = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const methods = useForm<CharacterSchema>({
    defaultValues: INITIAL_FORM,
    resolver: zodResolver(characterSchema),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const useElizaForm = () => useFormContext<CharacterSchema>();
