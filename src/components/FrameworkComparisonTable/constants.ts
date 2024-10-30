import type { Feature, Framework } from './types';

export const frameworks: Framework[] = [
  {
    name: 'Next.js',
    ssg: true,
    ssr: true,
    previewDeployments: true,
  },
  {
    name: 'SvelteKit',
    ssg: true,
    ssr: false,
    previewDeployments: true,
  },
  {
    name: 'Astro',
    ssg: true,
    ssr: true,
    previewDeployments: true,
  },
  {
    name: 'React',
    ssg: true,
    ssr: true,
    previewDeployments: true,
  },
  {
    name: 'Vue',
    ssg: true,
    ssr: false,
    previewDeployments: true,
  },
  {
    name: 'Gatsby',
    ssg: true,
    ssr: false,
    previewDeployments: true,
  },
  {
    name: 'Nuxt',
    ssg: true,
    ssr: false,
    previewDeployments: true,
  },
  {
    name: 'Vite',
    ssg: true,
    ssr: false,
    previewDeployments: true,
  },
  {
    name: 'Jekyll',
    ssg: true,
    ssr: false,
    previewDeployments: true,
  },
  {
    name: 'Hugo',
    ssg: true,
    ssr: false,
    previewDeployments: true,
  },
  {
    name: 'Gridsome',
    ssg: true,
    ssr: false,
    previewDeployments: true,
  },
  {
    name: 'Svelte + Sapper',
    ssg: true,
    ssr: false,
    previewDeployments: true,
  },
];

export const features: Feature[] = [
  { key: 'ssg', name: 'SSG' },
  { key: 'ssr', name: 'SSR' },
  { key: 'previewDeployments', name: 'Preview deployments' },
];
