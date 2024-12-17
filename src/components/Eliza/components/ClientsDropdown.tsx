import { Dropdown } from '@components/Dropdown';
import { clientNames, clientsMap, type Client } from '../constants';
import { Badge } from '@components/Badge';

type ClientsDropdownProps = {
  clients: Client[];
  onClientSelect: (clients: Client[]) => void;
};

export const ClientsDropdown: React.FC<ClientsDropdownProps> = ({
  clients,
  onClientSelect,
}) => {
  const triggerLabel =
    clients.length > 0
      ? clients.map((c) => <Badge key={c}>{clientsMap[c].label}</Badge>)
      : 'Select one or multiple clients';

  const handleCheckedChange = (isChecked: boolean, client: Client) => {
    const newClients = isChecked
      ? [...clients, client]
      : clients.filter((c) => c !== client);

    onClientSelect(newClients);
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>{triggerLabel}</Dropdown.Trigger>
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
              {clientsMap[client].label}
            </Dropdown.CheckboxItem>
          );
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
