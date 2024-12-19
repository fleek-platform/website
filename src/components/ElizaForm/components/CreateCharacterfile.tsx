import { FaChevronLeft } from 'react-icons/fa6';
import { FormField } from './FormField';
import { Input } from './Input';
// import FileEditor from './FileEditor';
import {
  EMPTY_CHARACTERFILE_FORM,
  SETTINGS_JSON_EXAMPLE,
  type CharacterfileForm,
  type Client,
  type ModelProviderName,
} from '../constants';
import { useState } from 'react';
import { ModelProviderDropdown } from './ModelProviderDropdown';
import { ClientsDropdown } from './ClientsDropdown';
import { TextareaWithAdditionalFields } from './TextareaWithAdditionalFields';
import { Text } from './Text';
import Link, { Target } from './Link';
import { Button } from './Button';
import { AdjectivesTags } from './AdjectivesTags';

export const CreateCharacterfile: React.FC = () => {
  const [form, setForm] = useState<CharacterfileForm>(EMPTY_CHARACTERFILE_FORM);
  const [modelProvider, setModelProvider] = useState<ModelProviderName | null>(
    null,
  );
  const [clients, setClients] = useState<Client[]>([]);

  const onModelProviderSelect = (provider: ModelProviderName) =>
    setModelProvider(provider);

  const onClientSelect = (clients: Client[]) => setClients(clients);

  return (
    <main className="mx-auto flex w-full max-w-[590px] flex-col gap-38 pb-96 pt-32 font-plex-sans text-14">
      <div className="flex flex-col items-start gap-16">
        <Button variant="ghost" className="text-yellow-dark-11">
          <FaChevronLeft className="size-12" /> Go back
        </Button>
        <Text>Create characterfile</Text>
        <Text variant="description" className="text-wrap">
          Using the inputs below, craft a unique and engaging personality for
          your AI agent. Click{' '}
          <Link
            href="https://ai16z.github.io/eliza/docs/core/characterfile/#example-complete-character-file"
            className="underline hover:text-white"
            target={Target.Blank}
          >
            here
          </Link>{' '}
          to view a characterfile example.
        </Text>
      </div>
      <div className="flex flex-col gap-38">
        <FormField
          label="Name"
          description="The character's display name for identification and in conversations"
        >
          <Input.Root>
            <Input.Field placeholder="Character display name, i.e: TechAI" />
          </Input.Root>
        </FormField>
        <FormField
          label="Model provider"
          description="Specifies the AI model provider"
        >
          <ModelProviderDropdown
            modelProvider={modelProvider}
            onModelProviderSelect={onModelProviderSelect}
          />
        </FormField>
        <FormField
          label="Clients"
          description="Array of supported client types, such as Discord or X"
        >
          <ClientsDropdown clients={clients} onClientSelect={onClientSelect} />
        </FormField>
        <FormField
          label="Settings"
          description="The settings object defines additional configurations like secrets and voice models. Note: We recommend adding your API keys during the .env upload step later in the flow. "
        >
          {/* {isServer ? (
            <div className="flex h-[228px] animate-pulse flex-col items-center justify-center rounded-12 border border-neutral-6 bg-neutral-1" />
          ) : (
            <FileEditor
              variant="narrow"
              fileType="json"
              fileContent={SETTINGS_JSON_EXAMPLE}
              onChange={() => {}}
            />
          )} */}
        </FormField>
        <FormField
          label="Bio"
          description="Character background as a string or array of statements. Includes biographical details about the character, either as one complete biography or several statements that vary."
        >
          <TextareaWithAdditionalFields
            formFieldArray={form.bio}
            onUpdate={(bio) => setForm({ ...form, bio })}
            placeholder="Agent biography"
          />
        </FormField>
        <FormField
          label="Lore"
          description="Backstory elements and unique character traits. These help define personality and can be randomly sampled in conversations."
        >
          <TextareaWithAdditionalFields
            formFieldArray={form.lore}
            onUpdate={(lore) => setForm({ ...form, lore })}
            placeholder="Agent background lore"
          />
        </FormField>
        <FormField
          label="Knowledge"
          description="Array used for Retrieval Augmented Generation (RAG), containing facts or references to ground the character's responses."
        >
          <TextareaWithAdditionalFields
            formFieldArray={form.knowledge}
            onUpdate={(knowledge) => setForm({ ...form, knowledge })}
            placeholder="Agent knowledge"
          />
        </FormField>
        <FormField
          label="Topics"
          description="List of subjects the character is interested in or knowledgeable about, used to guide conversations and generate relevant content. Helps maintain character consistency."
        >
          <TextareaWithAdditionalFields
            formFieldArray={form.topics}
            onUpdate={(topics) => setForm({ ...form, topics })}
            placeholder="Agent topics"
          />
        </FormField>
        <FormField
          label="Style"
          description="List of subjects the character is interested in or knowledgeable about, used to guide conversations and generate relevant content. Helps maintain character consistency."
        >
          <TextareaWithAdditionalFields
            formFieldArray={form.style}
            onUpdate={(style) => setForm({ ...form, style })}
            placeholder="Agent style"
          />
        </FormField>
        <FormField
          label="Adjectives"
          description={`Words that describe the character's traits and personality, used for generating responses with consistent tone. Can be used in "Mad Libs" style content generation`}
        >
          <AdjectivesTags
            formFieldArray={form.adjectives}
            onUpdate={(adjectives) => setForm({ ...form, adjectives })}
          />
        </FormField>
        <Button disabled>Continue</Button>
      </div>
    </main>
  );
};
