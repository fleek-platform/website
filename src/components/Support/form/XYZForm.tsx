import React, { Suspense, useCallback, useMemo, useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Dropdown from './ui/Dropdown';
import { severityItems } from '../config';

const EditorLazyComponent = React.lazy(() => import('./ui/RichTextEditor'));

type XYZFormValuesType = {
  deploymentUrl: string;
  file: FileList | null;
  email: string;
  subject: string;
  customDomain: string;
  severity: string;
  description: string;
};

function XYZForm() {
  const [formValues, setFormValues] = useState<XYZFormValuesType>({
    deploymentUrl: '',
    file: null,
    email: '',
    subject: '',
    customDomain: '',
    severity: '',
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
      handleInputChange('severity', value);
    },
    [],
  );

  const severityOptions = useMemo(
    () => ({
      options: severityItems,
      selectedValue: formValues.severity as string,
      onChange: handleDropdownChange,
      dropdownLabel: 'Severity',
    }),
    [formValues.severity, handleDropdownChange],
  );

  console.log(formValues);
  // after the form submits take the user back to the support homepage
  return (
    <form>
      <div className="my-[1.6rem] lg:my-[1.6rem] lg:my-[1.8rem]">
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
          name="deploymentUrl"
          value={formValues.deploymentUrl as string}
          isRequired={true}
          bottomText={
            'Go to your latest deployment and just copy the content of the URL bar'
          }
          onChange={(value) => handleInputChange('deploymentUrl', value)}
          label="Deployment URL"
        />
      </div>

      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Input
          type="text"
          name="customDomain"
          value={formValues.customDomain as string}
          isRequired={false}
          bottomText={"Share your site's custom domain"}
          onChange={(value) => handleInputChange('customDomain', value)}
          label="Custom domain"
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

      <div className="my-[1.6rem] lg:my-[1.8rem]">
        <Dropdown {...severityOptions} />
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

export default XYZForm;
