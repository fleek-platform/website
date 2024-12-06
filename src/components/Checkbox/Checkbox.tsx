import React, { useEffect, useState } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { FaCheck } from 'react-icons/fa6';

import styles from './Checkbox.module.css';
import { cn } from '@utils/cn';

interface CheckboxProps {
  id: string;
  label: string;
  labelElement?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  labelElement,
  checked = false,
  onChange,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className={cn(styles.checkboxWrapper, 'flex flex-row', className)}>
      <RadixCheckbox.Root
        className={styles.Root}
        checked={checked}
        onCheckedChange={handleCheckboxChange}
        id={id}
      >
        <RadixCheckbox.Indicator className={styles.Indicator}>
          <FaCheck className="CheckboxIndicatorIcon" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className="Label" htmlFor={id}>
        {labelElement ? labelElement : label}
      </label>
    </div>
  );
};

export default Checkbox;
