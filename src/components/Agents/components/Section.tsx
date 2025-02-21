import { cn } from '@utils/cn';
import type { ReactNode, FC } from 'react';
import { Announcement } from './Announcement';

interface SectionProps {
  title: ReactNode;
  isHero?: boolean;
  subTitle?: string;
  className?: string;
  children?: ReactNode;
  // added
  image?: string;
  isTextCenter?: boolean;
  isImageReverse?: boolean;
  isWide?: boolean;
  announcementUrl?: string;
  announcementMessage?: string;
}

const Section: FC<SectionProps> = ({
  children,
  title,
  isHero = false,
  subTitle,
  className,
  // new props
  image,
  isTextCenter = false,
  isImageReverse = false,
  isWide = false,
  announcementUrl,
  announcementMessage,
}) => {
  return (
    <section
      className={cn(
        'mx-auto max-w-[1024px] px-24 py-54 md:py-72',
        {
          'flex flex-col items-center justify-center gap-40 lg:max-w-[1280px] lg:flex-row':
            Boolean(image),
        },
        {
          'lg:flex-row-reverse': Boolean(image) && isImageReverse,
        },
        {
          'lg:max-w-[1280px]': isWide,
        },
        {
          '!pt-64': isHero,
        },
        className,
      )}
    >
      <div
        className={cn({
          'w-full lg:max-w-[490px] lg:flex-1': Boolean(image),
        })}
      >
        <div
          className={cn('mb-48 text-balance text-left', {
            'mb-24': isHero,
            'text-center': isTextCenter,
          })}
        >
          {isHero ? (
            <>
              {announcementUrl && announcementMessage && (
                <div className="mb-36">
                  <Announcement
                    url={announcementUrl}
                    message={announcementMessage}
                  />
                </div>
              )}

              <h1 className="mb-16 font-sans text-40 font-semibold leading-[1.125] text-neutral-12 md:text-52">
                {title}
              </h1>
            </>
          ) : (
            <h2 className="mb-24 font-sans text-40 font-semibold leading-[1.125] text-neutral-12 md:text-52">
              {title}
            </h2>
          )}
          {subTitle && (
            <p
              className={cn(
                'mx-auto font-plex-sans text-[1.6rem] font-medium text-neutral-11 md:text-18',
              )}
            >
              {subTitle}
            </p>
          )}
        </div>
        {children && <div className="text-16">{children}</div>}
      </div>
      {image && (
        <img
          src={image}
          alt="Agents background image"
          className="w-full lg:max-w-[700px] lg:flex-1"
        />
      )}
    </section>
  );
};

export default Section;
