import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { cn } from '@utils/cn';
import type React from 'react';
import { Box } from './Box';
import { Input } from './Input';
import { FaCheck } from 'react-icons/fa6';

type CheckboxProps = RadixCheckbox.CheckboxProps & {
  label?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <Box className="w-full flex-row items-center gap-6">
      <RadixCheckbox.Root
        className={cn(
          'flex size-14 appearance-none items-center justify-center rounded-4 border border-elz-neutral-7 hover:border-elz-neutral-8 data-[state=checked]:bg-elz-accent-9',
          className,
        )}
        {...props}
      >
        <RadixCheckbox.Indicator>
          <FaCheck className="size-10 text-elz-black" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <Input.Label
          htmlFor={props.id}
          className="flex-1 cursor-pointer select-none"
        >
          {label}
        </Input.Label>
      )}
    </Box>
  );
};
