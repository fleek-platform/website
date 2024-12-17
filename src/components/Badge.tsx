import type { PropsWithChildren } from 'react';

export const Badge: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center gap-4 rounded-full bg-neutral-3 px-6 text-neutral-11">
      {children}
    </div>
  );
};
