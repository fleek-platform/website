import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { createElement, forwardRef, type PropsWithChildren } from 'react';

const textVariants = cva([], {
  variants: {
    variant: {
      title:
        'text-balance font-sans text-[3.6rem] font-semibold leading-[1.125] -tracking-2 text-gray-dark-12 md:text-[5.2rem]',
      description:
        'text-balance font-plex-sans text-[1.8rem] font-medium text-gray-dark-11',
      feature:
        'font-plex-sans text-[1.2rem] font-medium uppercase tracking-[0.256rem] text-gray-dark-11',
      primary: 'text-neutral-12',
      secondary: 'text-neutral-11',
      tertiary: 'text-neutral-10',
    },
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    weight: {
      400: 'font-normal',
      500: 'font-medium',
      700: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'title',
  },
});

export const validTextElement = [
  'p',
  'span',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
] as const;

type ValidTextElement = (typeof validTextElement)[number];

type TextProps = PropsWithChildren &
  React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    as?: ValidTextElement;
  };

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, as = 'p', variant, className, ...props }, ref) => {
    return createElement(
      as,
      {
        ref,
        className: cn(textVariants({ variant }), className),
        ...props,
      },
      children,
    );
  },
);
