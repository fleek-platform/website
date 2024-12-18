import { Button } from '@components/Button';
import type { CharacterfileForm } from '../utils/constants';
import { Input } from './Input';
import { FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

type TextAreaWithAdditionalFieldsProps<T extends keyof CharacterfileForm> = {
  formFieldArray: CharacterfileForm[T];
  onUpdate: (newArray: CharacterfileForm[T]) => void;
  placeholder: string;
};

export const TextAreaWithAdditionalFields = <
  T extends keyof CharacterfileForm,
>({
  formFieldArray,
  onUpdate,
  placeholder,
}: TextAreaWithAdditionalFieldsProps<T>) => {
  const handleAddNewField = () => {
    onUpdate([...formFieldArray, '']);
  };

  const handleDeleteClick = (idx: number) => {
    const updatedArray = formFieldArray.filter((_, id) => id !== idx);
    onUpdate(updatedArray);
  };

  return (
    <>
      {formFieldArray.map((item, idx) => (
        <div key={idx} className="flex items-stretch gap-8">
          <Input.Root>
            <Input.Textarea placeholder={placeholder} defaultValue={item} />
          </Input.Root>
          <div className="shrink-0">
            {formFieldArray.length > 1 && (
              <Button
                className="h-full"
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteClick(idx)}
              >
                <FaTrash className="size-14" />
              </Button>
            )}
          </div>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="mr-auto"
        onClick={handleAddNewField}
      >
        <FaPlus className="size-14" /> Add more
      </Button>
    </>
  );
};
