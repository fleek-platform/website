import type { PropsWithChildren } from 'react';
import type React from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="mx-auto flex w-full max-w-[590px] flex-col gap-38 pb-96 pt-32 font-plex-sans text-14">
      {children}
    </main>
  );
};
