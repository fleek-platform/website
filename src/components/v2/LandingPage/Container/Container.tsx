import { cn } from '@utils/cn';
import type { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren & {
  className?: string;
  lightSide?: 'left' | 'right';
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  lightSide = 'left',
}) => {
  return (
    <section className="relative overflow-clip border-t border-gray-dark-6 py-54">
      <div
        className={cn(
          'absolute left-0 top-0 -z-1 h-full w-1/4 bg-gradient-to-br from-gray-dark-2 via-transparent to-transparent',
          {
            'right-0': lightSide === 'right',
          },
        )}
      />
      <div className={cn('mx-auto w-full max-w-[1048px] px-24', className)}>
        {children}
      </div>
    </section>
  );
};
