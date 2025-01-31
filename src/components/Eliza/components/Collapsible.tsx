import type React from 'react';
import { Box } from './Box';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { cn } from '@utils/cn';

type CollapsibleProps = {
  header: React.ReactNode;
  details: React.ReactNode;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  header,
  details,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className="gap-4">
      <Box
        className="cursor-pointer select-none flex-row items-center justify-between gap-16"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {header}
        <FaChevronDown
          className={cn('shrink-0 transition-all', { 'rotate-180': isOpen })}
        />
      </Box>
      {isOpen && (
        <Box className="duration-200 animate-in fade-in-50 slide-in-from-top-4">
          {details}
        </Box>
      )}
    </Box>
  );
};
