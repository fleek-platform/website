export type PublicAgent = {
  id: string;
  name: string;
  category: string;
  image: string;
  author: string;
  about: string;
  /*greeting: string;
  socials: {
    name: string;
    logo: string;
    followers: number;
  }[];*/
  status: string;
  agentId: string;
  avatar: string;
  frameworkName: string;
  characterFile: string;
  createdAt: string;
  createdBy: string;
  host: string;
  projectId: string;
  slotNumber: number;
  updatedAt: string;
  publicToken: string;
  publicChat: boolean;
};

export const publicAgents: PublicAgent[] = [
  {
    name: 'Kiki',
    status: 'Running',
    agentId: '91ab9e80-f2db-4087-befb-9a410b630a8a',
    category: '🔞 NSFW',
    about: 'Kiki is playful, confident, and never shy',
    image:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/91ab9e80-f2db-4087-befb-9a410b630a8a/5395e1d3-0bbf-4ae1-8b21-9c7a7fe06b80/image-1746070774164.jpg',
    avatar:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/91ab9e80-f2db-4087-befb-9a410b630a8a/5395e1d3-0bbf-4ae1-8b21-9c7a7fe06b80/image-1746070774164.jpg',
    author: 'Fleek',
    frameworkName: 'Fleek',
    characterFile: '',
    createdAt: '',
    createdBy: '',
    host: '',
    id: '91ab9e80-f2db-4087-befb-9a410b630a8a',
    projectId: '',
    slotNumber: 0,
    updatedAt: '',
    publicToken: '',
    publicChat: false,
  },
  {
    name: 'Stephanie',
    status: 'Running',
    agentId: 'dc894a33-05e7-4fca-997e-00296612eaad',
    category: '⚽️ Sports',
    about: 'Stephanie is your go-to sports expert',
    image:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/dc894a33-05e7-4fca-997e-00296612eaad/a538b692-6cb8-41e8-a970-cd3cfa27a628/image-1746070839876.jpg',
    avatar:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/dc894a33-05e7-4fca-997e-00296612eaad/a538b692-6cb8-41e8-a970-cd3cfa27a628/image-1746070839876.jpg',
    author: 'Fleek',
    frameworkName: 'Fleek',
    characterFile: '',
    createdAt: '',
    createdBy: '',
    host: '',
    id: 'dc894a33-05e7-4fca-997e-00296612eaad',
    projectId: '',
    slotNumber: 0,
    updatedAt: '',
    publicToken: '',
    publicChat: false,
  },
  {
    name: 'Brianna',
    status: 'Running',
    agentId: '98a76838-c016-4295-9bc9-ff2ae273673d',
    category: '❤️‍🩹 Therapy',
    about: 'Brianna is your calm in the chaos',
    image:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/98a76838-c016-4295-9bc9-ff2ae273673d/e099c7a0-c731-45c5-a80f-dab0c6d44c48/image-1746070896251.jpg',
    avatar:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/98a76838-c016-4295-9bc9-ff2ae273673d/e099c7a0-c731-45c5-a80f-dab0c6d44c48/image-1746070896251.jpg',
    author: 'Fleek',
    frameworkName: 'Fleek',
    characterFile: '',
    createdAt: '',
    createdBy: '',
    host: '',
    id: '98a76838-c016-4295-9bc9-ff2ae273673d',
    projectId: '',
    slotNumber: 0,
    updatedAt: '',
    publicToken: '',
    publicChat: false,
  },
  {
    name: 'Carl',
    status: 'Running',
    agentId: '0004b5ed-1713-4ba6-a2a2-4bd689ecbcc0',
    category: '🔮 Crypto',
    about: 'Carl is your crypto confidant.',
    image:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/0004b5ed-1713-4ba6-a2a2-4bd689ecbcc0/1195b16f-002b-4da6-a24c-57a743ab6956/image-1746070966364.jpg',
    avatar:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/0004b5ed-1713-4ba6-a2a2-4bd689ecbcc0/1195b16f-002b-4da6-a24c-57a743ab6956/image-1746070966364.jpg',
    author: 'Fleek',
    frameworkName: 'Fleek',
    characterFile: '',
    createdAt: '',
    createdBy: '',
    host: '',
    id: '0004b5ed-1713-4ba6-a2a2-4bd689ecbcc0',
    projectId: '',
    slotNumber: 0,
    updatedAt: '',
    publicToken: '',
    publicChat: false,
  },
  {
    name: 'Jackie',
    status: 'Running',
    agentId: '9bb62709-c606-4ddd-8225-78fbb382eb11',
    category: '👗 Fashion',
    about: 'Jackie is your personal style guru',
    image:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/9bb62709-c606-4ddd-8225-78fbb382eb11/a551f7d4-e808-446e-b80e-063c83885a30/image-1746071020923.jpg',
    avatar:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/9bb62709-c606-4ddd-8225-78fbb382eb11/a551f7d4-e808-446e-b80e-063c83885a30/image-1746071020923.jpg',
    author: 'Fleek',
    frameworkName: 'Fleek',
    characterFile: '',
    createdAt: '',
    createdBy: '',
    host: '',
    id: '9bb62709-c606-4ddd-8225-78fbb382eb11',
    projectId: '',
    slotNumber: 0,
    updatedAt: '',
    publicToken: '',
    publicChat: false,
  },
  {
    name: 'Victoria',
    status: 'Running',
    agentId: '6af00700-9c66-4f7d-8815-0e30fd060f67',
    category: '🔞 NSFW',
    about: 'Victoria is unapologetically bold',
    image:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/6af00700-9c66-4f7d-8815-0e30fd060f67/ca064611-429e-48b9-be61-1298a811610e/image-1746071081866.jpg',
    avatar:
      'https://social-agent.dev.platform.fleeksandbox.xyz/api/v1/files/6af00700-9c66-4f7d-8815-0e30fd060f67/ca064611-429e-48b9-be61-1298a811610e/image-1746071081866.jpg',
    author: 'Fleek',
    frameworkName: 'Fleek',
    characterFile: '',
    createdAt: '',
    createdBy: '',
    host: '',
    id: '6af00700-9c66-4f7d-8815-0e30fd060f67',
    projectId: '',
    slotNumber: 0,
    updatedAt: '',
    publicToken: '',
    publicChat: false,
  },
];
