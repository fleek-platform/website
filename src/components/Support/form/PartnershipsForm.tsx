import React, { Suspense, useCallback, useMemo, useState } from 'react';
import Input from './ui/Input';
import { productItems } from '../config';
import Button from './ui/Button';
import Dropdown from './ui/Dropdown';

const EditorLazyComponent = React.lazy(() => import('./ui/RichTextEditor'));

type PartnershipsFormValuesType = {
  email: string;
  company: string;
  nameAndRole: string;
  subject: string;
  product: string;
  contact: string;
  file: FileList | null;
  description: '';
};

function PartnershipsForm() {
  const [formValues, setFormValues] = useState<PartnershipsFormValuesType>({
    email: '',
    subject: '',
    company: '',
    product: '',
    file: null,
    nameAndRole: '',
    contact: '',
    description: '',
  });

  const handleInputChange = useCallback(
    (name: string, value: string | FileList) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    [],
  );

  const handleDropdownChange = useCallback(
    ({ value, id }: { value: string; id: string }) => {
      handleInputChange('product', value);
    },
    [],
  );

  const productOptions = useMemo(
    () => ({
      options: productItems,
      selectedValue: formValues.product,
      isRequired: true,
      onChange: handleDropdownChange,
      bottomText: 'Select one',
      dropdownLabel: 'What product or feedback does this refer to?',
    }),
    [formValues.product, handleDropdownChange],
  );

  console.log(formValues);
  return (
    <form>
      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Input
          type="email"
          name="email"
          value={formValues.email as string}
          isRequired={true}
          onChange={(value) => handleInputChange('email', value)}
          label="Your email address"
        />
      </div>
      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Input
          type="text"
          name="company"
          value={formValues.company as string}
          isRequired={true}
          onChange={(value) => handleInputChange('company', value)}
          label="What company do you represent ?"
        />
      </div>
      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Input
          type="text"
          name="nameAndRole"
          value={formValues.nameAndRole as string}
          isRequired={true}
          onChange={(value) => handleInputChange('nameAndRole', value)}
          label="What is your name and role in the company?"
        />
      </div>
      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Input
          type="text"
          name="subject"
          value={formValues.subject as string}
          isRequired={true}
          onChange={(value) => handleInputChange('subject', value)}
          label="Subject"
        />
      </div>
      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Dropdown {...productOptions} />
      </div>

      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Input
          type="text"
          name="contact"
          value={formValues.contact as string}
          isRequired={true}
          bottomText="Add your email address , Discord, or Telegram handles"
          onChange={(value) => handleInputChange('contact', value)}
          label="How should we contact you ?"
        />
      </div>
      <div className="relative z-2 my-[1.6rem] lg:my-[1.8rem]">
        <label className="my-[1rem] inline-block text-[1.3rem] sm:text-[1.4rem]">
          Description
          <span className="text-[#FC8181]">*</span>
        </label>
        <Suspense fallback={<div>Loading...</div>}>
          <EditorLazyComponent
            name="Description"
            bottomText={
              'Please enter the details of your request. A member of our support staff will respond as soon as possible.'
            }
            onChange={(value) => handleInputChange('description', value)}
          />
        </Suspense>
      </div>
      <div>
        <Input
          type="file"
          isRequired={false}
          name="file"
          onChange={(value) => handleInputChange('file', value)}
          label="Attachments"
        />
      </div>
      <Button />
    </form>
  );
}

export default PartnershipsForm;
