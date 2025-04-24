import { cn } from '@utils/cn';
import type { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren & {
  classNameOuterContainer?: string;
  classNameInnerContainer?: string;
  gradient?: 'left' | 'right' | 'none';
};

export const Container: React.FC<ContainerProps> = ({
  children,
  classNameOuterContainer,
  classNameInnerContainer,
  gradient = 'left',
}) => {
  return (
    <section
      className={cn(
        'relative border-t border-gray-dark-4 py-54',
        classNameOuterContainer,
      )}
    >
      <div
        className={cn('absolute top-0 -z-1 h-full w-1/3', {
          'from-gray-dark-2/80 via-transparent to-transparent':
            gradient !== 'none',
          'left-0 bg-gradient-to-br': gradient === 'left',
          'right-0 bg-gradient-to-bl': gradient === 'right',
        })}
      />
      <div
        className={cn(
          'mx-auto h-full w-full max-w-[1048px] px-24',
          classNameInnerContainer,
        )}
      >
        {children}
      </div>
    </section>
  );
};
