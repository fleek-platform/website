import '@fleek-platform/agents-ui/styles';

import { useAuthStore } from '@fleek-platform/login-button';
import { ElizaIntegrationLayer, api } from '@fleek-platform/agents-ui';
import { captureEvent } from '@components/Tracking/trackingUtils';

const { getPlans, getSubscriptions, createSubscription } = api;

export interface AgentsUIIntegrationProps {
  promoteKitReferralId?: string;
  apiUrl?: string;
}

export const AgentsUIIntegration: React.FC<AgentsUIIntegrationProps> = ({
  promoteKitReferralId,
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
      referralId={promoteKitReferralId}
      login={login}
      getSubscriptions={getSubscriptions}
      getPlans={getPlans}
      createSubscription={createSubscription}
      captureEvent={captureEvent}
      apiUrl={apiUrl}
    />
  );
};

const AgentsUI: React.FC<AgentsUIIntegrationProps> = (props) => (
  <AgentsUIIntegration {...props} />
);

// to be used in Astro
export default AgentsUI;
