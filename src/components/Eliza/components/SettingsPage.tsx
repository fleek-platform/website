import { FaChevronLeft } from 'react-icons/fa6';
import { Box } from './Box';
import { Button } from './Button';
import { Text } from './Text';
import type { GoToProps, Step } from '../utils/types';
import type React from 'react';
import Link, { Target } from './Link';
import { useElizaForm } from '../hooks/useElizaForm';
import { useForm } from 'react-hook-form';
import { Input } from './Input';
import { settingsSchema, type SettingsSchema } from '../utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { extractSecretsFromData } from '../utils/transformData';

type HeaderProps = {
  onPrevious: () => void;
};

const Header: React.FC<HeaderProps> = ({ onPrevious }) => {
  return (
    <Box className="w-full flex-row items-center justify-between">
      <Button
        variant="ghost"
        className="text-elz-accent-11"
        onClick={onPrevious}
      >
        <FaChevronLeft /> Characterfile
      </Button>
    </Box>
  );
};

type SettingsPageProps = GoToProps & {
  completedStep: Step;
  completeStep: (step: Step) => void;
};

export const SettingsPage: React.FC<SettingsPageProps> = ({
  goTo,
  completeStep,
  completedStep,
}) => {
  const { getValues, setValue } = useElizaForm();

  const data = getValues();

  const defaultValues = {
    secrets: extractSecretsFromData(data),
    voice: { model: data.settings.voice.model },
  };

  const { reset, register, handleSubmit, formState } = useForm<SettingsSchema>({
    defaultValues,
    resolver: zodResolver(settingsSchema),
  });

  const formValues = Object.entries(defaultValues.secrets);

  const onPrevious = () => {
    reset();
    goTo('characterfile');
  };

  const onSubmit = (data: SettingsSchema) => {
    if (completedStep === 1) {
      completeStep(2);
    }
    setValue('settings', data);
    goTo('review');
  };

  return (
    <Box className="gap-38">
      <Box className="items-start gap-16">
        <Header onPrevious={onPrevious} />
        <Text>Settings</Text>
        <Text variant="description" className="text-wrap">
          Add the secrets for any services your AI agent will access, including
          LLMs. Click{' '}
          <Link
            href="https://github.com/elizaOS/eliza/blob/main/.env.example"
            className="underline hover:text-white"
            target={Target.Blank}
          >
            here
          </Link>{' '}
          to view all the supported secrets.
        </Text>
      </Box>
      <Box className="gap-16">
        <Box className="gap-8" variant="container">
          <Box>
            <Text variant="primary" weight={700} size="md">
              Add secrets
            </Text>
            <Text variant="secondary">
              These are required to connect with your model, clients and
              plugins.
            </Text>
          </Box>
          <Box className="grid grid-cols-2 gap-8 pt-8">
            <Input.Label>Key</Input.Label>
            <Input.Label>Value</Input.Label>
          </Box>
          {formValues.map(([key]) => {
            const error = formState.errors.secrets?.[key];
            return (
              <Box key={key} className="grid grid-cols-2 gap-8">
                <Input.Root disabled>
                  <Input.Field value={key} disabled />
                </Input.Root>
                <Input.Root error={Boolean(error)}>
                  <Input.Field {...register(`secrets.${key}`)} />
                </Input.Root>
              </Box>
            );
          })}
          {formState.errors.secrets && (
            <Input.Hint error>Please fill the missing values.</Input.Hint>
          )}
        </Box>
        <Box className="gap-8" variant="container">
          <Box>
            <Text variant="primary" weight={700} size="md">
              Voice
            </Text>
            <Text variant="secondary">Optional voice model</Text>
          </Box>
          <Input.Root error={Boolean(formState.errors.voice)}>
            <Input.Field {...register('voice.model')} />
          </Input.Root>
          {formState.errors.voice && (
            <Input.Hint error>
              {formState.errors.voice.model?.message}
            </Input.Hint>
          )}
        </Box>
      </Box>

      <Button variant="primary" onClick={handleSubmit(onSubmit)}>
        Review character
      </Button>
    </Box>
  );
};
