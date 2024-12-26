import { Dropdown } from '@components/ElizaForm/components/Dropdown';
import { CLIENT_NAMES, CLIENTS_MAP, SECRETS_CLIENT_MAP } from '../constants';
import { Badge } from '@components/ElizaForm/components/Badge';
import type { Character, Client } from '../types';
import { Controller, useWatch } from 'react-hook-form';
import { useElizaForm } from '../hooks/useElizaForm';
import { Input } from './Input';

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

export const ClientsDropdown: React.FC = () => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useElizaForm();

  const clients: Character['clients'] = useWatch({ name: 'clients' });

  return (
    <Controller
      control={control}
      name="clients"
      render={({ field }) => (
        <Dropdown.Root>
          <Dropdown.Trigger error={Boolean(errors.clients)}>
            <TriggerLabel clients={clients} />
          </Dropdown.Trigger>
          {errors.clients && (
            <Input.Hint error>{errors.clients.message}</Input.Hint>
          )}
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
                      setValue('settings.secrets', {
                        ...getValues('settings.secrets'),
                        ...SECRETS_CLIENT_MAP[client],
                      });
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
