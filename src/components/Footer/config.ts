import settings from '@base/settings.json';

const {
  careersUrl,
  reportAbuseUrl,
  statusURl,
  mediaKit,
  fleekNetworkWebsiteUrl,
  affiliatesUrl,
} = settings.site.resources;

const { fleekPlatformOrgUrl } = settings.github;

export default {
  fleekPlatformOrgUrl,
  developers: [
    {
      text: 'Fleek Network',
      url: fleekNetworkWebsiteUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Changelog',
      url: '/changelog/',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Github',
      url: fleekPlatformOrgUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Status',
      url: statusURl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
  company: [
    {
      text: 'Blog',
      url: '/blog/',
    },
    {
      text: 'Pricing',
      url: '/pricing/',
    },
    {
      text: 'Careers',
      url: careersUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'About',
      url: '/about/',
    },
    {
      text: 'Terms of Service',
      url: '/legal/terms-of-service/',
    },
    {
      text: 'Privacy Policy',
      url: '/legal/privacy-policy/',
    },
    {
      text: 'Contact us',
      url: '/requests/new/',
    },
  ],
  product: [
    {
      text: 'AI agent hosting',
      url: '/agents/',
    },
    {
      text: 'Web app hosting',
      url: '/docs/platform/hosting/',
    },
    {
      text: 'Fleek Machines',
      url: '/docs/platform/fleek-machines/',
    },
    {
      text: 'Fleek Functions',
      url: '/docs/platform/fleek-functions/',
    },
  ],
  resources: [
    {
      text: 'Documentation',
      url: '/docs/',
    },
    {
      text: 'Media kit',
      url: mediaKit,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Guides',
      url: '/guides/',
    },
    {
      text: 'Support',
      url: '/support/',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Report abuse',
      url: reportAbuseUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Affiliates',
      url: affiliatesUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
};
