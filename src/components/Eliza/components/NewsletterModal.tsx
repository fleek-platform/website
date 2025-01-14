import { useEffect, useState } from 'react';
import { Box } from './Box';
import { useOnKeyDown } from '../hooks/useOnKeyDown';
import { useDisableScroll } from '../hooks/useDisableScroll';
import { cn } from '@utils/cn';
import { Button } from './Button';
import { FaXmark } from 'react-icons/fa6';

export const NewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  useOnKeyDown({
    key: 'Escape',
    condition: isOpen,
    callbackFn: closeModal,
  });

  useDisableScroll({
    condition: isOpen,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Box
        className={cn(
          'fixed inset-0 z-50 hidden bg-elz-black/50 backdrop-blur-sm',
          {
            'block animate-in fade-in-0': isOpen,
          },
        )}
        onClick={closeModal}
      />
      <Box
        className={cn(
          'pointer-events-none fixed top-1/2 z-60 mx-auto w-512 -translate-y-1/2 transform overflow-clip rounded-12 border border-elz-neutral-6 bg-elz-neutral-3 p-6 opacity-0',
          {
            'pointer-events-auto opacity-100 animate-in fade-in-90 zoom-in-105':
              isOpen,
          },
        )}
      >
        <Button variant="ghost" className="ml-auto" onClick={closeModal}>
          <FaXmark />
        </Button>
        <iframe
          src="https://embeds.beehiiv.com/b9b33b5f-b89e-4560-ab30-a62ce506b823"
          data-test-id="beehiiv-embed"
          style={{ minHeight: '320px' }}
        ></iframe>
      </Box>
    </>
  );
};
