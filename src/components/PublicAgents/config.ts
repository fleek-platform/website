export type PublicAgent = {
  slug: string;
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

export const publicAgents: PublicAgent[] = [
  {
    slug: 'stephanie',
    name: 'Stephanie',
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
    slug: 'olivia',
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
    slug: 'chris',
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
    slug: 'kanye',
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
    slug: 'kiki',
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
