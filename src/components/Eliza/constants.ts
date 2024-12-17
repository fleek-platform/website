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

type ModelProvider = {
  label: string;
  icon: string;
};

export const modelProviderNamesMap: Record<ModelProviderName, ModelProvider> = {
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
