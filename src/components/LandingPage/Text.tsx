import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { createElement, forwardRef, type PropsWithChildren } from 'react';

const textVariants = cva([], {
  variants: {
    variant: {
      title:
        'text-balance font-sans text-[3.6rem] font-semibold leading-[1.125] -tracking-2 text-gray-dark-12 md:text-[5.2rem]',
      subtitle: 'font-plex-sans text-[1.8rem] text-gray-dark-12 font-semibold',
      description:
        'text-balance font-plex-sans text-[1.8rem] font-medium text-gray-dark-11',
      feature:
        'font-plex-sans text-[1.2rem] font-medium uppercase tracking-[0.256rem] text-gray-dark-11',
      paragraph: 'font-plex-sans text-[1.4rem] text-gray-dark-11',
      tertiary: 'font-plex-sans text-[1.4rem] text-gray-dark-12 font-medium',
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
