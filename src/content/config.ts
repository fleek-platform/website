import { z, defineCollection } from 'astro:content';
import type { ImageFunction } from 'astro:content';

// TODO: remove optionals
const schema = ({ image }: {
  image: ImageFunction;
}) =>
 z.object({
    title: z.string(),
    image: image().optional(),
    thumbnail: image().optional(),
    date: z.date().optional(),
    desc: z.string().optional(),
    author: z.union([z.string(), z.array(z.string())]).optional(),
    order: z.number().optional(),
    tags: z.array(z.string()).optional(),
 });

const docsCollection = defineCollection({
  type: 'content',
  schema,
});

const blogCollection = defineCollection({
  type: 'content',
  schema,
});

const guidesCollection = defineCollection({
  type: 'content',
  schema,
});

const templatesCollection = defineCollection({
  type: 'content',
  schema,
});

const referencesCollection = defineCollection({
  type: 'content',
  schema,
});

const legalCollection = defineCollection({
  type: 'content',
  schema,
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  docs: docsCollection,
  blog: blogCollection,
  guides: guidesCollection,
  templates: templatesCollection,
  references: referencesCollection,
  legal: legalCollection,
};
