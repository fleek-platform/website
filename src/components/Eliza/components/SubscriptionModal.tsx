import { useCallback, useState } from 'react';
import { Bolt, LoadingSpinner } from './Icons';
import toast from 'react-hot-toast';

interface SubscriptionModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onlyAiModule?: boolean;
  onSuccess?: (value?: boolean) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isVisible,
  setIsVisible,
  onlyAiModule,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = onlyAiModule ? 10 : 30;

  const handleOnSubmitClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Payment successful! - Pending implementation');
      onSuccess?.(true);
      setIsVisible(false);
      setIsLoading(false);
    }, 5000);
  };

  return isVisible ? (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-100 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.9)]">
      <div className="flex max-w-[416px] flex-col rounded-[16px] border-1 border-[#3a3a3a] bg-[#191919] text-[#eeeeee] ">
        <div className="flex flex-col items-center justify-center gap-[8px] border-b-1 border-b-[#3a3a3a] px-[16px] py-[24px]">
          {isLoading ? <LoadingSpinner /> : <Bolt />}
          <p className="text-center text-[18px] font-bold leading-[24px]">
            {isLoading ? 'Pending payment' : 'Upgrade your plan'}
          </p>
          <p className="text-center text-[14px] leading-[20px] text-[#b4b4b4]">
            {isLoading
              ? 'Continue making your payment to deploy your AI agent.'
              : 'To deploy an AI agent with Fleek, you need to be subscribed to a Pro Plan with the AI add-on module.'}
          </p>
          {!isLoading && (
            <div className="flex w-full flex-col gap-[16px] pt-[8px] text-[14px] font-medium leading-[20px]">
              {!onlyAiModule && (
                <p className="flex flex-row justify-between">
                  PRO Plan <span>$20 /mo</span>
                </p>
              )}
              <p className="flex flex-row justify-between">
                AI add-on module <span>$10 /mo</span>
              </p>
            </div>
          )}
        </div>
        <div className="p-[16px]">
          {!isLoading && (
            <div className="mb-[16px] flex flex-col gap-[16px] border-b-1 border-b-[#3a3a3a] pb-[16px] text-[14px] font-bold leading-[20px]">
              <p>Coming soon</p>
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
                  No, thanks
                </button>
                <button
                  className="h-[32px] w-full rounded-[8px] bg-[#2D2305] text-[#F5E147] hover:bg-[#362A07]"
                  onClick={handleOnSubmitClick}
                >
                  {`Subscribe for $${totalPrice} /mo`}
                </button>
              </>
            )}
            {isLoading && (
              <button className="h-[32px] w-full rounded-[8px] hover:text-[#ffffff]">
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
  const [onlyAiModule, setOnlyAiModule] = useState<boolean>(false);

  return {
    isSubscriptionModalVisible,
    setIsSubscriptionModalVisible,
    subscriptionModalCallback,
    setSubscriptionModalCallback,
    onlyAiModule,
    setOnlyAiModule,
  };
};
