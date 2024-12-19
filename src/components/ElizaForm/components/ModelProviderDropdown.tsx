import { Dropdown } from './Dropdown';
import { MODEL_PROVIDER_NAMES, MODEL_PROVIDER_NAMES_MAP } from '../constants';
import { Text } from './Text';
import { FaCheck } from 'react-icons/fa6';
import { useState } from 'react';
import type { ModelProviderName } from '../types';

type ModelProviderDropdownProps = {
  modelProvider: ModelProviderName | null;
  onModelProviderSelect: (provider: ModelProviderName) => void;
};

export const ModelProviderDropdown: React.FC<ModelProviderDropdownProps> = ({
  modelProvider,
  onModelProviderSelect,
}) => {
  const [currentModalProvider, setCurrentModelProvider] =
    useState<ModelProviderName | null>(modelProvider || null);

  const triggerLabel = currentModalProvider
    ? MODEL_PROVIDER_NAMES_MAP[currentModalProvider].label
    : 'Select a provider';

  const handleClick = (provider: ModelProviderName) => {
    setCurrentModelProvider(provider);
    onModelProviderSelect(provider);
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>{triggerLabel}</Dropdown.Trigger>
      <Dropdown.Content>
        {MODEL_PROVIDER_NAMES.map((provider) => {
          const isSelected = currentModalProvider === provider;
          return (
            <Dropdown.Item key={provider} onClick={() => handleClick(provider)}>
              <div className="flex items-center justify-between">
                <Text variant={isSelected ? 'primary' : 'secondary'}>
                  {MODEL_PROVIDER_NAMES_MAP[provider].label}
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
