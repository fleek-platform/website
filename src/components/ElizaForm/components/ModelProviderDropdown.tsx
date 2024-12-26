import { Dropdown } from './Dropdown';
import { MODEL_PROVIDER_NAMES, MODEL_PROVIDER_NAMES_MAP } from '../constants';
import { Text } from './Text';
import { FaCheck } from 'react-icons/fa6';
import { useElizaFormContext } from '../hooks/useElizaForm';
import { Controller } from 'react-hook-form';

export const ModelProviderDropdown: React.FC = ({}) => {
  const { watch, control } = useElizaFormContext();

  const provider = watch('modelProvider');

  const triggerLabel = provider
    ? MODEL_PROVIDER_NAMES_MAP[provider].label
    : 'Select a provider';

  return (
    <Controller
      control={control}
      name="modelProvider"
      render={({ field }) => (
        <Dropdown.Root>
          <Dropdown.Trigger>{triggerLabel}</Dropdown.Trigger>
          <Dropdown.Content>
            {MODEL_PROVIDER_NAMES.map((provider) => {
              const isSelected = field.value === provider;
              return (
                <Dropdown.Item
                  key={provider}
                  onClick={() => {
                    field.onChange(provider);
                  }}
                >
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
      )}
    />
  );
};
