import React, { Suspense, useCallback, useMemo, useState } from 'react';
import Dropdown from './ui/Dropdown';
import Input from './ui/Input';
import Button from './ui/Button';
import { productItems } from '../config';

const EditorLazyComponent = React.lazy(() => import('./ui/RichTextEditor'));

type FeedBackFormValuesType = {
  email: string;
  name: string;
  subject: string;
  product: string;
  contact: string;
  file: FileList | null;
  description: '';
};

function FeedbackForm() {
  const [formValues, setFormValues] = useState<FeedBackFormValuesType>({
    email: '',
    subject: '',
    product: '',
    file: null,
    name: '',
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
          name="name"
          value={formValues.name as string}
          isRequired={false}
          onChange={(value) => handleInputChange('name', value)}
          label="What is your name ?"
        />
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

export default FeedbackForm;
