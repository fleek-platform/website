import FileUpload from '../components/FileUpload';
import type { TriggerTrackingEventFn } from '../types';

interface ChooseCharacterFileProps {
  handleCharacterFileChange: (content: string) => void;
  className?: string;
  triggerTrackingEvent?: TriggerTrackingEventFn;
}

const ChooseCharacterFile: React.FC<ChooseCharacterFileProps> = ({
  handleCharacterFileChange,
  className,
  triggerTrackingEvent,
}) => {
  const onFileValidation = (res: boolean, msg?: string) => {
    triggerTrackingEvent?.('agent-ui-wizard.file-upload', {
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
