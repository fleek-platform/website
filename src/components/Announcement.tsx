import Link, { Target } from '@components/Link';
import { useEffect, useState, useRef, type PropsWithChildren } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import settings from '@base/settings.json';
import Marquee from 'react-fast-marquee';
import { cn } from '@utils/cn';
import { debounce } from 'lodash-es';

type AnnouncementProps = PropsWithChildren & {
  variant?: 'content' | 'full' | 'docs';
};

export const Announcement: React.FC<AnnouncementProps> = ({
  variant = 'full',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldShowMarquee, setShouldShowMarquee] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || !textRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const textWidth = textRef.current.offsetWidth;
      setShouldShowMarquee(textWidth > containerWidth);
    };

    const debouncedCheck = debounce(checkOverflow, 150);

    checkOverflow();
    window.addEventListener('resize', debouncedCheck);

    return () => {
      window.removeEventListener('resize', debouncedCheck);
      debouncedCheck.cancel();
    };
  }, []);

  if (!settings.site.announcementMarquee.visible) return null;

  if (variant === 'docs')
    return (
      <Link
        href={settings.site.announcementMarquee.url}
        target={Target.Blank}
        rel="noopener noreferrer"
        className="group flex flex-col gap-4 text-balance rounded-full border-t border-gray-dark-4 bg-gradient-to-br from-gray-dark-2 to-gray-dark-1 p-8 font-plex-sans text-13 font-normal leading-tight text-white hover:border-gray-dark-5 hover:from-gray-dark-3 hover:to-gray-dark-2 hover:text-gray-dark-12"
      >
        <span className="shrink-0">🎉</span>
        {settings.site.announcementMarquee.message}
      </Link>
    );

  return (
    <Link
      href={settings.site.announcementMarquee.url}
      target={Target.Blank}
      rel="noopener noreferrer"
      className={cn(
        'group relative mr-auto flex h-[33px] cursor-pointer items-center gap-8 rounded-full bg-neutral-2 px-8 py-6 pr-12 font-plex-sans outline-none ring-0 ring-gray-dark-8 transition-all hover:bg-gradient-to-br hover:pr-30 focus-visible:bg-gradient-to-br focus-visible:pr-30 focus-visible:ring-2',
        {
          'w-full justify-center rounded-none px-24': variant === 'full',
        },
      )}
    >
      <span className="shrink-0">🎉</span>

      <div
        ref={containerRef}
        className="relative overflow-hidden whitespace-nowrap text-14 font-normal text-white sm:text-15"
      >
        {/* Hidden element for consistent measurement */}
        <span
          ref={textRef}
          aria-hidden="true"
          className="invisible absolute whitespace-nowrap"
        >
          {settings.site.announcementMarquee.message}
        </span>

        {/* Visible content */}
        {shouldShowMarquee ? (
          <Marquee speed={20} delay={1} className="flex gap-24">
            {settings.site.announcementMarquee.message}
          </Marquee>
        ) : (
          settings.site.announcementMarquee.message
        )}
      </div>

      <FaArrowRight className="absolute -right-8 size-12 text-gray-dark-12 opacity-0 transition-all group-hover:right-8 group-hover:opacity-100 group-focus-visible:right-8 group-focus-visible:opacity-100" />
    </Link>
  );
};
