import FileUpload from '../components/FileUpload';
import type { CaptureEventFn } from '../types';

interface ChooseCharacterFileProps {
  handleCharacterFileChange: (content: string) => void;
  className?: string;
  captureEvent: CaptureEventFn;
}

const ChooseCharacterFile: React.FC<ChooseCharacterFileProps> = ({
  handleCharacterFileChange,
  className,
  captureEvent,
}) => {
  const onFileValidation = (res: boolean, msg?: string) => {
    captureEvent('agent-ui-wizard.file-upload', {
      res,
      msg,
    });
  };

  return (
    <FileUpload
      label="Drag & drop your .json characterfile here"
      className={className}
      fileType="json"
      onFileUpload={(fileContent) => handleCharacterFileChange(fileContent)}
      onFileValidation={onFileValidation}
    />
  );
};

export default ChooseCharacterFile;
