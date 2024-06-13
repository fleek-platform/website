import type { OptionsType } from './form/Dropdown';

export const categoryCardItems = [
  {
    id: '1',
    link: '/support/troubleshooting',
    image: '/images/troubleshooting.png',
    title: 'Troubleshooting',
  },
  {
    id: '2',
    link: '/guides',
    image: '/images/guides.png',
    title: 'Guides',
  },
  {
    id: '3',
    link: '/support/billing',
    image: '/images/billing.png',
    title: 'Billing',
  },
];

export const singleArticleCardItems = [
  {
    id: '1',
    title: 'Node engine errors',
    link: '/support/troubleshooting/faq/node-engine-errors',
    description:
      "If you are getting node engine mismatch errors, don't worry. It only means the docker image you selected does not have the required node version.  However, you can use any docker image published on dockerhub, you don't need to use the ones we provide if...",
  },
  {
    id: '2',
    link: '/guides/hosting-on-ipfs-best-practices-troubleshooting',
    title: 'Best Practices for Building on Fleek.',
    description:
      'Dive into best practices for building IPFS-hosted websites, with specific attention to offline-first strategy, utilizing the Service Worker API, the importance of good manifest file settings, the use of relative paths, hash routing, and how to use I...',
  },
  {
    id: '3',
    link: '/support/troubleshooting/common-issues/adding-domains-through-fleek-cli',
    title: 'Adding Domains through Fleek CLI',
    description:
      "Exploring Fleek's New Domain States Process for Seamless Domain Creation   This guide takes you step by step through the process of providing a unique hostname, creating a Content Acceleration Zone, and configuring domain settings. It also introduces...",
  },
  {
    id: '4',
    link: '/support/troubleshooting/faq/my-links-arent-resolving',
    title: "My links aren't resolving",
    description:
      "Fixing Fleek IPFS Resolve Errors with _redirects Explore Fleek's method for resolving IPFS link issues. This in-depth tutorial steers you through the essential steps, from creating a new Next.js App to adding a custom domain, and finally optimizing y...",
  },
  {
    id: '5',
    link: '/guides/fleek-templates-guide',
    title: 'Deploying with Fleek Templates: Step-by-Step Guide',
    description:
      'With our ready out-of-the-box templates & boilerplates, and the new Fleek CLI, deploying your first project to IPFS with becomes a lightning-fast process. Turn building apps from the group up into a three-step process: Fork, Customize, and Deploy on Fl...',
  },
];

export const youtubeEmbedVideos = [
  {
    id: 'AZhvyHAoFfo',
    src: 'https://www.youtube.com/embed/AZhvyHAoFfo?enablejsapi=1&origin=https%3A%2F%2Fsupport.fleek.xyz&widgetid=1',
  },

  {
    id: 'ZR6hoLODDvI',
    src: 'https://www.youtube.com/embed/ZR6hoLODDvI?enablejsapi=1&amp;origin=https%3A%2F%2Fsupport.fleek.xyz&amp;widgetid=2',
  },
  {
    id: '2OzwtDH7K0A',
    src: 'https://www.youtube.com/embed/2OzwtDH7K0A?enablejsapi=1&origin=https%3A%2F%2Fsupport.fleek.xyz&widgetid=3',
  },
];

export const categoryOptions: OptionsType[] = [
  {
    label: '-',
    value: '-',
    formId: '-',
  },
  {
    label: 'Fleek.xyz Support',
    value: 'Fleek.xyz Support',
    formId: 'xyz-form',
  },
  {
    label: 'Fleek.co Support',
    value: 'Fleek.co Support',
    formId: 'co-form',
  },
  {
    label: 'Billing',
    value: 'Billing',
    formId: 'billing-form',
  },
  {
    label: 'Crypto Payment',
    value: 'Crypto Payment',
    formId: 'crypto-form',
  },
  {
    label: 'Partnerships & Collaborations',
    value: 'Partnerships & Collaborations',
    formId: 'partnerships-form',
  },
  {
    label: 'Phishing and Abuse reports',
    value: 'Phishing and Abuse reports',
    formId: 'phishing-form',
  },
  {
    label: 'Report Template',
    value: 'Report Template',
    formId: 'template-form',
  },
  {
    label: 'Feedback & Feature Requests',
    value: 'Feedback & Feature Requests',
    formId: 'feedback-form',
  },
  {
    label: 'Other',
    value: 'Other',
    formId: 'other-form',
  },
];

export const updateUrl = (formId: string, paramName: string) => {
  const params = new URLSearchParams(window.location.search);

  if (formId === '-') {
    params.delete(paramName);
  } else {
    params.set(paramName, formId);
  }

  const newUrl = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;

  window.history.pushState({}, '', newUrl);
};
