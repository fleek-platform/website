import { cn } from '@utils/cn';
import React, { useRef, useState } from 'react';
import { CloudUpload } from './Icons';

const getFileExtension = (type: string) => {
  switch (type) {
    case 'json':
      return /\.json$/i;
    case 'env':
      return /.*/;
    default:
      return /.*/;
  }
};

const getLabel = (type: string) => {
  switch (type) {
    case 'json':
      return 'Drag & drop your JSON file here';
    case 'env':
      return 'Drag & drop your .env file here';
    default:
      return 'Drag & drop your file here';
  }
};

const allowedMimeTypes = {
  json: ['application/json'],
  env: ['text/plain', ''],
};

interface FileUploadProps {
  onFileUpload: (fileContent: string) => void;
  fileType: 'json' | 'env';
  className?: string;
  label?: string;
  ctaLabel?: string;
  onFileValidation?: (result: boolean, msg?: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  fileType,
  className,
  label,
  ctaLabel,
  onFileValidation,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateAndReadFile = (file: File) => {
    setErrorMessage(null);
    const extensionRegex = getFileExtension(fileType);

    if (fileType === 'json' && !extensionRegex.test(file.name)) {
      const msg = 'Please upload a valid characterfile.';
      onFileValidation?.(false, msg);
      setErrorMessage(msg);
      return;
    } else if (!allowedMimeTypes[fileType].includes(file.type)) {
      const msg = `Please upload a valid .${fileType} file.`;
      onFileValidation?.(false, msg);
      setErrorMessage(msg);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        if (fileType === 'json') {
          JSON.parse(content);
        }
        onFileUpload(content);
        onFileValidation?.(true);
        setErrorMessage(null);
      } catch {
        const msg =
          fileType === 'json' ? 'Invalid characterfile' : 'Invalid env file';
        onFileValidation?.(false, msg);
        setErrorMessage(msg);
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateAndReadFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      validateAndReadFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    e?.stopPropagation?.();
    fileInputRef.current?.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleButtonClick}
      className={cn(
        `mb-4 flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center gap-[12px] rounded-[12px] border-2 border-dashed px-50 py-50 text-center text-[#EEE] md:min-h-[372px]`,
        isDragging
          ? 'border-[#FFD700] bg-[#1A1A1A]'
          : 'border-[#F5E147] bg-transparent',
        className,
      )}
      aria-label="File upload area"
    >
      <CloudUpload />

      {errorMessage && (
        <div className="text-[22px] font-semibold text-red-dark-8">
          {errorMessage}
        </div>
      )}

      <span className="text-[16px] font-medium">
        {label || getLabel(fileType)}
      </span>

      <button
        type="button"
        role="button"
        aria-label="Browse to upload"
        onClick={handleButtonClick}
        className="text-[14px] underline"
      >
        {ctaLabel || 'Browse to upload'}
      </button>

      <input
        type="file"
        accept={fileType === 'json' ? '.json' : '*/*'}
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
