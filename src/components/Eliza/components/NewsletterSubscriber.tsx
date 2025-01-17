import type React from 'react';
import { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Text } from './Text';

const onNewUserSubscribe = async (email: string) => {
  if (!email) return;

  const payload = {
    email,
    utmSource: 'eliza',
    sendWelcomeEmail: true,
  };

  try {
    await fetch(
      'https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-5aaf2a72-1b5b-4ac6-8c42-a2e735a32d8b/main/create-subscription',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );
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

  useEffect(() => {
    if (!isLoggedIn) return;

    const dynamicStore = localStorage.getItem('dynamic_store');
    const newUser = onNewUserCheck(dynamicStore);
    if (!newUser) return;

    console.log(newUser);

    if (newUser.isPendingEmail) {
      setIsOpen(true);
      return;
    }

    onNewUserSubscribe(newUser.email);
  }, [isLoggedIn]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} closeModal={() => {}}>
      <Text>Please</Text>
    </Modal>
  );
};
