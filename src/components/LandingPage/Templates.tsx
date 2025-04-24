import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { Badge } from './Badge';
import { Text } from './Text';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

type Template = {
  name: string;
  category: string;
  image: string;
  author: string;
  socials: {
    name: string;
    logo: string;
    followers: number;
  }[];
};

const templates: Template[] = [
  {
    name: 'Olivia',
    category: 'Companion',
    image: '/images/landing-page/templates/template-1.png',
    author: 'Fleek',
    socials: [
      {
        name: 'twitter',
        logo: '/images/landing-page/templates/socials/x.svg',
        followers: 56600,
      },
      {
        name: 'instagram',
        logo: '/images/landing-page/templates/socials/instagram.svg',
        followers: 98200,
      },
      {
        name: 'tiktok',
        logo: '/images/landing-page/templates/socials/tiktok.svg',
        followers: 85300,
      },
    ],
  },
  {
    name: 'Kyle Satoshi',
    category: 'Crypto',
    image: '/images/landing-page/templates/template-2.png',
    author: 'Fleek',
    socials: [
      {
        name: 'twitter',
        logo: '/images/landing-page/templates/socials/x.svg',
        followers: 112400,
      },
      {
        name: 'instagram',
        logo: '/images/landing-page/templates/socials/instagram.svg',
        followers: 2400,
      },
      {
        name: 'tiktok',
        logo: '/images/landing-page/templates/socials/tiktok.svg',
        followers: 1100,
      },
    ],
  },
  {
    name: 'Kanye East',
    category: 'Culture',
    image: '/images/landing-page/templates/template-3.png',
    author: 'Fleek',
    socials: [
      {
        name: 'twitter',
        logo: '/images/landing-page/templates/socials/x.svg',
        followers: 1500,
      },
      {
        name: 'instagram',
        logo: '/images/landing-page/templates/socials/instagram.svg',
        followers: 1100,
      },
      {
        name: 'tiktok',
        logo: '/images/landing-page/templates/socials/tiktok.svg',
        followers: 659,
      },
    ],
  },
];

export const Templates = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free-snap',
    slides: {
      spacing: 24,
      perView: 1.2,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          perView: 1.2,
          spacing: 24,
        },
      },
      '(min-width: 768px)': {
        slides: {
          perView: 1.5,
          spacing: 24,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 2.2,
          spacing: 24,
        },
      },
      '(min-width: 1280px)': {
        slides: {
          perView: 2.45,
          spacing: 24,
        },
      },
    },
  });

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-24 py-48 text-center sm:py-[75px]">
      <Badge>
        <span>🌎</span> Explore
      </Badge>
      <Text
        variant="subtitle"
        className="max-w-[600px] pt-24 font-inter text-[38px] font-normal leading-none"
      >
        Who do you want to chat with?
      </Text>
      <p className="mt-24 text-18 text-neutral-11">
        Explore social agents and start chatting.
      </p>

      <div className="relative w-full overflow-hidden">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[20%] bg-gradient-to-r from-neutral-1 to-transparent md:block" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[20%] bg-gradient-to-l from-neutral-1 to-transparent md:block" />

        <div
          ref={sliderRef}
          className="keen-slider mt-56 cursor-grab active:cursor-grabbing"
        >
          {templates.map((template) => (
            <div key={template.name} className="keen-slider__slide">
              <TemplateCard template={template} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TemplateCard = ({ template }: { template: Template }) => {
  function formatCompactNumber(value: number): string {
    return new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }

  return (
    <div className="flex overflow-clip rounded-12 border border-neutral-6 bg-neutral-2">
      <img
        src={template.image}
        alt="Agent avatar"
        className="size-[173px] shrink-0 object-cover"
      />
      <div className="flex w-full flex-col items-start gap-10 px-12 py-16">
        <div className="flex w-full items-start justify-between">
          <div className="text-left">
            <Text variant="subtitle">{template.name}</Text>
            <Text variant="paragraph" className="text-[1.2rem]">
              By <span className="text-neutral-12">{template.author}</span>
            </Text>
          </div>
          <div className="rounded-full border border-neutral-6 bg-neutral-1 px-8 py-4 text-12 text-neutral-12">
            {template.category}
          </div>
        </div>
        <div className="grid w-full grid-cols-3 gap-6">
          {template.socials.map((social) => (
            <div
              key={`${template.name} - ${social.name}`}
              className="flex items-center justify-center gap-4 rounded-8 bg-gray-dark-4 p-8"
            >
              <img
                src={social.logo}
                alt="Social media logo"
                className="size-18"
              />
              <Text variant="paragraph" className="font-medium text-neutral-12">
                {formatCompactNumber(social.followers)}
              </Text>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="flex w-full cursor-not-allowed items-center justify-center gap-6 rounded-8 bg-white p-8 font-medium text-black"
        >
          <IoChatbubbleEllipsesOutline /> Chat coming soon
        </button>
      </div>
    </div>
  );
};
