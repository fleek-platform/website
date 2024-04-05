import { z, defineCollection } from "astro:content";

// TODO: remove optionals
const docsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date().optional(),
      description: z.string().optional(),
      author: z.string().optional(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      order: z.number().optional(),
      tags: z.array(z.string()).optional(),
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  docs: docsCollection,
};
