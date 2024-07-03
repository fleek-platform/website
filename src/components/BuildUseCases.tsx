import CardsWithDottedLinesBackground from '@components/CardsWithDottedLinesBackground';

import type { RoundedType } from '@components/PageSection';

interface Props {
  rounded?: RoundedType;
}
// TODO: Should the card declaration be in the settings?
const BuildUseCases: React.FC<Props> = (props) => (
  <CardsWithDottedLinesBackground
    rounded={props.rounded}
    headline="Start with Templates"
    cta={{
      url: 'https://app.fleek.xyz/templates/',
      text: 'Browse templates',
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
              url: 'https://app.fleek.xyz/templates/clmf7apqf0007l808mo2f6937/',
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
              url: 'https://app.fleek.xyz/templates/clmf7io4a0009ic08ya3sjwyj/',
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
