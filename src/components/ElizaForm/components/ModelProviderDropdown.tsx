import { Dropdown } from './Dropdown';
import { MODEL_PROVIDER_NAMES, MODEL_PROVIDER_NAMES_MAP } from '../constants';
import { Text } from './Text';
import { FaCheck } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import type { ModelProviderName } from '../types';

type ModelProviderDropdownProps = {
  modelProvider: ModelProviderName;
  onModelProviderSelect: (provider: ModelProviderName) => void;
};

export const ModelProviderDropdown: React.FC<ModelProviderDropdownProps> = ({
  modelProvider,
  onModelProviderSelect,
}) => {
  const [currentModelProvider, setCurrentModelProvider] =
    useState<ModelProviderName>(modelProvider);

  useEffect(() => {
    if (modelProvider !== currentModelProvider) {
      setCurrentModelProvider(modelProvider);
    }
  }, [modelProvider]);

  const triggerLabel = currentModelProvider
    ? MODEL_PROVIDER_NAMES_MAP[currentModelProvider].label
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
          const isSelected = currentModelProvider === provider;
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
