import { cn } from '@utils/cn';
import type { PublicAgent } from './config';
import {
  PiArrowClockwiseBold,
  PiArrowUpBold,
  PiCaretDownBold,
  PiChartBarBold,
  PiChatCircleDotsBold,
  PiCoinsBold,
  PiCopyBold,
  PiDotsThreeBold,
  PiGlobeSimpleBold,
  PiGridFourBold,
  PiImageBold,
  PiMagicWandBold,
  PiMagnifyingGlassBold,
  PiNoteBold,
  PiPlusBold,
  PiReceiptBold,
  PiSidebarSimpleBold,
  PiSlidersHorizontalBold,
  PiSlideshowBold,
  PiThumbsDownBold,
  PiThumbsUpBold,
  PiUserBold,
  PiVideoBold,
} from 'react-icons/pi';

const Button: React.FC<
  React.PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        'flex h-36 items-center gap-8 rounded-12 px-8 font-medium transition-colors hover:bg-neutral-2 active:bg-neutral-1',
        props.className,
      )}
    >
      {children}
    </button>
  );
};

const IconButton: React.FC<
  React.PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      className={cn(
        'size-36 justify-center border border-neutral-7 px-0 text-neutral-12',
        props.className,
      )}
    >
      {children}
    </Button>
  );
};

type SidebarProps = {
  agent: PublicAgent;
};

const Sidebar: React.FC<SidebarProps> = ({ agent }) => {
  const { name, image } = agent;

  return (
    <div className="flex h-dvh flex-col justify-between gap-12 p-12">
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
          <Button>
            <PiPlusBold className="size-16" />
            Create
          </Button>
          <Button>
            <PiGridFourBold className="size-16" />
            Explore
          </Button>
          <Button>
            <PiCoinsBold className="size-16" />
            Earnings
          </Button>
          <div className="h-[1px] bg-neutral-6" />
        </div>
        <div className="flex flex-col gap-8">
          <Button className="justify-between">
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
    </div>
  );
};

const TabItem: React.FC<
  React.PropsWithChildren & React.HTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        '-mb-[1px] flex h-42 cursor-pointer items-center gap-4 border-b-2 border-transparent px-8 font-medium',
        props.className,
      )}
    >
      {children}
    </button>
  );
};

type ContentProps = {
  agent: PublicAgent;
};

const Content: React.FC<ContentProps> = ({ agent }) => {
  const { name, image, greeting } = agent;

  return (
    <div className="p-12 pl-0">
      <div className="flex h-full flex-col rounded-12 border border-neutral-6 bg-gray-dark-2">
        <div className="flex items-center justify-between p-12">
          <div className="flex items-center gap-8">
            <Button className="bg-gray-dark-3 text-neutral-12">
              <img
                src={image}
                width={16}
                height={16}
                alt={name}
                className="rounded-4"
              />
              {name}
              <PiCaretDownBold className="size-16" />
            </Button>
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
        <div className="flex items-center gap-12 border-b border-neutral-6 px-12">
          <TabItem className="border-neutral-12 text-neutral-12">
            <PiChatCircleDotsBold className="size-16" />
            Chat
          </TabItem>
          <TabItem>
            <PiNoteBold className="size-16" />
            Content
          </TabItem>
          <TabItem>
            <PiSlideshowBold className="size-16" />
            Gallery
          </TabItem>
          <TabItem>
            <PiChartBarBold className="size-16" />
            Analytics
          </TabItem>
          <TabItem>
            <PiReceiptBold className="size-16" />
            Services
          </TabItem>
        </div>
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
                <p className="font-medium leading-16 text-neutral-12">
                  {greeting}
                </p>
                <div className="flex items-center gap-12">
                  <PiArrowClockwiseBold className="size-16" />
                  <PiCopyBold className="size-16" />
                  <PiThumbsUpBold className="size-16" />
                  <PiThumbsDownBold className="size-16" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-12">
            <div className="overflow-clip rounded-12 border border-neutral-6 bg-gray-dark-4">
              <textarea
                placeholder="Message..."
                className="w-full resize-none bg-transparent p-16 text-neutral-12 outline-none placeholder:text-neutral-8"
                // biome-ignore lint/a11y/noAutofocus: static page
                autoFocus
              />
              <div className="flex items-center justify-between p-12">
                <div className="flex items-center gap-8">
                  <IconButton>
                    <PiPlusBold className="size-16" />
                  </IconButton>
                  <IconButton>
                    <PiSlidersHorizontalBold className="size-16" />
                  </IconButton>
                  <IconButton>
                    <PiMagicWandBold className="size-16" />
                  </IconButton>
                </div>
                <IconButton className="border-none bg-neutral-1 hover:bg-black">
                  <PiArrowUpBold />
                </IconButton>
              </div>
              <div className="flex items-center gap-8 bg-gray-dark-3 p-12">
                <Button className="border border-neutral-6">
                  <PiImageBold className="size-16 text-[#75C7F0]" /> Create
                  image
                </Button>
                <Button className="border border-neutral-6">
                  <PiVideoBold className="size-16 text-[#FF949D]" />
                  Create video
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type DashboardProps = {
  agent: PublicAgent;
};

export const Dashboard: React.FC<DashboardProps> = ({ agent }) => {
  const { id, name, image } = agent;

  return (
    <div className="grid grid-cols-[240px_minmax(0,1fr)_320px] font-inter">
      <Sidebar agent={agent} />
      <Content agent={agent} />
      <div>sidebar</div>
    </div>
  );
};
