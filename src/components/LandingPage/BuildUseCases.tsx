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
            title: 'React Template',
            description:
              'Use the React boilerplate for optimal user interface aesthetics.',
            icon: { src: '/svg/react-icon.svg', alt: 'React App' },
            cta: {
              url: 'https://fleek.xyz/templates/react-boilerplate/',
              text: 'try it',
            },
            image: '/svg/react-template.svg',
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
          {
            title: 'Vue Template',
            description: `Leverage the Vue boilerplate to streamline your project's setup.`,
            icon: { src: '/svg/react-icon.svg', alt: 'Vue.js App' },
            cta: {
              url: 'https://fleek.xyz/templates/vue-boilerplate/',
              text: 'try it',
            },
            image: '/svg/vuejs-template.svg',
          },
        ],
      },
    ]}
  />
);

export default BuildUseCases;
