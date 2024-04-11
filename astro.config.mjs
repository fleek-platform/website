import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import remarkDirective from 'remark-directive';
import remarkCalloutDirectives from '@microflash/remark-callout-directives';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react({
     experimentalReactChildren: true,
  })],
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkCalloutDirectives,
    ],
  },
});
