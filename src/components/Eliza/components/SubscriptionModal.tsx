import { useState } from 'react';
import { Bolt, LoadingSpinner } from './Icons';
import toast from 'react-hot-toast';
import type { ElizaIntegrationLayerProps } from '@components/Eliza/ElizaIntegrationLayer';
import { useAuthStore } from '../../../store/authStore';

interface SubscriptionModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  activeProjectId?: string;
  onSuccess?: (value?: boolean) => void;
  subscriptionAmount: number;
  productId?: string;
  checkUserAmountAvailableAiModules: () => Promise<any>;
  createSubscription: ElizaIntegrationLayerProps['createSubscription'];
}

const AI_MODULE_PRICE = 20;

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isVisible,
  setIsVisible,
  onSuccess,
  activeProjectId,
  subscriptionAmount,
  productId,
  checkUserAmountAvailableAiModules,
  createSubscription,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useAuthStore();

  const handleOnSubmitClick = async () => {
    const POLLING_INTERVAL = 5000;
    const MAX_ATTEMPTS = 20;

    if (!activeProjectId || !accessToken) return;

    setIsLoading(true);

    const subscriptionCreationResponse = await createSubscription(
      activeProjectId,
      productId,
      accessToken,
    );

    if (
      !subscriptionCreationResponse ||
      !subscriptionCreationResponse.ok ||
      !subscriptionCreationResponse.data?.url
    ) {
      toast.error('Failed to create subscription');
      setIsLoading(false);
      return;
    }

    window.open(subscriptionCreationResponse.data?.url, '_blank');

    const pollSubscriptionStatus = async (attempt: number) => {
      try {
        const result = await checkUserAmountAvailableAiModules();

        if (result.hasEnoughAiModules) {
          setIsLoading(false);
          setIsVisible(false);
          onSuccess?.(true);
          toast.success('Subscription activated successfully!');
          return;
        }

        if (attempt >= MAX_ATTEMPTS) {
          setIsLoading(false);
          toast.error('Subscription verification timed out. Please try again.');
          return;
        }

        setTimeout(() => pollSubscriptionStatus(attempt + 1), POLLING_INTERVAL);
      } catch (error) {
        setIsLoading(false);
        toast.error('Failed to verify subscription status');
      }
    };

    pollSubscriptionStatus(0);
  };

  return isVisible ? (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-100 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.9)]">
      <div className="flex w-full max-w-[416px] flex-col rounded-[16px] border-1 border-[#3a3a3a] bg-[#191919] text-[#eeeeee] ">
        <div className="flex flex-col items-center justify-center gap-[8px] border-b-1 border-b-[#3a3a3a] px-[16px] py-[24px]">
          {isLoading ? <LoadingSpinner /> : <Bolt />}
          <p className="text-center text-[18px] font-bold leading-[24px]">
            {isLoading ? 'Pending payment' : 'Upgrade your plan'}
          </p>
          <p className="text-center text-[14px] leading-[20px] text-[#b4b4b4]">
            {isLoading
              ? 'Continue making your payment to deploy your AI agent.'
              : `To deploy an AI agent, you need an ${subscriptionAmount > 1 ? 'additional' : ''} AI Agent Plan`}
          </p>
          {!isLoading && (
            <div className="flex w-full flex-col gap-[16px] pt-[8px] text-[14px] font-medium leading-[20px]">
              <p className="flex flex-row justify-between">
                AI Agent Plan <span>${AI_MODULE_PRICE} /mo</span>
              </p>
            </div>
          )}
        </div>

        <div className="p-[16px]">
          {!isLoading && (
            <div className="mb-[16px] flex flex-col gap-[16px] border-b-1 border-b-[#3a3a3a] pb-[16px] text-[14px] leading-[20px]">
              <p className="font-bold">Coming soon</p>
              <p className="flex flex-row gap-[6px]">
                <Bolt variant="small" />
                Manage your agents in UI
              </p>
              <p className="flex flex-row gap-[6px]">
                <Bolt variant="small" />
                Collaborate to build agents
              </p>
              <p className="flex flex-row gap-[6px]">
                <Bolt variant="small" />
                Create personalities
              </p>
            </div>
          )}

          <div className="flex flex-row items-center justify-center gap-[16px] text-[14px] font-medium leading-[20px]">
            {!isLoading && (
              <>
                <button
                  className="h-[32px] w-full rounded-[8px] hover:text-[#ffffff]"
                  onClick={() => setIsVisible(false)}
                >
                  No thanks
                </button>
                <button
                  className="h-[32px] w-full rounded-[8px] bg-[#2D2305] text-[#F5E147] hover:bg-[#362A07]"
                  onClick={handleOnSubmitClick}
                >
                  {`Subscribe for $${AI_MODULE_PRICE} /mo`}
                </button>
              </>
            )}
            {isLoading && (
              <button
                className="h-[32px] w-full rounded-[8px] hover:text-[#ffffff]"
                onClick={() => setIsVisible(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export const useSubscriptionModal = () => {
  const [isSubscriptionModalVisible, setIsSubscriptionModalVisible] =
    useState<boolean>(false);
  const [subscriptionModalCallback, setSubscriptionModalCallback] =
    useState<(value?: boolean) => void>();
  const [subscriptionAmount, setSubscriptionAmount] = useState<
    number | undefined
  >(undefined);
  const [productId, setProductId] = useState<string | undefined>(undefined);

  const openSubscriptionModal = (
    subscriptionAmount: number | undefined,
    productId: string | undefined,
  ) => {
    setSubscriptionAmount(subscriptionAmount);
    setProductId(productId);
    setIsSubscriptionModalVisible(true);
  };

  return {
    isSubscriptionModalVisible,
    openSubscriptionModal,
    subscriptionModalCallback,
    setSubscriptionModalCallback,
    setIsSubscriptionModalVisible,
    subscriptionAmount,
    productId,
  };
};
