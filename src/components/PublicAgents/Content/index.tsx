import { PiSidebarSimpleBold } from 'react-icons/pi';
import type { PublicAgent } from '../config';
import { IconButton } from '../Button';
import { Typewriter } from './Typewriter';
import type React from 'react';
import { Tabs } from './Tabs';
import { ChatBox } from './ChatBox';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';
import { sleep } from '../sleep';
import { SubscribeModal } from './SubscribeModal';
import { LoginProvider } from '@fleek-platform/login-button';
import { setDefined, FanSubscriptionModal } from '@fleek-platform/agents-ui';
import '@fleek-platform/agents-ui/styles';
import { isClient } from '@utils/common';
import { createPortal } from 'react-dom';

setDefined({
  PUBLIC_FLEEK_REST_API_HOST: import.meta.env.PUBLIC_FLEEK_REST_API_HOST,
});

type ContentProps = {
  agent: PublicAgent;
};

export const Content: React.FC<ContentProps> = ({ agent }) => {
  const [userMsg, setUserMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  const { name, image } = agent;

  useEffect(() => {
    if (!isLoading) return;

    const onMsgReceived = async () => {
      await sleep(2000);
      setIsOpen(true);
    };

    onMsgReceived();
  }, [isLoading]);

  const onMsgSubmit = (msg: string) => {
    setUserMsg(msg);
    setIsLoading(true);
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setIsLoading(false);
    setHasClosed(true);
  };

  return (
    <div className="p-12">
      <LoginProvider
        graphqlApiUrl={import.meta.env.PUBLIC_GRAPHQL_ENDPOINT}
        dynamicEnvironmentId={import.meta.env.PUBLIC_DYNAMIC_ENVIRONMENT_ID}
      >
        {(props) => {
          return (
            <SubscribeModal
              isOpen={isOpen}
              closeModal={closeModal}
              agent={agent}
            />
          );
        }}
      </LoginProvider>

      {isClient &&
        createPortal(
          <div className="agents-ui">
            <FanSubscriptionModal />
          </div>,
          document.body,
        )}

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
