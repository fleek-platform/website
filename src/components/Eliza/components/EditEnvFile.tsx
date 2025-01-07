import { cn } from '@utils/cn';
import { useState } from 'react';
import FileEditor from '../components/FileEditor';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Box } from '@components/ElizaForm/components/Box';
import { Button } from '@components/ElizaForm/components/Button';

interface ConfigureEnvFileProps {
  envFile: string | undefined;
  onEnvFileChange: (content: string | undefined) => void;
  onSubmitClick: () => void;
  className?: string;
}

const ConfigureEnvFile: React.FC<ConfigureEnvFileProps> = ({
  envFile,
  onSubmitClick,
  className,
  onEnvFileChange,
}) => {
  const [isEnvFileValid, setIsEnvFileValid] = useState(false);

  return (
    <Box className="gap-38">
      <FileEditor
        fileType="env"
        fileContent={envFile}
        onChange={onEnvFileChange}
        onValidation={setIsEnvFileValid}
        className={cn(!isEnvFileValid && 'border-[#F14C4C]')}
      />
      <Button
        id="submit-btn"
        disabled={!!envFile && !isEnvFileValid}
        onClick={onSubmitClick}
      >
        Continue
      </Button>
      {!isEnvFileValid && (
        <Tooltip
          place="bottom"
          anchorSelect="#submit-btn"
          content="Please fix the errors in the .env to continue."
          style={{ color: '#F14C4C', fontSize: '14px' }}
        />
      )}
    </Box>
  );
};

export default ConfigureEnvFile;
