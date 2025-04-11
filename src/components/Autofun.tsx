import { useEffect, type PropsWithChildren } from 'react';
import type React from 'react';
import { Text } from './LandingPage/Text';
import { useLoginWithAgentsCTA } from '@hooks/useLoginWithAgentsCTA';

const AUTOFUN_KEY = 'autofun_token_id';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full w-full max-w-[600px] flex-col justify-center gap-36 justify-self-center px-24 pb-[6.4rem] font-plex-sans text-14 text-gray-dark-11">
      <img
        src="/images/autofun/logo.svg"
        alt="Auto.fun logo"
        width={154}
        height={77}
      />
      {children}
    </div>
  );
};

export const AutofunHero: React.FC = () => {
  const { onDeployAgentCTA } = useLoginWithAgentsCTA();

  const params = new URLSearchParams(window.location.search);
  const localStorageTokenId = localStorage.getItem(AUTOFUN_KEY);
  const tokenId = params.get(AUTOFUN_KEY) || localStorageTokenId;

  useEffect(() => {
    if (localStorageTokenId || !tokenId) return;

    localStorage.setItem(AUTOFUN_KEY, tokenId);
  }, [localStorageTokenId, tokenId]);

  if (!tokenId)
    return (
      <Layout>
        <div className="space-y-12">
          <Text
            variant="subtitle"
            as="h1"
            className="text-[2.6rem] font-medium"
          >
            Invalid auto.fun token!
          </Text>
          <Text variant="paragraph" className="text-[1.6rem]">
            Please request the correct URL from auto.fun again.
          </Text>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="space-y-12">
        <Text variant="subtitle" as="h1" className="text-[2.6rem] font-medium">
          Welcome, auto.fun user!
        </Text>
        <Text variant="paragraph" className="text-[1.6rem]">
          Fleek helps you create and manage AI agents, starting at $10/month
          with a 7-day free trial. After creating your agent, you'll be
          redirected to auto.fun. You can return to Fleek at any time to manage
          your agents.
        </Text>
      </div>
      <button
        type="button"
        onClick={onDeployAgentCTA}
        className="mr-auto flex h-40 items-center whitespace-nowrap bg-[#04FF24] px-12 text-16 font-medium text-black"
      >
        Create your agent
      </button>
    </Layout>
  );
};
