import {
  getPlans,
  getSubscriptions,
  createSubscription,
} from '@components/Eliza/api';
import { useAuthStore } from '@fleek-platform/login-button';
import ElizaIntegrationLayer from '@components/Eliza/ElizaIntegrationLayer.tsx';

export interface AgentsUIIntegrationProps {
  getReferralId?: () => string;
}

export const AgentsUIIntegration: React.FC<AgentsUIIntegrationProps> = (
  props,
) => {
  const { triggerLoginModal, accessToken, isLoggingIn, isLoggedIn, projectId } =
    useAuthStore();
  const { getReferralId } = props;
  const login = () =>
    typeof triggerLoginModal === 'function' && triggerLoginModal(true);

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
