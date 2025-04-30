import type { Props } from '../../components/PricingCard';

const dashboardUrl = import.meta.env.PUBLIC_APP_HOSTING_URL;

export const HostingPricingInfo: Props[] = [
  {
    title: 'Free Plan',
    description:
      'For those just starting out on Fleek.\n Go live today, on us.',
    splitDescription: true,
    cost: {
      amount: 'Free',
      prefix: '',
      suffix: '',
      bottomText: 'with resource limits',
    },
    featuresDescription: 'Our base resources, including:',
    features: [
      'Git integration & CI/CD',
      'Preview URLs & global deployments',
      'DNS, SSL, CDN & DDoS',
      'Community support',
    ],
    cta: 'Start with Free',
    variant: 'primary-outline',
    url: dashboardUrl,
  },
  {
    title: 'Pro Plan',
    description: 'Our most popular option for growing projects',
    splitDescription: true,
    cost: {
      amount: 20,
      bottomText: '+ resource usage',
    },
    featuresDescription: 'Everything in Free Plan, plus:',
    features: [
      'Unlimited team members',
      'Unlimited custom domains',
      'Unlimited sites',
      'Email support',
    ],
    cta: 'Go fast with Pro',
    variant: 'primary-outline',
    url: `${dashboardUrl}/projects/[projectId]/billing`,
  },
  {
    title: 'Enterprise Plan',
    description: "Have a big project or custom needs?\n We've got you.",
    splitDescription: true,
    cost: {
      amount: 'Custom',
      prefix: '',
      suffix: '',
      bottomText: 'starting at $1000 /month',
    },
    featuresDescription: 'Everything in Pro Plan, plus:',
    features: [
      'Custom billing',
      'Custom build resources',
      'Enterprise SLAs',
      'Dedicated support',
    ],
    cta: 'Contact us',
    variant: 'primary-outline',
    url: 'https://fleek.typeform.com/fleekinterest',
  },
];

export const AiAgentsPricingInfo: Props[] = [
  {
    title: 'Fan',
    description:
      'Great for those who just want to chat with AI agents & virtual influencers',
    splitDescription: true,
    cost: {
      amount: 10,
    },
    featuresDescription: 'Includes:',
    features: [
      '10 credits per month',
      'Generate videos, images in chats',
      'Maintain private conversations',
    ],
    cta: 'Coming soon',
    variant: 'primary-outline',
  },
  {
    title: 'Creator',
    description:
      'Great for those creating their first AI agent or virtual influencer',
    splitDescription: true,
    cost: {
      amount: 20,
    },
    featuresDescription: 'Includes everything in Fan, plus:',
    features: [
      '10 credits per month',
      '1 AI agent or influencer',
      '1 seat',
      'Additional agents for $20/m',
    ],
    cta: 'Start free trial',
    variant: 'primary-white',
    url: `${dashboardUrl}/agents`,
  },
  {
    title: 'Manager',
    description:
      'Great for managing a fleet of agents for marketing/advertising',
    splitDescription: true,
    cost: {
      amount: 99,
    },
    featuresDescription: 'Includes everything in Fan, plus:',
    features: [
      '25 Fleek credits per month',
      'Unlimited agents & influencers',
      'Unlimited seats',
    ],
    cta: 'Coming soon',
    variant: 'primary-outline',
  },
  {
    title: 'Enterprise',
    description: 'Great for teams looking to take things to the next level',
    splitDescription: true,
    cost: {
      amount: 'Custom',
      prefix: '',
      suffix: '',
    },
    featuresDescription: 'Includes:',
    features: [
      'Custom model training options',
      'Concierge support',
      'SLAs',
      'Admin tools',
    ],
    cta: 'Contact us',
    variant: 'secondary',
    url: 'https://fleek.typeform.com/fleekinterest',
  },
];
