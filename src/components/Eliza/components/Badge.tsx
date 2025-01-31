import { cn } from '@utils/cn';
import type { HTMLAttributes, PropsWithChildren } from 'react';

export const Badge: React.FC<
  PropsWithChildren & HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <span
      className={cn(
        'flex min-h-18 items-center gap-4 rounded-full bg-elz-neutral-3 px-4 text-13 text-elz-neutral-11',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
