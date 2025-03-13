// TODO: Export on bundle instead remove need for import
// see related ticket
import '@fleek-platform/agents-ui/styles';

import { useAuthStore } from '@fleek-platform/login-button';
import { getReferralId } from '@utils/promotekit';
import {
  ElizaIntegrationLayer,
  api,
  type Defined,
} from '@fleek-platform/agents-ui';
import { captureEvent } from '@components/Tracking/trackingUtils';

const { getPlans, getSubscriptions, createSubscription } = api;

export interface AgentsUIIntegrationProps {
  overrideDefined: Defined;
  basePath: `/${string}`;
}

export const AgentsUIIntegration: React.FC<AgentsUIIntegrationProps> = ({
  overrideDefined,
  basePath,
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
      basePath={basePath}
    />
  );
};

// TODO: Should the base path for eliza be defined
// as an environment variable?
export const AgentsUI: React.FC<AgentsUIIntegrationProps> = ({
  overrideDefined,
  basePath,
}) => (
  <AgentsUIIntegration basePath={basePath} overrideDefined={overrideDefined} />
);
