import { useState } from 'react';
import { publicAgents, type PublicAgent } from '../config';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PiCaretDownBold, PiCheckBold } from 'react-icons/pi';
import { cn } from '@utils/cn';

type DropdownProps = {
  agent: PublicAgent;
};

export const Dropdown: React.FC<DropdownProps> = ({ agent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { image, name } = agent;

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger className="flex h-36 select-none items-center gap-8 rounded-12 bg-gray-dark-3 px-8 font-medium text-neutral-12 outline-none hover:bg-gray-dark-4">
        <img
          src={image}
          width={16}
          height={16}
          alt={name}
          className="rounded-4"
        />
        {name}
        <PiCaretDownBold
          className={cn('size-16 transition-all', {
            'rotate-180': isOpen,
          })}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={4}
          align="start"
          className="rounded-12  border border-neutral-6 bg-gray-dark-4 p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-[.98]"
        >
          {publicAgents.map((p) => {
            const isSelected = p.id === agent.id;
            return (
              <DropdownMenu.Item key={p.id} className="outline-none">
                <a
                  href={String(p.id)}
                  className={cn(
                    'flex h-32 cursor-pointer items-center justify-between gap-24 rounded-8 px-8 font-medium outline-none hover:bg-gray-dark-3',
                    {
                      'text-neutral-12': isSelected,
                    },
                  )}
                >
                  <div className="flex items-center gap-8">
                    <img
                      src={p.image}
                      width={16}
                      height={16}
                      alt={p.name}
                      className="rounded-4"
                    />
                    {p.name}
                  </div>
                  {isSelected && <PiCheckBold className="size-16" />}
                </a>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
