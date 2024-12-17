export const SETTINGS_JSON_EXAMPLE = `{
    "settings": {
      "voice": {
        "model": "voice-model-id",
        "url": "voice-service-url"
      }
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
    icon: '',
  },
  direct: {
    label: 'Direct',
    icon: '',
  },
  twitter: {
    label: 'X',
    icon: '',
  },
  telegram: {
    label: 'Telegram',
    icon: '',
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
