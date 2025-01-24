import {
  getPlans,
  getSubscriptions,
  createSubscription,
} from '@components/Eliza/api';
import { useAuthStore } from '@fleek-platform/login-button';
import { ElizaIntegrationLayer } from '@fleek-platform/agents-ui';

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
