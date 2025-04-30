import {
  PiCaretDownBold,
  PiCoinsBold,
  PiDotsThreeBold,
  PiGlobeSimpleBold,
  PiGridFourBold,
  PiPlusBold,
  PiSidebarSimpleBold,
  PiUserBold,
} from 'react-icons/pi';
import type { PublicAgent } from './config';
import { Button, IconButton } from './Button';
import { PreviewModeTooltip } from './Tooltip';

type SidebarProps = {
  agent: PublicAgent;
};

export const Sidebar: React.FC<SidebarProps> = ({ agent }) => {
  const { name, image } = agent;

  return (
    <div className="flex h-dvh flex-col justify-between gap-12 p-12 pr-0">
      <div className="flex flex-col gap-12">
        <div className="flex items-center justify-between">
          <img
            src="/svg/fleek-logo.svg"
            width={66}
            height={25}
            alt="fleek logo"
          />
          <IconButton>
            <PiSidebarSimpleBold className="size-16" />
          </IconButton>
        </div>
        <div className="flex flex-col gap-8">
          <Button className="pointer-events-none select-none">
            <PiPlusBold className="size-16" />
            Create
          </Button>
          <Button className="pointer-events-none select-none">
            <PiGridFourBold className="size-16" />
            Explore
          </Button>
          <Button className="pointer-events-none select-none">
            <PiCoinsBold className="size-16" />
            Earnings
          </Button>
          <div className="h-[1px] bg-neutral-6" />
        </div>
        <div className="flex flex-col gap-8">
          <Button className="pointer-events-none select-none justify-between">
            My agents <PiCaretDownBold className="size-16" />
          </Button>
          <Button className="justify-between bg-gray-dark-5 text-neutral-12 hover:bg-gray-dark-5 active:bg-gray-dark-5">
            <div className="flex items-center gap-8">
              <img
                src={image}
                width={16}
                height={16}
                alt={name}
                className="rounded-4"
              />
              {name}
            </div>
            <PiGlobeSimpleBold className="size-16" />
          </Button>
        </div>
      </div>
      <PreviewModeTooltip className="-top-34">
        <div className="overflow-clip rounded-12 border border-neutral-6">
          <div className="flex items-center justify-between border-b border-neutral-6 bg-gray-dark-3 p-12 text-12">
            <p>$0.00</p>
            <p className="text-neutral-12">Buy credits</p>
          </div>
          <div className="flex items-center justify-between p-12 font-medium text-neutral-12">
            <div className="flex items-center gap-8">
              <div className="flex size-36 items-center justify-center rounded-8 bg-gray-dark-3">
                <PiUserBold className="size-23 text-neutral-8" />
              </div>
              <p>Guest</p>
            </div>
            <PiDotsThreeBold className="size-16" />
          </div>
        </div>
      </PreviewModeTooltip>
    </div>
  );
};
