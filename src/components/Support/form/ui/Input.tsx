import React, { useEffect, useState } from 'react';
import { SlPaperClip } from 'react-icons/sl';
import { IoMdClose } from 'react-icons/io';

interface InputProps {
  type?: 'text' | 'file' | 'password';
  value?: string;
  onChange?: (value: string | FileList) => void;
  label?: string;
  name: string;
  isRequired: boolean;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value: propValue,
  onChange,
  label = 'Name',
  isRequired,
  name,
  ...props
}) => {
  const [value, setValue] = useState<string | FileList>(propValue || '');
  const [fileList, setFileList] = useState<File[]>([]);

  useEffect(() => {
    setValue(propValue || '');
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'file' && e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFileList = [...fileList, ...newFiles];
      setFileList(updatedFileList);
      if (onChange) {
        const dataTransfer = new DataTransfer();
        updatedFileList.forEach((file) => dataTransfer.items.add(file));
        onChange(dataTransfer.files);
      }
    } else {
      const newValue = e.target.value;
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const removeFile = (fileName: string) => {
    const updatedFileList = fileList.filter((file) => file.name !== fileName);
    setFileList(updatedFileList);
    if (onChange) {
      const dataTransfer = new DataTransfer();
      updatedFileList.forEach((file) => dataTransfer.items.add(file));
      onChange(dataTransfer.files);
    }
  };

  if (type === 'file') {
    return (
      <div>
        <label
          className="my-[.5rem] inline-block text-[1.4rem]"
          htmlFor={`input-${name}`}
        >
          {label}
          {isRequired && <span className="text-[#FC8181]">*</span>}
          {!isRequired && <span>(Optional)</span>}
        </label>
        <div className="relative w-full rounded-[6px] border border-[#313538] bg-[#11111] px-[1.1rem] py-[.8rem] text-center text-[1.6rem] focus-within:border-[#61a5ff] hover:border-[#718096]">
          <input
            className="absolute right-0 top-0 h-full w-full cursor-pointer opacity-0"
            type="file"
            required
            id={`input-${name}`}
            name={name}
            onChange={handleChange}
            {...props}
            multiple
          />
          <span className="inline-block text-[13px]">
            <a className="text-[#61a5ff]">Add file</a> or drop files here
          </span>
        </div>

        <div className="mt-[15px]">
          <ul className="w-[50%]">
            {fileList.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-[3px] px-[1.1rem] py-[.8rem] hover:bg-[#f2f2f2]"
              >
                <div className="flex items-center gap-[10px]">
                  <SlPaperClip fontSize={13} />
                  <span className="text-[12px] text-[#333]">{file.name}</span>
                </div>
                <button
                  type="button"
                  className=""
                  onClick={() => removeFile(file.name)}
                >
                  <IoMdClose fontSize={13} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label
        className="my-[.5rem] inline-block text-[1.4rem]"
        htmlFor={`input-${name}`}
      >
        {label}
        {isRequired && <span className="text-[#FC8181]">*</span>}
        {!isRequired && <span>(Optional)</span>}
      </label>
      <input
        className="w-full rounded-[6px] border border-[#313538] bg-[#111111] px-[1.1rem] py-[.7rem] text-[1.6rem]"
        type={type}
        required
        id={`input-${name}`}
        name={name}
        value={value as string}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default Input;
