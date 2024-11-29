import Link, { Target } from '@components/Link';
import type { PropsWithChildren } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@utils/cn';

export const buttonVariants = cva(
  'flex font-medium no-underline gap-4 select-none font-plex-sans cursor-pointer items-center justify-center transition-all ring-0 outline-none focus-visible:ring-2',
  {
    variants: {
      variant: {
        primary:
          'bg-yellow-dark-9 hover:bg-yellow-dark-10 active:bg-yellow-dark-9 text-yellow-dark-1 ring-yellow-dark-8 disabled:bg-gray-dark-3 disabled:text-gray-dark-8 disabled:ring-gray-dark-3 disabled:cursor-not-allowed',
        'primary-ghost':
          'bg-transparent hover:bg-yellow-dark-3 active:bg-yellow-dark-9 text-yellow-dark-11 ring-yellow-dark-8 border-yellow-dark-7 border',
        secondary:
          'bg-gray-dark-3 hover:bg-gray-dark-4 active:bg-gray-dark-3 !text-gray-dark-11 ring-gray-dark-8',
        'secondary-ghost':
          'bg-transparent hover:bg-gray-dark-4 active:bg-gray-dark-3 !text-gray-dark-11 ring-gray-dark-8 border-neutral-8 border',
        tertiary:
          'bg-gray-dark-12 text-gray-dark-1 hover:bg-gray-dark-11 active:bg-gray-dark-12 ring-gray-dark-8',
        ghost:
          'bg-transparent hover:bg-gray-dark-3 active:bg-gray-dark-2 text-gray-dark-11 ring-gray-dark-8',
        'primary-outline':
          'bg-transparent hover:bg-yellow-dark-3 active:bg-yellow-dark-2 text-yellow-dark-11 ring-yellow-dark-8 ring-1',
        'app-primary':
          'bg-yellow-dark-3 hover:bg-yellow-dark-4 active:bg-yellow-dark-3 text-yellow-dark-11 ring-yellow-dark-8',
        'app-success':
          'bg-ui-green hover:bg-ui-light-green text-ui-faded-green ring-ui-faded-green',
      },
      size: {
        sm: 'h-32 gap-4 px-8 rounded-8 text-[1.4rem]',
        md: 'h-40 gap-8 px-16 rounded-12 text-[1.6rem]',
        lg: 'h-44 gap-8 rounded-12 text-[1.6rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonProps = PropsWithChildren &
  VariantProps<typeof buttonVariants> & {
    id?: string;
    href?: string;
    className?: string;
    target?: Target;
    rel?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  id,
  children,
  href,
  target,
  rel,
  onClick,
  variant,
  size,
  className,
  ...props
}) => {
  if (href)
    return (
      <Link
        id={id}
        href={href}
        target={target}
        rel={rel}
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {children}
      </Link>
    );

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
