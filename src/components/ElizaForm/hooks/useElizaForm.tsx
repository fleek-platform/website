import { z } from 'zod';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CLIENT_NAMES,
  INITIAL_FORM,
  MODEL_PROVIDER_NAMES,
  TEMPLATE_CHARACTERFILES_MAP,
} from '../constants';
import type { Character, Template } from '../types';

const characterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  plugins: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  ),
  clients: z
    .array(z.enum(CLIENT_NAMES))
    .min(1, 'At least one client is required'),
  modelProvider: z.enum(MODEL_PROVIDER_NAMES),
  settings: z.object({
    secrets: z.record(z.string()),
    voice: z.object({
      model: z.string().min(1, 'Voice model is required'),
    }),
  }),
  bio: z.array(z.string().min(1)).min(1, 'At least one bio is required'),
  lore: z
    .array(z.string().min(1))
    .min(1, 'At least one lore entry is required'),
  knowledge: z.array(z.string()).optional(),
  messageExamples: z
    .array(
      z
        .array(
          z.object({
            user: z.string().min(1, 'User is required'),
            content: z.object({
              text: z.string().min(1, 'Content text is required'),
            }),
          }),
        )
        .min(2),
    )
    .min(1, 'At least one message example is required'),
  postExamples: z
    .array(z.string().min(1))
    .min(1, 'At least one post example is required'),
  topics: z.array(z.string().min(1)).min(1, 'At least one topic is required'),
  adjectives: z
    .array(z.string().min(1))
    .min(1, 'At least one adjective is required'),
  style: z.object({
    all: z
      .array(z.string().min(1))
      .min(1, "At least one style for 'all' is required"),
    chat: z
      .array(z.string().min(1))
      .min(1, "At least one style for 'chat' is required"),
    post: z
      .array(z.string().min(1))
      .min(1, "At least one style for 'post' is required"),
  }),
}) satisfies z.ZodType<Character>;

export const useElizaForm = (template?: Template) =>
  useForm({
    resolver: zodResolver(characterSchema),
    defaultValues: template
      ? TEMPLATE_CHARACTERFILES_MAP[template]
      : INITIAL_FORM,
  });

export const FormProviderCharacterBuilder = ({
  children,
  template,
}: {
  children: React.ReactNode;
  template?: Template;
}) => {
  const methods = useElizaForm(template);
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const useElizaFormContext = () => useFormContext<Character>();
