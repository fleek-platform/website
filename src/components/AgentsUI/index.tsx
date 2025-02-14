// TODO: Export on bundle instead remove need for import
// see related ticket
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
  const authStoreInstance = useAuthStore();

  return (
    <ElizaIntegrationLayer
      authStoreInstance={authStoreInstance}
      getReferralId={getReferralId}
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
