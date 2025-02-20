import { cn } from '@utils/cn';
import type { ReactNode, FC } from 'react';

interface SectionProps {
  title: ReactNode;
  isHero?: boolean;
  subTitle?: string;
  className?: string;
  children?: ReactNode;
}

const Section: FC<SectionProps> = ({
  children,
  title,
  isHero = false,
  subTitle,
  className,
}) => {
  return (
    <div
      className={cn(
        'mx-auto max-w-[1280px] px-24 py-96 text-center md:px-32',
        { 'py-128': isHero },
        className,
      )}
    >
      <div className={cn('mb-64', { 'mb-32': isHero })}>
        {isHero ? (
          <h1 className="mb-24 font-sans text-36 font-bold leading-40 text-white md:text-60 md:leading-60">
            {title}
          </h1>
        ) : (
          <h2 className="mb-16 font-sans text-30 font-bold leading-36 text-white md:text-36 md:leading-40">
            {title}
          </h2>
        )}
        {subTitle && (
          <p
            className={cn(
              'mx-auto font-plex-sans text-[18px] font-medium text-neutral-11 md:text-20',
              { 'max-w-[672px]': isHero },
            )}
          >
            {subTitle}
          </p>
        )}
      </div>
      {children && <div className="text-16">{children}</div>}
    </div>
  );
};

export default Section;
