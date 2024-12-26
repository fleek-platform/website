import FileEditor from '@components/Eliza/components/FileEditor';
import React from 'react';
import { useElizaForm } from '../hooks/useElizaForm';
import { Controller, useWatch } from 'react-hook-form';
import { cn } from '@utils/cn';
import { Input } from './Input';

export const FileEditorWrapper: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useElizaForm();

  const value = useWatch({ name: 'settings' });

  return (
    <>
      <Controller
        control={control}
        name="settings"
        render={({ field }) => (
          <FileEditor
            variant="narrow"
            fileType="json"
            fileContent={JSON.stringify(field.value, null, 2)}
            onChange={(data) => field.onChange(JSON.parse(data || ''))}
            className={cn({ 'border-elz-danger-8': errors.settings })}
          />
        )}
      />
      {errors.settings && (
        <Input.Hint error>{errors.settings.voice?.model?.message}</Input.Hint>
      )}
    </>
  );
};
