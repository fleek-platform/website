import FileUpload from '../components/FileUpload';

interface ChooseEnvFileProps {
  handleEnvFileChange: (content: string) => void;
  className?: string;
}

const ChooseEnvFile: React.FC<ChooseEnvFileProps> = ({
  handleEnvFileChange,
  className,
}) => {
  return (
    <FileUpload
      className={className}
      fileType="env"
      onFileUpload={(fileContent) => handleEnvFileChange(fileContent)}
    />
  );
};

export default ChooseEnvFile;
