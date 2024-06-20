import { z, defineCollection } from 'astro:content';
import type { ImageFunction } from 'astro:content';

type CollectionType = 'content' | 'data' | undefined;

const createCollection = <T extends z.ZodSchema<any>>(
  type: CollectionType,
  additionalFields: T,
) => {
  return defineCollection({
    type,
    schema: ({ image }) => schema({ image }).and(additionalFields),
  });
};

const schema = ({ image }: { image: ImageFunction }) =>
  z.object({
    title: z.string(),
    image: image().optional(),
    thumbnail: image().optional(),
    date: z.date(),
    desc: z.string(),
    author: z.union([z.string(), z.array(z.string())]).optional(),
    order: z.number().optional(),
    tags: z.array(z.string()).optional(),
  });

const docsCollection = createCollection('content', z.object({}));

const blogCollection = createCollection('content', z.object({}));

const guidesCollection = createCollection('content', z.object({}));

const templatesCollection = createCollection('content', z.object({}));

const referencesCollection = createCollection('content', z.object({}));

const legalCollection = createCollection('content', z.object({}));

// Export a single `collections` object to register your collection(s)
export const collections = {
  docs: docsCollection,
  blog: blogCollection,
  guides: guidesCollection,
  templates: templatesCollection,
  references: referencesCollection,
  legal: legalCollection,
};
