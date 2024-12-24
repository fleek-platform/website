import { Dropdown } from '@components/ElizaForm/components/Dropdown';
import { CLIENT_NAMES, CLIENTS_MAP } from '../constants';
import { Badge } from '@components/ElizaForm/components/Badge';
import { FaImage } from 'react-icons/fa6';
import type { Client } from '../types';
import { useState } from 'react';

type ImageProps = {
  client: Client;
};

const Image: React.FC<ImageProps> = ({ client }) => {
  if (!CLIENTS_MAP[client].icon) {
    return (
      <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-elz-neutral-5">
        <FaImage className="size-8 text-elz-neutral-8" />
      </div>
    );
  }

  return CLIENTS_MAP[client].icon;
};

type TriggerLabelProps = {
  clients: Client[];
};

const TriggerLabel: React.FC<TriggerLabelProps> = ({ clients }) => {
  if (clients.length === 0) return 'Select one or multiple clients';

  return (
    <>
      {clients.slice(0, 3).map((c) => (
        <Badge key={c}>{CLIENTS_MAP[c].label}</Badge>
      ))}
      {clients.length > 3 && <Badge>+{clients.length - 3}</Badge>}
    </>
  );
};

type ClientsDropdownProps = {
  clients: Client[];
  onClientSelect: (clients: Client[]) => void;
};

export const ClientsDropdown: React.FC<ClientsDropdownProps> = ({
  clients,
  onClientSelect,
}) => {
  const [currentClients, setCurrentClients] = useState<Client[]>(clients || []);

  const handleCheckedChange = (isChecked: boolean, client: Client) => {
    const newClients = isChecked
      ? [...clients, client]
      : clients.filter((c) => c !== client);

    setCurrentClients(newClients);
    onClientSelect(newClients);
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <TriggerLabel clients={currentClients} />
      </Dropdown.Trigger>
      <Dropdown.Content>
        {CLIENT_NAMES.map((client) => {
          return (
            <Dropdown.CheckboxItem
              key={client}
              onSelect={(e) => e.preventDefault()}
              checked={clients.some((c) => c === client)}
              onCheckedChange={(isChecked) =>
                handleCheckedChange(isChecked, client)
              }
            >
              <div className="flex items-center gap-4">
                {CLIENTS_MAP[client].label}
              </div>
            </Dropdown.CheckboxItem>
          );
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
