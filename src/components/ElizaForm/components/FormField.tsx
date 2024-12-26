import React, { type PropsWithChildren } from 'react';
import { Text } from './Text';
import { Input } from './Input';
import { useElizaFormContext } from '../hooks/useElizaForm';
import type { Character } from '../types';

type FormFieldProps = PropsWithChildren & {
  name?: keyof Character;
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
  const { register } = useElizaFormContext();
  return (
    <section className="flex flex-col gap-14">
      <div className="space-y-8">
        <Text size="lg" variant="primary" weight={700}>
          {label}
        </Text>
        <Text variant="secondary">{description}</Text>
      </div>
      {name && (
        <Input.Root>
          <Input.Field placeholder={placeholder} {...register(name)} />
        </Input.Root>
      )}
      {children}
    </section>
  );
};
