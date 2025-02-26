import { Text } from './Text';
import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type PropsWithChildren } from 'react';

const inputVariants = cva(
  'w-full font-plex-sans border border-transparent overflow-hidden bg-transparent flex items-center text-gray-dark-12',
  {
    variants: {
      size: {
        xs: 'min-h-[24px] px-8 text-xs gap-6 rounded-4',
        sm: 'min-h-[32px] px-8 text-sm gap-6 rounded-8',
        md: 'min-h-[40px] px-3 gap-6 rounded-8',
        lg: 'min-h-[48px] text-[1.8rem] px-4 gap-12 rounded-12',
      },
      variant: {
        outline:
          'border-gray-dark-7 focus-within:outline outline-1 outline-transparent outline-offset-0 focus-within:outline-gray-dark-8 focus-within:border-gray-dark-8',
        ghost: 'px-0 rounded-none',
      },
      status: {
        isLoading: 'border-gray-dark-4 animate-pulse bg-gray-dark-4',
        error:
          'border-red-dark-8 focus-within:border-red-dark-8 focus-within:outline-red-dark-8',
        disabled:
          'cursor-not-allowed bg-gray-dark-3 border-gray-dark-7 text-gray-dark-11',
      },
    },
    compoundVariants: [
      {
        variant: 'ghost',
        status: 'isLoading',
        className:
          'border border-gray-dark-4 animate-pulse bg-gray-dark-4 rounded-lg',
      },
      {
        variant: 'ghost',
        status: 'error',
        className:
          'border-0 rounded-none border-b border-red-dark-8 focus-within:border-red-dark-8',
      },
      {
        variant: 'ghost',
        status: 'disabled',
        className: 'bg-transparent border-none cursor-not-allowed',
      },
    ],
    defaultVariants: {
      variant: 'outline',
      size: 'sm',
    },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;

export type InputStatus =
  | 'validating'
  | 'invalid'
  | 'valid'
  | 'pending'
  | 'debouncing'
  | 'other';

export type InputRootProps = React.HTMLAttributes<HTMLDivElement> &
  InputVariants &
  PropsWithChildren & {
    isLoading?: boolean;
    error?: boolean;
    disabled?: boolean;
    hidden?: boolean;
  };

const Root = forwardRef<HTMLDivElement, InputRootProps>(
  (
    {
      variant,
      size,
      isLoading,
      children,
      className,
      error,
      hidden,
      disabled,
      ...props
    },
    ref,
  ) => {
    let status: 'isLoading' | 'error' | 'disabled' | null | undefined =
      undefined;

    switch (true) {
      case isLoading:
        status = 'isLoading' as const;
        break;
      case disabled:
        status = 'disabled' as const;
        break;
      case error:
        status = 'error' as const;
        break;
      default:
        status = undefined;
    }

    return (
      <div
        ref={ref}
        className={cn(
          inputVariants({ variant, size, status }),
          { hidden },
          className,
        )}
        {...props}
      >
        {!isLoading && children}
      </div>
    );
  },
);

export type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const Field = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        autoComplete="off"
        className={cn(
          'h-full w-full bg-transparent text-[1.4rem] placeholder-gray-dark-8 outline-none disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      />
    );
  },
);

export type InputTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    minHeight?: number;
    maxHeight?: number;
  };

const Textarea = forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        autoComplete="off"
        className={cn(
          'h-full w-full resize-none bg-transparent py-8 placeholder-gray-dark-8 outline-none [field-sizing:content] disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      />
    );
  },
);

export type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  PropsWithChildren & {
    error?: boolean;
    tooltip?: React.ReactNode;
  };

const Label: React.FC<InputLabelProps> = ({
  error,
  tooltip,
  children,
  className,
  htmlFor,
  ...props
}) => {
  return (
    <label
      className={cn(
        'flex items-center gap-4 text-[1.2rem] text-gray-dark-11',
        { 'text-red-dark-11': error },
        className,
      )}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export type InputHintProps = React.HTMLAttributes<HTMLParagraphElement> &
  PropsWithChildren & {
    error?: boolean;
  };

const Hint: React.FC<InputHintProps> = ({ error, children, className }) => {
  return (
    <Text
      variant="primary"
      size="sm"
      className={cn(
        'flex items-center gap-4 text-[1.2rem] text-gray-dark-11',
        { 'text-red-dark-11': error },
        className,
      )}
    >
      {children}
    </Text>
  );
};

export const Input = {
  Root,
  Field,
  Textarea,
  Label,
  Hint,
};
