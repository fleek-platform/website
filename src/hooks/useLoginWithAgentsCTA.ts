import { useCallback } from 'react';
import { useAuthStore } from '@fleek-platform/login-button';

import { setReferralQueryKeyValuePair } from '@utils/referrals';

export const useLoginWithAgentsCTA = () => {
  const { isLoggedIn, triggerLoginModal } = useAuthStore();

  const onDeployAgentCTA = useCallback(() => {
    if (!isLoggedIn) {
      setReferralQueryKeyValuePair('agents');

      if (typeof triggerLoginModal === 'function') {
        triggerLoginModal(true);
      }

      return;
    }

    window.location.href = import.meta.env.PUBLIC_UI_AGENTS_APP_URL;
  }, [isLoggedIn, triggerLoginModal]);

  return { onDeployAgentCTA };
};
