import settings from '@base/settings.json';

const {
  careersUrl,
  supportExternalUrl,
  reportAbuseUrl,
  fleekNetworkWebsiteUrl,
  discordFleekCommunityUrl,
  statusURl,
} = settings.site.resources;

export default {
  developers: [
    {
      text: 'Status',
      url: statusURl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Github',
      url: 'https://github.com/fleekxyz',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Guides',
      url: '/guides',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Support',
      url: supportExternalUrl,
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
      url: '/templates',
    },
  ],
  resources: [
    {
      text: 'Blog',
      url: '/blog',
    },
    {
      text: 'Media Kit',
      url: '/docs',
    },
    {
      text: 'Careers',
      url: careersUrl,
    },
    {
      text: 'Community',
      url: discordFleekCommunityUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
};
