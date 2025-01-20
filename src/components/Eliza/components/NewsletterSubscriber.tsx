import type React from 'react';
import { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Text } from './Text';
import { Input } from './Input';
import { Box } from './Box';
import { Button } from './Button';

const NEWSLETTER_URL = import.meta.env.PUBLIC_BEEHIIV_PROXY_SERVER_URL;

const subscribeNewUser = async (email: string) => {
  if (!NEWSLETTER_URL)
    throw Error('Missing PUBLIC_BEEHIIV_PROXY_SERVER_URL env variable');

  if (!email) return;

  const payload = JSON.stringify({
    email,
    utmSource: 'eliza',
    sendWelcomeEmail: true,
  });

  try {
    await fetch(NEWSLETTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });
  } catch (e) {
    console.warn({ status: 'user could not be subscribed', error: e });
  }
};

const onNewUserCheck = (store: string | null) => {
  if (!store) return;

  const parsedStore = JSON.parse(store);
  if (!parsedStore.state.user) return;

  const isNewUser = parsedStore.state.user.newUser;
  if (!isNewUser) return;

  const email = parsedStore.state.user.email;
  return {
    email,
    isPendingEmail: Boolean(!email),
  };
};

type NewsletterSubscriberProps = {
  isLoggedIn: boolean;
};

export const NewsletterSubscriber: React.FC<NewsletterSubscriberProps> = ({
  isLoggedIn,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
    subscribeNewUser(email);
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const dynamicStore = localStorage.getItem('dynamic_store');
    const newUser = onNewUserCheck(dynamicStore);
    if (!newUser) return;

    if (newUser.isPendingEmail) {
      setIsOpen(true);
      return;
    }

    subscribeNewUser(newUser.email);
  }, [isLoggedIn]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} closeModal={() => {}}>
      <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
        <Text variant="description" className="text-elz-neutral-12">
          Please add an email to continue
        </Text>
        <Box className="gap-8">
          <Input.Label>Email</Input.Label>
          <Input.Root>
            <Input.Field
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Enter your email..."
              autoFocus
              required
            />
          </Input.Root>
        </Box>
        <Button>Continue</Button>
      </form>
    </Modal>
  );
};
