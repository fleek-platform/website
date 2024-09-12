import type { PropsWithChildren } from 'react';
import { FaArrowRight } from 'react-icons/fa6';

export const Announcement: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="group relative mr-auto flex cursor-pointer items-center gap-8 rounded-8 bg-gray-dark-2 px-8 py-6 font-plex-sans text-16 font-normal text-gray-dark-12 transition-all hover:bg-gradient-to-br hover:from-gray-dark-4 hover:to-gray-dark-2 hover:pl-24">
      <FaArrowRight className="absolute left-0 size-12 text-gray-dark-11 opacity-0 transition-all group-hover:left-8 group-hover:opacity-100" />
      {children}
    </div>
  );
};
