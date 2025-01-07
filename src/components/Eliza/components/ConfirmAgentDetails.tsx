import { useState } from 'react';
import FileEditor from './FileEditor';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { cn } from '@utils/cn';
import { Box } from '@components/ElizaForm/components/Box';
import { Button } from '@components/ElizaForm/components/Button';

interface ConfirmAgentDetailsProps {
  characterFile: string | undefined;
  onCharacterFileChange: (content: string | undefined) => void;
  envFile: string | undefined;
  onEnvFileChange: (content: string | undefined) => void;
  onSubmitClick: () => void;
}

const ConfirmAgentDetails: React.FC<ConfirmAgentDetailsProps> = ({
  characterFile,
  onCharacterFileChange,
  onEnvFileChange,
  envFile,
  onSubmitClick,
}) => {
  const [isCharacterFileValid, setIsCharacterFileValid] = useState(true);
  const [isEnvFileValid, setIsEnvFileValid] = useState(true);

  return (
    <Box className="gap-38">
      <FileEditor
        variant="narrow"
        fileType="json"
        fileContent={characterFile}
        onValidation={setIsCharacterFileValid}
        onChange={onCharacterFileChange}
        expandedButtonLabel="Collapse characterfile"
        collapsedButtonLabel="Expand characterfile"
        className={cn(!isCharacterFileValid && 'border-[#F14C4C]')}
      />

      <FileEditor
        variant="narrow"
        fileType="env"
        fileContent={envFile}
        onValidation={setIsEnvFileValid}
        onChange={onEnvFileChange}
        expandedButtonLabel="Collapse .env"
        collapsedButtonLabel="Expand .env"
        className={cn(!isEnvFileValid && 'border-[#F14C4C]')}
      />

      <Button
        disabled={
          (!!envFile && !isEnvFileValid) ||
          (!!characterFile && !isCharacterFileValid)
        }
        onClick={onSubmitClick}
        className="submit-btn"
      >
        Continue
      </Button>
      {(!isCharacterFileValid || !isEnvFileValid) && (
        <Tooltip
          place="bottom"
          anchorSelect=".submit-btn"
          content={`Please fix the errors in the ${!isCharacterFileValid && !isEnvFileValid ? 'files' : !isCharacterFileValid ? 'characterfile' : '.env file'} to continue.`}
          style={{ color: '#F14C4C', fontSize: '14px' }}
        />
      )}
    </Box>
  );
};

export default ConfirmAgentDetails;
