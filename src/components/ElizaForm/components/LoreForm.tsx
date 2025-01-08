import type React from 'react';
import { useElizaForm } from '../hooks/useElizaForm';
import { useFieldArray } from 'react-hook-form';
import { Box } from './Box';
import { Input } from './Input';
import { INITIAL_FORM } from '../utils/constants';
import { ArrayForm } from './ArrayForm';

export const LoreForm: React.FC = () => {
  const name = 'lore';
  const placeholder = 'Character background lore';
  const appendValue = INITIAL_FORM[name]?.[0] || { name: '' };

  const {
    control,
    register,
    formState: { errors },
  } = useElizaForm();

  const { append, remove, fields } = useFieldArray({ control, name });

  return (
    <ArrayForm.Root>
      {fields.map((field, idx) => {
        const errorMsg = errors[name]?.[idx]?.name?.message;
        return (
          <Box key={field.id} className="gap-4">
            <Box className="flex-row items-stretch gap-8">
              <Box className="flex-1">
                <Input.Root error={Boolean(errorMsg)}>
                  <Input.Textarea
                    placeholder={placeholder}
                    {...register(`${name}.${idx}.name`)}
                  />
                </Input.Root>
              </Box>
              <ArrayForm.RemoveField
                isVisible={fields.length > 1}
                remove={() => remove(idx)}
              />
            </Box>
            {errorMsg && <Input.Hint error>{errorMsg}</Input.Hint>}
          </Box>
        );
      })}
      <ArrayForm.AddField append={() => append(appendValue)} />
    </ArrayForm.Root>
  );
};
