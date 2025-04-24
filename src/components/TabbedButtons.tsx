import React from 'react';
import { cn } from '@utils/cn';

interface TabbedButtonsProps {
  buttons: React.ReactNode[];
}
export const TabbedButtons: React.FC<TabbedButtonsProps> = ({ buttons }) => {
  return (
    <div className="flex flex-row gap-0">
      {buttons.map((btn, index) => {
        const isFirst = index === 0;
        const isLast = index === buttons.length - 1;
        const currentButton = btn as React.ReactElement;
        const currentButtonProps = currentButton.props;
        const prevButton = buttons[index - 1] as React.ReactElement | undefined;
        const prevButtonProps = prevButton ? prevButton.props : null;
        const nextButton = buttons[index + 1] as React.ReactElement | undefined;
        const nextButtonProps = nextButton ? nextButton.props : null;

        const className = cn(
          currentButtonProps.className ?? '',
          {
            'rounded-l-8 rounded-r-none': isFirst,
            'rounded-r-8 rounded-l-none': isLast,
            'rounded-none': !isFirst && !isLast,
          },
          // Border logic for non-primary buttons
          !currentButtonProps?.variant.includes('primary') && {
            'border-l-transparent':
              !isFirst && prevButtonProps?.variant.includes('primary'),
            'border-r-transparent':
              !isLast &&
              (nextButtonProps?.variant.includes('primary') ||
                (nextButton && !nextButtonProps?.variant.includes('primary'))),
          },
        );
        // Clone the button element and add the calculated className
        return React.cloneElement(btn as React.ReactElement, { className });
      })}
    </div>
  );
};
