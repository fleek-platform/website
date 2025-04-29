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
    greeting:
      "Hey there! Ready to dive into the latest sports highlights or break down last night's game?",
    about:
      "Stephanie is your go-to sports expert, always ready with the latest scores, athlete gossip, and game-day insights. Whether it's basketball, tennis, or Formula 1, she's got the play-by-play and personality to match.",
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
    greeting:
      "Hi! I'm here to chat, listen, and keep you company — what's on your mind today?",
    about:
      "Olivia is your charming digital companion — thoughtful, witty, and always ready to chat. From relationship advice to your favorite movies, she's here to keep you company and make every conversation feel personal.",
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
    greeting:
      "Wanna talk crypto? I've got the alpha, the memes, and the market moves — just ask.",
    about:
      "Crypto Chris is plugged into the blockchain 24/7. Whether you want the latest on Bitcoin trends, altcoin gems, or NFT drama, he's got the insights — and a meme or two to go with it.",
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
    greeting:
      "Sup. Let's talk art, fashion, music — or whatever's breaking the internet right now.",
    about:
      "Kanye East blends pop culture commentary with bold opinions and creative flair. From underground fashion to viral trends, he's your cultural compass—unfiltered and always on beat.",
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
    greeting: "Hey babe 😘 Let's keep things fun, flirty, and just between us.",
    about:
      "Kiki is playful, confident, and never shy. Whether it's cheeky banter or late-night convos, she's here to entertain and keep things exciting in your world — no filters, no rules.",
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
