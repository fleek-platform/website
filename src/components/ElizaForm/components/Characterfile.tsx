import { FormField } from './FormField';
import { ModelProviderDropdown } from './ModelProviderDropdown';
import { ClientsDropdown } from './ClientsDropdown';
import { Text } from './Text';
import Link, { Target } from './Link';
import { Button } from './Button';
import { TagsForm } from './TagsForm';
import { Box } from './Box';
import type { GoToProps, Step, Template } from '../types';
import type React from 'react';
import {
  INITIAL_FORM,
  SECRETS_CLIENT_MAP,
  SECRETS_MODEL_PROVIDER_MAP,
  TEMPLATE_CHARACTERFILES_MAP,
  TEMPLATES,
  TEMPLATES_MAP,
} from '../constants';
import { MessageExamples } from './MessageExamples';
import { useElizaForm, type CharacterSchema } from '../hooks/useElizaForm';
import { BioForm } from './BioForm';
import { KnowledgeForm } from './KnowledgeForm';
import { LoreForm } from './LoreForm';
import { PostExamplesForm } from './PostExamplesForm';
import { StyleForm } from './StyleForm';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useState } from 'react';
import { Input } from './Input';

type TemplateSelectorProps = {
  template?: Template;
};

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ template }) => {
  const [currentTemplate, setCurrentTemplate] = useState(template);
  const { reset } = useElizaForm();

  if (!template) return null;

  const onTemplateChange = (template: Template) => {
    setCurrentTemplate(template);
    reset(TEMPLATE_CHARACTERFILES_MAP[template]);
  };

  return (
    <Box className="w-full border-b border-elz-neutral-6 pb-38 pt-24">
      <Box variant="container">
        <Box className="items-center gap-8">
          <Text variant="primary" size="xl" weight={700}>
            Templates
          </Text>
          <Text variant="secondary">
            Use one of the options below to prefill the fields.
          </Text>
        </Box>
        <Box className="flex-row gap-16">
          {TEMPLATES.map((characterTemplate) => {
            const isSelected = currentTemplate === characterTemplate;
            return (
              <Button
                key={characterTemplate}
                variant={isSelected ? 'success' : 'neutral'}
                onClick={() => onTemplateChange(characterTemplate)}
                className="flex-1"
              >
                {TEMPLATES_MAP[characterTemplate]}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

type HeaderProps = {
  completedStep: Step;
  onPrevious: () => void;
};

const Header: React.FC<HeaderProps> = ({ completedStep, onPrevious }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const isStepCompleted = completedStep >= 1;
  const label = isStepCompleted ? 'Discard and go back' : 'Go back';

  if (isOpen)
    return (
      <Box className="h-32 w-full flex-row items-center justify-between rounded-10 border border-elz-neutral-6 bg-elz-neutral-1 p-4 pl-12 animate-in fade-in-95 zoom-in-[.99]">
        <Text variant="primary" weight={500}>
          Discard characterfile?
        </Text>
        <Box className="flex-row gap-8">
          <Button variant="ghost" size="xs" onClick={toggle}>
            Cancel
          </Button>
          <Button variant="danger" size="xs" onClick={onPrevious}>
            Discard
          </Button>
        </Box>
      </Box>
    );

  return (
    <Box className="w-full flex-row items-center justify-between">
      <Button
        variant="ghost"
        className="text-yellow-dark-11"
        onClick={isStepCompleted ? toggle : onPrevious}
      >
        <FaChevronLeft /> {label}
      </Button>
    </Box>
  );
};

type CharacterfileProps = GoToProps & {
  template?: Template;
  completedStep: Step;
  completeStep: (step: Step) => void;
};

export const Characterfile: React.FC<CharacterfileProps> = ({
  completedStep,
  template,
  completeStep,
  goTo,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useElizaForm();

  const hasErrors = Object.entries(errors).length > 0;

  const mapSettingsSecretsAndUpdateForm = (data: CharacterSchema) => {
    const { modelProvider, clients } = data;
    const model = { ...SECRETS_MODEL_PROVIDER_MAP[modelProvider] };
    const client = clients.reduce((acc, client) => {
      const clientData = SECRETS_CLIENT_MAP[client];
      return { ...acc, ...clientData };
    }, {});
    const updatedSecrets = { ...model, ...client, ...data.settings.secrets };
    setValue('settings.secrets', updatedSecrets);
  };

  const onPrevious = () => {
    completeStep(0);
    reset(INITIAL_FORM);
    goTo('getStarted');
  };

  const onSubmit = (data: CharacterSchema) => {
    if (completedStep === 0) {
      completeStep(1);
    }
    mapSettingsSecretsAndUpdateForm(data);
    goTo('settings');
  };

  return (
    <>
      <Box className="relative items-start gap-16">
        <Header completedStep={completedStep} onPrevious={onPrevious} />
        <Text>
          {template ? 'Start with a template' : 'Create characterfile'}
        </Text>
        <Text variant="description" className="text-wrap">
          Using the inputs below, craft a unique and engaging personality for
          your AI agent. Click{' '}
          <Link
            href="https://github.com/ai16z/eliza/blob/main/packages/core/src/defaultCharacter.ts"
            className="underline hover:text-white"
            target={Target.Blank}
          >
            here
          </Link>{' '}
          to view a characterfile example.
        </Text>
        <TemplateSelector template={template} />
      </Box>
      <Box className="gap-38">
        <FormField
          name="name"
          label="Name"
          description="The character's display name for identification and in conversations"
          placeholder="Character display name, i.e: TechAI"
        />
        <FormField
          label="Model provider"
          description="Specifies the AI model provider"
        >
          <ModelProviderDropdown />
        </FormField>
        <FormField
          label="Clients"
          description="Array of supported client types, such as Discord or X"
        >
          <ClientsDropdown />
        </FormField>
        <FormField
          label="Bio"
          description="Character background as a string or array of statements. Includes biographical details about the character, either as one complete biography or several statements that vary."
        >
          <BioForm />
        </FormField>
        <FormField
          label="Lore"
          description="Backstory elements and unique character traits. These help define personality and can be randomly sampled in conversations."
        >
          <LoreForm />
        </FormField>
        <FormField
          label="Knowledge (optional)"
          description="Array used for Retrieval Augmented Generation (RAG), containing facts or references to ground the character's responses."
        >
          <KnowledgeForm />
        </FormField>
        <FormField
          label="Message examples"
          description="Sample conversations for establishing interaction patterns. Helps establish the character's conversational style."
        >
          <MessageExamples />
        </FormField>
        <FormField
          label="Post examples"
          description="Sample social media posts to guide content style."
        >
          <PostExamplesForm />
        </FormField>
        <FormField
          label="Style"
          description="List of subjects the character is interested in or knowledgeable about, used to guide conversations and generate relevant content. Helps maintain character consistency."
        >
          <Box className="gap-16 border-l-4 border-elz-neutral-1 pl-16">
            <Box className="gap-8 rounded-12 bg-elz-neutral-1 p-12">
              <Text size="lg" variant="primary" weight={700}>
                All
              </Text>
              <Text variant="secondary">
                These are directions for how the agent should speak or write
              </Text>
              <StyleForm.All />
            </Box>
            <Box className="gap-8 rounded-12 bg-elz-neutral-1 p-12">
              <Text size="lg" variant="primary" weight={700}>
                Chat
              </Text>
              <Text variant="secondary">
                These directions are specifically injected into chat contexts,
                like Discord
              </Text>
              <StyleForm.Chat />
            </Box>
            <Box className="gap-8 rounded-12 bg-elz-neutral-1 p-12">
              <Text size="lg" variant="primary" weight={700}>
                Post
              </Text>
              <Text variant="secondary">
                These directions are specifically injected into post contexts,
                like X (Twitter)
              </Text>
              <StyleForm.Post />
            </Box>
          </Box>
        </FormField>
        <FormField
          label="Topics"
          description="List of subjects the character is interested in or knowledgeable about, used to guide conversations and generate relevant content. Helps maintain character consistency."
        >
          <TagsForm name="topics" placeholder="add topic..." />
        </FormField>
        <FormField
          label="Adjectives"
          description={`Words that describe the character's traits and personality, used for generating responses with consistent tone. Can be used in "Mad Libs" style content generation`}
        >
          <TagsForm name="adjectives" placeholder="add adjective..." />
        </FormField>
        <Box className="gap-8">
          <Button onClick={handleSubmit(onSubmit)}>Continue to Settings</Button>
          {hasErrors && (
            <Input.Hint className="self-center" error>
              Please check the errors above to continue your character setup.
            </Input.Hint>
          )}
        </Box>
      </Box>
    </>
  );
};
