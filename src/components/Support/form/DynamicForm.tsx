import { useState } from 'react';
import { categoryOptions } from '../config';
import Dropdown from './Dropdown';

function DynamicForm() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownchange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="mx-auto w-[65%] max-w-[768px]">
      <div className="rounded-[8px] border border-[#313538] px-[4rem] py-[3rem]">
        <h1 className="text-[4rem] font-medium text-[#ECEDEE]">
          Submit a request
        </h1>

        <div className="mt-[3rem]">
          <form className="mb-[3rem]">
            <Dropdown
              options={categoryOptions}
              selectedValue={selectedValue}
              dropdownLabel={'Please choose your issue below'}
              onChange={handleDropdownchange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default DynamicForm;
