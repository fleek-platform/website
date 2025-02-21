import type React from 'react';
import { Modal } from './components/Modal';
import { useBeehiiv } from './hooks/useBeehiiv';
import { useState } from 'react';
import { Text } from './components/Text';
import { Box } from './components/Box';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { Button as AppButton } from '@components/Button';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa6';

export const NewsletterModal: React.FC = () => {
  const { subscribeNewUser } = useBeehiiv();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const openModal = () => {
    setEmail('');
    setIsOpen(true);
  };

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

  if (!isOpen)
    return <AppButton onClick={openModal}>Open newsletter modal</AppButton>;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
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
