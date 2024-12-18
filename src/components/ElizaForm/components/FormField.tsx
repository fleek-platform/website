import type { PropsWithChildren } from 'react';
import { Text } from './Text';

type FormFieldProps = PropsWithChildren & {
  label: string;
  description?: string;
};

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  description,
}) => {
  return (
    <section className="flex flex-col gap-14">
      <div className="space-y-8">
        <Text size="lg" variant="primary" weight={700}>
          {label}
        </Text>
        <Text variant="secondary">{description}</Text>
      </div>
      {children}
    </section>
  );
};
