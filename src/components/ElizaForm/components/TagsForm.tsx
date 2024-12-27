import { useEffect, useState } from 'react';
import { Badge } from './Badge';
import { Input } from './Input';
import { FaXmark } from 'react-icons/fa6';
import { Button } from './Button';
import { PiWarning } from 'react-icons/pi';
import { useElizaForm } from '../hooks/useElizaForm';
import { INITIAL_FORM } from '../constants';
import { Box } from './Box';

type TagsFormProps = {
  name: 'topics' | 'adjectives';
  placeholder: string;
};

const SUBMIT_KEYS = ['Enter', ','];

export const TagsForm: React.FC<TagsFormProps> = ({ name, placeholder }) => {
  const {
    setValue,
    formState: { errors },
    clearErrors,
  } = useElizaForm();

  const [formFieldArray, setFormFieldArray] = useState(INITIAL_FORM[name]);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [adjective, setAdjective] = useState('');
  const [error, setError] = useState(false);

  const deleteLastFormFieldArrayEntry = () => {
    setFormFieldArray((prev) => prev.slice(0, -1));
    setHasUpdate(true);
  };

  const deleteEntryFromFormFieldArray = (idx: number) => {
    setFormFieldArray((prev) => prev.filter((_, i) => i !== idx));
    setHasUpdate(true);
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
      setFormFieldArray((prev) => [...prev, lowerCaseAdjective]);
      setAdjective('');
      setError(false);
      setHasUpdate(true);
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
    let newTags: string[] = [];

    try {
      const parsed = JSON.parse(pasteData);

      if (Array.isArray(parsed)) {
        newTags = parsed.map((item) => normalize(item.trim()));
      } else {
        setError(true);
        return;
      }
    } catch {
      newTags = pasteData
        .split(/,|\r?\n/)
        .map((item) => normalize(item.trim().replace(/^['"]+|['"]+$/g, '')))
        .filter(Boolean);
    }

    const normalizedFormFieldArray = formFieldArray.map(normalize);
    newTags = newTags.filter(
      (item) => !normalizedFormFieldArray.includes(item),
    );

    if (newTags.length) {
      setFormFieldArray((prev) => [...prev, ...newTags]);
      setAdjective('');
      setHasUpdate(true);
    }
  };

  useEffect(() => {
    if (hasUpdate) {
      setValue(name, formFieldArray);
      clearErrors(name);
      setHasUpdate(false);
    }
  }, [hasUpdate]);

  const errorMsg = errors[name]?.message;

  return (
    <Box className="gap-4">
      <Input.Root
        className="min-h-[3.5rem] flex-wrap gap-x-5 gap-y-6 py-6"
        error={error || Boolean(errorMsg)}
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
        <Input.Hint error>{adjective} is already in the list</Input.Hint>
      )}
      {errorMsg && <Input.Hint error>{errorMsg}</Input.Hint>}
    </Box>
  );
};
