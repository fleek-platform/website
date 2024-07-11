import { useEffect, useState, type FormEvent } from 'react';
import { type FormValuesType } from './ReportSiteForm';
import Input from './ui/Input';
import ToolTip from './ui/ToolTip';
import toast from 'react-hot-toast';
import Button from './ui/Button';
import { checkHealthStatus, submitForm } from './utils';
import FormTitle from './ui/FormTitle';
import { removeProtocolFromUrl } from '@utils/url';

export const { zenDeskEndpoint } = (() => {
  const zenDeskEndpoint = removeProtocolFromUrl(
    import.meta.env.PUBLIC_SUPPORT_API_HOST,
  );

  if (!zenDeskEndpoint) {
    throw Error(
      `👹 Oops! Missing environment variable PUBLIC_SUPPORT_API_HOST`,
    );
  }

  return {
    zenDeskEndpoint,
  };
})();

const defaultFormValues = {
  email: '',
  subject: '',
  comment: '',
};

function NewRequestForm() {
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

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitForm(formValues, resetFormValues);
  };

  useEffect(() => {
    async function fetchHealthStatus() {
      const healthStatus = await checkHealthStatus();
      console.log(healthStatus);
      if (!healthStatus) {
        toast.error(
          'Our support system is currently experiencing issues. Please report this to our team.',
        );
      }
      setIsHealthy(healthStatus);
    }
    fetchHealthStatus();
  }, []);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto my-[40px] w-[90%] max-w-[768px] lg:w-[70%] xl:w-[65%]"
    >
      <div className="rounded-[8px] border border-[#313538] px-[2.5rem] py-[3rem] md:px-[4rem]">
        <FormTitle
          title={'Submit a request'}
          subTitle={
            "If you're having issues with Fleek's platform, we're here to help! Please share details about the issue you're experiencing in the form below."
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
            name="subject"
            value={formValues.subject}
            isRequired
            onChange={(value) => handleInputChange('subject', value)}
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

export default NewRequestForm;
