import type { Props } from '../../components/PricingCard';

export const PricingInfo: Props[] = [
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
    url: 'https://app.fleek.xyz',
  },
  {
    title: 'Pro Plan',
    description: 'Our most popular option for teams\n and growing projects.',
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
    url: 'https://app.fleek.xyz/projects/[projectId]/billing',
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
