import settings from '@base/settings.json';

const {
  careersUrl,
  statusURl,
  mediaKit,
  fleekNetworkWebsiteUrl,
  affiliatesUrl,
} = settings.site.resources;

const { fleekPlatformOrgUrl } = settings.github;

const resourcesUrl = import.meta.env.PUBLIC_APP_RESOURCES_URL;
const elizaUrl = import.meta.env.PUBLIC_APP_ELIZA_URL;
const hostingUrl = import.meta.env.PUBLIC_APP_HOSTING_URL;

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
      url: resourcesUrl.concat('/changelog/'),
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
      url: resourcesUrl.concat('/blog/'),
    },
    {
      text: 'Pricing',
      url: resourcesUrl.concat('/pricing/'),
    },
    {
      text: 'Careers',
      url: careersUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'About',
      url: resourcesUrl.concat('/about/'),
    },
    {
      text: 'Terms of Service',
      url: resourcesUrl.concat('/legal/terms-of-service/'),
    },
    {
      text: 'Privacy Policy',
      url: resourcesUrl.concat('/legal/privacy-policy/'),
    },
    {
      text: 'Contact us',
      url: resourcesUrl.concat('/requests/new/'),
    },
  ],
  product: [
    {
      text: 'AI agent hosting',
      url: elizaUrl,
    },
    {
      text: 'Web app hosting',
      url: hostingUrl.concat('/hosting/'),
    },
    {
      text: 'Fleek Machines',
      url: hostingUrl.concat('/fleek-machines/'),
    },
    {
      text: 'Fleek Functions',
      url: hostingUrl.concat('/fleek-functions/'),
    },
  ],
  resources: [
    {
      text: 'Documentation',
      url: resourcesUrl.concat('/docs/'),
    },
    {
      text: 'Media kit',
      url: mediaKit,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      text: 'Guides',
      url: resourcesUrl.concat('/guides/'),
    },
    {
      text: 'Support',
      url: resourcesUrl.concat('/support/'),
      rel: 'noopener noreferrer',
    },
    {
      text: 'Report abuse',
      url: resourcesUrl.concat('/requests/report-site/'),
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
