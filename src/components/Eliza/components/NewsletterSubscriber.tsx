import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Modal } from './Modal';
import { Text } from './Text';
import { Input } from './Input';
import { Box } from './Box';
import { Button } from './Button';
import { Checkbox } from './Checkbox';

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
    console.error({ status: 'user could not be subscribed', error: e });
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
  const [consent, setConsent] = useState(true);
  const [email, setEmail] = useState('');

  const emailRef = useRef('');
  const isFormVisible = Boolean(!emailRef.current) && consent;
  const buttonLabel = consent ? 'Continue' : 'Close';

  useEffect(() => {
    if (!isLoggedIn) return;

    const dynamicStore = localStorage.getItem('dynamic_store');
    const newUser = onNewUserCheck(dynamicStore);
    if (!newUser) return;

    emailRef.current = newUser.email;
    if (newUser.email) {
      setEmail(newUser.email);
    }

    setIsOpen(true);
  }, [isLoggedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleCheckedChange = (checked: boolean) => {
    setConsent(checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);

    if (!consent) return;
    subscribeNewUser(email);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} closeModal={() => {}}>
      <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
        <Text variant="description" className="text-elz-neutral-12">
          Can we send you product updates?
        </Text>
        <Text variant="secondary">
          Stay in the loop with our latest product updates and expert guides —
          spam-free, we promise! 😉
        </Text>
        <Box className="gap-8 pb-8">
          {isFormVisible && (
            <>
              <Input.Label htmlFor="email">Email</Input.Label>
              <Input.Root>
                <Input.Field
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email..."
                  required={consent}
                  autoFocus
                />
              </Input.Root>
            </>
          )}
          <Checkbox
            id="consent"
            label="Send me product updates"
            checked={consent}
            onCheckedChange={handleCheckedChange}
          />
        </Box>
        <Button>{buttonLabel}</Button>
      </form>
    </Modal>
  );
};
