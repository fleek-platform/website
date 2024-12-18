import { Dropdown } from '@components/Dropdown';
import { clientNames, clientsMap, type Client } from '../constants';
import { Badge } from '@components/Badge';
import { FaImage, FaXmark } from 'react-icons/fa6';
import type { MouseEvent } from 'react';

type ImageProps = {
  client: Client;
};

const Image: React.FC<ImageProps> = ({ client }) => {
  if (!clientsMap[client].icon) {
    return (
      <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-neutral-3">
        <FaImage className="size-8 text-neutral-8" />
      </div>
    );
  }

  return (
    <img
      width={14}
      height={14}
      className="size-14"
      src={clientsMap[client].icon}
      alt={`${clientsMap[client].label} logo`}
    />
  );
};

type TriggerLabelProps = {
  clients: Client[];
  handleCheckedChange: (isChecked: boolean, client: Client) => void;
};

const TriggerLabel: React.FC<TriggerLabelProps> = ({
  clients,
  handleCheckedChange,
}) => {
  if (clients.length === 0) return <>Select one or multiple clients</>;

  const handleRemove = (e: MouseEvent, client: Client) => {
    console.log('rodei');
    e.preventDefault();
    e.stopPropagation();
    handleCheckedChange(false, client);
  };

  return (
    <>
      {clients.slice(0, 3).map((c) => (
        <Badge key={c}>
          <Image client={c} />
          {clientsMap[c].label}
          <div
            onClick={(e) => handleRemove(e, c)}
            className="flex size-14 items-center justify-center rounded-full bg-neutral-5 hover:bg-neutral-6"
          >
            <FaXmark className="size-10" />
          </div>
        </Badge>
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
  const handleCheckedChange = (isChecked: boolean, client: Client) => {
    const newClients = isChecked
      ? [...clients, client]
      : clients.filter((c) => c !== client);

    onClientSelect(newClients);
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <TriggerLabel
          clients={clients}
          handleCheckedChange={handleCheckedChange}
        />
      </Dropdown.Trigger>
      <Dropdown.Content>
        {clientNames.map((client) => {
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
                <Image client={client} />
                {clientsMap[client].label}
              </div>
            </Dropdown.CheckboxItem>
          );
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
