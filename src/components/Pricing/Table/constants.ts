import styles from './styles.module.css';
import clsx from "clsx";

import type { Plan, PlanKeys, SectionFeatures } from "./types";

export const PLAN_SECTIONS: SectionFeatures  = {
  storage: {
    icon: '/svg/storage-icon.svg',
    title: 'Storage',
    features: {
      ipfs: 'IPFS',
      filecoin: 'Filecoin',
      arweave: 'Arweave',
    }
  },
  hosting: {
    icon: '/svg/hosting-icon.svg',
    title: 'Hosting',
    features: {
      sites: 'Sites',
      names: 'Names (DNS/ENS)',
      buildMinutes4Ram: 'Build Minutes\n(4GB RAM)',
      freeSSL: 'Free SSL',
      customSSL: 'Custom SSL',
    }
  },
  bandwidth: {
    icon: '/svg/hosting-icon.svg',
    title: 'Bandwidth',
    features: {
      bandwidth: 'Bandwidth',
      privateGateways: 'Private Gateways',
    }
  },
  compute: {
    icon: '/svg/compute-icon.svg',
    title: 'Compute',
    features: {
      edgeFunctions: 'Edge functions',
    }
  },
  features: {
    icon: '/svg/support-icon.svg',
    title: 'Features',
    features: {
      projects: 'Projects',
      users: 'Users',
      gitConnection: 'Git Connection',
      ddosProtection: 'DDoS Protection',
      ensSupport: 'ENS Support',
      dnsSupport: 'DNS Support',
      ipnsSupport: 'IPNS Support',
      cdn: 'CDN',
      anycastDNS: 'Anycast DNS',
      loadBalancing: 'Load Balancing',
      automaticCacheRefresh: 'Automatic Cache Refreshes',
    }
  },
  support: {
    icon: '/svg/support-icon.svg',
    title: 'Support',
    features: {
      knowledgeBase: 'Knowledge Base',
      supportHub: 'Support hub',
      premiumSupport: 'Premium support',
    }
  },
};
 
export const PRICING_PLANS: Record<PlanKeys, Plan> = {
  wagmi: {
    features: {
      storage: {
        sharedPricing: "⚡️\n($5 in free usage credits each month)",
      },
      hosting: {
        sites: 3,
        names: 2,
        buildMinutes4Ram: '⚡️',
        freeSSL: '✅',
        customSSL: '🚫',
      },
      bandwidth: {
        bandwidth: '⚡️',
        privateGateways: 1,
      },
      compute: {
        edgeFunctions: 'Soon',
      },
      features: {
        projects: 1,
        users: 'Unlimited',
        gitConnection: '✅',
        ddosProtection: '✅',
        ensSupport: '✅',
        dnsSupport: '✅',
        ipnsSupport: '✅',
        cdn: '✅',
        anycastDNS: '✅',
        loadBalancing: '✅',
        automaticCacheRefresh: '✅',
      },
      support: {
        knowledgeBase: '✅',
        supportHub: '✅',
        premiumSupport: '🚫',
      },
    },
    header: {
      title: 'WAGMI',
      titleClassName: clsx('bg-clip-text', styles.wagmiHeader),
      subtitle: '$0',
      description: 'For those just starting.\n⚡ Up to $5 in free usage every month. ⚡',
      cta: {
        text: 'Sign up',
        href: 'https://app.fleek.xyz/',
        className: styles.wagmiCTA,
      },
    },
  },
  pro: {
    features: {
      storage: {
        ipfs: 'Free',
        filecoin: '$0.07 per GB',
        arweave: '~$4 per GB',
      },
      hosting: {
        sites: 'Unlimited',
        names: 'Unlimited',
        buildMinutes4Ram: '$0.07 per minute',
        freeSSL: '✅',
        customSSL: '✅',
      },
      bandwidth: {
        bandwidth: '$0.07 per GB',
        privateGateways: 'Unlimited',
      },
      compute: {
        edgeFunctions: 'Soon',
      },
      features: {
        projects: 'Unlimited',
        users: 'Unlimited',
        gitConnection: '✅',
        ddosProtection: '✅',
        ensSupport: '✅',
        dnsSupport: '✅',
        ipnsSupport: '✅',
        cdn: '✅',
        anycastDNS: '✅',
        loadBalancing: '✅',
        automaticCacheRefresh: '✅',
      },
      support: {
        knowledgeBase: '✅',
        supportHub: '✅',
        premiumSupport: '🚫',
      },
    },
    header: {
      title: 'Pro',
      titleClassName: clsx('bg-clip-text', styles.proHeader),
      subtitle: 'Usage based pricing',
      description: 'Pricing that scales with your project. Free $5 included monthly. #WAGMI',
      cta: {
        text: 'Coming soon',
        href: '/pricing/',
        className: styles.proCTA,
      },
    },
  },
  enterprise: {
    // TODO: make custom
    features: {
      storage: {
        sharedPricing: "CUSTOM",
      },
      hosting: {
        sharedPricing: "CUSTOM",
      },
      bandwidth: {
        sharedPricing: "CUSTOM",
      },
      compute: {
        sharedPricing: "Soon",
      },
      features: {
        projects: 'Unlimited',
        users: 'Unlimited',
        gitConnection: '✅',
        ddosProtection: '✅',
        ensSupport: '✅',
        dnsSupport: '✅',
        ipnsSupport: '✅',
        cdn: '✅',
        anycastDNS: '✅',
        loadBalancing: '✅',
        automaticCacheRefresh: '✅',
      },
      support: {
        knowledgeBase: '✅',
        supportHub: '✅',
        premiumSupport: '✅',
      },
    },
    header: {
      title: 'Enterprise',
      titleClassName: clsx('bg-clip-text', styles.enterpriseHeader),
      subtitle: 'Custom',
      description: 'Need high volume or custom requirements? Reach out.',
      cta: {
        text: 'Contact us',
        href: 'https://support.fleek.xyz/hc/en-us/requests/new?ticket_form_id=18990660014477',
        className: styles.enterpriseCTA,
      },
    },
  },
}
