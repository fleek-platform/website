import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { createElement, forwardRef, type PropsWithChildren } from 'react';

const textVariants = cva('font-plex-sans', {
  variants: {
    variant: {
      title:
        'text-balance font-sans text-[3.6rem] font-semibold leading-[1.125] -tracking-2 text-gray-dark-12 md:text-[5.2rem]',
      description: 'text-balance text-[1.8rem] font-medium text-gray-dark-11',
      feature:
        'text-[1.2rem] font-medium uppercase tracking-[0.256rem] text-gray-dark-11',
      primary: 'text-neutral-12',
      secondary: 'text-neutral-11',
      tertiary: 'text-neutral-10',
    },
    size: {
      '2xs': 'text-[1rem]',
      xs: 'text-[1.2rem]',
      sm: 'text-[1.4rem]',
      md: 'text-[1.6rem]',
      lg: 'text-[1.8rem]',
      xl: 'text-[2.0rem]',
      '2xl': 'text-[2.6rem]',
      '3xl': 'text-[3.4rem]',
      '4xl': 'text-[5.8rem]',
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
  ({ children, as = 'p', variant, size, weight, className, ...props }, ref) => {
    return createElement(
      as,
      {
        ref,
        className: cn(textVariants({ variant, size, weight }), className),
        ...props,
      },
      children,
    );
  },
);
