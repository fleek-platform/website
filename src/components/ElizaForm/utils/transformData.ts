import type { CharacterSchema } from '../hooks/useElizaForm';
import type { Character } from '../types';

export const transformSchemaToCharacter = (
  data: CharacterSchema,
): Character => {
  return {
    ...data,
    bio: data.bio.map((el) => el.name),
    lore: data.lore.map((el) => el.name),
    knowledge: data.knowledge?.map((el) => el.name),
    messageExamples: data.messageExamples.map((el) =>
      el.map((msg) => ({
        user: msg.user,
        content: { text: msg.content.text },
      })),
    ),
    postExamples: data.postExamples.map((el) => el.name),
    style: {
      all: data.style.all.map((el) => el.name),
      chat: data.style.all.map((el) => el.name),
      post: data.style.all.map((el) => el.name),
    },
  };
};
