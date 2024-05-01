import settings from '@base/settings.json';

const {
  careersUrl,
  supportExternalUrl,
  reportAbuseUrl,
  fleekNetworkWebsiteUrl,
  discordFleekCommunityUrl,
} = settings.site.resources;

export default {
  company: [
    {
      text: 'Careers',
      url: careersUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Contact Us',
      url: supportExternalUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
  legal: [
    {
      text: 'Terms of Service',
      url: '/docs/terms',
    },
    {
      text: 'Privacy Policies',
      url: '/docs/privacy',
    },
    {
      text: 'Report Abuse',
      url: reportAbuseUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
  product: [
    {
      text: 'Hosting',
      url: '/hosting',
    },
    {
      text: 'Storage',
      url: '/storage',
    },
    {
      text: 'Domains',
      url: '/domains',
    },
    {
      text: 'Gateways',
      url: '/gateways',
    },
    {
      text: 'Fleek Network',
      url: fleekNetworkWebsiteUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
  resources: [
    {
      text: 'Pricing',
      url: '/pricing',
    },
    {
      text: 'Documentation',
      url: '/docs',
    },
    {
      text: 'Community',
      url: discordFleekCommunityUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Support',
      url: supportExternalUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Blog',
      url: '/blog',
    },
  ],
};
