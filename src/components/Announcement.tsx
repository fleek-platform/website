import Link, { Target } from '@components/Link';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import settings from '@base/settings.json';
import Marquee from 'react-fast-marquee';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { cn } from '@utils/cn';

type AnnouncementProps = PropsWithChildren & {
  variant?: 'content' | 'full' | 'docs';
};

export const Announcement: React.FC<AnnouncementProps> = ({
  variant = 'full',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Init marquee on component mounted
    setMounted(true);
  }, []);

  const shouldShowMarquee = useMediaQuery('(max-width: 800px)');

  if (!settings.site.annoucementMarquee.visible) return null;

  if (variant === 'docs')
    return (
      <Link
        href={settings.site.annoucementMarquee.url}
        target={Target.Blank}
        rel="noopener noreferrer"
        className="group flex flex-col gap-4 text-balance rounded-8 border-t border-gray-dark-4 bg-gradient-to-br from-gray-dark-2 to-gray-dark-1 p-8 font-plex-sans text-13 font-normal leading-tight text-gray-dark-11 hover:border-gray-dark-5 hover:from-gray-dark-3 hover:to-gray-dark-2 hover:text-gray-dark-12"
      >
        <span className="shrink-0 text-10 font-medium uppercase text-yellow-dark-11">
          ✨ new
        </span>
        {settings.site.annoucementMarquee.message}
      </Link>
    );

  return (
    <Link
      href={settings.site.annoucementMarquee.url}
      target={Target.Blank}
      rel="noopener noreferrer"
      className={cn(
        'group relative mr-auto flex h-36 cursor-pointer items-center gap-8 rounded-8 bg-gray-dark-2 from-gray-dark-4 to-gray-dark-2 px-8 py-6 pr-12 font-plex-sans outline-none ring-0 ring-gray-dark-8 transition-all hover:bg-gradient-to-br hover:pr-30 focus-visible:bg-gradient-to-br focus-visible:pr-30 focus-visible:ring-2',
        {
          'w-full justify-center rounded-none px-24': variant === 'full',
        },
      )}
    >
      <span className="shrink-0 text-11 font-medium uppercase text-yellow-dark-11">
        ✨ new
      </span>

      <span className="line-clamp-1 text-14 font-normal text-gray-dark-12 sm:text-15 md:line-clamp-none">
        {mounted && shouldShowMarquee && (
          <Marquee speed={20} delay={1} className="flex gap-24">
            {settings.site.annoucementMarquee.message}
          </Marquee>
        )}
        {!shouldShowMarquee && settings.site.annoucementMarquee.message}
      </span>

      <FaArrowRight className="absolute -right-8 size-12 text-gray-dark-12 opacity-0 transition-all group-hover:right-8 group-hover:opacity-100 group-focus-visible:right-8 group-focus-visible:opacity-100" />
    </Link>
  );
};
