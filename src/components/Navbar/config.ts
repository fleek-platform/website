export type NavMenuItem = {
  label: string;
  subMenu?: NavSubMenuItem[];
  url?: string;
  description?: string;
  icon?: string;
  openInNewTab?: boolean;
};

export type NavSubMenuItem = Omit<NavMenuItem, 'subMenu'>;

export const navbarMenu: NavMenuItem[] = [
  {
    label: 'Features',
    subMenu: [
      {
        label: 'AI agent hosting',
        url: '/eliza/', 
        description: 'Build autonomous agents',
        icon: '/svg/cli-navbar-icon.svg',
      },
      {
        label: 'Platform',
        url: '/docs/platform',
        description: 'Build and deploy easily',
        icon: '/svg/navbar-platform-icon.svg',
      },
      {
        label: 'Infrastructure',
        url: '/docs/infrastructure/',
        description: 'The power of Fleek',
        icon: '/svg/infra-navbar-icon.svg',
      },
      {
        label: 'CLI/SDK',
        url: '/docs/cli/',
        description: 'Integrate or build locally',
        icon: '/svg/cli-navbar-icon.svg',
      },
      {
        label: 'Templates',
        url: 'https://fleek.xyz/templates/',
        description: 'Use pre-built apps',
        icon: '/svg/templates-navbar-icon.svg',
      },
    ],
  },
  {
    label: 'Developers',
    subMenu: [
      {
        label: 'Fleek Network',
        url: 'https://fleek.network',
        description: 'Edge-optimized infrastructure',
        icon: '/svg/infra-navbar-icon.svg',
        openInNewTab: true,
      },
      {
        label: 'Github',
        url: 'https://github.com/fleek-platform',
        description: 'Our code repositories',
        icon: '/svg/github-navbar-icon.svg',
        openInNewTab: true,
      },
      {
        label: 'Changelog',
        url: '/changelog/',
        description: 'Our latest developments',
        icon: '/svg/blog-navbar-icon.svg',
      },
      {
        label: 'Status',
        url: 'https://status.fleek.xyz/',
        description: 'Status uptime monitoring',
        icon: '/svg/status-navbar-icon.svg',
        openInNewTab: true,
      },
    ],
  },
  {
    label: 'Resources',
    subMenu: [
      {
        label: 'Documentation',
        url: '/docs/',
        description: 'Learn about Fleek',
        icon: '/svg/blog-navbar-icon.svg',
      },
      {
        label: 'Guides',
        url: '/guides/',
        description: 'Tips and tricks',
        icon: '/svg/guides-navbar-icon.svg',
      },
      {
        label: 'Media kit',
        url: 'https://www.notion.so/fleek/Fleek-Brand-Kit-9a2bcf7eb40740a9b7e951fc951b478a',
        description: 'Our branding guidelines',
        icon: '/svg/media-navbar-icon.svg',
        openInNewTab: true,
      },
      {
        label: 'Support Center',
        url: '/support/',
        description: 'Get help',
        icon: '/svg/community-navbar-icon.svg',
      },
    ],
  },
  {
    label: 'Docs',
    url: '/docs/',
  },
  {
    label: 'Blog',
    url: '/blog/',
  },
  {
    label: 'Pricing',
    url: '/pricing/',
  },
];
