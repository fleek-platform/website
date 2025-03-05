const dashboardUrl = import.meta.env.PUBLIC_UI_APP_URL;

type NavMenuItemBase = {
  label: string;
  description?: string;
  icon?: string;
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
        url: '/agents/',
        description: 'Build autonomous agents',
        icon: '/svg/robot.svg',
      },
      {
        label: 'Web app hosting',
        url: '/docs/platform/hosting',
        description: 'Host web applications',
        icon: '/svg/navbar-platform-icon.svg',
      },
      {
        label: 'Fleek Machines',
        url: '/docs/platform/fleek-machines',
        description: 'Run lightweight TEE VMs',
        icon: '/svg/machine.svg',
      },
      {
        label: 'Fleek Functions',
        url: '/docs/platform/fleek-functions',
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

export function getAuthenticationMenu(
  isLoggedIn: boolean,
  isLoggingIn: boolean,
  isError: boolean,
  handleLogin: () => void,
  handleLogout: () => void,
) {
  function getAuthenticationSubMenu(): NavMenuItem[] {
    if (isLoggedIn) {
      return [
        {
          label: 'Dashboard',
          url: dashboardUrl,
          description: 'Manage your account',
        },
        {
          label: 'Log out',
          action: handleLogout,
          description: 'Manage your account',
        },
      ];
    }

    function getLoginLabel() {
      if (isError) {
        return 'Log in failed';
      }
      if (isLoggingIn) {
        return 'Logging in...';
      }
      return 'Log in';
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
