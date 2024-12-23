import { cn } from '@utils/cn';
import type { PropsWithChildren } from 'react';
import type React from 'react';

export const Layout: React.FC<
  PropsWithChildren & React.HTMLAttributes<HTMLElement>
> = ({ children, className }) => {
  return (
    <main
      className={cn(
        'mx-auto flex w-full max-w-[590px] flex-col gap-38 pb-64 pt-32 font-plex-sans text-14',
        className,
      )}
    >
      {children}
    </main>
  );
};
