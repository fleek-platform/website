import { cn } from '@utils/cn';
import { useState } from 'react';
import FileEditor from '../components/FileEditor';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

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
    <div className={cn('flex w-full flex-col gap-20', className)}>
      <FileEditor
        fileType="env"
        fileContent={envFile}
        onChange={onEnvFileChange}
        onValidation={setIsEnvFileValid}
        className={cn(!isEnvFileValid && 'border-[#F14C4C]')}
      />
      <button
        id="submit-btn"
        disabled={!!envFile && !isEnvFileValid}
        className="h-[40px] w-full rounded-[12px] bg-[#2d2305] text-[16px] font-medium text-[#f5e147] disabled:bg-[#222] disabled:text-[#606060]"
        onClick={onSubmitClick}
      >
        Continue
      </button>
      {!isEnvFileValid && (
        <Tooltip
          place="bottom"
          anchorSelect="#submit-btn"
          content="Please fix the errors in the .env to continue."
          style={{ color: '#F14C4C', fontSize: '14px' }}
        />
      )}
    </div>
  );
};

export default ConfigureEnvFile;
