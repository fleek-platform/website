import { useCallback, useRef } from 'react';
import { Toaster } from 'react-hot-toast';

import {
  getAgentsByProjectId,
  getDeploymentStatus,
  triggerDeployment,
} from './api/api.ts';
import {
  SubscriptionModal,
  useSubscriptionModal,
} from './components/SubscriptionModal.tsx';
import { AuthProvider } from '@components/AuthProvider/AuthProvider.tsx';
import { useAuthentication } from '@components/AuthProvider/useAuthentication.ts';
import { CoreEliza } from './CoreEliza.tsx';
import {
  getPlans,
  getSubscriptions,
} from '@components/AuthProvider/api/api.ts';

export const ElizaIntegration: React.FC = () => {
  const { isLoggedIn, login, activeProjectId, fetchFleekToken } =
    useAuthentication();
  const {
    isSubscriptionModalVisible,
    openSubscriptionModal,
    setIsSubscriptionModalVisible,
    subscriptionAmount,
    productId,
  } = useSubscriptionModal();
  const subscriptionModalCallbackRef = useRef<(value?: boolean) => void>();

  const triggerAgentDeployment = useCallback(
    async (characterfile?: string) => {
      const token = await fetchFleekToken();
      if (!token || !characterfile) return { ok: false };

      const res = await triggerDeployment(
        activeProjectId,
        characterfile,
        token,
      );

      return {
        ok: res.ok,
        deploymentId: res?.data?.deploymentId ?? undefined,
      };
    },
    [activeProjectId],
  );

  const getAgentDeploymentStatus = async (deploymentId: string) => {
    const token = await fetchFleekToken();

    if (!token) return { ok: false };
    return getDeploymentStatus(deploymentId, token);
  };

  const ensureUserSubscription = useCallback(async (): Promise<boolean> => {
    const token = await fetchFleekToken();
    if (!token) return false;

    const [plans, activeSubscriptions, projectAiAgents] = await Promise.all([
      getPlans(token),
      getSubscriptions(activeProjectId, token),
      getAgentsByProjectId(activeProjectId, token),
    ]);

    if (
      !plans.ok ||
      !plans.data ||
      !activeSubscriptions.ok ||
      !projectAiAgents.ok ||
      !projectAiAgents.data
    ) {
      console.error(
        "it wasn't possible to fetch plans, active subscriptions or project ai agents",
        { plans, activeSubscriptions, projectAiAgents },
      );
      return false;
    }

    const aiAgentProduct = plans.data?.find(
      (p) => p.name.toLowerCase() === 'ai agent',
    );
    const aiAgentSubscription = activeSubscriptions.data
      ?.filter((sub) => sub.status.toLowerCase() === 'active')
      .find((sub) => sub.productId === aiAgentProduct?.id);
    const aiAgentSubscriptionItem = aiAgentSubscription?.items.find(
      (sub) => sub.productId === aiAgentProduct?.id,
    );

    const hasEnoughAiModules = aiAgentSubscriptionItem
      ? projectAiAgents.data?.data.length < aiAgentSubscriptionItem.quantity
      : false;

    if (!hasEnoughAiModules) {
      openSubscriptionModal(
        aiAgentSubscriptionItem?.quantity,
        aiAgentProduct?.id,
      );
      return false;
    }

    return true;
  }, [activeProjectId]);

  return (
    <>
      <CoreEliza
        isLoggedIn={isLoggedIn}
        login={login}
        triggerAgentDeployment={triggerAgentDeployment}
        getAgentDeploymentStatus={getAgentDeploymentStatus}
        ensureUserSubscription={ensureUserSubscription}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#222222',
            color: '#fff',
            fontSize: '12px',
          },
        }}
      />

      <SubscriptionModal
        isVisible={isSubscriptionModalVisible}
        setIsVisible={setIsSubscriptionModalVisible}
        onSuccess={subscriptionModalCallbackRef.current}
        activeProjectId={activeProjectId}
        subscriptionAmount={subscriptionAmount ?? 0}
        productId={productId}
      />
    </>
  );
};

const Eliza: React.FC = () => (
  <AuthProvider>
    <ElizaIntegration />
  </AuthProvider>
);

export default Eliza;
