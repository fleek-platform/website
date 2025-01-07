import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import type { Character } from './types';
import type { CharacterfileSchema, CharacterFormSchema } from './schema';

type TransformedItem = {
  label: string;
  message: string;
  type: string;
};

export type FormError = Merge<
  FieldError,
  FieldErrorsImpl<CharacterFormSchema['settings']>
>;

export const transformErrors = (
  errors: FormError | undefined,
): TransformedItem[] => {
  if (!errors) return [];

  return Object.entries(errors).flatMap(([category, items]) =>
    Object.entries(items).map(([key, value]) => ({
      label: key,
      message: value.message,
      type: category,
    })),
  );
};

export const transformCharacterToSchema = (
  data: CharacterfileSchema,
): CharacterFormSchema => {
  return {
    ...data,
    bio: data.bio.map((entry) => ({
      name: entry,
    })),
    lore: data.lore.map((entry) => ({
      name: entry,
    })),
    knowledge: data.knowledge?.map((entry) => ({
      name: entry,
    })),
    messageExamples: data.messageExamples.map((entry) =>
      entry.map((msg) => ({
        user: msg.user,
        content: { text: msg.content.text },
      })),
    ),
    postExamples: data.postExamples.map((entry) => ({
      name: entry,
    })),
    style: {
      all: data.style.all.map((entry) => ({
        name: entry,
      })),
      chat: data.style.all.map((entry) => ({
        name: entry,
      })),
      post: data.style.all.map((entry) => ({
        name: entry,
      })),
    },
  };
};

export const transformSchemaToCharacter = (
  data: CharacterFormSchema,
): Character => {
  return {
    ...data,
    bio: data.bio.map((entry) => entry.name),
    lore: data.lore.map((entry) => entry.name),
    knowledge: data.knowledge?.map((entry) => entry.name),
    messageExamples: data.messageExamples.map((entry) =>
      entry.map((msg) => ({
        user: msg.user,
        content: { text: msg.content.text },
      })),
    ),
    postExamples: data.postExamples.map((entry) => entry.name),
    style: {
      all: data.style.all.map((entry) => entry.name),
      chat: data.style.all.map((entry) => entry.name),
      post: data.style.all.map((entry) => entry.name),
    },
  };
};
