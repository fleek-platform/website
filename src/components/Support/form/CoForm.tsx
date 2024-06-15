import React, { Suspense, useCallback, useMemo, useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { severityItems } from '../config';
import Dropdown from './ui/Dropdown';

const EditorLazyComponent = React.lazy(() => import('./ui/RichTextEditor'));

type CoFormValuesType = {
  customDomain: string;
  file: FileList | null;
  teamId: string;
  email: string;
  subject: string;
  nativeURL: string;
  severity: string;
  description: string;
  githubRepository: string;
};

function CoForm() {
  const [formValues, setFormValues] = useState<CoFormValuesType>({
    customDomain: '',
    teamId: '',
    githubRepository: '',
    file: null,
    email: '',
    subject: '',
    nativeURL: '',
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
      selectedValue: formValues.severity,
      onChange: handleDropdownChange,
      dropdownLabel: 'Severity',
    }),
    [formValues.severity, handleDropdownChange],
  );

  console.log(formValues);

  return (
    <form>
      <div className="my-[1.8rem]">
        <Input
          type="email"
          name="email"
          value={formValues.email as string}
          isRequired={true}
          onChange={(value) => handleInputChange('email', value)}
          label="Your email address"
        />
      </div>

      <div className="my-[1.8rem]">
        <Input
          type="text"
          name="subject"
          value={formValues.subject as string}
          isRequired={true}
          onChange={(value) => handleInputChange('subject', value)}
          label="Subject"
        />
      </div>

      <div className="my-[1.8rem]">
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

      <div className="my-[1.8rem]">
        <Input
          type="text"
          name="nativeURL"
          bottomText={`Share your site's "on.fleek.co" URL`}
          value={formValues.nativeURL as string}
          isRequired={true}
          onChange={(value) => handleInputChange('nativeURL', value)}
          label="Fleek Native URL"
        />
      </div>

      <div className="my-[1.8rem]">
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

      <div className="my-[1.8rem]">
        <Input
          type="text"
          name="githubRepository"
          value={formValues.githubRepository as string}
          isRequired={true}
          bottomText={
            'If possible, share your repo with us for easier troubleshooting'
          }
          onChange={(value) => handleInputChange('customDomain', value)}
          label="GitHub Repository"
        />
      </div>

      <div className="my-[1.8rem]">
        <label className="my-[.5rem] inline-block text-[1.4rem]">
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

      <div className="my-[1.8rem]">
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

export default CoForm;
