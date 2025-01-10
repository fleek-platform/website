import { AuthProvider } from '@components/AuthProvider/AuthProvider.tsx';
import { useAuthentication } from '@components/AuthProvider/useAuthentication.ts';
import {
  getPlans,
  getSubscriptions,
} from '@components/AuthProvider/api/api.ts';

import settings from '@base/settings.json';

// Import local implementation now. In the future will import package implementation with the same interface.
import ElizaIntegrationLayer from './ElizaIntegrationLayer.tsx';

export const ElizaIntegrationHost: React.FC = () => {
  const { isLoggedIn, login, activeProjectId, fetchFleekToken } =
    useAuthentication();

  const { getAgentDeploymentStatus, aiAgents } = settings.elizaPage.endpoints;

  return (
    <ElizaIntegrationLayer
      isLoggedIn={isLoggedIn}
      login={login}
      activeProjectId={activeProjectId}
      fetchFleekToken={fetchFleekToken}
      getSubscriptions={getSubscriptions}
      getPlans={getPlans}
      // unused, just for demo, resolved by imports
      getAgentDeploymentStatusEndpointUrl={getAgentDeploymentStatus}
      aiAgentsEndpointUrl={aiAgents}
    />
  );
};

const ElizaHost: React.FC = () => (
  <AuthProvider>
    <ElizaIntegrationHost />
  </AuthProvider>
);

// to be used in Astro
export default ElizaHost;
