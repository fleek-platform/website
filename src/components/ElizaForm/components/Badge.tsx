import { cn } from '@utils/cn';
import type { HTMLAttributes, PropsWithChildren } from 'react';

export const Badge: React.FC<
  PropsWithChildren & HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-elz-neutral-3 text-elz-neutral-11 flex min-h-18 items-center gap-4 rounded-full pl-4 pr-6 text-13',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
