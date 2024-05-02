import { z, defineCollection } from 'astro:content';

enum Category {
  Announcements = 'Announcements',
}

// TODO: remove optionals
const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    order: z.number().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// TODO: remove optionals
const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      thumbnail: image(),
      date: z.date().optional(),
      desc: z.string().optional(),
      author: z.string().optional(),
      order: z.number().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const guidesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      thumbnail: image(),
      date: z.date().optional(),
      desc: z.string().optional(),
      author: z.string().optional(),
      order: z.number().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const templatesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      thumbnail: image(),
      date: z.date().optional(),
      desc: z.string().optional(),
      author: z.string().optional(),
      order: z.number().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const referencesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image().optional(),
      thumbnail: image().optional(),
      date: z.date().optional(),
      desc: z.string().optional(),
      author: z.string().optional(),
      order: z.number().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const legalCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image().optional(),
      thumbnail: image().optional(),
      date: z.date().optional(),
      desc: z.string().optional(),
      author: z.string().optional(),
      order: z.number().optional(),
    }),
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
