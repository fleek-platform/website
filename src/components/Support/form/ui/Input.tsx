import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'textarea';
  value: string;
  onChange?: (value: string) => void;
  label: string;
  readOnly?: boolean;
  name: string;
  isRequired: boolean;
  minLength?: number;
  maxLength?: number;
  bottomText?: string;
  pattern?: string;
  disabled?: boolean;
  [key: string]: any;
}

interface IsRequiredComponentProps {
  isRequired: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value: propValue = '',
  onChange,
  label = 'Name',
  readOnly,
  isRequired,
  bottomText,
  pattern,
  minLength,
  maxLength,
  error,
  disabled,
  name,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(propValue);

  useEffect(() => {
    setInputValue(propValue);
  }, [propValue]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  if (type === 'textarea') {
    return (
      <div>
        <label
          className="my-[.6rem] inline-block text-[1.3rem] sm:text-[1.4rem] xl:my-[1rem]"
          htmlFor={`input-${name}`}
        >
          {label}
          <IsRequiredField isRequired={isRequired} />
        </label>
        <textarea
          id={`input-${name}`}
          rows={10}
          placeholder="Describe your issue..."
          value={inputValue}
          minLength={minLength}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
          className={clsx(
            'focus:border-ui-medium-blue w-full rounded-[6px] border border-ui-mid-white bg-gray-dark-1 px-[1.1rem] py-[.7rem] text-[1.3rem] outline-none placeholder:text-[1.5rem] md:text-[1.6rem]',
            {
              'cursor-not-allowed': disabled,
            },
          )}
        />
      </div>
    );
  }

  return (
    <div>
      <label
        className="my-[.6rem] inline-block text-[1.3rem] sm:text-[1.4rem] xl:my-[1rem]"
        htmlFor={`input-${name}`}
      >
        {label}
        <IsRequiredField isRequired={isRequired} />
      </label>
      <input
        className={clsx(
          'focus:border-ui-medium-blue w-full rounded-[6px] border border-ui-mid-white bg-gray-dark-1 px-[1.1rem] py-[.7rem] text-[1.3rem] outline-none focus:border md:text-[1.6rem]',
          {
            'cursor-not-allowed': readOnly || disabled,
          },
        )}
        type={type}
        required
        id={`input-${name}`}
        readOnly={readOnly}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        value={inputValue}
        pattern={pattern}
        disabled={disabled}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

function IsRequiredField({ isRequired }: IsRequiredComponentProps) {
  return (
    <span className={clsx({ 'text-yellow-dark-9': isRequired })}>
      {isRequired ? '*' : '(Optional)'}
    </span>
  );
}

export default Input;
