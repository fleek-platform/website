type SubscribeNewUserArgs = {
  email: string;
  utmSource?: string;
};

const BEEHIIV_URL = import.meta.env.PUBLIC_BEEHIIV_PROXY_SERVER_URL;

const UTM_SOURCE = 'agents-landing-page' as const;

export const useBeehiiv = () => {
  const subscribeNewUser = async ({
    email,
    utmSource = UTM_SOURCE,
  }: SubscribeNewUserArgs) => {
    if (!BEEHIIV_URL)
      throw Error('Missing PUBLIC_BEEHIIV_PROXY_SERVER_URL env variable');

    try {
      await fetch(BEEHIIV_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          utmSource,
        }),
      });
    } catch (e) {
      console.error({ status: 'user could not be subscribed', error: e });
    }
  };

  return { subscribeNewUser };
};
