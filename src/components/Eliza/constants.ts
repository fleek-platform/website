export const SETTINGS_JSON_EXAMPLE = `{
    "settings": {
      "voice": {
        "model": "voice-model-id",
        "url": "voice-service-url"
      }
    }
  }`;

export const modelProviderNames = [
  'OPENAI',
  'ANTHROPIC',
  'CLAUDE_VERTEX',
  'GROK',
  'GROQ',
  'LLAMACLOUD',
  'LLAMALOCAL',
  'GOOGLE',
  'REDPILL',
  'OPENROUTER',
  'HEURIST',
] as const;

export type ModelProviderName = (typeof modelProviderNames)[number];

type ModelProvider = {
  label: string;
  icon: string;
};

export const modelProviderNamesMap: Record<ModelProviderName, ModelProvider> = {
  OPENAI: {
    label: 'OpenAI',
    icon: '',
  },
  ANTHROPIC: {
    label: 'Anthropic',
    icon: '',
  },
  CLAUDE_VERTEX: {
    label: 'Claude Vertex',
    icon: '',
  },
  GROK: {
    label: 'Grok',
    icon: '',
  },
  GROQ: {
    label: 'Groq',
    icon: '',
  },
  LLAMACLOUD: {
    label: 'LlamaCloud',
    icon: '',
  },
  LLAMALOCAL: {
    label: 'LlamaLocal',
    icon: '',
  },
  GOOGLE: {
    label: 'Google',
    icon: '',
  },
  REDPILL: {
    label: 'Red Pill',
    icon: '',
  },
  OPENROUTER: {
    label: 'Open Router',
    icon: '',
  },
  HEURIST: {
    label: 'Heurist',
    icon: '',
  },
};
