import { AuthProvider } from '@components/AuthProvider/AuthProvider.tsx';
import { useAuthentication } from '@components/AuthProvider/useAuthentication.ts';
import {
  getPlans,
  getSubscriptions,
} from '@components/AuthProvider/api/api.ts';

// Import local implementation for now.
// In the future will import package implementation with the same interface.
import ElizaIntegrationLayer from '../Eliza/ElizaIntegrationLayer.tsx';

export const AgentsUIIntegration: React.FC = () => {
  const { isLoggedIn, login, activeProjectId, fetchFleekToken } =
    useAuthentication();

  return (
    <ElizaIntegrationLayer
      isLoggedIn={isLoggedIn}
      login={login}
      activeProjectId={activeProjectId}
      fetchFleekToken={fetchFleekToken}
      getSubscriptions={getSubscriptions}
      getPlans={getPlans}
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
