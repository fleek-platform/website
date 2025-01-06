import { useEffect, useState } from 'react';
import { Badge } from './Badge';
import { Input } from './Input';
import { FaLightbulb, FaXmark } from 'react-icons/fa6';
import { Button } from './Button';
import { useElizaForm } from '../hooks/useElizaForm';
import { Box } from './Box';
import { useWatch } from 'react-hook-form';
import { useScrollToError } from '../hooks/useScrollToError';

type TagsFormProps = {
  name: 'topics' | 'adjectives';
  placeholder: string;
};

const SUBMIT_KEYS = ['Enter', ','];

export const TagsForm: React.FC<TagsFormProps> = ({ name, placeholder }) => {
  const {
    control,
    formState: { errors },
    setValue,
    clearErrors,
  } = useElizaForm();

  const form = useWatch({ control, name });

  const [formFieldArray, setFormFieldArray] = useState(form);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [tag, setTag] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setFormFieldArray(form);
  }, [form]);

  useEffect(() => {
    if (hasUpdate) {
      setValue(name, formFieldArray);
      clearErrors(name);
      setHasUpdate(false);
    }
  }, [hasUpdate]);

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
    setTag(e.target.value);
  };

  const normalize = (str: string) => str.toLowerCase();

  const addTag = (newAdjective: string) => {
    const lowerCaseAdjective = normalize(newAdjective);
    const normalizedFormFieldArray = formFieldArray.map(normalize);

    if (normalizedFormFieldArray.includes(lowerCaseAdjective)) {
      setError(true);
    } else {
      setFormFieldArray((prev) => [...prev, lowerCaseAdjective]);
      setTag('');
      setError(false);
      setHasUpdate(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedAdjective = tag.trim();

    if (e.key === 'Backspace' && !tag) {
      deleteLastFormFieldArrayEntry();
    }

    if (SUBMIT_KEYS.includes(e.key) && trimmedAdjective) {
      e.preventDefault();
      addTag(trimmedAdjective);
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
      setTag('');
      setHasUpdate(true);
    }
  };

  const handleBlur = () => {
    if (!tag) return;

    addTag(tag);
  };

  const errorMsg = errors[name]?.message;

  const tagsFormErrorRef = useScrollToError(name, errors);

  return (
    <Box className="gap-4" ref={tagsFormErrorRef}>
      <Input.Root
        className="relative min-h-[3.5rem] flex-wrap gap-x-5 gap-y-6 py-6"
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
          className="min-w-fit flex-1 px-4"
          value={tag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={handleBlur}
        />
        {formFieldArray.length === 0 && (
          <Input.Hint className="pointer-events-none absolute right-8">
            <FaLightbulb /> Press <Badge className="rounded-3">Enter</Badge> or{' '}
            <Badge className="rounded-3">,</Badge> to add {name}
          </Input.Hint>
        )}
      </Input.Root>
      {error && <Input.Hint error>{tag} is already in the list</Input.Hint>}
      {errorMsg && <Input.Hint error>{errorMsg}</Input.Hint>}
    </Box>
  );
};
