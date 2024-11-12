import type { Props } from '../../components/PricingCard';

export const PricingInfo: Props[] = [
  {
    title: 'Free Plan',
    description: 'For those just starting out. Get on Fleek today, on us.',
    cost: 0,
    features: [
      '1 team member',
      'Deploy in seconds',
      'Custom domain',
      'Fleek Functions',
      'Community support',
    ],
    cta: 'Start with Free',
    variant: 'primary-outline',
    url: 'https://app.fleek.xyz',
  },
  {
    title: 'Pro Plan',
    description: 'Our most popular option for teams and growing projects.',
    cost: 20,
    features: [
      'Everything in Free Plan, plus:',
      'Unlimited team members',
      'Up to 100 sites',
      'Additional custom domains',
      'Email support',
    ],
    cta: 'Go fast with Pro',
    variant: 'primary',
    url: 'https://app.fleek.xyz/projects/[projectId]/settings/billing',
  },
  {
    title: 'Enterprise Plan',
    description: "Have a big project or custom needs? We've got you.",
    cost: 1000,
    costOptions: {
      suffix: '+ /mo',
    },
    features: [
      'Everything in Pro Plan, plus:',
      'Custom rates for your needs',
      'Custom build tiers',
      'Enterprise SLAs',
      'Dedicated support',
    ],
    cta: 'Contact us',
    variant: 'primary-outline',
    url: 'https://fleek.typeform.com/fleekinterest',
  },
];
