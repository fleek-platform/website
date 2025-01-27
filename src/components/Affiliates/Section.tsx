import { cn } from '@utils/cn';
import type { ReactNode, FC } from 'react';

interface SectionProps {
  title: ReactNode;
  isH1Title?: boolean;
  subTitle?: string;
  className?: string;
  children?: ReactNode;
}

const Section: FC<SectionProps> = ({
  children,
  title,
  isH1Title = false,
  subTitle,
  className,
}) => {
  return (
    <div className={cn('px-24 py-128 text-center md:px-32', className)}>
      {isH1Title ? (
        <h1 className="tracking-tight mb-24 text-36 font-bold leading-40 text-white md:text-60 md:leading-60">
          {title}
        </h1>
      ) : (
        <h2 className="text-30 md:text-36">{title}</h2>
      )}
      {subTitle && (
        <p className="mx-auto mb-32 max-w-[672px] text-18 font-medium text-neutral-11 md:text-20">
          {subTitle}
        </p>
      )}
      {children && <div className="text-16">{children}</div>}
    </div>
  );
};

export default Section;
