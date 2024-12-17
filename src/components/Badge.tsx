import { cn } from '@utils/cn';
import type { HTMLAttributes, PropsWithChildren } from 'react';

export const Badge: React.FC<
  PropsWithChildren & HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'flex h-18 items-center gap-4 rounded-full bg-neutral-3 px-6 text-13 text-neutral-11',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
