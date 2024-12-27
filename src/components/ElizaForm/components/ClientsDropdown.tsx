import { Dropdown } from '@components/ElizaForm/components/Dropdown';
import { CLIENT_NAMES, CLIENTS_MAP, SECRETS_CLIENT_MAP } from '../constants';
import { Badge } from '@components/ElizaForm/components/Badge';
import type { Client } from '../types';
import {
  Controller,
  useWatch,
  type ControllerRenderProps,
} from 'react-hook-form';
import { useElizaForm, type CharacterSchema } from '../hooks/useElizaForm';
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
    setValue,
  } = useElizaForm();

  const clients: CharacterSchema['clients'] = useWatch({ name: 'clients' });
  const settings = useWatch({ name: 'settings' });

  const updateSettings = (client: Client) => {
    setValue('settings', {
      ...settings,
      secrets: {
        ...settings?.secrets,
        ...SECRETS_CLIENT_MAP[client],
      },
    });
  };

  const onCheckedChange = (
    field: ControllerRenderProps<CharacterSchema, 'clients'>,
    isChecked: boolean,
    client: Client,
  ) => {
    if (isChecked) {
      field.onChange([...clients, client]);
      updateSettings(client);
    } else {
      field.onChange(clients.filter((c) => c !== client));
    }
  };

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
            {CLIENT_NAMES.map((client) => (
              <Dropdown.CheckboxItem
                key={client}
                onSelect={(e) => e.preventDefault()}
                checked={clients.some((c) => c === client)}
                onCheckedChange={(isChecked) =>
                  onCheckedChange(field, isChecked, client)
                }
              >
                <div className="flex items-center gap-4">
                  {CLIENTS_MAP[client].label}
                </div>
              </Dropdown.CheckboxItem>
            ))}
          </Dropdown.Content>
        </Dropdown.Root>
      )}
    />
  );
};
