import Dropdown, { type DropdownProps } from './ui/Dropdown';

function DefaultForm({ options, selectedValue, onChange }: DropdownProps) {
  return (
    <div>
      <Dropdown
        options={options}
        selectedValue={selectedValue}
        dropdownLabel={'Please choose your issue below'}
        onChange={onChange}
      />
    </div>
  );
}

export default DefaultForm;
