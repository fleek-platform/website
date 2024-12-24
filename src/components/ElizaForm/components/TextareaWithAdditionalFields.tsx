import { Button } from '@components/Button';
import { Input } from './Input';
import { FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import React, { useEffect, useState } from 'react';
import { Box } from './Box';

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

type TextareaWithAdditionalFieldsProps = {
  formFieldArray: string[];
  onFormChange: (newArray: string[]) => void;
  placeholder: string;
};

export const TextareaWithAdditionalFields: React.FC<
  TextareaWithAdditionalFieldsProps
> = ({ formFieldArray, onFormChange, placeholder }) => {
  const addNewField = () => {
    onFormChange([...formFieldArray, '']);
  };

  const handleFieldDelete = (idx: number) => {
    const updatedArray = formFieldArray.filter((_, index) => index !== idx);
    onFormChange(updatedArray);
  };

  const handleFieldChange = (idx: number, newValue: string) => {
    const updatedArray = [...formFieldArray];
    updatedArray[idx] = newValue;
    onFormChange(updatedArray);
  };

  return (
    <Box className="gap-8">
      {formFieldArray.map((item, idx) => (
        <Box key={`${item} ${idx}`} className="flex-row items-stretch gap-8">
          <Field
            item={item}
            placeholder={placeholder}
            onChange={(data) => handleFieldChange(idx, data)}
          />
          <Box className="shrink-0">
            {formFieldArray.length > 1 && (
              <Button
                className="h-full"
                variant="ghost"
                size="sm"
                onClick={() => handleFieldDelete(idx)}
              >
                <FaTrash className="size-12" />
              </Button>
            )}
          </Box>
        </Box>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="mr-auto"
        onClick={addNewField}
      >
        <FaPlus className="size-14" /> Add more
      </Button>
    </Box>
  );
};
