import type { IconType } from 'react-icons/lib';
import { MdHandshake } from 'react-icons/md';
import settings from '@base/settings.json';
import { isClient } from '@utils/common';

const dashboardUrl = import.meta.env.PUBLIC_APP_HOSTING_URL;
const elizaUrl = import.meta.env.PUBLIC_APP_ELIZA_URL;
const resourcesUrl = import.meta.env.PUBLIC_APP_RESOURCES_URL;
const hostingUrl = import.meta.env.PUBLIC_APP_NEW_HOSTING_URL;

type NavMenuItemBase = {
  label: string;
  description?: string;
  icon?: string | IconType;
  openInNewTab?: boolean;
};

type NavMenuItemUrl = NavMenuItemBase & {
  url: string;
  action?: never;
};

type NavMenuItemAction = NavMenuItemBase & {
  action: () => void;
  url?: never;
};

type NavMenuItemSection = NavMenuItemBase & {
  subMenu: NavMenuItem[];
};

export type NavMenuItem = NavMenuItemUrl | NavMenuItemAction;
export type NavMenuItemRoot = NavMenuItem | NavMenuItemSection;

export const navbarMenu: NavMenuItemRoot[] = [
  {
    label: 'Product',
    subMenu: [
      {
        label: 'AI agent hosting',
        url: elizaUrl.concat('/docs/'),
        description: 'Build autonomous agents',
        icon: '/svg/robot.svg',
      },
      {
        label: 'Web app hosting',
        url: hostingUrl.concat('/hosting/'),
        description: 'Host web applications',
        icon: '/svg/navbar-platform-icon.svg',
      },
      {
        label: 'Fleek Machines',
        url: hostingUrl.concat('/fleek-machines/'),
        description: 'Run lightweight TEE VMs',
        icon: '/svg/machine.svg',
      },
      {
        label: 'Fleek Functions',
        url: hostingUrl.concat('/fleek-functions/'),
        description: 'Run serverless functions',
        icon: '/svg/globe-filled.svg',
      },
    ],
  },
  {
    label: 'Resources',
    subMenu: [
      {
        label: 'Documentation',
        url: resourcesUrl.concat('/docs/'),
        description: 'Learn about Fleek',
        icon: '/svg/blog-navbar-icon.svg',
      },
      {
        label: 'Guides',
        url: resourcesUrl.concat('/guides/'),
        description: 'Tips and tricks',
        icon: '/svg/guides-navbar-icon.svg',
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
        url: resourcesUrl.concat('/changelog/'),
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
      {
        label: 'Media kit',
        url: 'https://www.notion.so/fleek/Fleek-Brand-Kit-9a2bcf7eb40740a9b7e951fc951b478a',
        description: 'Our branding guidelines',
        icon: '/svg/media-navbar-icon.svg',
        openInNewTab: true,
      },
      {
        label: 'Support Center',
        url: resourcesUrl.concat('/support/'),
        description: 'Get help',
        icon: '/svg/community-navbar-icon.svg',
      },
      {
        label: 'Affiliates',
        url: settings.site.resources.affiliatesUrl,
        description: 'Earn with Fleek',
        icon: MdHandshake,
        openInNewTab: true,
      },
    ],
  },
  {
    label: 'Docs',
    url: resourcesUrl.concat('/docs/'),
  },
  {
    label: 'Blog',
    url: resourcesUrl.concat('/blog/'),
  },
  {
    label: 'Pricing',
    url: resourcesUrl.concat('/pricing/'),
  },
];

export function getAuthenticationMenu(
  isLoggedIn: boolean,
  isLoggingIn: boolean,
  isError: boolean,
  handleLogin: () => void,
  handleLogout: () => void,
) {
  function getAuthenticationSubMenu(): NavMenuItem[] {
    let hostingAppUrl = dashboardUrl;
    if (isClient && window.location.hostname.startsWith('resources.')) {
      hostingAppUrl = 'https://hosting.fleek.xyz/dashboard';
    }

    if (isLoggedIn) {
      return [
        {
          label: 'Dashboard',
          url: hostingAppUrl,
          description: 'Manage your account',
        },
        {
          label: 'Sign out',
          action: handleLogout,
          description: 'Manage your account',
        },
      ];
    }

    function getLoginLabel() {
      if (isError) {
        return 'Sign in failed';
      }
      if (isLoggingIn) {
        return 'Loading...';
      }
      return 'Sign in';
    }

    return [
      {
        label: getLoginLabel(),
        action: handleLogin,
        description: 'Access your account',
      },
      {
        label: 'Sign up',
        action: handleLogin,
        description: 'Create an account',
      },
    ];
  }

  const authenticationMenu: NavMenuItemRoot = {
    label: 'Account',
    subMenu: getAuthenticationSubMenu(),
  };

  return authenticationMenu;
}
