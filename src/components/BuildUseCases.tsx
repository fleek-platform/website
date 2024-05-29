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
            description: 'Use the React started kit to get the best look.',
            icon: { src: '/svg/react-icon.svg', alt: 'Web3 App' },
            cta: {
              url: 'https://github.com/fleekxyz/nextjs-template',
              text: 'try it',
            },
            image: '/svg/nextjs-template.svg',
          },
          {
            title: 'React Template',
            description: 'Use the React started kit to get the best look.',
            icon: { src: '/svg/react-icon.svg', alt: 'NextJs App' },
            cta: {
              url: 'https://github.com/fleekxyz/react-template',
              text: 'try it',
            },
            image: '/svg/react-template.svg',
          },
          {
            title: 'Astro Template',
            description: 'Use the React started kit to get the best look.',
            icon: { src: '/svg/react-icon.svg', alt: 'React App' },
            cta: {
              url: 'https://github.com/fleekxyz/astro-template',
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
