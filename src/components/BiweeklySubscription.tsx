import { FaEnvelope } from 'react-icons/fa6';
import { emailRegex } from './Support/form/utils';
import { Button } from './Button';
import { useState } from 'react';
import { cn } from '@utils/cn';
import Loading from './Loading';

const BiweeklySubscription = () => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [email, setEmail] = useState('');

  const { apiKey, url } = (() => {
    const apiKey = import.meta.env.PUBLIC_BEHIIV_API_KEY;
    const url = import.meta.env.PUBLIC_BEHIIV_SUBSCRIBE_URL;

    if (!apiKey || !url) {
      throw Error(
        `👹 Oops! Missing environment variables (url ${url}, apiKey ${apiKey})`,
      );
    }

    return {
      apiKey,
      url,
    };
  })();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value === '') {
      setIsValidEmail(true);
      return;
    }

    setIsValidEmail(emailRegex.test(e.target.value));
  };

  const handleSubscription = async () => {
    setIsSubscribing(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
    } catch (error) {
      console.log('Request failed', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      <p className="text-[12px]">Subscribe to our biweekly newsletter</p>

      <div className="relative">
        <div
          className={cn('relative z-[20] rounded-8 border  px-10 py-5', {
            'border-gray-dark-7': isValidEmail,
            'border-red-dark-8': !isValidEmail,
          })}
        >
          <div className="flex items-center gap-[1rem]">
            <div>
              <FaEnvelope className="text-gray-dark-9" fontSize={19} />
            </div>

            <input
              className="w-full border-none bg-transparent  text-[1.2rem] outline-none placeholder:text-gray-dark-11 focus:placeholder:text-gray-dark-13"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              pattern={`${emailRegex}`}
              placeholder="Your email"
            />
          </div>
        </div>
      </div>
      {!isValidEmail && (
        <p className="text-red-dark-11">Incorrect email format</p>
      )}

      <Button
        size="sm"
        disabled={!isValidEmail || email === '' || isSubscribing}
        onClick={handleSubscription}
      >
        {isSubscribing && <Loading size={20} />}
        {isSubscribing ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </>
  );
};

export default BiweeklySubscription;
