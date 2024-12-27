import type React from 'react';
import { useElizaForm } from '../hooks/useElizaForm';
import { useFieldArray } from 'react-hook-form';
import { Box } from './Box';
import { Input } from './Input';
import { INITIAL_FORM } from '../constants';
import { ArrayButtons } from './ArrayButtons';

export const BioForm: React.FC = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useElizaForm();

  const { append, remove, fields } = useFieldArray({ control, name: 'bio' });

  return (
    <Box className="gap-8">
      {fields.map((field, idx) => {
        const errorMsg = errors.bio?.[idx]?.name?.message;
        return (
          <Box key={field.id}>
            <Box className="flex-row items-stretch gap-8">
              <Box className="flex-1">
                <Input.Root error={Boolean(errorMsg)}>
                  <Input.Textarea
                    placeholder="Agent biography"
                    {...register(`bio.${idx}.name`)}
                  />
                </Input.Root>
              </Box>
              <ArrayButtons.RemoveField
                isVisible={fields.length > 1}
                remove={() => remove(idx)}
              />
            </Box>
            {errorMsg && <Input.Hint error>{errorMsg}</Input.Hint>}
          </Box>
        );
      })}
      <ArrayButtons.AddField append={() => append(INITIAL_FORM.bio[0])} />
    </Box>
  );
};
