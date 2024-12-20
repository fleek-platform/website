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
  const [hasMounted, setHasMounted] = useState(false);
  const [currentSettings, setCurrentSettings] = useState(
    JSON.stringify(settings, null, 2),
  );

  useEffect(() => {
    // avoid hydration errors
    setHasMounted(true);
  }, []);

  if (!hasMounted)
    return (
      <div className="flex h-[228px] animate-pulse flex-col items-center justify-center rounded-12 border border-neutral-6 bg-neutral-1" />
    );

  return (
    <FileEditor
      variant="narrow"
      fileType="json"
      fileContent={currentSettings}
      onChange={(data) => setCurrentSettings(data || '')}
    />
  );
};
