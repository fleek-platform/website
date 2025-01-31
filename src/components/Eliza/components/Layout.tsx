import { cn } from '@utils/cn';
import { useRef, type PropsWithChildren } from 'react';
import type React from 'react';
import type { Page } from '../utils/types';

type LayoutProps = PropsWithChildren &
  React.HTMLAttributes<HTMLElement> & {
    page: Page;
  };

export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  page,
}) => {
  const pageRef = useRef<Page>(page);

  return (
    <main
      className={cn(
        'mx-auto flex w-full max-w-[590px] flex-col gap-38 font-plex-sans text-14 [scrollbar-gutter:stable] sm:pb-64 sm:pt-32',
        className,
      )}
      ref={(node) => {
        if (node && pageRef.current !== page) {
          window.scrollTo({ top: 0 });
          pageRef.current = page;
        }
      }}
    >
      {children}
    </main>
  );
};
