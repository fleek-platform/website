import { useState } from 'react';
import { categoryOptions, updateUrl } from '../config';
import Dropdown from './Dropdown';

function DynamicForm() {
  const [selectedValue, setSelectedValue] = useState('');
  const [formFields, setFormFields] = useState([]);

  const handleDropdownchange = ({
    value,
    id,
  }: {
    value: string;
    id: string;
  }) => {
    setSelectedValue(value);
    updateUrl(id, 'ticket_form_id');
  };

  // const updateFormFields = (formId) => {
  //   const fields = getFormFieldsByFormId(formId);
  //   setFormFields(fields);
  // };

  // const getFormFieldsByFormId = (formId) => {
  //   switch (formId) {
  //     case "15176707593613":
  //       return [
  //         { name: "field1", label: "Field 1", type: "text" },
  //         { name: "field2", label: "Field 2", type: "text" },
  //       ];
  //     case "16568838089485":
  //       return [
  //         { name: "fieldA", label: "Field A", type: "text" },
  //         { name: "fieldB", label: "Field B", type: "text" },
  //       ];
  //     default:
  //       return [];
  //   }
  // };

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
            {/* {formFields.map((field) => (
      <div>
        <label for={field.name}>{field.label}:</label>
        <input id={field.name} name={field.name} type={field.type} />
      </div>
    ))} */}
            {/* <button type="submit">Submit</button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default DynamicForm;
