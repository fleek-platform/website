import '@fleek-platform/agents-ui/styles';

import { useAuthStore } from '@fleek-platform/login-button';
import { ElizaIntegrationLayer, api } from '@fleek-platform/agents-ui';

const { getPlans, getSubscriptions, createSubscription } = api;

export const AgentsUIIntegration: React.FC = () => {
  const { triggerLoginModal, accessToken, isLoggingIn, isLoggedIn, projectId } =
    useAuthStore();
  const login = () =>
    typeof triggerLoginModal === 'function' && triggerLoginModal(true);

  return (
    <ElizaIntegrationLayer
      accessToken={accessToken}
      activeProjectId={projectId}
      isLoggedIn={isLoggedIn}
      isLoggingIn={isLoggingIn}
      login={login}
      getSubscriptions={getSubscriptions}
      getPlans={getPlans}
      createSubscription={createSubscription}
    />
  );
};

const AgentsUI: React.FC = () => <AgentsUIIntegration />;

// to be used in Astro
export default AgentsUI;
