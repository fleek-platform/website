import Link, { Target } from '@components/Link';
import { FaArrowRight } from 'react-icons/fa6';
import { cn } from '@utils/cn';
import type { FC } from 'react';

interface AnnouncementProps {
  url: string;
  message: string;
  className?: string;
}

// simplified from src/components/Announcement.tsx
export const Announcement: FC<AnnouncementProps> = ({
  url,
  message,
  className,
}) => {
  if (!(url && message)) return null;

  return (
    <Link
      href={url}
      target={Target.Blank}
      rel="noopener noreferrer"
      className={cn(
        'group relative mr-auto inline-flex h-[33px] cursor-pointer items-center gap-8 rounded-8 bg-gray-dark-2 px-8 py-6 pr-12 font-plex-sans',
        className,
      )}
    >
      <span className="shrink-0 text-11 font-medium uppercase text-yellow-dark-11">
        ✨
      </span>

      <span className="line-clamp-1 text-14 font-normal text-gray-dark-12 sm:text-16 md:line-clamp-none">
        {message}
      </span>
    </Link>
  );
};
