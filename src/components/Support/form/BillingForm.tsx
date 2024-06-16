import React, { Suspense, useCallback, useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
const EditorLazyComponent = React.lazy(() => import('./ui/RichTextEditor'));

type BillingFormValuesType = {
  billingEmail: string;
  file: FileList | null;
  teamId: string;
  email: string;
  subject: string;
  description: string;
};

function BillingForm() {
  const [formValues, setFormValues] = useState<BillingFormValuesType>({
    billingEmail: '',
    teamId: '',
    file: null,
    email: '',
    subject: '',
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
          type="email"
          name="billingEmail"
          bottomText="Mail address associated to your billing"
          value={formValues.billingEmail as string}
          isRequired={true}
          onChange={(value) => handleInputChange('billingEmail', value)}
          label="Billing Email"
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

export default BillingForm;
