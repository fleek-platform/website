import { useSession } from './useSession';

export const useDeployAgentCta = () => {
  const { isLoggedIn, handleLoginClick } = useSession();

  const deployAgentCta = () => {
    if (!isLoggedIn) {
      handleLoginClick();
      return;
    }

    window.location.href = import.meta.env.PUBLIC_UI_AGENTS_APP_URL;
  };

  return { deployAgentCta };
};
