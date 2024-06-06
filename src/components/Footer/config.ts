import settings from '@base/settings.json';

const {
  careersUrl,
  supportExternalUrl,
  reportAbuseUrl,
  discordFleekCommunityUrl,
  statusURl,
} = settings.site.resources;

const { fleekPlatformOrgUrl } = settings.github;

export default {
  fleekPlatformOrgUrl,
  developers: [
    {
      text: 'Fleek Network',
      url: 'https://fleek.network/',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Github',
      url: 'https://github.com/fleek-platform',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Changelog',
      url: '/blog/changelog',
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
  legal: [
    {
      text: 'Terms of Service',
      url: '/legal/terms-of-service',
    },
    {
      text: 'Privacy Policies',
      url: '/legal/privacy-policy',
    },
    {
      text: 'Report Abuse',
      url: reportAbuseUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Contact Us',
      url: reportAbuseUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
  product: [
    {
      text: 'Platform',
      url: '/docs/platform',
    },
    {
      text: 'Infrastructure',
      url: '/docs/infrastructure',
    },
    {
      text: 'CLI/SDK',
      url: '/docs/cli',
    },
    {
      text: 'Templates',
      url: 'https://app.fleek.xyz/templates',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
  resources: [
    {
      text: 'Blog',
      url: '/blog',
    },
    {
      text: 'Docs',
      url: '/docs',
    },
    {
      text: 'Media Kit',
      url: 'https://fleek.notion.site/Fleek-Brand-Kit-9a2bcf7eb40740a9b7e951fc951b478a',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Careers',
      url: careersUrl,
    },
  ],
};
