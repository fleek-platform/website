// TODO: Export on bundle instead remove need for import
// see related ticket
import '@fleek-platform/agents-ui/styles';

import { useAuthStore } from '@fleek-platform/login-button';
import { getReferralId } from '@utils/promotekit';
import { ElizaIntegrationLayer, api, type Defined } from '@fleek-platform/agents-ui';
import { captureEvent } from '@components/Tracking/trackingUtils';

const { getPlans, getSubscriptions, createSubscription } = api;

export interface AgentsUIIntegrationProps {
  overrideDefined: Defined;
}

export const AgentsUIIntegration: React.FC<AgentsUIIntegrationProps> = ({
  overrideDefined,
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
      overrideDefined={overrideDefined}
    />
  );
};

export const AgentsUI: React.FC<AgentsUIIntegrationProps> = ({ overrideDefined }) => (
  <AgentsUIIntegration overrideDefined={overrideDefined} />
);
