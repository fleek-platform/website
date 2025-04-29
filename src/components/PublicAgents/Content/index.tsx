import {
  PiGlobeSimpleBold,
  PiMagnifyingGlassBold,
  PiSidebarSimpleBold,
} from 'react-icons/pi';
import type { PublicAgent } from '../config';
import { Button, IconButton } from '../Button';
import { Dropdown } from './Dropdown';
import { Typewriter } from './Typewriter';
import type React from 'react';
import { Tabs } from './Tabs';
import { ChatBox } from './ChatBox';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';
import { sleep } from '../sleep';

type ContentProps = {
  agent: PublicAgent;
};

export const Content: React.FC<ContentProps> = ({ agent }) => {
  const [userMsg, setUserMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { name, image, greeting } = agent;

  const onMsgSubmit = (msg: string) => {
    setUserMsg(msg);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    const onMsgReceived = async () => {
      await sleep(2000);
      setIsOpen(true);
    };

    onMsgReceived();
  }, [isLoading]);

  return (
    <div className="p-12">
      <div className="flex h-full flex-col rounded-12 border border-neutral-6 bg-gray-dark-2">
        <div className="flex items-center justify-between p-12">
          <div className="flex items-center gap-8">
            <Dropdown agent={agent} />
            <Button className="justify-center border border-neutral-7 text-neutral-12">
              <PiGlobeSimpleBold className="size-16" />
              Public
            </Button>
          </div>
          <div className="flex items-center gap-8">
            <IconButton>
              <PiMagnifyingGlassBold className="size-16" />
            </IconButton>
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
                <Typewriter text={greeting} />
              </div>
            </div>
            {userMsg && (
              <div className="ml-auto flex items-start gap-12 rounded-16 bg-gray-dark-4 p-12 text-right font-medium leading-14 text-neutral-12">
                {userMsg}
              </div>
            )}
            {isLoading && (
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
          <ChatBox onMsgSubmit={onMsgSubmit} />
        </div>
      </div>
    </div>
  );
};
