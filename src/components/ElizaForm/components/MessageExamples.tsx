import type React from 'react';
import type { Character, MessageExample } from '../types';
import { Box } from './Box';
import { Text } from './Text';
import { cn } from '@utils/cn';
import { Button } from './Button';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { Input } from './Input';
import { INITIAL_FORM } from '../constants';

type FieldProps = {
  placeholder: string;
  item: string;
  onChange: (newValue: string) => void;
};

const Field: React.FC<FieldProps> = ({ placeholder, item = '', onChange }) => {
  const [value, setValue] = useState(item);

  useEffect(() => {
    if (value !== item) {
      setValue(item);
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    if (value !== item) {
      onChange(value);
    }
  };

  return (
    <Input.Root>
      <Input.Textarea
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Input.Root>
  );
};

type MessageExampleProps = {
  name: Character['name'];
  messageExample: MessageExample[];
  handleFieldChange: (
    outerIdx: number,
    innerIdx: number,
    newValue: MessageExample,
  ) => void;
};

const MessageExample: React.FC<MessageExampleProps> = ({
  name,
  messageExample,
  handleFieldChange,
}) => {
  return (
    <>
      {messageExample.map((message, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <Box
            key={idx}
            className={cn('w-full max-w-[50%] gap-8 rounded-16 p-12', {
              'mr-auto rounded-bl-none bg-elz-neutral-4': isEven,
              'ml-auto rounded-br-none bg-elz-neutral-4 text-right': !isEven,
            })}
          >
            <Text variant="primary" weight={700}>
              {isEven ? 'User' : name}
            </Text>
            <Field
              item={message.content.text}
              placeholder={isEven ? 'User message' : `${name} reply`}
              onChange={() => {}}
            />
          </Box>
        );
      })}
    </>
  );
};

type MessageExamplesProps = {
  agentName: Character['name'];
  messageExamples: MessageExample[][];
  onFormChange: (messageExamples: MessageExample[][]) => void;
};

export const MessageExamples: React.FC<MessageExamplesProps> = ({
  agentName,
  messageExamples,
  onFormChange,
}) => {
  const name = agentName || 'Character';

  const addNewField = () => {
    onFormChange([...messageExamples, [...INITIAL_FORM.messageExamples[0]]]);
  };

  const handleFieldDelete = (idx: number) => {
    const updatedArray = messageExamples.filter((_, index) => index !== idx);
    onFormChange(updatedArray);
  };

  const handleFieldChange = (
    outerIdx: number,
    innerIdx: number,
    newValue: MessageExample,
  ) => {
    const updatedArray = [...messageExamples];
    updatedArray[outerIdx] = [...updatedArray[outerIdx]];
    updatedArray[outerIdx][innerIdx] = newValue;
    onFormChange(updatedArray);
  };

  return (
    <Box className="gap-16 border-l-4 border-neutral-1 pl-16">
      {messageExamples.map((messageExample, idx) => (
        <Box key={idx} className="gap-8 rounded-12 bg-elz-neutral-1 p-24">
          <Box className="min-h-32 flex-row items-center justify-between">
            <Text variant="primary" size="xl" weight={700}>
              Example #{idx + 1}
            </Text>
            {messageExamples.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleFieldDelete(idx);
                }}
              >
                <FaTrash className="size-16" />
              </Button>
            )}
          </Box>
          <MessageExample
            name={name}
            messageExample={messageExample}
            handleFieldChange={handleFieldChange}
          />
        </Box>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="mr-auto"
        onClick={addNewField}
      >
        <FaPlus className="size-14" /> Add another example
      </Button>
    </Box>
  );
};
