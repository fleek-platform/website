import styles from './styles.module.css';
import clsx from 'clsx';

import type { Plan, PlanKeys, SectionFeatures } from './types';

export const PLAN_SECTIONS: SectionFeatures = {
  compute: {
    icon: '/svg/applicationIconPricing.svg',
    title: 'Compute',
    features: {
      requests: 'Requests',
      duration: 'Duration',
      vCPU: 'vCPU',
    },
    overage: ['$0.30 / 1M Requests (Overage)'],
  },
  bandwidth: {
    icon: '/svg/hostingIconPricing.svg',
    title: 'Bandwidth',
    features: {
      bandwidth: 'Bandwidth',
    },
    overage: ['$0.05 / GB (Overage)'],
  },
  hosting: {
    icon: '/svg/storageIconPricing.svg',
    title: 'Hosting',
    features: {
      sites: 'Sites',
      buildMin: 'Build Minutes',
      buildTier: 'Build Tier',
      conBuild: 'Concurrent Builds',
      autogenSubDomain: 'Auto Generated Sub Domains',
      domain: 'Domains',
      ssl: 'SSL',
      customssl: 'Custom SSL',
    },
    overage: [
      '',
      '$0.002 / Min (Overage)',
      '',
      '',
      '',
      '$1.00 / Domain (Overage)',
    ],
  },
  storage: {
    icon: '/svg/functionIconPricing.svg',
    title: 'Storage',
    features: {
      storage: 'Storage',
    },
    overage: ['$0.04 / GB (Overage)'],
  },
  platform: {
    icon: '/svg/functionIconPricing.svg',
    title: 'Platform',
    features: {
      projects: 'Projects',
      teamMem: 'Team Members',
      GitCon: 'Git Connection',
      ddos: 'DDoS Protection',
      imageOp: 'Image Optimization',
      dns: 'DNS Support',
      cdn: 'CDN',
      anycastDNS: 'Anycast DNS',
      loadBal: 'Load Balancing',
      autoCacheRef: 'Automatic Cache Refreshes',
      sdk: 'SDK Integrations',
      analytics: 'Analytics',
      support: 'Support',
    },
    overage: ['', '$19.00 / Team Member'],
  },
  onchainFeatures: {
    icon: '/svg/functionIconPricing.svg',
    title: 'Onchain Features',
    features: {
      ens: 'ENS Domains',
      threedns: '3DNS Domains',
      ipfs: 'IPFS',
      filecoin: 'Filecoin',
      arweave: 'Arweave',
      ipns: 'IPNS Keys',
      privGate: 'Private Gateways',
    },
    overage: [],
  },
};

export const PRICING_PLANS: Record<PlanKeys, Plan> = {
  wagmi: {
    features: {
      storage: {
        storage: '5GB',
      },
      hosting: {
        sites: '3',
        buildMin: '500',
        buildTier: 'Basic',
        conBuild: '2',
        autogenSubDomain: false,
        domain: '1',
        ssl: true,
        customssl: false,
      },
      bandwidth: {
        bandwidth: '20GB',
      },
      platform: {
        projects: '1',
        teamMem: '1',
        GitCon: true,
        ddos: true,
        imageOp: true,
        dns: true,
        cdn: true,
        anycastDNS: true,
        loadBal: true,
        autoCacheRef: true,
        sdk: true,
        analytics: 'Basic',
        support: 'Basic',
      },
      compute: {
        requests: '3M',
        duration: '$0.00003 / GB-Sec',
        vCPU: '$0.00003 / vCPU-Sec',
      },
      onchainFeatures: {
        ens: '1',
        threedns: '1',
        ipfs: '$0.07 / GB',
        filecoin: '$0.04 / GB',
        arweave: '$4.00 / GB',
        ipns: '1',
        privGate: '1',
      },
    },
    header: {
      title: 'Free Plan',
      titleClassName: clsx('bg-clip-text', styles.wagmiHeader),
      subtitle: '$0',
      description:
        'For those just starting.\n⚡ Up to $5 in free usage every month. ⚡',
      cta: {
        text: ' Start with Free',
        href: 'https://app.fleek.xyz/',
        className: styles.wagmiCTA,
      },
      btnBg: 'bg-ui-green',
      hoverBtnBg: 'hover:bg-ui-light-green',
      fontColor: 'text-ui-faded-green',
    },
  },
  pro: {
    features: {
      storage: {
        storage: '200GB',
      },
      hosting: {
        sites: '100',
        buildMin: '2,000',
        buildTier: 'Premium',
        conBuild: '5',
        autogenSubDomain: true,
        domain: '3',
        ssl: true,
        customssl: true,
      },
      bandwidth: {
        bandwidth: '200GB',
      },
      platform: {
        projects: '10',
        teamMem: '1',
        GitCon: true,
        ddos: true,
        imageOp: true,
        dns: true,
        cdn: true,
        anycastDNS: true,
        loadBal: true,
        autoCacheRef: true,
        sdk: true,
        analytics: 'Premium',
        support: 'Premium',
      },
      compute: {
        requests: '20M',
        duration: '$0.00003 / GB-Sec',
        vCPU: '$0.00003 / vCPU-Sec',
      },
      onchainFeatures: {
        ens: '10',
        threedns: '10',
        ipfs: '$0.07 / GB',
        filecoin: '$0.04 / GB',
        arweave: '$4.00 / GB',
        ipns: '10',
        privGate: '10',
      },
    },
    header: {
      title: 'Pro Plan',
      titleClassName: clsx('bg-clip-text', styles.proHeader),
      subtitle: 'Usage based pricing',
      description:
        'Pricing that scales with your project. Free $5 included monthly. #WAGMI',
      cta: {
        text: 'Go Fast with Pro',
        href: 'mailto:business@fleek.xyz',
        className: styles.proCTA,
      },
      btnBg: 'bg-yellow-dark-4',
      hoverBtnBg: 'hover:bg-yellow-dark-5',
    },
  },
  enterprise: {
    // TODO: make custom
    features: {
      storage: {
        sharedPricing: 'Custom',
      },
      hosting: {
        sharedPricing: 'Custom',
      },
      bandwidth: {
        sharedPricing: 'Custom',
      },
      platform: {
        sharedPricing: 'Custom',
      },
      compute: {
        sharedPricing: 'Custom',
      },
      onchainFeatures: {
        sharedPricing: 'Custom',
      },
    },
    header: {
      title: 'Enterprise',
      titleClassName: clsx('bg-clip-text', styles.enterpriseHeader),
      subtitle: 'Custom',
      description: 'Need high volume or custom requirements? Reach out.',
      cta: {
        text: 'Contact Sales',
        href: 'mailto:business@fleek.xyz',
        className: styles.enterpriseCTA,
      },
      btnBg: 'bg-gray-dark-4',
      hoverBtnBg: 'hover:bg-gray-dark-5',
    },
  },
};
