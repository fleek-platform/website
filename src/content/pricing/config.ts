import type { Props } from '../../components/PricingCard';

export const PricingInfo: Props[] = [
  {
    title: 'Free Plan',
    description: 'For those just starting out. Get on Fleek today, on us.',
    cost: 0,
    features: [
      '1 member',
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
      'Unlimited members',
      'Everything in Free Plan',
      'Invite team members to collaborate',
      'Additional custom domains',
      'Priority support',
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
      'Everything in Pro Plan',
      'Custom rates for your needs',
      'Custom build tiers',
      'Enterprise SLAs',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    variant: 'primary-outline',
    url: 'https://fleek.typeform.com/fleekinterest',
  },
];
