import { isClient } from '@utils/common';
import type { Props } from '../../components/PricingCard';

const dashboardUrl = import.meta.env.PUBLIC_APP_HOSTING_URL;
export const getHostingPricingInfo: () => Props[] = () => {
  let hostingAppUrl = dashboardUrl;

  if (isClient && window.location.hostname.startsWith('resources.')) {
    hostingAppUrl = 'https://hosting.fleek.xyz/dashboard';
  }

  return [
    {
      title: 'Pro Plan',
      description:
        'Our most popular option for projects hosting Web apps on Fleek',
      splitDescription: true,
      cost: {
        amount: 20,
        bottomText: '+ resource usage',
      },
      featuresDescription: 'Includes:',
      features: [
        'Unlimited team members',
        'Unlimited custom domains',
        'Unlimited sites',
        'Email support',
      ],
      cta: 'Get started',
      variant: 'primary-outline',
      url: `${hostingAppUrl}/projects/[projectId]/billing`,
    },
    {
      title: 'Enterprise Plan',
      description:
        "Have a big project or custom Web app hosting needs?\n We've got you.",
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
};

export const getAiAgentsPricingInfo: () => Props[] = () => {
  let agentsAppUrl = dashboardUrl;

  if (isClient && window.location.hostname.startsWith('resources.')) {
    agentsAppUrl = 'https://eliza.fleek.xyz/agents';
  }

  return [
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
      featuresDescription: 'Everything in Fan Plan, plus:',
      features: [
        '10 credits per month',
        '1 AI agent or influencer',
        '1 seat',
        'Additional agents for $20/m',
      ],
      cta: 'Start free trial',
      variant: 'primary-white',
      url: `${agentsAppUrl}/agents`,
    },
    {
      title: 'Manager',
      description:
        'Great for managing a fleet of agents for marketing/advertising',
      splitDescription: true,
      cost: {
        amount: 99,
      },
      featuresDescription: 'Everything in Fan Plan, plus:',
      features: [
        '25 credits per month',
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
};
