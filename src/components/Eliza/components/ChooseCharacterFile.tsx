import { cn } from '@utils/cn';
import FileUpload from '../components/FileUpload';

interface ChooseCharacterFileProps {
  handleCharacterFileChange: (content: string) => void;
  className?: string;
}

const ChooseCharacterFile: React.FC<ChooseCharacterFileProps> = ({
  handleCharacterFileChange,
  className,
}) => {
  return (
    <FileUpload
      label="Drag & drop your .json characterfile here"
      className={className}
      fileType="json"
      onFileUpload={(fileContent) => handleCharacterFileChange(fileContent)}
    />
  );
};

export default ChooseCharacterFile;
