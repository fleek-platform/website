import type { Props } from '../../components/PricingCard';

export const PricingInfo: Props[] = [
  {
    title: 'Free Plan',
    description: 'For those just starting out. Get on Fleek today, on us.',
    cost: 0,
    features: [
      'Deploy in seconds',
      'Custom domain',
      'Fleek Functions',
      'Community support',
    ],
    cta: 'Start with Free',
    variant: 'app-success',
    url: 'https://app.fleek.xyz',
  },
  {
    title: 'Pro Plan',
    description: 'Our most popular option for teams and growing projects.',
    cost: 19,
    features: [
      'Everything in Free Plan',
      'Additional build tiers, site analytics',
      'Fleek domains',
      'Intermediate support',
    ],
    cta: 'Go fast with Pro',
    variant: 'app-primary',
    url: 'mailto:business@fleek.xyz',
  },
  {
    title: 'Enterprise Plan',
    description: "Have a big project or custom needs? We've got you.",
    cost: 'Custom ',
    features: [
      'Everything in Pro Plan',
      'Custom rates for your needs',
      'Custom build tiers',
      'Dedicated 24/7 support',
    ],
    cta: 'Contact Sales',
    variant: 'secondary',
    url: 'mailto:business@fleek.xyz',
  },
];
