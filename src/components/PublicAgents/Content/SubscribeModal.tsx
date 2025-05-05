import { Modal } from '@components/Modal/Modal';
import type React from 'react';
import type { PublicAgent } from '../config';
import { Button } from '../Button';
import { PiCoinsBold, PiCreditCardBold } from 'react-icons/pi';
import { useAuthStore } from '@fleek-platform/login-button';
import { useEffect, useRef } from 'react';
import {
  getOrCreateAgentThread,
  useAgentPlans,
  useFanSubscriptionModal,
  useHasFanPlan,
} from '@fleek-platform/agents-ui';
import toast from 'react-hot-toast';
import { getUserIdFromAccessToken } from '@utils/accessToken';

type SubscribeModalProps = {
  isOpen: boolean;
  agent: PublicAgent;
  closeModal: () => void;
};

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  agent,
  closeModal,
}) => {
  const { name, image } = agent;
  const { triggerLoginModal, isLoggedIn, accessToken, projectId } =
    useAuthStore();
  const pendingPayment = useRef(false);
  const { openSubscriptionModal, setOnSuccess } = useFanSubscriptionModal();
  const { refetchPlans } = useAgentPlans();

  const handlePay = async () => {
    try {
      if (!isLoggedIn) {
        if (typeof triggerLoginModal !== 'function') {
          throw new Error(
            `expected triggerLoginModal type to be a function but found ${typeof triggerLoginModal}`,
          );
        }
        closeModal();
        triggerLoginModal(true);
        pendingPayment.current = true;
        return;
      }

      closeModal();
      await startCheckout();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isLoggedIn && pendingPayment.current) {
      pendingPayment.current = false;
      void startCheckout();
    }
  }, [isLoggedIn]);

  const startCheckout = async () => {
    const { fan } = await refetchPlans();
    openSubscriptionModal({
      plan: fan,
    });
    setOnSuccess(onCheckoutSuccess.current);
    hasRun.current = false;
  };

  const onCheckoutSuccess = useRef(() => {});
  const hasRun = useRef(false);

  useEffect(() => {
    onCheckoutSuccess.current = async () => {
      if (hasRun.current) return;
      hasRun.current = true;
      try {
        if (!accessToken) {
          throw new Error('Missing accessToken');
        }
        const userId = getUserIdFromAccessToken(accessToken);
        if (!userId) {
          throw new Error('Missing userId');
        }

        await getOrCreateAgentThread({
          userId,
          accessToken,
          projectId,
          agentId: agent.id,
        });
        window.location.href = `${import.meta.env.PUBLIC_UI_AGENTS_APP_URL}/agent/${agent.id}`;
      } catch (e) {
        console.error(e);
        toast.error('Failed to create thread.');
      }
    };
  }, [accessToken, projectId, agent]);

  const { billing } = useHasFanPlan();
  useEffect(() => {
    if (billing?.activePlans) {
      onCheckoutSuccess.current();
    }
  }, [billing]);

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      modalContainerClassName="w-[341px] p-0 rounded-24"
    >
      <div className="flex w-full flex-col overflow-clip rounded-t-23">
        <div className="bg-gradient-to-b from-[#132D21] to-gray-dark-1 px-12 py-24 text-center">
          <p className="text-16 text-[#3DD68C]">7-day free trial</p>
        </div>
        <div className="flex flex-col items-center gap-24 p-24">
          <div className="flex gap-10 pl-[90px]">
            <img
              src={image}
              width={64}
              height={64}
              alt={name}
              className="rounded-16"
            />
            <div className="flex h-32 items-center rounded-8 bg-gray-dark-3 px-8 text-neutral-12">
              I'm waiting!
            </div>
          </div>
          <div className="flex flex-col items-center gap-12 text-center">
            <p className="text-28 font-medium leading-28 text-neutral-12">
              $10 / month
            </p>
            <p className="text-balance">
              Kick off your 7-day free trial on the Fan Plan and keep the convo
              going!
            </p>
          </div>
          <div className="flex w-full flex-col gap-12">
            <Button
              className="justify-center bg-neutral-12 text-gray-dark-1 hover:bg-white active:bg-neutral-12"
              onClick={handlePay}
            >
              <PiCreditCardBold className="size-16" />
              Pay with credit card
            </Button>
            <Button className="justify-center bg-gray-dark-3 hover:bg-gray-dark-4">
              <PiCoinsBold className="size-16" />
              Pay with crypto
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
