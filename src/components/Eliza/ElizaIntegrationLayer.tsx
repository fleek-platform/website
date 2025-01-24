import { useRef } from 'react';
import { Toaster } from 'react-hot-toast';

import {
  getAgentsByProjectId,
  getDeploymentStatus,
  triggerDeployment,
  type DeploymentStatus,
} from './api';
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

type CreateSubscriptionResponse = {
  ok: boolean;
  data?: {
    url?: string;
  };
  error?: string;
};

/** Main interface. */

export interface ElizaIntegrationLayerProps {
  // auth props
  accessToken?: string;
  activeProjectId?: string;
  referralId?: string;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  login: () => void;
  getSubscriptions: getSubscriptionsType;
  getPlans: getPlansType;
  createSubscription: (
    projectId?: string,
    productId?: string,
    token?: string,
    referralId?: string,
  ) => Promise<CreateSubscriptionResponse>;

  // settings.json is not passed as props but import should match paths in the host and the package
}

/** Package will define and export this component. */

export const ElizaIntegrationLayer: React.FC<ElizaIntegrationLayerProps> = ({
  accessToken,
  activeProjectId,
  isLoggedIn,
  isLoggingIn,
  referralId,
  login,
  getSubscriptions,
  getPlans,
  createSubscription,
}) => {
  const {
    isSubscriptionModalVisible,
    openSubscriptionModal,
    setIsSubscriptionModalVisible,
    subscriptionAmount,
    productId,
  } = useSubscriptionModal();
  const subscriptionModalCallbackRef = useRef<(value?: boolean) => void>();
  const triggerAgentDeployment = async (
    characterfile: string,
    projectId: string,
  ) => {
    if (!accessToken) return { ok: false };

    const res = await triggerDeployment(projectId, characterfile, accessToken);

    return {
      ok: res.ok,
      agentId: res?.data?.agentId ?? undefined,
    };
  };

  const getAgentDeploymentStatus = async (agentId: string) => {
    if (!accessToken) {
      return { ok: false, data: {} as DeploymentStatus };
    }

    const res = await getDeploymentStatus(agentId, accessToken);

    if (!res.ok || !res?.data) {
      return { ok: false, data: {} as DeploymentStatus };
    }

    return {
      ok: true,
      data: res.data,
    };
  };

  const checkUserAmountAvailableAiModules = async (projectId: string) => {
    if (!accessToken) return { hasEnoughAiModules: false, amount: 0 };

    try {
      const [plans, activeSubscriptions, projectAiAgents] = await Promise.all([
        getPlans(accessToken),
        getSubscriptions(projectId, accessToken),
        getAgentsByProjectId(projectId, accessToken),
      ]);

      if (
        !plans.ok ||
        !plans.data ||
        !activeSubscriptions.ok ||
        !projectAiAgents.ok ||
        !projectAiAgents.data
      ) {
        console.error(
          'Failed to fetch plans, active subscriptions or project AI agents',
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
        : {
            hasEnoughAiModules: false,
            amount: 0,
            productId: aiAgentProduct?.id,
          };
    } catch (error) {
      console.error('Failed to check user amount available ai modules', error);
      return false;
    }
  };

  const ensureUserSubscription = async (
    projectId: string,
  ): Promise<boolean> => {
    const res = await checkUserAmountAvailableAiModules(projectId);
    if (!res) return false;

    const { hasEnoughAiModules, amount, productId } = res;
    if (!hasEnoughAiModules && productId) {
      openSubscriptionModal(amount, productId);
      return false;
    }

    return true;
  };

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
        createSubscription={createSubscription}
        referralId={referralId}
      />
    </>
  );
};

export default ElizaIntegrationLayer;
