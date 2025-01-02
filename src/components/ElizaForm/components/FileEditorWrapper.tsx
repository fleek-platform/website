import FileEditor from '@components/Eliza/components/FileEditor';
import React, { useState } from 'react';
import { useElizaForm, type CharacterSchema } from '../hooks/useElizaForm';
import {
  Controller,
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
} from 'react-hook-form';
import { cn } from '@utils/cn';
import { Input } from './Input';
import { Box } from './Box';

type TransformedItem = {
  label: string;
  message: string;
  type: string;
};

type FormError = Merge<
  FieldError,
  FieldErrorsImpl<CharacterSchema['settings']>
>;

function transformErrors(errors: FormError | undefined): TransformedItem[] {
  if (!errors) return [];

  return Object.entries(errors).flatMap(([category, items]) =>
    Object.entries(items).map(([key, value]) => ({
      label: key,
      message: value.message,
      type: category,
    })),
  );
}

export const FileEditorWrapper: React.FC = () => {
  const [errorJson, setErrorJson] = useState(false);
  const { control, formState } = useElizaForm();

  const errors = formState.errors.settings;
  const readableErrors = transformErrors(errors);

  return (
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
            className={cn({ 'border-elz-danger-8': errors || errorJson })}
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
            There is an error parsing your settings JSON file, please fix it.
          </Input.Hint>
        </Box>
      )}
      {errors && (
        <Box className="gap-4">
          {readableErrors.map((error) => (
            <Input.Hint key={`${error.label}: ${error.message}`} error>
              {readableErrors.length > 1 && '-'} {error.label}: {error.message}
            </Input.Hint>
          ))}
        </Box>
      )}
    </Box>
  );
};
