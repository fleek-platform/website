export type PublicAgent = {
  id: number;
  name: string;
  category: string;
  image: string;
  author: string;
  greeting: string;
  about: string;
  socials: {
    name: string;
    logo: string;
    followers: number;
  }[];
};

export const publicAgents: PublicAgent[] = [
  {
    id: 1,
    name: 'Stephanie',
    category: 'Sports',
    image: '/images/landing-page/templates/stephanie.png',
    greeting: 'Hey! Feel free to ask me any questions you might have.',
    about:
      "She's a fashion influencer who loves avant-garde styles. While she's hit the runway a couple of times, these days she's all about styling celebs and enjoying Italian food four times a week in Los Angeles.",
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
    id: 2,
    name: 'Olivia',
    category: 'Companion',
    image: '/images/landing-page/templates/olivia.png',
    greeting: 'Hey! Feel free to ask me any questions you might have.',
    about:
      "She's a fashion influencer who loves avant-garde styles. While she's hit the runway a couple of times, these days she's all about styling celebs and enjoying Italian food four times a week in Los Angeles.",
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
    id: 3,
    name: 'Crypto Chris',
    category: 'Crypto',
    image: '/images/landing-page/templates/chris.png',
    greeting: 'Hey! Feel free to ask me any questions you might have.',
    about:
      "She's a fashion influencer who loves avant-garde styles. While she's hit the runway a couple of times, these days she's all about styling celebs and enjoying Italian food four times a week in Los Angeles.",
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
    id: 4,
    name: 'Kanye East',
    category: 'Culture',
    image: '/images/landing-page/templates/kanye.png',
    greeting: 'Hey! Feel free to ask me any questions you might have.',
    about:
      "She's a fashion influencer who loves avant-garde styles. While she's hit the runway a couple of times, these days she's all about styling celebs and enjoying Italian food four times a week in Los Angeles.",
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
    id: 5,
    name: 'Kiki',
    category: 'NSFW',
    image: '/images/landing-page/templates/kiki.png',
    greeting: 'Hey! Feel free to ask me any questions you might have.',
    about:
      "She's a fashion influencer who loves avant-garde styles. While she's hit the runway a couple of times, these days she's all about styling celebs and enjoying Italian food four times a week in Los Angeles.",
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
