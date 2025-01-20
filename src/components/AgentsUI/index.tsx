import { useProjects } from '@components/Eliza/hooks/useProjects';
import {
  getPlans,
  getSubscriptions,
} from '@components/AuthProvider/api/api.ts';
import { createSubscription } from '@components/AuthProvider/api/api';
import { useAuthStore } from '@fleek-platform/login-button';

// Import local implementation for now.
// In the future will import package implementation with the same interface.
import ElizaIntegrationLayer from '@components/Eliza/ElizaIntegrationLayer.tsx';

export const AgentsUIIntegration: React.FC = () => {
  console.log('[debug] AgentsUI: 1')
  const { activeProjectId, isLoggedIn, isLoggingIn } =
    useProjects();
  const { triggerLoginModal } = useAuthStore();
  const login = () => typeof triggerLoginModal === 'function' && triggerLoginModal(true);
  
  return (
    <ElizaIntegrationLayer
      isLoggedIn={isLoggedIn}
      isLoggingIn={isLoggingIn}
      login={login}
      activeProjectId={activeProjectId}
      getSubscriptions={getSubscriptions}
      getPlans={getPlans}
      createSubscription={createSubscription}
    />
  );
};

const AgentsUI: React.FC = () => (
  <AgentsUIIntegration />
);

// to be used in Astro
export default AgentsUI;
