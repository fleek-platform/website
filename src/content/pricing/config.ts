import type { Props } from '../../components/PricingCard';

const dashboardUrl = import.meta.env.PUBLIC_UI_APP_URL;

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
    title: 'Chat',
    description: 'For users only interested in chatting with existing agents.',
    splitDescription: true,
    cost: {
      amount: 10,
    },
    featuresDescription: 'Includes:',
    features: [
      'Chat with existing agents',
      'Generate images and video content',
      'Maintain private conversations',
    ],
    cta: 'Coming soon',
    variant: 'primary-outline',
  },
  {
    title: 'Create',
    description:
      'For users just starting. Create or chat with AI agents and virtual influencers. ',
    splitDescription: true,
    cost: {
      amount: 20,
    },
    featuresDescription: 'Includes:',
    features: [
      '7-day free trial',
      '1 custom AI avatar',
      'Add credits for $1 each',
    ],
    cta: 'Start free trial',
    variant: 'primary',
    url: `${dashboardUrl}/agents`,
  },
  {
    title: 'Crush It',
    description: 'For rising stars to create and manage virtual influencers.',
    splitDescription: true,
    cost: {
      amount: 99,
    },
    featuresDescription: 'Includes:',
    features: [
      '50 Fleek credits/month',
      'Unlimited custom AI avatars',
      '5% discount on added credits',
    ],
    cta: 'Coming soon',
    variant: 'primary-outline',
  },
  {
    title: 'Enterprise',
    description: "Have a big project or custom needs?\n We've got you.",
    splitDescription: true,
    cost: {
      amount: 'Custom',
      prefix: '',
      suffix: '',
    },
    featuresDescription:
      'For users or companies looking to scale their experience.',
    features: [
      'Bulk agent creation',
      'Concierge support',
      'Volume discounting on credits',
      'Admin tools',
    ],
    cta: 'Contact us',
    variant: 'primary-outline',
    url: 'https://fleek.typeform.com/fleekinterest',
  },
];
