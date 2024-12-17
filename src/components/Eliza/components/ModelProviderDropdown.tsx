import { Dropdown } from '@components/Dropdown';
import {
  modelProviderNames,
  modelProviderNamesMap,
  type ModelProviderName,
} from '../constants';
import { Text } from '@components/LandingPage/Text';
import { FaCheck } from 'react-icons/fa6';

type ModelProviderDropdownProps = {
  modelProvider: ModelProviderName | null;
  onModelProviderSelect: (provider: ModelProviderName) => void;
};

export const ModelProviderDropdown: React.FC<ModelProviderDropdownProps> = ({
  modelProvider,
  onModelProviderSelect,
}) => {
  const triggerLabel = modelProvider
    ? modelProviderNamesMap[modelProvider].label
    : 'Select a provider';

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>{triggerLabel}</Dropdown.Trigger>
      <Dropdown.Content>
        {modelProviderNames.map((provider) => {
          const isSelected = modelProvider === provider;
          return (
            <Dropdown.Item
              key={provider}
              onClick={() => onModelProviderSelect(provider)}
            >
              <div className="flex items-center justify-between">
                <Text variant={isSelected ? 'primary' : 'secondary'}>
                  {modelProviderNamesMap[provider].label}
                </Text>
                {isSelected && <FaCheck className="size-14" />}
              </div>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
