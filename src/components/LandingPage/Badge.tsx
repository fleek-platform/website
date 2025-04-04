import type { PropsWithChildren } from 'react';
import type React from 'react';

export const Badge: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center gap-6 rounded-full bg-gray-dark-2 px-10 py-8 font-medium text-gray-dark-11">
      {children}
    </div>
  );
};
