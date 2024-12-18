import { cn } from '@utils/cn';
import type { HTMLAttributes, PropsWithChildren } from 'react';

export const Badge: React.FC<
  PropsWithChildren & HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'flex min-h-18 items-center gap-4 rounded-full bg-elz-neutral-3 py-1 pl-4 pr-6 text-13 text-elz-neutral-11',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
