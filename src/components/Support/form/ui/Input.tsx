import React, { useEffect, useState } from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'textarea';
  value: string;
  onChange?: (value: string | FileList) => void;
  label: string;
  readOnly?: boolean;
  name: string;
  isRequired: boolean;
  bottomText?: string;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value: propValue,
  onChange,
  label = 'Name',
  readOnly,
  isRequired,
  bottomText,
  name,
  ...props
}) => {
  const [value, setValue] = useState<string | FileList>(propValue || '');
  const [fileList, setFileList] = useState<File[]>([]);

  useEffect(() => {
    setValue(propValue || '');
  }, [propValue]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  if (type === 'textarea') {
    return (
      <div>
        <label
          className="my-[.6rem] inline-block text-[1.3rem] sm:text-[1.4rem]  xl:my-[1rem]"
          htmlFor={`input-${name}`}
        >
          {label}
          {isRequired && <span className="text-[#FC8181]">*</span>}
          {!isRequired && <span>(Optional)</span>}
        </label>
        <textarea
          id={`input-${name}`}
          rows={10}
          placeholder="Describe your issue..."
          onChange={handleChange}
          {...props}
          className="w-full rounded-[6px] border border-[#313538]  bg-[#111111] px-[1.1rem] py-[.7rem] text-[1.3rem] outline-none placeholder:text-[1.5rem] focus:border focus:border-[#369eff] md:text-[1.6rem]"
        />
        {bottomText && (
          <span className="my-[4px] text-[1.2rem] font-medium text-[#718096] md:text-[1.3rem] xl:my-[6px] xl:text-[1.4rem]">
            {bottomText}
          </span>
        )}
      </div>
    );
  }

  return (
    <div>
      <label
        className="my-[.6rem] inline-block text-[1.3rem] sm:text-[1.4rem]  xl:my-[1rem]"
        htmlFor={`input-${name}`}
      >
        {label}
        {isRequired && <span className="text-[#FC8181]">*</span>}
        {!isRequired && <span>(Optional)</span>}
      </label>
      <input
        className="w-full rounded-[6px] border border-[#313538]  bg-[#111111] px-[1.1rem] py-[.7rem] text-[1.3rem] outline-none focus:border focus:border-[#369eff] md:text-[1.6rem]"
        type={type}
        required
        id={`input-${name}`}
        readOnly={readOnly}
        name={name}
        value={value as string}
        onChange={handleChange}
        {...props}
      />
      {bottomText && (
        <span className="my-[4px] text-[1.2rem] font-medium text-[#718096] md:text-[1.3rem] xl:my-[6px] xl:text-[1.4rem]">
          {bottomText}
        </span>
      )}
    </div>
  );
};

export default Input;
