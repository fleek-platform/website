import { Dropdown } from '@components/Eliza/components/Dropdown';
import { CLIENT_NAMES, CLIENTS_MAP } from '../utils/constants';
import { Badge } from '@components/Eliza/components/Badge';
import type { Client } from '../utils/types';
import {
  Controller,
  useWatch,
  type ControllerRenderProps,
} from 'react-hook-form';
import { useElizaForm } from '../hooks/useElizaForm';
import { Input } from './Input';
import { Box } from './Box';
import { useScrollToError } from '../hooks/useScrollToError';
import type { CharacterFormSchema } from '../utils/schema';

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
  } = useElizaForm();

  const clientsDropdownErrorRef = useScrollToError('clients', errors);

  const clients: CharacterFormSchema['clients'] = useWatch({
    control,
    name: 'clients',
  });

  const onCheckedChange = (
    field: ControllerRenderProps<CharacterFormSchema, 'clients'>,
    isChecked: boolean,
    client: Client,
  ) => {
    if (isChecked) {
      field.onChange([...clients, client]);
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
          <Box className="gap-4" ref={clientsDropdownErrorRef}>
            <Dropdown.Trigger error={Boolean(errors.clients)}>
              <TriggerLabel clients={clients} />
            </Dropdown.Trigger>
            {errors.clients && (
              <Input.Hint error>{errors.clients.message}</Input.Hint>
            )}
          </Box>
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
