import type React from 'react';
import { Modal } from '@components/Modal/Modal';
import { useEffect, useState } from 'react';
import { Text } from '@components/Modal/components/Text';
import { Button } from '@components/Modal/components/Button';
import { getItem, setItem, websiteKey } from '@utils/storage';
import settings from '@base/settings.json';
import { Box } from '@components/Modal/components/Box';

// 5  seconds
const SHOW_MODAL_DELAY = 5 * 1000;

type StorageValue = {
  genericModalDismissed: boolean;
  pathModalsDismissed: Record<string, boolean>;
};

const storageKey = websiteKey;

// display modal again in 7 days
const storageExpiresInDays = 7 as const;

const AnnouncementModal: React.FC<{ pathname: string }> = ({ pathname }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isGenericModal = settings.site.announcementModal.generic.visible;
  const routeSpecificModal = !isGenericModal
    ? settings.site.announcementModal.perPath.find(
        (el) => pathname && el.path.includes(pathname),
      )
    : null;
  const shouldOpenModal = isGenericModal || routeSpecificModal?.visible;
  const targetModal = isGenericModal
    ? settings.site.announcementModal.generic
    : routeSpecificModal;

  const saveModalDismissed = () => {
    const existingStorage = getItem<StorageValue>(storageKey) || {
      genericModalDismissed: false,
      pathModalsDismissed: {},
    };

    if (isGenericModal) {
      existingStorage.genericModalDismissed = true;
    } else if (routeSpecificModal) {
      existingStorage.pathModalsDismissed[
        routeSpecificModal?.id || routeSpecificModal.path
      ] = true;
    }

    setItem(storageKey, existingStorage, storageExpiresInDays);
  };

  const hasBeenDismissed = (): boolean => {
    if (isServer) return false;

    const storage = getItem<StorageValue>(storageKey);
    if (!storage) return false;

    if (isGenericModal) {
      return storage.genericModalDismissed;
    } else if (routeSpecificModal) {
      return !!storage?.pathModalsDismissed[
        routeSpecificModal?.id || routeSpecificModal.path
      ];
    }

    return false;
  };

  const closeModal = () => {
    setIsOpen(false);
    saveModalDismissed();
  };

  const handleSubmit = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    closeModal();
  };

  // show after delay if it wasn't dismissed previously
  useEffect(() => {
    if (isServer) return;

    if (!shouldOpenModal) return;

    const showModal = () => {
      if (hasBeenDismissed()) return;
      setIsOpen(true);
    };

    const timer = window.setTimeout(() => showModal(), SHOW_MODAL_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [pathname, shouldOpenModal]);

  if (!isOpen) return null;

  return (
    <Modal
      modalContainerClassName="bottom-auto top-1/2 -translate-y-1/2 w-fit lg:max-w-[600px]"
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <Box className="flex flex-col gap-16">
        <Text variant="description" className="text-gray-dark-12">
          {targetModal?.title}
        </Text>
        <Text variant="secondary">{targetModal?.message}</Text>

        <Button onClick={handleSubmit}>{targetModal?.button}</Button>
      </Box>
    </Modal>
  );
};

export default AnnouncementModal;
