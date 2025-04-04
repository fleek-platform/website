// default cards
import QuickTemplates from '../images/card/quick-templates.svg';
import FormBuilder from '../images/card/form-builder.svg';
import CodeBuilder from '../images/card/code-builder.svg';
import PowerfulIntegrations from '../images/card/powerful-integrations.svg';
import PersonalizedAgents from '../images/card/personalized-agents.svg';
import SmartInsights from '../images/card/smart-insights.svg';

// small cards
import MultipleProviders from '../images/card/small/multiple-providers.svg';
import SocialConnections from '../images/card/small/social-connections.svg';
import PersonalizeAgents from '../images/card/small/personalize-agents.svg';
import ChatInterface from '../images/card/small/chat-interface.svg';
import LogsActivity from '../images/card/small/logs-activity.svg';
import CustomizeAgent from '../images/card/small/customize-agent.svg';
import type { PricingInfo } from '../components/PricingCard';

export interface CardData {
  title: string;
  icon: string;
}

export const heroCards: CardData[] = [
  {
    title: 'Quick Templates',
    icon: QuickTemplates.src,
  },
  {
    title: 'Form Builder',
    icon: FormBuilder.src,
  },
  {
    title: 'Code Builder',
    icon: CodeBuilder.src,
  },
  {
    title: 'Powerful Integrations',
    icon: PowerfulIntegrations.src,
  },
  {
    title: 'Personalized Agents',
    icon: PersonalizedAgents.src,
  },
  {
    title: 'Smart Insights',
    icon: SmartInsights.src,
  },
];

export const customizeCards: CardData[] = [
  {
    title: 'Multiple LLM providers',
    icon: MultipleProviders.src,
  },
  {
    title: 'Social connections',
    icon: SocialConnections.src,
  },
  {
    title: 'Personalize your agents',
    icon: PersonalizeAgents.src,
  },
];

export const manageCards: CardData[] = [
  {
    title: 'Chat interface',
    icon: ChatInterface.src,
  },
  {
    title: 'Logs & activity',
    icon: LogsActivity.src,
  },
  {
    title: 'Customize agent',
    icon: CustomizeAgent.src,
  },
];

export const pricingCards: PricingInfo[] = [
  {
    title: 'Standard Agent Hosting',
    description:
      'A simple and efficient agent hosting solution with everything you need to get started - Coming Soon!',
    cost: {
      amount: 10,
      suffix: 'per agent /mo',
    },
    features: [
      'Standard security features',
      'Basic encryption',
      'Zero DevOps required',
      'Perfect for testing and development',
    ],
    cta: 'Coming soon!',
    variant: 'primary',
    disabled: true,
    url: '#',
  },
  {
    title: 'TEE Agent Hosting',
    description:
      'Maximum security & privacy with Trusted Execution Environments for enterprise-grade protection.',
    cost: {
      amount: 20,
      suffix: 'per agent /mo',
    },
    features: [
      'Trusted Execution Environment (TEE)',
      'End-to-End encryption',
      'Tamper-proof execution',
      'Zero DevOps required',
    ],
    cta: 'Start hosting now',
    variant: 'primary',
    url: '/agents/',
  },
  {
    title: 'Enterprise Solutions',
    description: 'For teams deploying 500+ agents with custom requirements.',
    cost: {
      prefix: '',
      suffix: '',
      amount: 'Custom pricing',
    },
    features: [
      'Volume discounts',
      'Dedicated infrastructure',
      'Advanced compliance features',
      'Integration assistance',
    ],
    cta: 'Contact our team',
    variant: 'primary-outline',
    url: 'mailto:amelia@fleek.xyz',
  },
];
