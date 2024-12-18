import { Dropdown } from '@components/ElizaForm/components/Dropdown';
import { clientNames, type Client, type LabelAndIcon } from '../constants';
import { Badge } from '@components/ElizaForm/components/Badge';
import { FaImage } from 'react-icons/fa6';
import { Discord, Telegram, X } from './ClientIcons';

const CLIENTS_MAP: Record<Client, LabelAndIcon> = {
  discord: {
    label: 'Discord',
    icon: <Discord className="size-14" />,
  },
  direct: {
    label: 'Direct',
    icon: '',
  },
  twitter: {
    label: 'X',
    icon: <X className="size-14" />,
  },
  telegram: {
    label: 'Telegram',
    icon: <Telegram className="size-14" />,
  },
  farcaster: {
    label: 'Farcaster',
    icon: '',
  },
  lens: {
    label: 'Lens',
    icon: '',
  },
  auto: {
    label: 'Auto',
    icon: '',
  },
  slack: {
    label: 'Slack',
    icon: '',
  },
};

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
        <Badge key={c}>
          <Image client={c} />
          {CLIENTS_MAP[c].label}
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
        <TriggerLabel clients={clients} />
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
                {CLIENTS_MAP[client].label}
              </div>
            </Dropdown.CheckboxItem>
          );
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
