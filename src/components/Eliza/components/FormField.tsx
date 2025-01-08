import React, { type PropsWithChildren } from 'react';
import { Text } from './Text';
import { Input } from './Input';
import { useElizaForm } from '../hooks/useElizaForm';
import { Box } from './Box';
import type { CharacterFormSchema } from '../utils/schema';

type FormFieldProps = PropsWithChildren & {
  name?: keyof CharacterFormSchema;
  label: string;
  description?: string;
  placeholder?: string;
};

export const FormField: React.FC<FormFieldProps> = ({
  name,
  children,
  label,
  description,
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useElizaForm();

  return (
    <Box className="gap-14">
      <Box className="gap-8">
        <Text size="lg" variant="primary" weight={700}>
          {label}
        </Text>
        <Text variant="secondary">{description}</Text>
      </Box>
      {name && (
        <Box className="gap-4">
          <Input.Root error={Boolean(errors.name)}>
            <Input.Field
              id={name}
              placeholder={placeholder}
              {...register(name)}
            />
          </Input.Root>
          {errors.name && <Input.Hint error>{errors.name.message}</Input.Hint>}
        </Box>
      )}
      {children}
    </Box>
  );
};
