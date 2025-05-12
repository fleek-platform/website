import { useSession } from './useSession';

export const useDeployAgentCta = () => {
  const { isLoggedIn, handleLoginClick } = useSession();

  const deployAgentCta = () => {
    if (!isLoggedIn) {
      handleLoginClick();
      return;
    }

    window.location.href = import.meta.env.PUBLIC_APP_AGENTS_URL;
  };

  return { deployAgentCta };
};
