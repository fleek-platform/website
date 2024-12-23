import FileEditor from '@components/Eliza/components/FileEditor';
import React, { useEffect, useState } from 'react';
import type { Character } from '../types';

type FileEditorWrapperProps = {
  settings: Character['settings'];
  onChange: (data: Character['settings']) => void;
};

export const FileEditorWrapper: React.FC<FileEditorWrapperProps> = ({
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
