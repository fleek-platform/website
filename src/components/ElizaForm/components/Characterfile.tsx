import { FormField } from './FormField';
import { ModelProviderDropdown } from './ModelProviderDropdown';
import { ClientsDropdown } from './ClientsDropdown';
import { Text } from './Text';
import Link, { Target } from './Link';
import { Button } from './Button';
import { TagsForm } from './TagsForm';
import { Box } from './Box';
import type { GoToProps, Template } from '../types';
import type React from 'react';
import {
  TEMPLATE_CHARACTERFILES_MAP,
  TEMPLATES,
  TEMPLATES_MAP,
} from '../constants';
import { GoBackButton } from './GoBackButton';
import { MessageExamples } from './MessageExamples';
import { useElizaForm, type CharacterSchema } from '../hooks/useElizaForm';
import { BioForm } from './BioForm';
import { KnowledgeForm } from './KnowledgeForm';
import { LoreForm } from './LoreForm';
import { PostExamplesForm } from './PostExamplesForm';
import { StyleForm } from './StyleForm';
import { FaChevronRight } from 'react-icons/fa6';
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

type CharacterfileProps = GoToProps & {
  template?: Template;
};

export const Characterfile: React.FC<CharacterfileProps> = ({
  template,
  goTo,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useElizaForm();

  const hasErrors = Object.entries(errors).length > 0;

  const onSubmit = (data: CharacterSchema) => {
    console.log(data);
    try {
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box className="items-start gap-16">
        <Box className="w-full flex-row items-center justify-between">
          <GoBackButton onClick={() => goTo('getStarted')} />
          <Button variant="ghost" disabled>
            Next: add .env file <FaChevronRight />
          </Button>
        </Box>
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
          <Button onClick={handleSubmit(onSubmit)}>
            Continue to .env file
          </Button>
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
