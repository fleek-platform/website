import { useState } from 'react';
import FileEditor from './FileEditor';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { cn } from '@utils/cn';

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
    <div className="flex w-full flex-col gap-[20px]">
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

      <button
        disabled={
          (!!envFile && !isEnvFileValid) ||
          (!!characterFile && !isCharacterFileValid)
        }
        className="submit-btn h-[40px] w-full rounded-[12px] bg-[#2d2305] text-[16px] font-medium text-[#f5e147] disabled:bg-[#222] disabled:text-[#606060]"
        onClick={onSubmitClick}
      >
        Continue
      </button>
      {(!isCharacterFileValid || !isEnvFileValid) && (
        <Tooltip
          place="bottom"
          anchorSelect=".submit-btn"
          content={`Please fix the errors in the ${!isCharacterFileValid && !isEnvFileValid ? 'files' : !isCharacterFileValid ? 'characterfile' : '.env file'} to continue.`}
          style={{ color: '#F14C4C', fontSize: '14px' }}
        />
      )}
    </div>
  );
};

export default ConfirmAgentDetails;
