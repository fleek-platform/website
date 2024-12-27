import type {
  CLIENT_NAMES,
  MODEL_PROVIDER_NAMES,
  PAGES,
  TEMPLATES,
} from './constants';

export type Page = (typeof PAGES)[number];

export type GoToProps = {
  goTo: (page: Page, template?: Template) => void;
};

export type Template = (typeof TEMPLATES)[number];

export type ModelProviderName = (typeof MODEL_PROVIDER_NAMES)[number] | '';

export type NonEmptyModelProviderName = Exclude<ModelProviderName, ''>;

export type LabelAndIcon = {
  label: string;
  icon: React.ReactNode;
};

export type Client = (typeof CLIENT_NAMES)[number];

// Types below from 19.12 (some optional advanced deep-leveled types were hidden for simplicity)
// https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts

type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type Content = {
  /** The main text content */

  text: string;
  /** Optional action associated with the message */
  action?: string;

  /** Optional source/origin of the content */
  source?: string;

  /** URL of the original message/post (e.g. tweet URL, Discord message link) */
  url?: string;

  /** UUID of parent message if this is a reply/thread */
  inReplyTo?: UUID;
};

export type MessageExample = {
  /** Associated user */
  user: string;

  /** Message content */
  content: Content;
};

export type Plugin = {
  /** Plugin name */
  name: string;

  /** Plugin description */
  description: string;
};

export type Character = {
  /** Optional unique identifier */
  id?: `${string}-${string}-${string}-${string}-${string}`;

  /** Character name */
  name: string;

  /** Optional username */
  username?: string;

  /** Optional system prompt */
  system?: string;

  /** Model provider to use */
  modelProvider: ModelProviderName;

  /** Image model provider to use, if different from modelProvider */
  imageModelProvider?: ModelProviderName;

  /** Optional model endpoint override */
  modelEndpointOverride?: string;

  /** Optional prompt templates */
  templates?: {
    goalsTemplate?: string;
    factsTemplate?: string;
    messageHandlerTemplate?: string;
    shouldRespondTemplate?: string;
    continueMessageHandlerTemplate?: string;
    evaluationTemplate?: string;
    twitterSearchTemplate?: string;
    twitterPostTemplate?: string;
    twitterMessageHandlerTemplate?: string;
    twitterShouldRespondTemplate?: string;
    farcasterPostTemplate?: string;
    lensPostTemplate?: string;
    farcasterMessageHandlerTemplate?: string;
    lensMessageHandlerTemplate?: string;
    farcasterShouldRespondTemplate?: string;
    lensShouldRespondTemplate?: string;
    telegramMessageHandlerTemplate?: string;
    telegramShouldRespondTemplate?: string;
    discordVoiceHandlerTemplate?: string;
    discordShouldRespondTemplate?: string;
    discordMessageHandlerTemplate?: string;
    slackMessageHandlerTemplate?: string;
    slackShouldRespondTemplate?: string;
  };

  /** Character biography */
  bio: string[];

  /** Character background lore */
  lore: string[];

  /** Example messages */
  messageExamples: MessageExample[][];

  /** Example posts */
  postExamples: string[];

  /** Known topics */
  topics: string[];

  /** Character traits */
  adjectives: string[];

  /** Optional knowledge base */
  knowledge?: string[];

  /** Supported client platforms */
  clients: Client[];

  /** Available plugins */
  plugins: Plugin[];

  /** Optional configuration */
  settings?: {
    secrets?: { [key: string]: string };
    intiface?: boolean;
    voice?: {
      model?: string; // For VITS
      url?: string; // Legacy VITS support
      elevenlabs?: {
        // New structured ElevenLabs config
        voiceId: string;
        model?: string;
        stability?: string;
        similarityBoost?: string;
        style?: string;
        useSpeakerBoost?: string;
      };
    };
    model?: string;
    embeddingModel?: string;
    chains?: any;
  };

  /** Optional client-specific config */
  clientConfig?: {
    discord?: {
      shouldIgnoreBotMessages?: boolean;
      shouldIgnoreDirectMessages?: boolean;
      shouldRespondOnlyToMentions?: boolean;
      messageSimilarityThreshold?: number;
      isPartOfTeam?: boolean;
      teamAgentIds?: string[];
      teamLeaderId?: string;
      teamMemberInterestKeywords?: string[];
    };
    telegram?: {
      shouldIgnoreBotMessages?: boolean;
      shouldIgnoreDirectMessages?: boolean;
      shouldRespondOnlyToMentions?: boolean;
      shouldOnlyJoinInAllowedGroups?: boolean;
      allowedGroupIds?: string[];
      messageSimilarityThreshold?: number;
      isPartOfTeam?: boolean;
      teamAgentIds?: string[];
      teamLeaderId?: string;
      teamMemberInterestKeywords?: string[];
    };
    slack?: {
      shouldIgnoreBotMessages?: boolean;
      shouldIgnoreDirectMessages?: boolean;
    };
  };

  /** Writing style guides */
  style: {
    all: string[];
    chat: string[];
    post: string[];
  };

  /** Optional Twitter profile */
  twitterProfile?: {
    id: string;
    username: string;
    screenName: string;
    bio: string;
    nicknames?: string[];
  };
  /** Optional NFT prompt */
  nft?: {
    prompt: string;
  };
};
