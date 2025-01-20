import trackingUtils from '@components/Tracking/trackingUtils';
import FileUpload from '../components/FileUpload';

interface ChooseCharacterFileProps {
  handleCharacterFileChange: (content: string) => void;
  className?: string;
}

const ChooseCharacterFile: React.FC<ChooseCharacterFileProps> = ({
  handleCharacterFileChange,
  className,
}) => {
  const onFileValidation = (res: boolean, msg?: string) => {
    trackingUtils.trackCustomEvent('agent-ui-wizard.file-upload', {
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
