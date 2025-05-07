import { PiSidebarSimpleBold } from 'react-icons/pi';
import type { PublicAgent } from '../config';
import { IconButton } from '../Button';
import { Typewriter } from './Typewriter';
import type React from 'react';
import { Tabs } from './Tabs';
import { ChatBox } from './ChatBox';
import { useEffect, useRef, useState } from 'react';
import { Loading } from './Loading';
import { sleep } from '../sleep';
import { LoginProvider, useAuthStore } from '@fleek-platform/login-button';
import {
  setDefined,
  FanSubscriptionModal,
  useFanSubscriptionModal,
  getOrCreateAgentThread,
  useHasFanPlan,
} from '@fleek-platform/agents-ui';
import '@fleek-platform/agents-ui/styles';
import { isClient } from '@utils/common';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { getUserIdFromAccessToken } from '@utils/accessToken';
import { useMutation } from '@tanstack/react-query';

setDefined({
  PUBLIC_FLEEK_REST_API_HOST: import.meta.env.PUBLIC_FLEEK_REST_API_HOST,
});

type ContentProps = {
  agent: PublicAgent;
};

export const Content: React.FC<ContentProps> = ({ agent }) => {
  const [userMsg, setUserMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  const { openSubscriptionModal, setOnSuccess } = useFanSubscriptionModal();
  const { accessToken, projectId } = useAuthStore();

  const { name, image } = agent;

  useEffect(() => {
    if (!isLoading) return;

    const onMsgReceived = async () => {
      await sleep(2000);
      openModal();
    };

    onMsgReceived();
  }, [isLoading]);

  const onMsgSubmit = (msg: string) => {
    setUserMsg(msg);
    setIsLoading(true);
  };

  const { billing } = useHasFanPlan();

  const openModal = () => {
    if (billing?.activePlans) {
      onCheckoutSuccess.current();
      return;
    }
    openSubscriptionModal({
      agent,
    });
    setOnSuccess(onCheckoutSuccess.current);
    hasRun.current = false;
    setIsLoading(false);
    setHasClosed(true);
  };

  const onCheckoutSuccess = useRef(() => {});
  const hasRun = useRef(false);

  const { mutate: createThread } = useMutation({
    mutationFn: async () => {
      if (!accessToken) {
        throw new Error('Missing accessToken');
      }
      const userId = getUserIdFromAccessToken(accessToken);
      if (!userId) {
        throw new Error('Missing userId');
      }

      return getOrCreateAgentThread({
        userId,
        accessToken,
        projectId,
        agentId: agent.id,
      });
    },
    onSuccess: () => {
      localStorage.setItem(
        `fleek-xyz-influencer-payload-${agent.id}`,
        JSON.stringify({
          lead: userMsg,
        }),
      );
      window.location.href = `${import.meta.env.PUBLIC_UI_AGENTS_APP_URL}/agent/${agent.id}`;
    },
    onError: (e) => {
      console.error(e);
      toast.error('Failed to create thread.');
    },
    onSettled: () => {
      setIsLoading(false);
    },
    retry: 3,
  });

  useEffect(() => {
    onCheckoutSuccess.current = async () => {
      console.log('on checkout success!');
      if (hasRun.current) return;
      hasRun.current = true;
      setIsLoading(true);
      createThread();
    };
  }, [createThread]);

  const portalRef = useRef<React.ReactPortal>();

  useEffect(() => {
    if (isClient && !portalRef.current) {
      portalRef.current = createPortal(
        <div className="agents-ui">
          <FanSubscriptionModal />
        </div>,
        document.body,
      );
    }
  }, []);

  return (
    <div className="p-12">
      <LoginProvider
        graphqlApiUrl={import.meta.env.PUBLIC_GRAPHQL_ENDPOINT}
        dynamicEnvironmentId={import.meta.env.PUBLIC_DYNAMIC_ENVIRONMENT_ID}
      >
        {(props) => {
          return <></>;
        }}
      </LoginProvider>

      {portalRef.current}

      <div className="flex h-full flex-col rounded-12 border border-neutral-6 bg-gray-dark-2">
        <div className="flex items-center justify-between p-12">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-8 px-8 text-15 font-medium text-neutral-12">
              <img
                src={image}
                width={16}
                height={16}
                alt={name}
                className="rounded-4"
              />
              {name}
            </div>
          </div>
          <div className="flex items-center gap-8">
            <IconButton>
              <PiSidebarSimpleBold className="size-16" />
            </IconButton>
          </div>
        </div>
        <Tabs />
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-24 p-24">
            <div className="flex items-start gap-12">
              <img
                src={image}
                width={16}
                height={16}
                alt={name}
                className="rounded-4"
              />
              <div className="flex flex-col gap-16">
                <Typewriter text={/*greeting*/ `Hey, I'm ${agent.name}!`} />
              </div>
            </div>
            {userMsg && (
              <div className="ml-auto flex items-start gap-12 rounded-16 bg-gray-dark-4 p-12 text-right font-medium leading-14 text-neutral-12">
                {userMsg}
              </div>
            )}
            {isLoading && !hasClosed && (
              <div className="flex items-start gap-12">
                <img
                  src={image}
                  width={16}
                  height={16}
                  alt={name}
                  className="rounded-4"
                />
                <div className="flex flex-col gap-16">
                  <Loading />
                </div>
              </div>
            )}
          </div>
          <ChatBox
            isLoading={isLoading}
            hasClosed={hasClosed}
            onMsgSubmit={onMsgSubmit}
            openModal={openModal}
          />
        </div>
      </div>
    </div>
  );
};
