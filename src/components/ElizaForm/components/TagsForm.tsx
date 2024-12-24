import { useState } from 'react';
import { Badge } from './Badge';
import { Input } from './Input';
import { FaXmark } from 'react-icons/fa6';
import { Button } from './Button';
import { PiWarning } from 'react-icons/pi';
import type { Character } from '../types';

type TagsFormProps = {
  formFieldArray: Character['adjectives'];
  onFormChange: (newArray: Character['adjectives']) => void;
  placeholder: string;
};

const SUBMIT_KEYS = ['Enter', ','];

export const TagsForm: React.FC<TagsFormProps> = ({
  formFieldArray,
  onFormChange,
  placeholder,
}) => {
  const [adjective, setAdjective] = useState('');
  const [error, setError] = useState(false);

  const deleteLastFormFieldArrayEntry = () => {
    onFormChange(formFieldArray.slice(0, -1));
  };

  const deleteEntryFromFormFieldArray = (idx: number) => {
    onFormChange(formFieldArray.filter((_, i) => i !== idx));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setAdjective(e.target.value);
  };

  const normalize = (str: string) => str.toLowerCase();

  const addAdjective = (newAdjective: string) => {
    const lowerCaseAdjective = normalize(newAdjective);
    const normalizedFormFieldArray = formFieldArray.map(normalize);

    if (normalizedFormFieldArray.includes(lowerCaseAdjective)) {
      setError(true);
    } else {
      onFormChange([...formFieldArray, lowerCaseAdjective]);
      setAdjective('');
      setError(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedAdjective = adjective.trim();

    if (e.key === 'Backspace' && !adjective) {
      deleteLastFormFieldArrayEntry();
    }

    if (SUBMIT_KEYS.includes(e.key) && trimmedAdjective) {
      e.preventDefault();
      addAdjective(trimmedAdjective);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(false);

    const pasteData = e.clipboardData.getData('text');
    let newAdjectives: string[] = [];

    try {
      const parsed = JSON.parse(pasteData);

      if (Array.isArray(parsed)) {
        newAdjectives = parsed.map((item) => normalize(item.trim()));
      } else {
        setError(true);
        return;
      }
    } catch {
      newAdjectives = pasteData
        .split(/,|\r?\n/)
        .map((item) => normalize(item.trim().replace(/^['"]+|['"]+$/g, '')))
        .filter(Boolean);
    }

    const normalizedFormFieldArray = formFieldArray.map(normalize);
    newAdjectives = newAdjectives.filter(
      (item) => !normalizedFormFieldArray.includes(item),
    );

    if (newAdjectives.length) {
      onFormChange([...formFieldArray, ...newAdjectives]);
      setAdjective('');
    }
  };

  return (
    <>
      <Input.Root
        className="min-h-[3.5rem] flex-wrap gap-x-5 gap-y-6 py-6"
        error={error}
      >
        {formFieldArray.map((field, idx) => (
          <Badge
            key={idx}
            className="cursor-default items-center lowercase hover:bg-elz-neutral-5"
          >
            {field}
            <Button
              variant="ghost"
              className="size-14 p-0"
              onClick={() => deleteEntryFromFormFieldArray(idx)}
            >
              <FaXmark className="size-12" />
            </Button>
          </Badge>
        ))}
        <Input.Field
          placeholder={placeholder}
          className="min-w-fit flex-1"
          value={adjective}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
      </Input.Root>
      {error && (
        <Input.Hint error>
          <PiWarning className="shrink-0" />
          {adjective} is already in the list.
        </Input.Hint>
      )}
    </>
  );
};
