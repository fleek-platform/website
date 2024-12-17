import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@utils/cn';
import React from 'react';
import { FaCheck, FaChevronDown } from 'react-icons/fa6';

const Root = DropdownMenu.Root;

const Trigger: React.FC<DropdownMenu.DropdownMenuTriggerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <DropdownMenu.Trigger
      className={cn(
        'group flex h-32 select-none items-center justify-between rounded-8 border border-neutral-6 bg-transparent px-8 outline-none transition-colors hover:bg-neutral-1 focus:ring-2 focus:ring-neutral-4',
        className,
      )}
      {...props}
    >
      {children}
      <FaChevronDown className="size-14 opacity-50 transition-all group-data-[state=open]:rotate-180" />
    </DropdownMenu.Trigger>
  );
};

const Content: React.FC<DropdownMenu.DropdownMenuContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        sideOffset={props.sideOffset || 6}
        align={props.align || 'start'}
        className={cn(
          'w-[var(--radix-dropdown-menu-trigger-width)] rounded-8 border border-neutral-6 bg-neutral-1 p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[.97] data-[state=open]:zoom-in-[.97]',
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
};

const Item: React.FC<DropdownMenu.DropdownMenuItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <DropdownMenu.Item
      className={cn(
        'cursor-pointer rounded-6 px-5 py-3 font-plex-sans text-14 outline-none hover:bg-neutral-2 focus:bg-neutral-2',
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  );
};

const CheckboxItem: React.FC<DropdownMenu.DropdownMenuCheckboxItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <DropdownMenu.CheckboxItem
      className={cn(
        'cursor-pointer rounded-6 px-5 py-3 font-plex-sans text-14 hover:bg-neutral-2',
        className,
      )}
      {...props}
    >
      {children}
      <DropdownMenu.ItemIndicator className="ml-auto">
        <FaCheck className="size-14 opacity-50" />
      </DropdownMenu.ItemIndicator>
    </DropdownMenu.CheckboxItem>
  );
};

const Separator: React.FC<DropdownMenu.DropdownMenuSeparatorProps> = ({
  className,
  ...props
}) => {
  return (
    <DropdownMenu.Separator
      className={cn('h-1 w-full bg-neutral-6', className)}
      {...props}
    />
  );
};

export const Dropdown = {
  Root,
  Trigger,
  Content,
  Item,
  CheckboxItem,
  Separator,
};
