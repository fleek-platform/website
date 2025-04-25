import 'keen-slider/keen-slider.min.css';
import { useKeenSlider, type KeenSliderPlugin } from 'keen-slider/react';
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
    name: 'Stephanie A. Smith',
    category: 'Sports',
    image: '/images/landing-page/templates/stephanie.png',
    author: 'Fleek',
    socials: [
      {
        name: 'twitter',
        logo: '/images/landing-page/templates/socials/x.svg',
        followers: 16200,
      },
      {
        name: 'instagram',
        logo: '/images/landing-page/templates/socials/instagram.svg',
        followers: 32700,
      },
      {
        name: 'tiktok',
        logo: '/images/landing-page/templates/socials/tiktok.svg',
        followers: 112200,
      },
    ],
  },
  {
    name: 'Olivia',
    category: 'Companion',
    image: '/images/landing-page/templates/olivia.png',
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
    name: 'Crypto Chris',
    category: 'Crypto',
    image: '/images/landing-page/templates/chris.png',
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
    image: '/images/landing-page/templates/kanye.png',
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
  {
    name: 'Kiki',
    category: 'NSFW',
    image: '/images/landing-page/templates/kiki.png',
    author: 'Fleek',
    socials: [
      {
        name: 'twitter',
        logo: '/images/landing-page/templates/socials/x.svg',
        followers: 9240,
      },
      {
        name: 'instagram',
        logo: '/images/landing-page/templates/socials/instagram.svg',
        followers: 56700,
      },
      {
        name: 'tiktok',
        logo: '/images/landing-page/templates/socials/tiktok.svg',
        followers: 32000,
      },
    ],
  },
];

const ContinuousAutoscroll: KeenSliderPlugin = (slider) => {
  let raf: number;
  let last: number;
  let paused = false;

  const speed = 0.000025;

  const animate = (time: number) => {
    if (!last) {
      last = time;
      raf = requestAnimationFrame(animate);
      return;
    }

    const dt = time - last;
    last = time;

    if (!paused) {
      slider.track.to((slider.track.details?.position ?? 0) - speed * dt);
    }

    raf = requestAnimationFrame(animate);
  };

  slider.on('created', () => {
    slider.container.addEventListener('mouseenter', () => {
      paused = true;
    });
    slider.container.addEventListener('mouseleave', () => {
      paused = false;
    });

    raf = requestAnimationFrame(animate);
  });

  slider.on('destroyed', () => {
    cancelAnimationFrame(raf);
  });
};

export const Templates = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: 'free-snap',
      slides: {
        spacing: 24,
        perView: 1.1,
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
            perView: 2.95,
            spacing: 24,
          },
        },
      },
    },
    [ContinuousAutoscroll],
  );

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
        className="size-[152px] shrink-0 object-cover"
      />
      <div className="flex w-full flex-col items-start justify-between gap-10 px-12 py-16">
        <div className="flex w-full items-start justify-between">
          <div className="text-left">
            <Text variant="subtitle">{template.name}</Text>
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
            </div>
          ))}
        </div>
        <button
          type="button"
          className="pointer-events-none flex w-full select-none items-center justify-center gap-6 rounded-8 bg-white p-8 font-medium text-black"
        >
          <IoChatbubbleEllipsesOutline /> Chat coming soon
        </button>
      </div>
    </div>
  );
};
