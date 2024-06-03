import type { Props } from '../../components/PricingCard';

export const PricingInfo: Props[] = [
  {
    title: 'Free Plan',
    description: 'Our most popular plan for hobby developers.',
    cost: 0,
    features: [
      'Deploy in Seconds',
      'Custom Domain',
      'Fleek Functions',
      'Community Support',
    ],
    cta: 'Start with Free',
    btnBg: 'bg-ui-green',
    hoverBtnBg: 'hover:bg-ui-light-green',
    fontColor: 'text-ui-faded-green',
  },
  {
    title: 'Pro Plan',
    description: 'Our most popular plan for hobby developers.',
    cost: 19,
    features: [
      'Everything in Free Plan',
      'Additional Build Tiers and Site Analytics',
      'Fleek Domains',
      'Intermediate Support',
    ],
    cta: 'Go Fast with Pro',
    border: 'border-yellow',
    btnBg: 'bg-yellow-dark-4',
    hoverBtnBg: 'hover:bg-yellow-dark-5',
    fontColor: 'text-ui-faded-green',
  },
  {
    title: 'Enterprise Plan',
    description: 'Our most popular plan for hobby developers.',
    cost: 'Custom ',
    features: [
      'Everything in Pro',
      'Custom Rates for Your Needs',
      'Custom Build Tiers',
      'Dedicated 24/7 Support',
    ],
    cta: 'Contact Sales',
    btnBg: 'bg-gray-dark-4',
    hoverBtnBg: 'hover:bg-gray-dark-5',
    fontColor: 'text-gray-dark-11',
  },
];
