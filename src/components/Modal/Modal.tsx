import type React from 'react';

import { cn } from '@utils/cn';
import { useOnKeyDown } from './hooks/useOnKeyDown';
import { useDisableScroll } from './hooks/useDisableScroll';
import { Box } from './components/Box';

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  backdropClassName?: string;
  modalContainerClassName?: string;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  children,
  backdropClassName,
  modalContainerClassName,
}) => {
  useOnKeyDown({
    key: 'Escape',
    condition: isOpen,
    callbackFn: closeModal,
  });

  useDisableScroll({
    condition: isOpen,
  });

  if (!isOpen) return null;

  return (
    <>
      <Box
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm duration-200 animate-in fade-in-0',
          backdropClassName,
        )}
        onClick={closeModal}
      />
      <Box
        className={cn(
          'fixed inset-0 top-1/4 z-60 mx-auto max-h-fit w-512 items-center justify-center rounded-12 border border-gray-dark-6 bg-gray-dark-1 p-24 duration-300 animate-in fade-in-50 zoom-in-95',
          modalContainerClassName,
        )}
      >
        {children}
      </Box>
    </>
  );
};
