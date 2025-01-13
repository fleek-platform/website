import { cn } from '@utils/cn';
import { useState } from 'react';
import FileEditor from '../components/FileEditor';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface EditCharacterFileProps {
  characterFile: string | undefined;
  onCharacterFileChange: (content: string | undefined) => void;
  onSubmitClick: () => void;
  className?: string;
}

const EditCharacterFile: React.FC<EditCharacterFileProps> = ({
  characterFile,
  onSubmitClick,
  className,
  onCharacterFileChange,
}) => {
  const [isCharacterFileValid, setIsCharacterFileValid] = useState(true);

  return (
    <div className={cn('flex w-full flex-col gap-20', className)}>
      <FileEditor
        fileType="json"
        fileContent={characterFile}
        onValidation={setIsCharacterFileValid}
        onChange={onCharacterFileChange}
        className={cn(!isCharacterFileValid && 'border-[#F14C4C]')}
      />
      <button
        id="submit-btn"
        disabled={!!characterFile && !isCharacterFileValid}
        className="submit-btn h-[40px] w-full rounded-[12px] bg-[#2d2305] text-[16px] font-medium text-[#f5e147] disabled:bg-[#222] disabled:text-[#606060]"
        onClick={onSubmitClick}
      >
        Save characterfile
      </button>
      {!isCharacterFileValid && (
        <Tooltip
          place="bottom"
          anchorSelect=".submit-btn"
          content="Please fix the errors in the characterfile to continue."
          style={{ color: '#F14C4C', fontSize: '14px' }}
        />
      )}
    </div>
  );
};

export default EditCharacterFile;
