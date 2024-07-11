import { useEffect, useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import ToolTip from './ui/ToolTip';
import type { FormEvent } from 'react';
import { checkHealthStatus, submitForm } from './utils';
import FormTitle from './ui/FormTitle';
import toast from 'react-hot-toast';

export type FormValuesType = {
  email: string;
  subject: string;
  comment: string;
};
const defaultFormValues = {
  email: '',
  subject: 'Report a site',
  comment: '',
};

function ReportSiteForm() {
  const [formValues, setFormValues] = useState<FormValuesType>({
    ...defaultFormValues,
  });
  const [isHealthy, setIsHealthy] = useState<boolean>(true);
  const handleInputChange = (name: string, value: string | FileList) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const resetFormValues = () => {
    setFormValues({
      ...defaultFormValues,
    });
  };

  useEffect(() => {
    async function fetchHealthStatus() {
      const healthStatus = await checkHealthStatus();
      if (!healthStatus) {
        toast.error(
          'Our support system is currently experiencing issues. Please report this to our team.',
        );
      }
      setIsHealthy(healthStatus);
    }
    fetchHealthStatus();
  }, []);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm(formValues, resetFormValues);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto my-[35px] w-[90%] max-w-[768px] lg:w-[70%] xl:w-[65%]"
    >
      <div className="rounded-[8px] border border-ui-mid-white px-[2.5rem] py-[3rem] md:px-[4rem]">
        <FormTitle
          title={'Report a site'}
          subTitle={
            "If you believe a user or website may be breaching Fleek's Terms of Service, we'd appreciate it if you could take a moment to complete the form below."
          }
        />

        <div className="mt-[3rem]">
          <ToolTip />
        </div>

        <div className="my-[1.6rem] lg:my-[1.8rem]">
          <Input
            type="email"
            name="email"
            value={formValues.email}
            isRequired
            onChange={(value) => handleInputChange('email', value)}
            label="Your email address"
            disabled={!isHealthy}
          />
        </div>

        <div className="my-[1.6rem] lg:my-[1.8rem]">
          <Input
            type="text"
            readOnly
            name="subject"
            value={formValues.subject}
            isRequired
            label="Subject"
            disabled={!isHealthy}
          />
        </div>

        <div className="my-[1.6rem] lg:my-[1.8rem]">
          <Input
            type="textarea"
            name="comment"
            value={formValues.comment}
            isRequired
            bottomText="Description must contain at least 30 characters"
            onChange={(value) => handleInputChange('comment', value)}
            label="Description"
            disabled={!isHealthy}
          />
        </div>

        <Button />
      </div>
    </form>
  );
}

export default ReportSiteForm;
