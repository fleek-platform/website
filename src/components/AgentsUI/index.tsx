import '@fleek-platform/agents-ui/styles';

import { useAuthStore } from '@fleek-platform/login-button';
import { getReferralId } from '@utils/promotekit';
import { ElizaIntegrationLayer, api } from '@fleek-platform/agents-ui';
import { captureEvent } from '@components/Tracking/trackingUtils';

const { getPlans, getSubscriptions, createSubscription } = api;

export interface AgentsUIIntegrationProps {
  apiUrl?: string;
}

export const AgentsUIIntegration: React.FC<AgentsUIIntegrationProps> = ({
  apiUrl,
}) => {
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
      getReferralId={getReferralId}
      login={login}
      getSubscriptions={getSubscriptions}
      getPlans={getPlans}
      createSubscription={createSubscription}
      captureEvent={captureEvent}
      apiUrl={apiUrl}
    />
  );
};

export const AgentsUI: React.FC<AgentsUIIntegrationProps> = ({ apiUrl }) => (
  <AgentsUIIntegration apiUrl={apiUrl} />
);
