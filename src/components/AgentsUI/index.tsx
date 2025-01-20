import { useProjects } from '@components/Eliza/hooks/useProjects';
import {
  getPlans,
  getSubscriptions,
  createSubscription,
} from '@components/Eliza/api/api.ts';
import { useAuthStore } from '@fleek-platform/login-button';
import ElizaIntegrationLayer from '@components/Eliza/ElizaIntegrationLayer.tsx';

export const AgentsUIIntegration: React.FC = () => {
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
