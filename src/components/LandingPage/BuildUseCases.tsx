import CardsWithDottedLinesBackground from '@components/LandingPage/CardsWithDottedLinesBackground';

const BuildUseCases: React.FC = () => (
  <CardsWithDottedLinesBackground
    headline="Start with Templates"
    cta={{
      url: 'https://fleek.xyz/templates/',
      text: 'Browse all templates',
    }}
    cardSections={[
      {
        title: 'Frameworks',
        cards: [
          {
            title: 'Eliza',
            description:
              'Deploy Eliza agents in one click. Leverage TEEs for autonomy, verifiability and privacy.',
            icon: { src: '/svg/react-icon.svg', alt: 'React App' },
            cta: {
              url: 'https://fleek.xyz/eliza/',
              text: 'try it',
            },
            image: '/svg/eliza.svg',
          },
          {
            title: 'Next.js Template',
            description:
              'Use the Next.js boilerplate for optimal user interface aesthetics.',
            icon: { src: '/svg/react-icon.svg', alt: 'React App' },
            cta: {
              url: 'https://fleek.xyz/templates/fullstack-nextjs-template/',
              text: 'try it',
            },
            image: '/svg/nextjs-template.svg',
          },
          {
            title: 'Astro Template',
            description:
              'Deploy the Astro boilerplate for an efficient, modern web experience.',
            icon: { src: '/svg/react-icon.svg', alt: 'Astro App' },
            cta: {
              url: 'https://fleek.xyz/templates/astro-boilerplate/',
              text: 'try it',
            },
            image: '/svg/astro-template.svg',
          },
        ],
      },
    ]}
  />
);

export default BuildUseCases;
