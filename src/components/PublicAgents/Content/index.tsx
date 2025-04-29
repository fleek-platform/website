import {
  PiGlobeSimpleBold,
  PiMagnifyingGlassBold,
  PiSidebarSimpleBold,
} from 'react-icons/pi';
import type { PublicAgent } from '../config';
import { Button, IconButton } from '../ui/Button';
import { Dropdown } from './Dropdown';
import { Typewriter } from './Typewriter';
import type React from 'react';
import { Tabs } from './Tabs';
import { ChatBox } from './ChatBox';

type ContentProps = {
  agent: PublicAgent;
};

export const Content: React.FC<ContentProps> = ({ agent }) => {
  const { name, image, greeting } = agent;

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
          <div className="p-24">
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
          </div>
          <ChatBox />
        </div>
      </div>
    </div>
  );
};
