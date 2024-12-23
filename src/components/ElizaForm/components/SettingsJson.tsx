import FileEditor from '@components/Eliza/components/FileEditor';
import React, { useEffect, useState } from 'react';
import type { Character } from '../types';

type SettingsJson = {
  settings: Character['settings'];
  onChange: (data: Character['settings']) => void;
};

export const SettingsJson: React.FC<SettingsJson> = ({
  settings,
  onChange,
}) => {
  const settingsString = JSON.stringify(settings, null, 2);
  const [currentSettings, setCurrentSettings] = useState(settingsString);

  useEffect(() => {
    if (currentSettings !== settingsString) {
      setCurrentSettings(settingsString);
    }
  }, [settings]);

  return (
    <FileEditor
      variant="narrow"
      fileType="json"
      fileContent={currentSettings}
      onChange={(data) => setCurrentSettings(data || '')}
    />
  );
};
