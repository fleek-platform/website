import settings from '@base/settings.json';

const {
  careersUrl,
  supportExternalUrl,
  reportAbuseUrl,
  statusURl,
  mediaKit,
  fleekNetworkWebsiteUrl,
  templatesUrl,
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
      url: '/blog/changelog/',
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
      text: 'Terms of Service',
      url: '/legal/terms-of-service/',
    },
    {
      text: 'Privacy Policy',
      url: '/legal/privacy-policy/',
    },
    {
      text: 'Contact us',
      url: reportAbuseUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
  product: [
    {
      text: 'Platform',
      url: '/docs/platform/',
    },
    {
      text: 'Infrastructure',
      url: '/docs/infrastructure/',
    },
    {
      text: 'CLI/SDK',
      url: '/docs/cli/',
    },
    {
      text: 'Templates',
      url: templatesUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
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
      url: supportExternalUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Report abuse',
      url: reportAbuseUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
};
