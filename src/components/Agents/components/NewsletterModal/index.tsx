import type React from 'react';
import { Modal } from './components/Modal';
import { useBeehiiv } from './hooks/useBeehiiv';
import { useEffect, useState } from 'react';
import { Text } from './components/Text';
import { Box } from './components/Box';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { useSession } from '@hooks/useSession';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa6';
import { getItem, setItem, type StorageKey } from '@utils/storage';

// 10 seconds
const SHOW_MODAL_DELAY = 10 * 1000;

type StorageValue = { agentsNewsletterDisplayedOnce: boolean };

const storageKey: StorageKey = 'fleek-xyz-marketing' as const;
// display modal again in 7 days
const storageExpiresInDays = 7 as const;

export const NewsletterModal: React.FC = () => {
  const { subscribeNewUser } = useBeehiiv();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { isLoggedIn } = useSession();

  const openModal = () => {
    setEmail('');
    setIsOpen(true);
    const storageValue: StorageValue = { agentsNewsletterDisplayedOnce: true };
    setItem(storageKey, storageValue, storageExpiresInDays);
  };

  // 10 seconds after mount show modal for non-existing users
  useEffect(() => {
    const showModal = () => {
      const displayedOnce = getItem<StorageValue>(storageKey);

      if (isLoggedIn || displayedOnce?.agentsNewsletterDisplayedOnce) return;

      openModal();
    };

    const timer = setTimeout(() => showModal(), SHOW_MODAL_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoggedIn, openModal]);

  const closeModal = () => setIsOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setError('');
    setIsSubmitting(true);
    try {
      await subscribeNewUser({ email });
      toast.success('You are subscribed to the newsletter!', {
        duration: 5000,
      });
      closeModal();
    } catch (e) {
      console.error(e);
      setError(
        'There was an issue subscribing your email. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      modalContainerClassName="top-1/2 -translate-y-1/2 w-fit lg:max-w-[600px]"
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
        <Text variant="description" className="text-gray-dark-12">
          Can we send you product updates?
        </Text>
        <Text variant="secondary">
          Subscribe to stay updated on all things AI agents. Spam-free, we
          promise!
        </Text>
        <Text variant="secondary">
          P.S.: A free version is coming soon—be the first to know!
        </Text>
        <Box className="gap-8 pb-8">
          <Input.Label htmlFor="email">Email</Input.Label>
          <Input.Root>
            <Input.Field
              id="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email..."
              required
              autoFocus
            />
          </Input.Root>
        </Box>
        <Button disabled={isSubmitting}>
          {isSubmitting && <FaSpinner className="animate-spin self-center" />}
          Subscribe
        </Button>
        {error && (
          <Text variant="secondary" className="self-center text-red-dark-11">
            {error}
          </Text>
        )}
      </form>
    </Modal>
  );
};
