/* eslint-disable @next/next/no-img-element */
import CardsWithDottedLinesBackground from '@components/CardsWithDottedLinesBackground';

const templates = [
  {
    title: 'Web3 App',
    description: 'Start with a WAGMI EVM app boilerplate.',
    icon: { src: '/svg/web3-app-icon.svg', alt: 'Web3 App' },
    cta: {
      url: 'https://github.com/fleekxyz/evm-starter-kit',
      text: 'try it',
    },
  },
  {
    title: 'Nextra Blog',
    description: 'Deploy a Nextra static blog ready to start publishing.',
    icon: { src: '/svg/nfas-icon.svg', alt: 'Nextra Blog' },
    cta: {
      url: 'https://github.com/fleekxyz/fleek-demos-blog',
      text: 'try it',
    },
  },
  {
    title: 'Lens App',
    description: 'Start a new Lens-integrated social frontend.',
    icon: { src: '/svg/lens-icon.svg', alt: 'Lens App' },
    cta: {
      url: 'https://app.fleek.xyz/templates/clo7b9d0a0001ei0owl3w09bd/',
      text: 'try it',
    },
  },
];

const frameworks = [
  {
    title: 'Next.js',
    description: 'Work on an IPFS-ready Next.js starter-kit.',
    icon: { src: '/svg/next-icon.svg', alt: 'NextJs App' },
    cta: {
      url: 'https://app.fleek.xyz/templates/clmf71ycb0004lb08mubafjnj/',
      text: 'try it',
    },
  },
  {
    title: 'React App',
    description: 'Deploy a quick Create React App on Fleek.',
    icon: { src: '/svg/react-icon.svg', alt: 'React App' },
    cta: {
      url: 'https://app.fleek.xyz/templates/clmf7apqf0007l808mo2f6937/',
      text: 'try it',
    },
  },
  {
    title: 'Astro',
    description: 'Build on a speed-optimized Astro boilerplate.',
    icon: { src: '/svg/astro-icon.svg', alt: 'Astro App' },
    cta: {
      url: 'https://app.fleek.xyz/templates/clmf7io4a0009ic08ya3sjwyj/',
      text: 'try it',
    },
  },
];

const HostAnythingOnFleek = () => (
  <CardsWithDottedLinesBackground
    headline="Host anything on Fleek"
    cta={{
      url: 'https://app.fleek.xyz/templates/',
      text: 'See all templates',
    }}
    cardSections={[
      {
        title: 'Use-Cases',
        cards: templates.map((template) => ({ ...template })),
      },
      {
        title: 'Frameworks',
        cards: frameworks.map((framework) => ({ ...framework })),
      },
    ]}
    copy="Web3 apps, DeFi, NFT’s, social apps, games, dev tools/platforms, middleware services, websites, etc."
  />
);

export default HostAnythingOnFleek;
