import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { type PropsWithChildren } from 'react';

export const boxVariants = cva('flex flex-col', {
  variants: {
    variant: {
      container:
        'bg-gray-dark-1 p-16 gap-16 rounded-12 border border-gray-dark-6 overflow-hidden',
    },
  },
});

export type BoxProps = PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxVariants>;

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, variant, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(boxVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
