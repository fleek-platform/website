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
import { createSubscription } from '@components/AuthProvider/api/api';

export const ElizaIntegration: React.FC = () => {
  const { isLoggedIn, isLoggingIn, login, activeProjectId, fetchFleekToken } =
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
        agentId: res?.data?.agentId ?? undefined,
      };
    },
    [activeProjectId],
  );

  const getAgentDeploymentStatus = useCallback(
    async (agentId: string) => {
      const token = await fetchFleekToken(activeProjectId);

      if (!token) {
        return { ok: false, data: {} as Record<string, 'true' | 'false'> };
      }

      const res = await getDeploymentStatus(agentId, token);
      if (!res.ok || !res?.data) {
        return { ok: false, data: {} as Record<string, 'true' | 'false'> };
      }

      return {
        ok: true,
        data: res.data,
      };
    },
    [activeProjectId],
  );

  const checkUserAmountAvailableAiModules = useCallback(async () => {
    const token = await fetchFleekToken(activeProjectId);
    if (!token) return { hasEnoughAiModules: false, amount: 0 };

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
      return { hasEnoughAiModules: false, amount: 0 };
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

    return aiAgentSubscriptionItem
      ? {
          hasEnoughAiModules:
            projectAiAgents.data?.data.length <
            aiAgentSubscriptionItem.quantity,
          amount: aiAgentSubscriptionItem.quantity,
          productId: aiAgentProduct?.id,
        }
      : { hasEnoughAiModules: false, amount: 0, productId: aiAgentProduct?.id };
  }, [activeProjectId]);

  const ensureUserSubscription = useCallback(async (): Promise<boolean> => {
    const { hasEnoughAiModules, amount, productId } =
      await checkUserAmountAvailableAiModules();

    if (!hasEnoughAiModules && productId) {
      openSubscriptionModal(amount, productId);
      return false;
    }

    return true;
  }, [activeProjectId]);

  return (
    <>
      <CoreEliza
        isLoggedIn={isLoggedIn}
        isLoggingIn={isLoggingIn}
        login={login}
        triggerAgentDeployment={triggerAgentDeployment}
        getAgentDeploymentStatus={getAgentDeploymentStatus}
        ensureUserSubscription={ensureUserSubscription}
        projectId={activeProjectId}
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
        checkUserAmountAvailableAiModules={checkUserAmountAvailableAiModules}
        productId={productId}
        fetchFleekToken={fetchFleekToken}
        createSubscription={createSubscription}
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
