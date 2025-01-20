import {
  getPlans,
  getSubscriptions,
  createSubscription,
} from '@components/Eliza/api';
import { useAuthStore } from '@fleek-platform/login-button';
import ElizaIntegrationLayer from '@components/Eliza/ElizaIntegrationLayer.tsx';

export const AgentsUIIntegration: React.FC = () => {
  const { triggerLoginModal, accessToken, loading } = useAuthStore();
  const login = () => typeof triggerLoginModal === 'function' && triggerLoginModal(true);

  // TODO: Provide these pre-computed from login-button
  const isLoggedIn = !!accessToken;
  const isLoggingIn = loading;
  
  return (
    <ElizaIntegrationLayer
      isLoggedIn={isLoggedIn}
      isLoggingIn={isLoggingIn}
      login={login}
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
