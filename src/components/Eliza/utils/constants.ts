export const SETTINGS_JSON_EXAMPLE = `{
  "voice": {
    "model": "voice-model-id",
    "url": "voice-service-url"
  }
}`;

export const modelProviderNames = [
  'openai',
  'anthropic',
  'claude_vertex',
  'grok',
  'groq',
  'llamacloud',
  'llamalocal',
  'google',
  'redpill',
  'openrouter',
  'heurist',
] as const;

export type ModelProviderName = (typeof modelProviderNames)[number];

type LabelAndIcon = {
  label: string;
  icon: string;
};

export const modelProviderNamesMap: Record<ModelProviderName, LabelAndIcon> = {
  openai: {
    label: 'OpenAI',
    icon: '',
  },
  anthropic: {
    label: 'Anthropic',
    icon: '',
  },
  claude_vertex: {
    label: 'Claude Vertex',
    icon: '',
  },
  grok: {
    label: 'Grok',
    icon: '',
  },
  groq: {
    label: 'Groq',
    icon: '',
  },
  llamacloud: {
    label: 'LlamaCloud',
    icon: '',
  },
  llamalocal: {
    label: 'LlamaLocal',
    icon: '',
  },
  google: {
    label: 'Google',
    icon: '',
  },
  redpill: {
    label: 'Red Pill',
    icon: '',
  },
  openrouter: {
    label: 'Open Router',
    icon: '',
  },
  heurist: {
    label: 'Heurist',
    icon: '',
  },
};

export const clientNames = [
  'discord',
  'direct',
  'twitter',
  'telegram',
  'farcaster',
  'lens',
  'auto',
  'slack',
] as const;

export type Client = (typeof clientNames)[number];

export const clientsMap: Record<Client, LabelAndIcon> = {
  discord: {
    label: 'Discord',
    icon: '/images/eliza/clients/discord.svg',
  },
  direct: {
    label: 'Direct',
    icon: '',
  },
  twitter: {
    label: 'X',
    icon: '/images/eliza/clients/x.svg',
  },
  telegram: {
    label: 'Telegram',
    icon: '/images/eliza/clients/telegram.svg',
  },
  farcaster: {
    label: 'Farcaster',
    icon: '',
  },
  lens: {
    label: 'Lens',
    icon: '',
  },
  auto: {
    label: 'Auto',
    icon: '',
  },
  slack: {
    label: 'Slack',
    icon: '',
  },
};

export type CharacterfileForm = {
  bio: string[];
  lore: string[];
  knowledge: string[];
  topics: string[];
  style: string[];
  adjectives: string[];
};

export const EMPTY_CHARACTERFILE_FORM: CharacterfileForm = {
  bio: [''],
  lore: [''],
  knowledge: [''],
  topics: [''],
  style: [''],
  adjectives: [''],
};
