import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Box } from './Box';
import { Button } from './Button';
import { Text } from './Text';
import type { GoToProps } from '../types';
import type React from 'react';
import Link, { Target } from './Link';
import { useElizaForm, type CharacterSchema } from '../hooks/useElizaForm';
import { useState } from 'react';
import {
  Controller,
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
} from 'react-hook-form';
import FileEditor from '@components/Eliza/components/FileEditor';
import { cn } from '@utils/cn';
import { Input } from './Input';

type TransformedItem = {
  label: string;
  message: string;
  type: string;
};

type FormError = Merge<
  FieldError,
  FieldErrorsImpl<CharacterSchema['settings']>
>;

const transformErrors = (errors: FormError | undefined): TransformedItem[] => {
  if (!errors) return [];

  return Object.entries(errors).flatMap(([category, items]) =>
    Object.entries(items).map(([key, value]) => ({
      label: key,
      message: value.message,
      type: category,
    })),
  );
};

type SettingsPageProps = GoToProps;

export const SettingsPage: React.FC<SettingsPageProps> = ({ goTo }) => {
  const [errorJson, setErrorJson] = useState(false);

  const { control, formState, handleSubmit } = useElizaForm();

  const readableErrors = transformErrors(formState.errors.settings);
  const hasErrors = readableErrors.length > 0 || errorJson;

  const onSubmit = (data: CharacterSchema) => {
    if (errorJson) return;

    console.log(data);
  };

  return (
    <Box className="gap-38">
      <Box className="items-start gap-16">
        <Box className="w-full flex-row items-center justify-between">
          <Button
            variant="ghost"
            className="text-elz-accent-11"
            disabled={hasErrors}
            onClick={() => goTo('characterfile')}
          >
            <FaChevronLeft className="size-12" /> Characterfile
          </Button>
          <Button className="text-elz-accent-11" variant="ghost" disabled>
            Review <FaChevronRight />
          </Button>
        </Box>
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
      <Box>
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
              className={cn({ 'border-elz-danger-8': hasErrors })}
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
              There is an error parsing your settings JSON file, please fix it
              or revert the change.
            </Input.Hint>
          </Box>
        )}
        {hasErrors && (
          <Box className="gap-4">
            {readableErrors.map((error) => (
              <Input.Hint key={`${error.label}: ${error.message}`} error>
                {readableErrors.length > 1 && '-'} {error.label}:{' '}
                {error.message}
              </Input.Hint>
            ))}
          </Box>
        )}
      </Box>
      <Button onClick={handleSubmit(onSubmit)}>Review character</Button>
    </Box>
  );
};
