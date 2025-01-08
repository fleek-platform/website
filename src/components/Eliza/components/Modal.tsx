import type React from 'react';
import { useOnKeyDown } from '../hooks/useOnKeyDown';
import { useDisableScroll } from '../hooks/useDisableScroll';
import { Box } from './Box';
import { cn } from '@utils/cn';

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
          'fixed inset-0 z-50 bg-elz-black/50 backdrop-blur-sm animate-in fade-in-0',
          backdropClassName,
        )}
        onClick={closeModal}
      />
      <Box
        className={cn(
          'absolute top-1/2 z-60 mx-auto w-512 -translate-y-1/2 transform rounded-12 border border-elz-neutral-6 bg-elz-neutral-1 p-24 animate-in fade-in-90 zoom-in-105',
          modalContainerClassName,
        )}
      >
        {children}
      </Box>
    </>
  );
};
