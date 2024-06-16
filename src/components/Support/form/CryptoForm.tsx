import React, { Suspense, useCallback, useMemo, useState } from 'react';
import Button from './ui/Button';
import { selectedPlanItems } from '../config';
import Input from './ui/Input';
import Dropdown from './ui/Dropdown';

const EditorLazyComponent = React.lazy(() => import('./ui/RichTextEditor'));

type CryptoFormValuesType = {
  email: string;
  subject: string;
  company: string;
  teamId: string;
  selectedPlan: string;
  etherScanLink: string;
  description: string;
  file: FileList | null;
};

function CryptoForm() {
  const [formValues, setFormValues] = useState<CryptoFormValuesType>({
    email: '',
    subject: '',
    company: '',
    teamId: '',
    file: null,
    selectedPlan: '',
    etherScanLink: '',
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
      handleInputChange('selectedPlan', value);
    },
    [],
  );

  const planOptions = useMemo(
    () => ({
      options: selectedPlanItems,
      selectedValue: formValues.selectedPlan,
      isRequired: true,
      onChange: handleDropdownChange,
      bottomText: 'What plan did you pay for ?',
      dropdownLabel: 'Selected Plan',
    }),
    [formValues.selectedPlan, handleDropdownChange],
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
        <Input
          type="text"
          name="company"
          value={formValues.subject as string}
          isRequired={true}
          onChange={(value) => handleInputChange('company', value)}
          label="What company do you represent ?"
        />
      </div>
      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Input
          type="text"
          name="teamId"
          bottomText="Found under Team Settings on app.fleek.co"
          value={formValues.teamId as string}
          isRequired={true}
          onChange={(value) => handleInputChange('teamId', value)}
          label="Team ID"
        />
      </div>

      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Dropdown {...planOptions} />
      </div>

      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Input
          type="text"
          name="etherScanLink"
          bottomText="Provide the etherscan link for your crypto payment"
          value={formValues.etherScanLink as string}
          isRequired={true}
          onChange={(value) => handleInputChange('etherScanLink', value)}
          label="Etherscan transaction link"
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

export default CryptoForm;
