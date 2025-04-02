import { Button } from '@components/Button';
import {
  IoBriefcase,
  IoBulb,
  IoCopy,
  IoHappy,
  IoHelpCircle,
  IoStatsChart,
} from 'react-icons/io5';
import type { IconType } from 'react-icons/lib';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const categories = [
  'FUN',
  'RESEARCH',
  'MARKETING',
  'SUPPORT',
  'BUSINESS',
] as const;

type Category = (typeof categories)[number];

const categoriesMap: Record<
  Category,
  {
    label: string;
    icon: IconType;
  }
> = {
  FUN: {
    label: 'Fun',
    icon: IoHappy,
  },
  RESEARCH: {
    label: 'Research',
    icon: IoBulb,
  },
  MARKETING: {
    label: 'Marketing',
    icon: IoStatsChart,
  },
  SUPPORT: {
    label: 'Support',
    icon: IoHelpCircle,
  },
  BUSINESS: {
    label: 'Business',
    icon: IoBriefcase,
  },
};

type Template = {
  name: string;
  description: string;
  integrations: number;
  image: string;
};

const templates: Template[] = [
  {
    name: 'Travel Guide 1',
    description: 'Can get you the best sposts to go.',
    integrations: 3,
    image: '/images/agent-avatar.png',
  },
  {
    name: 'Travel Guide 2',
    description: 'Can get you the best sposts to go.',
    integrations: 3,
    image: '/images/agent-avatar.png',
  },
  {
    name: 'Travel Guide 3',
    description: 'Can get you the best sposts to go.',
    integrations: 3,
    image: '/images/agent-avatar.png',
  },
  {
    name: 'Travel Guide 4',
    description: 'Can get you the best sposts to go.',
    integrations: 3,
    image: '/images/agent-avatar.png',
  },
  {
    name: 'Travel Guide 5',
    description: 'Can get you the best sposts to go.',
    integrations: 3,
    image: '/images/agent-avatar.png',
  },
  {
    name: 'Travel Guide 6',
    description: 'Can get you the best sposts to go.',
    integrations: 3,
    image: '/images/agent-avatar.png',
  },
  {
    name: 'Travel Guide 7',
    description: 'Can get you the best sposts to go.',
    integrations: 3,
    image: '/images/agent-avatar.png',
  },
];

export const Templates = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free-snap',
    slides: {
      spacing: 24,
      perView: 1,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          perView: 2,
          spacing: 24,
        },
      },
      '(min-width: 768px)': {
        slides: {
          perView: 3,
          spacing: 24,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 4,
          spacing: 24,
        },
      },
      '(min-width: 1280px)': {
        slides: {
          perView: 5,
          spacing: 24,
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center px-24 py-100 text-center">
      <p className="max-w-[600px] font-sans text-36 font-semibold text-neutral-12">
        <span className="text-yellow">Get started</span> with an agent using our
        expertly-crafted templates
      </p>
      <p className="mt-24 text-18 text-neutral-11">
        No need to start from scratch. Customize 100+ templates.
      </p>

      <div className="mt-24 flex gap-8">
        {categories.map((item) => (
          <CategoryButton key={item} category={item} />
        ))}
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-[20%] bg-gradient-to-r from-black to-transparent md:block" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-[20%] bg-gradient-to-l from-black to-transparent md:block" />

        <div
          ref={sliderRef}
          className="keen-slider mt-56 cursor-grab active:cursor-grabbing"
        >
          {templates.map((template) => (
            <div key={template.name} className="keen-slider__slide">
              <TemplateCard {...template} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CategoryButton = ({ category }: { category: Category }) => {
  const obj = categoriesMap[category];
  const Icon = obj.icon;
  return (
    <Button variant="secondary" size="sm">
      <Icon className="mr-2 size-16" />
      {obj.label}
    </Button>
  );
};

export const TemplateCard = ({
  name,
  description,
  integrations,
  image,
}: {
  name: string;
  description: string;
  integrations: number;
  image: string;
}) => {
  return (
    <div className="flex flex-col rounded-8 border border-neutral-6 bg-neutral-1 p-12 text-start">
      <img src={image} alt="Agent avatar" className="size-50" />
      <p className="mt-12 text-18 font-medium text-neutral-12">{name}</p>
      <p className="mt-4 text-12 text-neutral-11">{description}</p>
      <div className="mt-20 flex items-center justify-between">
        <p className="text-12">+ {integrations} integrations</p>
        <Button size="sm" variant="app-primary">
          <IoCopy className="size-16" />
          Clone
        </Button>
      </div>
    </div>
  );
};
