import '@fleek-platform/agents-ui/styles';

import { useAuthStore } from '@fleek-platform/login-button';
import { ElizaIntegrationLayer, api } from '@fleek-platform/agents-ui';

const { getPlans, getSubscriptions, createSubscription } = api;

export interface AgentsUIIntegrationProps {
  promoteKitReferralId?: string;
}

export const AgentsUIIntegration: React.FC<AgentsUIIntegrationProps> = (
  props,
) => {
  const { triggerLoginModal, accessToken, isLoggingIn, isLoggedIn, projectId } =
    useAuthStore();
  const { promoteKitReferralId } = props;
  const login = () =>
    typeof triggerLoginModal === 'function' && triggerLoginModal(true);

  return (
    <ElizaIntegrationLayer
      accessToken={accessToken}
      activeProjectId={projectId}
      isLoggedIn={isLoggedIn}
      isLoggingIn={isLoggingIn}
      referralId={promoteKitReferralId}
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
