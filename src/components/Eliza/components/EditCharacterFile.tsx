import { cn } from '@utils/cn';
import { useState } from 'react';
import FileEditor from '../components/FileEditor';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Button } from '@components/ElizaForm/components/Button';
import { Box } from '@components/ElizaForm/components/Box';

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
    <Box className="gap-38">
      <FileEditor
        fileType="json"
        fileContent={characterFile}
        onValidation={setIsCharacterFileValid}
        onChange={onCharacterFileChange}
        className={cn(!isCharacterFileValid && 'border-[#F14C4C]')}
      />
      <Button
        disabled={!!characterFile && !isCharacterFileValid}
        onClick={onSubmitClick}
        className="submit-btn"
      >
        Save characterfile
      </Button>
      {!isCharacterFileValid && (
        <Tooltip
          place="bottom"
          anchorSelect=".submit-btn"
          content="Please fix the errors in the characterfile to continue."
          style={{ color: '#F14C4C', fontSize: '14px' }}
        />
      )}
    </Box>
  );
};

export default EditCharacterFile;
