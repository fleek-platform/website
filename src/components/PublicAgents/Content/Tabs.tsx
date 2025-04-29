import { cn } from '@utils/cn';
import {
  PiChartBarBold,
  PiChatCircleDotsBold,
  PiNoteBold,
  PiReceiptBold,
  PiSlideshowBold,
} from 'react-icons/pi';

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

export const Tabs: React.FC = () => {
  return (
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
  );
};
