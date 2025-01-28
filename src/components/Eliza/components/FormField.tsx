import React, { type PropsWithChildren } from 'react';
import { Text } from './Text';
import { Input } from './Input';
import { useElizaForm } from '../hooks/useElizaForm';
import { Box } from './Box';
import type { CharacterFormSchema } from '../utils/schema';
import { Badge } from './Badge';

type FormFieldProps = PropsWithChildren & {
  name?: keyof CharacterFormSchema;
  label: string;
  description?: string;
  placeholder?: string;
  optional?: boolean;
};

export const FormField: React.FC<FormFieldProps> = ({
  name,
  children,
  label,
  description,
  placeholder,
  optional = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useElizaForm();

  return (
    <Box className="gap-14">
      <Box className="gap-8">
        <Box className="flex-row items-center gap-8">
          <Text size="lg" variant="primary" weight={700}>
            {label}
          </Text>
          {optional && <Badge className="text-12">Optional</Badge>}
        </Box>
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
