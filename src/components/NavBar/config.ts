import type { MenuSettingsItem } from './index';

// When editing enable Typescript LSP
// to avoid any typos
const NavBarSettings: MenuSettingsItem[] = [
  {
    label: "Product",
    children: {
      main: [{
        label: "Features",
        items: [{
          label: 'Hosting',
          url: '/hosting',
        }, {
          label: 'Storage',
          url: '/storage',
        }, {
          label: 'Domains',
          url: '/domains',
        }, {
          label: 'Gateways',
          url: '/gateways',
        }],
      }, {
        label: "Resources",
        items: [{
          label: 'GitHub',
          url: 'TODO:AddGithubUrl'
        }, {
          label: 'Templates',
          url: 'TODO:AddTemplatesUrl'
        }],
      }],
      side: {
        label: "Resources",
        items: [{
            label: 'GitHub',
            url: 'TODO:AddGithubUrl',
          }, {
            label: 'Templates',
            url: 'TODO:AddTemplatesUrl',
        }],
      },
    },
  },
  {
    label: "Blog",
    url: "/blog",
  },
  {
    label: "Docs",
    url: "/docs",
  },
  {
    label: "Pricing",
    url: "/pricing",
  },
];

export default NavBarSettings;
