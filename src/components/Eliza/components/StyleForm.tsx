import type React from 'react';
import { useElizaForm } from '../hooks/useElizaForm';
import { useFieldArray } from 'react-hook-form';
import { Box } from './Box';
import { Input } from './Input';
import { INITIAL_FORM } from '../utils/constants';
import { ArrayForm } from './ArrayForm';

const All: React.FC = () => {
  const placeholder = 'Character style for: All';

  const {
    control,
    register,
    formState: { errors },
  } = useElizaForm();

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'style.all',
  });

  return (
    <ArrayForm.Root>
      {fields.map((field, idx) => {
        const errorMsg = errors.style?.all?.[idx]?.name?.message;
        return (
          <Box key={field.id} className="gap-4">
            <Box className="flex-row items-stretch gap-8">
              <Box className="flex-1">
                <Input.Root error={Boolean(errorMsg)}>
                  <Input.Textarea
                    placeholder={placeholder}
                    {...register(`style.all.${idx}.name`)}
                  />
                </Input.Root>
              </Box>
              <ArrayForm.RemoveField
                isVisible={fields.length > 1}
                remove={() => remove(idx)}
              />
            </Box>
            {errorMsg && <Input.Hint error>{errorMsg}</Input.Hint>}
          </Box>
        );
      })}
      <ArrayForm.AddField append={() => append(INITIAL_FORM.style.all)} />
    </ArrayForm.Root>
  );
};

const Chat: React.FC = () => {
  const placeholder = 'Character style for: Chat';

  const {
    control,
    register,
    formState: { errors },
  } = useElizaForm();

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'style.chat',
  });

  return (
    <ArrayForm.Root>
      {fields.map((field, idx) => {
        const errorMsg = errors.style?.chat?.[idx]?.name?.message;
        return (
          <Box key={field.id} className="gap-4">
            <Box className="flex-row items-stretch gap-8">
              <Box className="flex-1">
                <Input.Root error={Boolean(errorMsg)}>
                  <Input.Textarea
                    placeholder={placeholder}
                    {...register(`style.chat.${idx}.name`)}
                  />
                </Input.Root>
              </Box>
              <ArrayForm.RemoveField
                isVisible={fields.length > 1}
                remove={() => remove(idx)}
              />
            </Box>
            {errorMsg && <Input.Hint error>{errorMsg}</Input.Hint>}
          </Box>
        );
      })}
      <ArrayForm.AddField append={() => append(INITIAL_FORM.style.chat)} />
    </ArrayForm.Root>
  );
};

const Post: React.FC = () => {
  const placeholder = 'Character style for: Post';

  const {
    control,
    register,
    formState: { errors },
  } = useElizaForm();

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'style.post',
  });

  return (
    <ArrayForm.Root>
      {fields.map((field, idx) => {
        const errorMsg = errors.style?.post?.[idx]?.name?.message;
        return (
          <Box key={field.id} className="gap-4">
            <Box className="flex-row items-stretch gap-8">
              <Box className="flex-1">
                <Input.Root error={Boolean(errorMsg)}>
                  <Input.Textarea
                    placeholder={placeholder}
                    {...register(`style.post.${idx}.name`)}
                  />
                </Input.Root>
              </Box>
              <ArrayForm.RemoveField
                isVisible={fields.length > 1}
                remove={() => remove(idx)}
              />
            </Box>
            {errorMsg && <Input.Hint error>{errorMsg}</Input.Hint>}
          </Box>
        );
      })}
      <ArrayForm.AddField append={() => append(INITIAL_FORM.style.post)} />
    </ArrayForm.Root>
  );
};

export const StyleForm = {
  All,
  Chat,
  Post,
};
