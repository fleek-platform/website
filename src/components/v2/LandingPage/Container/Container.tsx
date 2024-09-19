import { cn } from '@utils/cn';
import type { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren & {
  className?: string;
  gradient?: 'left' | 'right';
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  gradient = 'left',
}) => {
  return (
    <section className="relative overflow-clip border-t border-gray-dark-4 py-54">
      <div
        className={cn(
          'absolute top-0 -z-1 h-full w-1/3 from-gray-dark-2/80 via-transparent to-transparent',
          {
            'left-0 bg-gradient-to-br': gradient === 'left',
            'right-0 bg-gradient-to-bl': gradient === 'right',
          },
        )}
      />
      <div className={cn('mx-auto w-full max-w-[1048px] px-24', className)}>
        {children}
      </div>
    </section>
  );
};
