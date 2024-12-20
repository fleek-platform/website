import { FaChevronLeft } from 'react-icons/fa6';
import { FormField } from './FormField';
// import FileEditor from './FileEditor';
import { ModelProviderDropdown } from './ModelProviderDropdown';
import { ClientsDropdown } from './ClientsDropdown';
import { TextareaWithAdditionalFields } from './TextareaWithAdditionalFields';
import { Text } from './Text';
import Link, { Target } from './Link';
import { Button } from './Button';
import { TagsForm } from './TagsForm';
import { useElizaBuilderForm } from '../hooks/useElizaBuilderForm';

export const CreateCharacterfile: React.FC = () => {
  const { form, onFormChange } = useElizaBuilderForm();

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
            href="https://github.com/ai16z/eliza/blob/main/packages/core/src/defaultCharacter.ts"
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
          value={form.name}
          onChange={(data) => onFormChange('name', data)}
        />
        <FormField
          label="Model provider"
          description="Specifies the AI model provider"
        >
          <ModelProviderDropdown
            modelProvider={form.modelProvider}
            onModelProviderSelect={(data) =>
              onFormChange('modelProvider', data)
            }
          />
        </FormField>
        <FormField
          label="Clients"
          description="Array of supported client types, such as Discord or X"
        >
          <ClientsDropdown
            clients={form.clients}
            onClientSelect={(data) => onFormChange('clients', data)}
          />
        </FormField>
        {/*         <FormField
          label="Settings"
          description="The settings object defines additional configurations like secrets and voice models. Note: We recommend adding your API keys during the .env upload step later in the flow. "
        >
          {isServer ? (
            <div className="flex h-[228px] animate-pulse flex-col items-center justify-center rounded-12 border border-neutral-6 bg-neutral-1" />
          ) : (
            <FileEditor
              variant="narrow"
              fileType="json"
              fileContent={SETTINGS_JSON_EXAMPLE}
            />
          )}
        </FormField> */}
        <FormField
          label="Bio"
          description="Character background as a string or array of statements. Includes biographical details about the character, either as one complete biography or several statements that vary."
        >
          <TextareaWithAdditionalFields
            formFieldArray={form.bio}
            onFormChange={(data) => onFormChange('bio', data)}
            placeholder="Agent biography"
          />
        </FormField>
        <FormField
          label="Lore"
          description="Backstory elements and unique character traits. These help define personality and can be randomly sampled in conversations."
        >
          <TextareaWithAdditionalFields
            formFieldArray={form.lore}
            onFormChange={(data) => onFormChange('lore', data)}
            placeholder="Agent background lore"
          />
        </FormField>
        <FormField
          label="Style"
          description="List of subjects the character is interested in or knowledgeable about, used to guide conversations and generate relevant content. Helps maintain character consistency."
        >
          <div className="flex flex-col gap-16 border-l-4 border-neutral-1 pl-16">
            <div className="flex flex-col gap-8 rounded-12 bg-neutral-1 p-12">
              <Text size="lg" variant="primary" weight={700}>
                All
              </Text>
              <Text variant="secondary">
                These are directions for how the agent should speak or write
              </Text>
              <TextareaWithAdditionalFields
                formFieldArray={form.style.all}
                onFormChange={(data) => onFormChange('style', 'all', data)}
                placeholder="Agent background lore"
              />
            </div>
            <div className="flex flex-col gap-8 rounded-12 bg-neutral-1 p-12">
              <Text size="lg" variant="primary" weight={700}>
                Chat
              </Text>
              <Text variant="secondary">
                These directions are specifically injected into chat contexts,
                like Discord
              </Text>
              <TextareaWithAdditionalFields
                formFieldArray={form.style.chat}
                onFormChange={(data) => onFormChange('style', 'chat', data)}
                placeholder="Agent background lore"
              />
            </div>
            <div className="flex flex-col gap-8 rounded-12 bg-neutral-1 p-12">
              <Text size="lg" variant="primary" weight={700}>
                Post
              </Text>
              <Text variant="secondary">
                These directions are specifically injected into post contexts,
                like X (Twitter)
              </Text>
              <TextareaWithAdditionalFields
                formFieldArray={form.style.post}
                onFormChange={(data) => onFormChange('style', 'post', data)}
                placeholder="Agent background lore"
              />
            </div>
          </div>
        </FormField>
        <FormField
          label="Topics"
          description="List of subjects the character is interested in or knowledgeable about, used to guide conversations and generate relevant content. Helps maintain character consistency."
        >
          <TagsForm
            formFieldArray={form.topics}
            onFormChange={(data) => onFormChange('topics', data)}
            placeholder="add topic..."
          />
        </FormField>
        <FormField
          label="Adjectives"
          description={`Words that describe the character's traits and personality, used for generating responses with consistent tone. Can be used in "Mad Libs" style content generation`}
        >
          <TagsForm
            formFieldArray={form.adjectives}
            onFormChange={(data) => onFormChange('adjectives', data)}
            placeholder="add adjective..."
          />
        </FormField>
        <Button disabled>Continue</Button>
      </div>
    </main>
  );
};
