import React, { Suspense, useCallback, useMemo, useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
const EditorLazyComponent = React.lazy(() => import('./ui/RichTextEditor'));

type OtherFormValuesType = {
  email: string;
  subject: string;
  file: FileList | null;
  description: '';
};

function OtherForm() {
  const [formValues, setFormValues] = useState<OtherFormValuesType>({
    email: '',
    subject: '',
    file: null,
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

export default OtherForm;
