import { useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

export type Options = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Options[];
  selectedValue: string;
  dropdownLabel: string;
  onChange: (value: string) => void;
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

  const handleSelect = (value: string) => {
    onChange(value);
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
        className="relative cursor-pointer rounded-[6px] border border-[#313538] bg-[#111111] px-[1.1rem] py-[.7rem] focus:border focus:border-[#369eff]"
        onClick={handleIsOpen}
        tabIndex={1}
      >
        <div className="flex items-center justify-between ">
          <span className=" text-[1.5rem]">
            {options.find((option) => option.value === selectedValue)?.label ||
              '-'}
          </span>
          <MdArrowDropDown className="text-[#313538]" fontSize={24} />
        </div>
        {isOpen && (
          <ul className="rounded-md absolute left-0 right-0 top-1/3 mt-2 max-h-[200px] overflow-scroll  bg-[#111111] text-[1.5rem]">
            {options.map((option) => (
              <li
                key={option.value}
                className="cursor-pointer p-4 hover:bg-gray-700"
                onClick={() => handleSelect(option.value)}
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
