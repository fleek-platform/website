import { Dropdown } from '@components/Eliza/components/Dropdown';
import {
  PLUGIN_CATEGORIES,
  PLUGIN_NAMES,
  PLUGINS_MAP,
} from '../utils/constants';
import { Badge } from '@components/Eliza/components/Badge';
import type { Plugin } from '../utils/types';
import {
  Controller,
  useWatch,
  type ControllerRenderProps,
} from 'react-hook-form';
import { useElizaForm } from '../hooks/useElizaForm';
import { Input } from './Input';
import { Box } from './Box';
import type { CharacterFormSchema } from '../utils/schema';
import { Text } from './Text';
import { cn } from '@utils/cn';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import React, { useState } from 'react';
import { Button } from './Button';

type TriggerLabelProps = {
  plugins: Plugin[];
};

const TriggerLabel: React.FC<TriggerLabelProps> = ({ plugins }) => {
  if (plugins.length === 0) return 'Select one or multiple plugins';

  return (
    <>
      {plugins.slice(0, 3).map((c) => (
        <Badge key={c}>{PLUGINS_MAP[c].label}</Badge>
      ))}
      {plugins.length > 3 && <Badge>+{plugins.length - 3}</Badge>}
    </>
  );
};

export const PluginsDropdown: React.FC = () => {
  const [query, setQuery] = useState('');

  const { control } = useElizaForm();

  const plugins: CharacterFormSchema['plugins'] = useWatch({
    control,
    name: 'plugins',
  });

  const onCheckedChange = (
    field: ControllerRenderProps<CharacterFormSchema, 'plugins'>,
    isChecked: boolean,
    plugin: Plugin,
  ) => {
    if (isChecked) {
      field.onChange([...plugins, plugin]);
    } else {
      field.onChange(plugins.filter((c) => c !== plugin));
    }
  };

  const filteredPlugins = PLUGIN_NAMES.filter((plugin) =>
    plugin.includes(query),
  );

  return (
    <Controller
      control={control}
      name="plugins"
      render={({ field }) => (
        <Dropdown.Root>
          <Dropdown.Trigger>
            <TriggerLabel plugins={plugins} />
          </Dropdown.Trigger>
          <Dropdown.Content className="max-h-full p-0">
            <Input.Root
              variant="ghost"
              className="border-0 border-b border-elz-neutral-6 pl-8 font-elz-plex-sans text-13"
            >
              <FaMagnifyingGlass className="text-elz-neutral-6" />
              <Input.Field
                placeholder="Search for the plugin..."
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                onKeyDown={(e) => e.stopPropagation()}
                onFocusCapture={(e) => e.stopPropagation()}
                autoFocus
              />
            </Input.Root>
            <Box className="max-h-352 gap-4 overflow-auto p-4">
              {filteredPlugins.map((plugin) => {
                const checked = plugins.some((c) => c === plugin);
                return (
                  <Dropdown.CheckboxItem
                    key={plugin}
                    onSelect={(e) => e.preventDefault()}
                    checked={checked}
                    onCheckedChange={(isChecked) =>
                      onCheckedChange(field, isChecked, plugin)
                    }
                    className={cn('p-8', { 'bg-elz-neutral-3': checked })}
                  >
                    <Box className="gap-2">
                      <Box className="flex-row items-center gap-8">
                        <Text variant="primary" weight={700}>
                          {PLUGINS_MAP[plugin].label}
                        </Text>
                        <Badge
                          className={cn('text-11', {
                            'bg-elz-neutral-5': checked,
                          })}
                        >
                          {PLUGIN_CATEGORIES[PLUGINS_MAP[plugin].category]}
                        </Badge>
                      </Box>
                      <Text variant="primary" size="xs">
                        {plugin}
                      </Text>
                      <Text variant="secondary" size="xs">
                        {PLUGINS_MAP[plugin].description}
                      </Text>
                    </Box>
                  </Dropdown.CheckboxItem>
                );
              })}
              {filteredPlugins.length === 0 && (
                <Box className="h-352 items-center justify-center gap-8 text-14">
                  <Text variant="secondary">No results for "{query}"</Text>
                  <Button variant="neutral" onClick={() => setQuery('')}>
                    Reset search
                  </Button>
                </Box>
              )}
            </Box>
          </Dropdown.Content>
        </Dropdown.Root>
      )}
    />
  );
};
