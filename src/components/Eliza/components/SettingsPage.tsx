import { FaChevronLeft } from 'react-icons/fa6';
import { Box } from './Box';
import { Button } from './Button';
import { Text } from './Text';
import type { GoToProps, Step } from '../utils/types';
import type React from 'react';
import Link, { Target } from './Link';
import { useElizaForm } from '../hooks/useElizaForm';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import FileEditor from '@components/Eliza/components/FileEditor';
import { cn } from '@utils/cn';
import { Input } from './Input';
import { transformErrors } from '../utils/transformData';

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
  const [errorJson, setErrorJson] = useState(false);

  const { control, formState, register, handleSubmit, reset } = useElizaForm();

  const readableErrors = transformErrors(formState.errors.settings);
  const hasErrors = readableErrors.length > 0 || errorJson;

  const onPrevious = () => {
    reset();
    goTo('characterfile');
  };

  const onSubmit = () => {
    if (errorJson) return;

    if (completedStep === 1) {
      completeStep(2);
    }

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
      <Box className="gap-8"></Box>
    </Box>
  );

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
      <Box className="gap-8">
        <Controller
          control={control}
          name="settings"
          render={({ field }) => (
            <FileEditor
              variant="narrow"
              fileType="json"
              fileContent={JSON.stringify(field.value, null, 2)}
              onChange={(data) => {
                try {
                  field.onChange(JSON.parse(data || ''));
                } catch (e) {
                  console.warn(
                    `Settings have not been saved due to a malformed object that can't be parsed. The editor will try again in the next value change.`,
                  );
                }
              }}
              onValidation={(jsonError) => setErrorJson(!jsonError)}
              className={cn({
                'border-elz-danger-8 transition-colors': hasErrors,
              })}
            />
          )}
        />
        {errorJson && (
          <Box
            className={cn('flex-row items-center justify-end', {
              'justify-between': errorJson,
            })}
          >
            <Input.Hint error>
              There was an error parsing your code. Please fix it or revert the
              change above.
            </Input.Hint>
          </Box>
        )}
        {hasErrors && (
          <Box className="gap-4 duration-300 animate-in fade-in-75 slide-in-from-top-12">
            {readableErrors.map((error) => (
              <Input.Hint key={`${error.label}: ${error.message}`} error>
                {readableErrors.length > 1 && '-'} {error.label}:{' '}
                {error.message}
              </Input.Hint>
            ))}
          </Box>
        )}
      </Box>
      <Button variant="primary" onClick={handleSubmit(onSubmit)}>
        Review character
      </Button>
    </Box>
  );
};
