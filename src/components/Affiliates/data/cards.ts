import { FaHouse } from 'react-icons/fa6';

import type { ElementType } from 'react';

export interface CardData {
  title: string;
  description: string;
  icon: ElementType;
}

// Todo: set correct icons

export const whyBecomeCards: CardData[] = [
  {
    title: 'Competitive Cash Rewards',
    description: 'Earn 10% commission for every new referral to Fleek.',
    icon: FaHouse,
  },
  {
    title: 'Early Access',
    description:
      "Get early access to new features and products before they're publicly available.",
    icon: FaHouse,
  },
  {
    title: 'Dedicated Support',
    description:
      'Enjoy exclusive resources and priority support from our affiliate and support teams.',
    icon: FaHouse,
  },
  {
    title: 'Growing Community',
    description:
      'Connect with a network of passionate builders, creators, and thought leaders shaping Web3.',
    icon: FaHouse,
  },
  {
    title: 'Bonus Token Incentives',
    description:
      'Affiliates will also qualify for future token incentives in addition to the cash rewards, which will be tied to their affiliate performance.',
    icon: FaHouse,
  },
];

export const whoCanJoinCards: CardData[] = [
  {
    title: 'Builders & Developers',
    description:
      'Technical experts passionate about decentralized infrastructure and innovation.',
    icon: FaHouse,
  },
  {
    title: "Content Creators, KOL's & Thought Leaders",
    description:
      'Storytellers, industry experts, developer influencers, and others who inspire and engage through content about AI agents, web development, Web3, and technology.',
    icon: FaHouse,
  },
  {
    title: 'Open Source Frameworks & Tooling',
    description:
      'AI Agent frameworks, frontend frameworks, and other open source software and tooling that can be deployed on Fleek can create revenue streams by encouraging their communities to host on Fleek.',
    icon: FaHouse,
  },
  {
    title: 'Media Sources',
    description:
      'Websites, blogs, directories, lists and other similar product aggregation and customer discovery tools can add Fleek and earn commission for any referred customers.',
    icon: FaHouse,
  },
];

export const howItWorksCards: CardData[] = [
  {
    title: 'Sign Up',
    description: 'Submit your application to become a Fleek affiliate.',
    icon: FaHouse,
  },
  {
    title: 'Start Referring',
    description:
      'Find your unique referral link in your affiliate dashboard and start promoting Fleek!',
    icon: FaHouse,
  },
  {
    title: 'Earn Rewards',
    description:
      'Receive a 10% commission for every successful signup through your link.',
    icon: FaHouse,
  },
  {
    title: 'Receive your Reward',
    description:
      'Get your commissions via PayPal, Wise, Crypto, or Fleek credits monthly.',
    icon: FaHouse,
  },
];
