import type { PropsWithChildren } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@utils/cn';

export const buttonVariants = cva(
  'flex font-medium no-underline gap-4 select-none font-plex-sans cursor-pointer items-center justify-center transition-all ring-0 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-gray-dark-3 disabled:text-gray-dark-8',
  {
    variants: {
      variant: {
        neutral:
          'text-gray-dark-11 bg-gray-dark-3 hover:bg-gray-dark-4 active:bg-gray-dark-5 focus-visible:ring-gray-dark-8',
        accent:
          'text-yellow-dark-11 bg-yellow-dark-3 hover:bg-yellow-dark-4 active:bg-yellow-dark-5 focus-visible:ring-yellow-dark-8',
        ghost:
          'text-gray-dark-11 bg-transparent hover:bg-gray-dark-4 active:bg-gray-dark-5 disabled:bg-transparent  focus-visible:ring-gray-dark-8',
        primary:
          'bg-yellow-dark-9 hover:bg-yellow-dark-10 active:bg-yellow-dark-9 text-yellow-dark-1 ring-yellow-dark-8 disabled:bg-gray-dark-3 disabled:text-gray-dark-8 disabled:ring-gray-dark-3 disabled:cursor-not-allowed',
      },
      size: {
        xs: 'h-24 gap-4 px-8 rounded-8 text-[1.4rem]',
        sm: 'h-32 gap-4 px-8 rounded-8 text-[1.4rem]',
        md: 'h-40 gap-8 px-16 rounded-12 text-[1.6rem]',
        lg: 'h-44 gap-8 px-16 rounded-12 text-[1.6rem]',
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'sm',
    },
  },
);

type ButtonProps = PropsWithChildren &
  VariantProps<typeof buttonVariants> & {
    id?: string;
    href?: string;
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  id,
  children,
  href,
  onClick,
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};
