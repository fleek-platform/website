import { cn } from '@utils/cn';
import {
  PiChartBarBold,
  PiChatCircleDotsBold,
  PiNoteBold,
  PiReceiptBold,
  PiSlideshowBold,
} from 'react-icons/pi';
import { PreviewModeTooltip } from '../Tooltip';

const TabItem: React.FC<
  React.PropsWithChildren &
    React.HTMLAttributes<HTMLButtonElement> & {
      hideTooltip?: boolean;
    }
> = ({ children, hideTooltip, ...props }) => {
  const button = (
    <button
      {...props}
      className={cn(
        '-mb-[1px] flex h-42 cursor-pointer select-none items-center gap-4 border-b-2 border-transparent px-8 font-medium',
        { 'cursor-not-allowed text-gray-dark-10': !hideTooltip },
        props.className,
      )}
    >
      {children}
    </button>
  );

  if (hideTooltip) return button;

  return <PreviewModeTooltip>{button}</PreviewModeTooltip>;
};

export const Tabs: React.FC = () => {
  return (
    <div className="flex items-center gap-12 border-b border-neutral-6 px-12">
      <TabItem className="border-neutral-12 text-neutral-12" hideTooltip>
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
