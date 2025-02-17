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
  const apiConfig = {
    restApiUrl: import.meta.env.PUBLIC_FLEEK_REST_API_URL,
    uiAppUrl: import.meta.env.PUBLIC_UI_APP_URL,
    beehiivProxyServerUrl: import.meta.env.PUBLIC_BEEHIIV_PROXY_SERVER_URL,
    graphqlApiUrl: import.meta.env.PUBLIC_GRAPHQL_API_URL,
  };

  return (
    <ElizaIntegrationLayer
      authStoreInstance={authStoreInstance}
      getReferralId={getReferralId}
      getSubscriptions={getSubscriptions}
      getPlans={getPlans}
      createSubscription={createSubscription}
      captureEvent={captureEvent}
      apiConfig={apiConfig}
    />
  );
};

export const AgentsUI: React.FC<AgentsUIIntegrationProps> = ({ apiUrl }) => (
  <AgentsUIIntegration apiUrl={apiUrl} />
);
