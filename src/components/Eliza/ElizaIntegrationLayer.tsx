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

import { CoreEliza } from './CoreEliza.tsx';

type getSubscriptionsType = (
  projectId?: string,
  token?: string,
) => Promise<{
  ok: boolean;
  data?: {
    id: string;
    status: string;
    startDate: string;
    periodEndDate: string;
    productId: string;
    endDate?: string;
    items: {
      quantity: number;
      id: string;
      name: string;
      description: string;
      price: number;
      createdAt: string;
      updatedAt: string;
      metadata?: Record<string, string>;
      productId: string;
    }[];
  }[];
  error?: string;
}>;

type getPlansType = (token?: string) => Promise<{
  ok: boolean;
  data?: {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    metadata: Record<string, string>;
  }[];
  error?: string;
}>;

/** Main interface. */

export interface ElizaIntegrationLayerProps {
  // auth props
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  login: () => Promise<void>;
  activeProjectId: string;
  fetchFleekToken: (projectId?: string) => Promise<string | undefined>;
  getSubscriptions: getSubscriptionsType;
  getPlans: getPlansType;

  // settings.json is not passed as props but import should match paths in the host and the package
}

/** Package will define and export this component. */

export const ElizaIntegrationLayer: React.FC<ElizaIntegrationLayerProps> = ({
  isLoggedIn,
  isLoggingIn,
  login,
  activeProjectId,
  fetchFleekToken,
  getSubscriptions,
  getPlans,
}) => {
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
      />
    </>
  );
};

export default ElizaIntegrationLayer;
