import type React from 'react';
import { Box } from './Box';
import { Text } from './Text';
import { cn } from '@utils/cn';
import { Button } from './Button';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { Input } from './Input';
import { INITIAL_FORM } from '../constants';
import { useElizaForm } from '../hooks/useElizaForm';
import { useFieldArray, useWatch } from 'react-hook-form';

const MessageExample = ({ idx }: { idx: number }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useElizaForm();

  const { fields } = useFieldArray({
    control,
    name: `messageExamples.${idx}`,
  });

  const characterName = useWatch({ control, name: 'name' });
  const name = characterName || 'Character';

  return fields.map((field, innerIdx) => {
    const isEven = innerIdx % 2 === 0;
    const errorMsg =
      errors.messageExamples?.[idx]?.[innerIdx]?.content?.text?.message;

    return (
      <Box
        key={field.id}
        className={cn('w-full max-w-[50%] gap-8 rounded-16 p-12', {
          'mr-auto rounded-bl-none bg-elz-neutral-4': isEven,
          'ml-auto rounded-br-none bg-elz-neutral-4 text-right': !isEven,
        })}
      >
        <Text variant="primary" weight={700}>
          {isEven ? 'User' : name}
        </Text>
        <Input.Root error={Boolean(errorMsg)}>
          <Input.Textarea
            placeholder={isEven ? 'User message' : `${name} reply`}
            {...register(`messageExamples.${idx}.${innerIdx}.content.text`)}
          />
        </Input.Root>
        {errorMsg && <Input.Hint error>{errorMsg}</Input.Hint>}
      </Box>
    );
  });
};

export const MessageExamples: React.FC = () => {
  const { control } = useElizaForm();

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'messageExamples',
  });

  return (
    <Box className="gap-16 border-l-4 border-neutral-1 pl-16">
      {fields.map((field, idx) => (
        <Box key={field.id} className="gap-8 rounded-12 bg-elz-neutral-1 p-24">
          <Box className="min-h-32 flex-row items-center justify-between">
            <Text variant="primary" size="xl" weight={700}>
              Example #{idx + 1}
            </Text>
            {fields.length > 1 && (
              <Button variant="ghost" size="sm" onClick={() => remove(idx)}>
                <FaTrash className="size-16" />
              </Button>
            )}
          </Box>
          <MessageExample idx={idx} />
        </Box>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="mr-auto"
        onClick={() => append(INITIAL_FORM.messageExamples)}
      >
        <FaPlus className="size-14" /> Add another example
      </Button>
    </Box>
  );
};
