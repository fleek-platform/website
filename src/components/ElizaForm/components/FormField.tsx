import { useEffect, useState, type PropsWithChildren } from 'react';
import { Text } from './Text';
import { Input } from './Input';

type Field = { value?: string; onChange?: (data: string) => void };

type FormFieldProps = PropsWithChildren &
  Field & {
    label: string;
    description?: string;
  };

const Field: React.FC<Field> = ({ value = '', onChange }) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value);
    }
  }, [value]);

  if (!onChange) return null;

  const handleBlur = () => {
    if (value !== currentValue) {
      onChange(currentValue);
    }
  };

  return (
    <Input.Root>
      <Input.Field
        placeholder="Character display name, i.e: TechAI"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleBlur}
      />
    </Input.Root>
  );
};

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  description,
  value,
  onChange,
}) => {
  return (
    <section className="flex flex-col gap-14">
      <div className="space-y-8">
        <Text size="lg" variant="primary" weight={700}>
          {label}
        </Text>
        <Text variant="secondary">{description}</Text>
      </div>
      {onChange && <Field value={value} onChange={onChange} />}
      {children}
    </section>
  );
};
