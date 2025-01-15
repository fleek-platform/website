import { AuthProvider } from '@components/AuthProvider/AuthProvider.tsx';
import { useAuthentication } from '@components/AuthProvider/useAuthentication.ts';
import {
  getPlans,
  getSubscriptions,
} from '@components/AuthProvider/api/api.ts';
import { createSubscription } from '@components/AuthProvider/api/api';

// Import local implementation for now.
// In the future will import package implementation with the same interface.
// import ElizaIntegrationLayer from '@components/Eliza/ElizaIntegrationLayer.tsx';
import { ElizaIntegrationLayer } from '@fleek-platform/agents-ui';

export const AgentsUIIntegration: React.FC = () => {
  const { isLoggedIn, isLoggingIn, login, activeProjectId, fetchFleekToken } =
    useAuthentication();

  return (
    <ElizaIntegrationLayer
      isLoggedIn={isLoggedIn}
      isLoggingIn={isLoggingIn}
      login={login}
      activeProjectId={activeProjectId}
      fetchFleekToken={fetchFleekToken}
      getSubscriptions={getSubscriptions}
      getPlans={getPlans}
      createSubscription={createSubscription}
    />
  );
};

const AgentsUI: React.FC = () => (
  <AuthProvider>
    <AgentsUIIntegration />
  </AuthProvider>
);

// to be used in Astro
export default AgentsUI;
