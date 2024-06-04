import styles from './styles.module.css';
import clsx from 'clsx';

import type { Plan, PlanKeys, SectionFeatures } from './types';

export const PLAN_SECTIONS: SectionFeatures = {
  application: {
    icon: '/svg/applicationIconPricing.svg',
    title: 'Application',
    features: {
      projects: 'Projects',
      teamMembers: 'Team Members',
      sites: 'Sites',
      analytics: 'Analytics',
      sdk: 'SDK Integrations',
      customerSupport: 'Customer Support',
    },
    overage: ['$1.00 per extra', '$19.00 per extra', '$5.00 per extra'],
  },
  hosting: {
    icon: '/svg/hostingIconPricing.svg',
    title: 'Hosting',
    features: {
      bandwidth: 'Bandwidth',
      buildTier: 'Build Tier',
      conBuild: 'Concurrent Builds',
      buildMin: 'Build Minutes',
      customDomain: 'Custom Domains',
      fleekDomain: 'Fleek Domains',
    },
    overage: [
      '$0.05 per extra/GB',
      '',
      '',
      '$0.001 per extra/min',
      '$5.00 per extra',
    ],
  },
  storage: {
    icon: '/svg/storageIconPricing.svg',
    title: 'Storage',
    features: {
      storage: 'Storage',
      privGateways: 'Private Gateways',
    },
    overage: ['$0.04 per extra/GB', '$5.00 per extra'],
  },
  functions: {
    icon: '/svg/functionIconPricing.svg',
    title: 'Functions',
    features: {
      fleekFunctions: 'Fleek Functions',
      FleekFunctionTier: 'Fleek Functions Tier',
      FunctionsRuntimeHours: 'Function Runtime Hours',
      FunctionsReq: 'Function Request',
    },
    overage: [],
  },
};

export const PRICING_PLANS: Record<PlanKeys, Plan> = {
  wagmi: {
    features: {
      storage: {
        storage: '5GB',
        privGateways: '1',
      },
      hosting: {
        bandwidth: '50GB',
        buildTier: 'Basic',
        conBuild: '2',
        buildMin: '500',
        customDomain: '1',
        fleekDomain: 'No',
      },
      functions: {
        fleekFunctions: '1',
        FleekFunctionTier: 'Basic',
        FunctionsRuntimeHours: '100',
        FunctionsReq: '500,000',
      },
      application: {
        projects: '1',
        teamMembers: '1',
        sites: '3',
        analytics: true,
        sdk: true,
        customerSupport: 'Basic',
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
        privGateways: '2',
      },
      hosting: {
        bandwidth: '200GB',
        buildTier: 'Basic + Intermediate',
        conBuild: '5',
        buildMin: '2000',
        customDomain: '3',
        fleekDomain: '1',
      },
      functions: {
        fleekFunctions: '5',
        FleekFunctionTier: 'Basic + Intermediate',
        FunctionsRuntimeHours: '500',
        FunctionsReq: '1,000,00',
      },
      application: {
        projects: '5',
        teamMembers: '1',
        sites: '10',
        analytics: true,
        sdk: true,
        customerSupport: 'Intermediate',
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
        href: '/pricing/',
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
        storage: 'Custom',
        privGateways: 'Custom',
      },
      hosting: {
        bandwidth: 'Custom',
        buildTier: 'Custom',
        conBuild: 'Custom',
        buildMin: 'Custom',
        customDomain: 'Custom',
        fleekDomain: 'Custom',
      },
      functions: {
        fleekFunctions: 'Custom',
        FleekFunctionTier: 'Custom',
        FunctionsRuntimeHours: 'Custom',
        FunctionsReq: 'Custom ',
      },
      application: {
        projects: 'Custom',
        teamMembers: 'Custom',
        sites: 'Custom',
        analytics: true,
        sdk: true,
        customerSupport: 'Enterprise',
      },
    },
    header: {
      title: 'Enterprise',
      titleClassName: clsx('bg-clip-text', styles.enterpriseHeader),
      subtitle: 'Custom',
      description: 'Need high volume or custom requirements? Reach out.',
      cta: {
        text: 'Contact Sales',
        href: 'https://support.fleek.xyz/hc/en-us/requests/new?ticket_form_id=18990660014477',
        className: styles.enterpriseCTA,
      },
      btnBg: 'bg-gray-dark-4',
      hoverBtnBg: 'hover:bg-gray-dark-5',
    },
  },
};
