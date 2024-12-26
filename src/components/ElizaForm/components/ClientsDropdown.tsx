import { Dropdown } from '@components/ElizaForm/components/Dropdown';
import { CLIENT_NAMES, CLIENTS_MAP } from '../constants';
import { Badge } from '@components/ElizaForm/components/Badge';
import type { Client } from '../types';
import { Controller } from 'react-hook-form';
import { useElizaFormContext } from '../hooks/useElizaForm';

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

export const ClientsDropdown: React.FC = ({}) => {
  const { watch, control } = useElizaFormContext();

  const clients = watch('clients');

  return (
    <Controller
      control={control}
      name="clients"
      render={({ field }) => (
        <Dropdown.Root>
          <Dropdown.Trigger>
            <TriggerLabel clients={clients} />
          </Dropdown.Trigger>
          <Dropdown.Content>
            {CLIENT_NAMES.map((client) => {
              return (
                <Dropdown.CheckboxItem
                  key={client}
                  onSelect={(e) => e.preventDefault()}
                  checked={clients.some((c) => c === client)}
                  onCheckedChange={(isChecked) => {
                    if (isChecked) {
                      field.onChange([...clients, client]);
                    } else {
                      field.onChange(clients.filter((c) => c !== client));
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    {CLIENTS_MAP[client].label}
                  </div>
                </Dropdown.CheckboxItem>
              );
            })}
          </Dropdown.Content>
        </Dropdown.Root>
      )}
    />
  );
};
