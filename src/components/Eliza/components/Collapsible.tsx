import type React from 'react';
import { Box } from './Box';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { cn } from '@utils/cn';

type CollapsibleProps = {
  header: React.ReactNode;
  details: React.ReactNode;
  defaultOpen?: boolean;
  container?: boolean;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  header,
  details,
  defaultOpen = false,
  container = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Box
      className={cn({
        'gap-4': !container,
        'gap-0 p-0': container,
      })}
      variant={container ? 'container' : undefined}
    >
      <Box
        className={cn(
          'cursor-pointer select-none flex-row items-center justify-between gap-16',
          {
            'p-16 hover:bg-elz-neutral-2': container,
            'border-b border-elz-neutral-6': container && isOpen,
          },
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {header}
        <FaChevronDown
          className={cn('shrink-0 transition-all', { 'rotate-180': isOpen })}
        />
      </Box>
      {isOpen && (
        <Box
          className={cn({
            'duration-200 animate-in fade-in-50 slide-in-from-top-4':
              !defaultOpen,
            'gap-16 p-16': container,
          })}
        >
          {details}
        </Box>
      )}
    </Box>
  );
};
