import { Dropdown } from '@components/Dropdown';
import { clientNames, clientsMap, type Client } from '../constants';

type ClientsDropdownProps = {
  clients: Client[];
  onClientSelect: (clients: Client[]) => void;
};

export const ClientsDropdown: React.FC<ClientsDropdownProps> = ({
  clients,
  onClientSelect,
}) => {
  const triggerLabel =
    clients.length === 0 ? clients : 'Select one or multiple clients';

  const handleCheckedChange = (isChecked: boolean, client: Client) => {
    let newClients: Client[] = [...clients];

    if (isChecked) {
      newClients.push(client);
    } else {
      newClients = clients.filter((c) => c !== client);
    }

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
              checked={clients.some((c) => c === client)}
              onCheckedChange={(isChecked) =>
                handleCheckedChange(isChecked, client)
              }
              onSelect={(e) => e.preventDefault()}
            >
              {clientsMap[client].label}
            </Dropdown.CheckboxItem>
          );
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
