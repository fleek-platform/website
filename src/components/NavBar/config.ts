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
    label: 'PRODUCTS ',
    subMenu: [
      {
        label: 'Platform',
        url: '/docs/platform',
        description: 'Build and deploy easily',
        icon: '/svg/navbar-platform-icon.svg',
      },
      {
        label: 'Infrastructure',
        url: '/docs/infrastructure',
        description: 'The power of Fleek',
        icon: '/svg/infra-navbar-icon.svg',
      },
      {
        label: 'CLI/SDK',
        url: '/docs/cli',
        description: 'Integrate or build locally',
        icon: '/svg/cli-navbar-icon.svg',
      },
      {
        label: 'Templates',
        url: 'https://app.fleek.xyz/templates',
        description: 'Use pre-built apps',
        icon: '/svg/templates-navbar-icon.svg',
      },
    ],
  },
  {
    label: 'DEVELOPERS',
    subMenu: [
      {
        label: 'Fleek Network',
        url: 'https://fleek.network',
        description: 'Edge-optimized infrastructure',
        icon: '/svg/infra-navbar-icon.svg',
      },
      {
        label: 'Github',
        url: 'https://github.com/fleek-platform',
        description: 'Our code repositories',
        icon: '/svg/github-navbar-icon.svg',
      },
      {
        label: 'Changelog',
        url: '/blog/changelog',
        description: 'Our latest developments',
        icon: '/svg/blog-navbar-icon.svg',
      },
      {
        label: 'Status',
        url: 'https://status.fleek.xyz/',
        description: 'Status uptime monitoring',
        icon: '/svg/status-navbar-icon.svg',
      },
    ],
  },
  {
    label: 'RESOURCES',
    subMenu: [
      {
        label: 'Documentation',
        url: '/docs',
        description: 'Learn about Fleek',
        icon: '/svg/blog-navbar-icon.svg',
      },
      {
        label: 'Guides',
        url: '/guides',
        description: 'Tips and tricks',
        icon: '/svg/guides-navbar-icon.svg',
      },
      {
        label: 'Media Kit',
        url: 'https://www.notion.so/fleek/Fleek-Brand-Kit-9a2bcf7eb40740a9b7e951fc951b478a',
        description: 'Our branding guidelines.',
        icon: '/svg/media-navbar-icon.svg',
      },
      {
        label: 'Support Center',
        url: supportUrlDefault,
        openInNewTab: true,
        description: 'Get help',
        icon: '/svg/community-navbar-icon.svg',
      },
    ],
  },
  {
    label: 'BLOG',
    url: '/blog',
  },
  {
    label: 'PRICING',
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
    label: 'Changelog',
    url: '/changelog',
  },
  {
    label: 'Support',
    url: supportUrlDefault,
    openInNewTab: true,
  },
];

export default NavBarDefault;
