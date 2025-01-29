import {
  getPlans,
  getSubscriptions,
  createSubscription,
} from '@components/Eliza/api';
import { useAuthStore } from '@fleek-platform/login-button';
import ElizaIntegrationLayer from '@components/Eliza/ElizaIntegrationLayer.tsx';
import { getCookie } from '@utils/cookies';

export interface AgentsUIIntegrationProps {
  getReferralId?: () => string;
}

const getReferralIdFromCookie = () => {
  console.log('[debug] eliza.astro: getReferralIdFromCookie: ', 1)

  try {
     const promotekit_referral = getCookie('promotekit_referral');

    if (!promotekit_referral) throw Error('Promotekit referral cookie was not found!');

    console.log('[debug] eliza.astro: getReferralIdFromCookie: ', promotekit_referral)

    return promotekit_referral;
  } catch (_err) {
    console.warn(
      `User session is not a Promotekit referral`
    );

    return '';
  }
}

const getReferralId = () => {
  console.log('[debug] eliza.astro: getReferralId: ', 1)

  try {
    console.log('[debug] eliza.astro: getReferralId : ', window?.promotekit_referral)

    if (!window.promotekit_referral) throw Error('Promotekit referral not found in global window object!');

    return window.promotekit_referral;
  } catch (_err) {
    console.warn(
      `Promotekit referral is not available. Will check cookie`
    );
    return getReferralIdFromCookie();
  }
};

export const AgentsUIIntegration: React.FC<AgentsUIIntegrationProps> = (
  props,
) => {
  const { triggerLoginModal, accessToken, isLoggingIn, isLoggedIn, projectId } =
    useAuthStore();
  const login = () =>
    typeof triggerLoginModal === 'function' && triggerLoginModal(true);

  console.log(`[debug] AgentsUI: typeof getReferralId = ${typeof getReferralId}`);
  console.log(`[debug] AgentsUI: on init: getReferralId(): ${getReferralId && getReferralId()}`);
  
  return (
    <ElizaIntegrationLayer
      accessToken={accessToken}
      activeProjectId={projectId}
      isLoggedIn={isLoggedIn}
      isLoggingIn={isLoggingIn}
      getReferralId={getReferralId}
      login={login}
      getSubscriptions={getSubscriptions}
      getPlans={getPlans}
      createSubscription={createSubscription}
    />
  );
};

const AgentsUI: React.FC<AgentsUIIntegrationProps> = (props) => (
  <AgentsUIIntegration {...props} />
);

// to be used in Astro
export default AgentsUI;
