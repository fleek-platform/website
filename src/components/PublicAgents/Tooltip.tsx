import { cn } from '@utils/cn';
import type React from 'react';

type TooltipProps = React.PropsWithChildren & {
  content: React.ReactNode;
  className?: string;
  align?: 'center' | 'start';
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  className,
  align = 'center',
}) => {
  return (
    <div className="group relative">
      <div>{children}</div>
      <div
        className={cn(
          'absolute -top-30 hidden cursor-default whitespace-nowrap rounded-8 border border-neutral-6 bg-gray-dark-5 px-6 py-4 text-[13px] font-medium text-neutral-12 group-hover:block',
          { 'left-1/2 -translate-x-1/2': align === 'center' },
          className,
        )}
      >
        {content}
      </div>
    </div>
  );
};

export const PreviewModeTooltip: React.FC<
  React.PropsWithChildren & Partial<TooltipProps>
> = ({ children, content = 'Not available in preview mode', ...props }) => (
  <Tooltip content={content} {...props}>
    {children}
  </Tooltip>
);
