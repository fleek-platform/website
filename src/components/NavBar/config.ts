import settings from '@base/settings.json';

import type { MenuSettingsItem } from './index';

const supportUrlDefault = 'https://support.fleek.xyz';

// Warning: when editing enable Typescript LSP
// to avoid any typos.
//
// Each `menuItem` is an object with key `label`
// and `url`. There are the optionals `openInNewTab`
// and the `subMenu`.
//
//  {
//    label: "Blog",
//    url: "/blog",
//    openInNewTab: true or false
//  }
//
// The `subMenu` takes a list of `subMenuItems`.
// The apearance is limited to the conditions
// supported by the styles or component.
//
// For this reason the data is placed in
// the `main` and `side` (optional) fields.
//
// {
//   label: "A title"
//   items: <Same as `menuItem`>
// }
//
export const NavBarDefault: MenuSettingsItem[] = [
  {
    label: 'Product',
    subMenu: {
      main: [
        {
          label: 'Features',
          items: [
            {
              label: 'Hosting',
              url: '/hosting',
            },
            {
              label: 'Storage',
              url: '/storage',
            },
            {
              label: 'Domains',
              url: '/domains',
            },
            {
              label: 'Gateways',
              url: '/gateways',
            },
          ],
        },
        {
          label: 'Resources',
          items: [
            {
              label: 'GitHub',
              url: settings.github.xyzWebsiteRepositoryUrl,
            },
            {
              label: 'Templates',
              url: '/templates',
            },
          ],
        },
      ],
      side: {
        label: 'Protocols',
        items: [
          {
            label: 'Fleek Network',
            url: settings.site.resources.fleekNetworkWebsiteUrl,
          },
          {
            label: 'Arweave',
            url: settings.site.resources.arweaveUrl,
          },
          {
            label: 'IPFS',
            url: settings.site.resources.ipfsUrl,
          },
        ],
      },
      ctas: [
        {
          label: 'Benchmarks',
          url: 'TODO:BencharmksUrl',
        },
        {
          label: 'Comparison',
          url: 'TODO:ComparisonUrl',
        },
      ],
    },
  },
  {
    label: 'Blog',
    url: '/blog',
  },
  {
    label: 'Docs',
    url: '/docs',
    subMenu: {
      main: [
        {
          label: 'Documentation',
          items: [
            {
              label: 'Home',
              url: '/docs',
            },
            {
              label: 'Platform',
              url: '/docs/platform',
            },
            {
              label: 'Infrastructure',
              url: '/docs/infrastructure',
            },
            {
              label: 'CLI',
              url: '/docs/cli',
            },
            {
              label: 'SDK',
              url: '/docs/sdk',
            },
          ],
        },
        {
          label: 'Resources',
          items: [
            {
              label: 'Guides',
              url: '/guides',
            },
            {
              label: 'References',
              url: '/references',
            },
            {
              label: 'Templates',
              url: '/docs/templates',
            },
          ],
        },
      ],
      side: {
        label: 'Changelog',
        items: [
          {
            label: 'CLI',
            url: 'https://github.com/FleekHQ/fleek/blob/master/packages/cli/CHANGELOG.md?TODO-MOVE-TO-OS-REPO',
            openInNewTab: true,
          },
          {
            label: 'SDK',
            url: 'https://github.com/FleekHQ/fleek/blob/master/packages/sdk/CHANGELOG.md?TODO-MOVE-TO-OS-REPO',
            openInNewTab: true,
          },
        ],
      },
      ctas: [
        {
          label: 'Support',
          url: supportUrlDefault,
          openInNewTab: true,
        },
      ],
    },
  },
  {
    label: 'Pricing',
    url: '/pricing',
  },
];

export const NavBarDocs: MenuSettingsItem[] = [
  {
    label: 'documentation',
    url: '/docs',
  },
  {
    label: 'guides',
    url: '/guides',
  },
  {
    label: 'references',
    url: '/references',
  },
  {
    label: 'Templates',
    url: '/templates',
  },
  {
    label: 'Support',
    url: supportUrlDefault,
    openInNewTab: true,
  },
];

export default NavBarDefault;
