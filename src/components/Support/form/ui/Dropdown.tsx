import { useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

export type OptionsType = {
  label: string;
  value: string;
  formId: string;
};

export type DropdownProps = {
  options: OptionsType[];
  selectedValue: string;
  dropdownLabel?: string;
  onChange: ({ value, id }: { value: string; id: string }) => void;
};

const Dropdown = ({
  options,
  selectedValue,
  onChange,
  dropdownLabel,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = ({ value, id }: { value: string; id: string }) => {
    const selectedFormObject = {
      value,
      id,
    };

    onChange(selectedFormObject);

    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative flex flex-col gap-[6px] ">
      <label className="text-[1.4rem]" htmlFor="dropdown">
        {dropdownLabel}
      </label>
      <div
        className={`relative cursor-pointer rounded-[6px]  border-[#313538] bg-[#111111] px-[1.1rem] py-[.7rem]  ${isOpen || 'border focus:border-[#369eff]'} `}
        onClick={handleIsOpen}
        tabIndex={1}
      >
        {isOpen || (
          <div className="flex items-center justify-between ">
            <span className=" text-[1.6rem]">
              {options.find((option) => option.value === selectedValue)
                ?.label || '-'}
            </span>
            <MdArrowDropDown className="text-[#313538]" fontSize={24} />
          </div>
        )}

        {isOpen && (
          <ul className="rounded-md absolute left-0 right-0 top-0 mt-2 max-h-[200px] w-full  overflow-scroll bg-[#111111] text-[1.5rem]">
            {options.map((option) => (
              <li
                key={option.value}
                className="cursor-pointer px-[1.4rem] py-[.5rem] hover:bg-gray-700"
                onClick={() =>
                  handleSelect({ value: option.value, id: option.formId })
                }
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
