import { cn } from '@utils/cn';
import type { ReactNode, FC } from 'react';

interface SectionProps {
  title: ReactNode;
  isHero?: boolean;
  subTitle?: string;
  className?: string;
  children?: ReactNode;
  // added
  image?: string;
  textCenter?: boolean;
  imageReverse?: boolean;
  wide?: boolean;
}

const Section: FC<SectionProps> = ({
  children,
  title,
  isHero = false,
  subTitle,
  className,
  // new props
  image,
  textCenter = false,
  imageReverse = false,
  wide = false,
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
          'lg:flex-row-reverse': Boolean(image) && imageReverse,
        },
        {
          'lg:max-w-[1280px]': wide,
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
            'text-center': textCenter,
          })}
        >
          {isHero ? (
            <h1 className="mb-16 font-sans text-40 font-semibold leading-normal text-neutral-12 md:text-52">
              {title}
            </h1>
          ) : (
            <h2 className="mb-24 font-sans text-40 font-semibold leading-normal text-neutral-12 md:text-52">
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
