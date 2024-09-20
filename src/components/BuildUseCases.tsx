import CardsWithDottedLinesBackground from '@components/CardsWithDottedLinesBackground';

const BuildUseCases: React.FC = () => (
  <CardsWithDottedLinesBackground
    headline="Start with Templates"
    cta={{
      url: 'https://app.fleek.xyz/templates/',
      text: 'Browse all templates',
    }}
    cardSections={[
      {
        title: 'Frameworks',
        cards: [
          {
            title: 'Next.js Template',
            description: `Leverage the Next.js boilerplate to streamline your project's setup.`,
            icon: { src: '/svg/react-icon.svg', alt: 'Web3 App' },
            cta: {
              url: 'https://app.fleek.xyz/templates/clmf71ycb0004lb08mubafjnj/',
              text: 'try it',
            },
            image: '/svg/nextjs-template.svg',
          },
          {
            title: 'React Template',
            description:
              'Use the React boilerplate for optimal user interface aesthetics.',
            icon: { src: '/svg/react-icon.svg', alt: 'NextJs App' },
            cta: {
              url: 'https://app.fleek.xyz/templates/clx3g4dwk0008qy2i5d6aobe4/',
              text: 'try it',
            },
            image: '/svg/react-template.svg',
          },
          {
            title: 'Astro Template',
            description:
              'Deploy the Astro boilerplate for an efficient, modern web experience.',
            icon: { src: '/svg/react-icon.svg', alt: 'React App' },
            cta: {
              url: 'https://app.fleek.xyz/templates/clx3f5nem000333n7acqcxiwj/',
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
