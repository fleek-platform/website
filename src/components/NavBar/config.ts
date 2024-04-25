import type { MenuSettingsItem } from './index';

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
const NavBarConfig: MenuSettingsItem[] = [
  {
    label: "Product",
    subMenu: {
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
        label: "Protocols",
        items: [{
            label: 'Fleek Network',
            url: 'TODO:AddFNUrl',
          }, {
            label: 'Arweave',
            url: 'TODO:AddArweaveURL',
        }, {
          label: 'IPFS',
          url: 'TODO:AddIPFSUrl',
        }],
      },
      ctas: [{
        label: 'Benchmarks',
        url: 'TODO:BencharmksUrl'
      }, {
        label: 'Comparison',
        url: 'TODO:ComparisonUrl',  
      }],
    },
  },
  {
    label: "Blog",
    url: "/blog",
  },
  {
    label: "Docs",
    url: "/docs",
    subMenu: {
      main: [{
        label: 'Documentation',
        items: [{
          label: 'Get Started',
          url: '/docs',
        }, {
          label: 'Guides',
          url: '/guides',
        }, {
          label: 'references',
          url: '/references',
        }],
      }],
      side: {
        label: "Changelog",
        items: [{
            label: 'CLI',
            url: 'https://github.com/FleekHQ/fleek/blob/master/packages/cli/CHANGELOG.md?TODO-MOVE-TO-OS-REPO',
            openInNewTab: true,
          }, {
            label: 'SDK',
            url: 'https://github.com/FleekHQ/fleek/blob/master/packages/sdk/CHANGELOG.md?TODO-MOVE-TO-OS-REPO',
            openInNewTab: true,
        }],
      },
      ctas: [{
        label: 'Support',
        url: 'TODO:SupportUrl',  
      }],
    },
  },
  {
    label: "Pricing",
    url: "/pricing",
  },
];

export default NavBarConfig;
