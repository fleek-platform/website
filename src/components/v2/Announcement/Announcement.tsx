import Link from '@components/Link';
import type { PropsWithChildren } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import settings from '@base/settings.json';

export const Announcement: React.FC<PropsWithChildren> = () => {
  if (!settings.site.annoucementMarquee.visible) return null;

  return (
    <Link
      href={settings.site.annoucementMarquee.url}
      className="group relative mr-auto flex cursor-pointer flex-wrap items-center gap-4 rounded-8 bg-gray-dark-2 from-gray-dark-4 to-gray-dark-2 px-8 py-6 font-plex-sans outline-none ring-0 ring-gray-dark-8 transition-all hover:bg-gradient-to-br hover:pr-30 focus-visible:bg-gradient-to-br focus-visible:pr-30 focus-visible:ring-2 md:gap-8"
    >
      <span className="whitespace-nowrap text-11 font-medium uppercase text-yellow-dark-11">
        ✨ new
      </span>
      <span className="text-16 font-normal text-gray-dark-12">
        {settings.site.annoucementMarquee.message}
      </span>
      <FaArrowRight className="absolute -right-8 size-12 text-gray-dark-12 opacity-0 transition-all group-hover:right-8 group-hover:opacity-100 group-focus-visible:right-8 group-focus-visible:opacity-100" />
    </Link>
  );
};
