import { FaHouse } from 'react-icons/fa6';

import type { ElementType } from 'react';

export interface CardData {
  title: string;
  icon: ElementType;
}

export const heroCards: CardData[] = [
  {
    title: 'Quick Templates',
    icon: FaHouse,
  },
  {
    title: 'Form Builder',
    icon: FaHouse,
  },
  {
    title: 'Code Builder',
    icon: FaHouse,
  },
  {
    title: 'Powerful Integrations',
    icon: FaHouse,
  },
  {
    title: 'Personalized Agents',
    icon: FaHouse,
  },
  {
    title: 'Smart Insights',
    icon: FaHouse,
  },
];
