import { useEffect, useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import ToolTip from './ui/ToolTip';
import type { FormEvent } from 'react';
import { checkHealthStatus, emailRegex, submitForm } from './utils';
import FormTitle from './ui/FormTitle';
import toast from 'react-hot-toast';
import Spinner from '@components/Spinner';
import SupportUnavailable from '../SupportUnavailable';

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
  const [isHealthy, setIsHealthy] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === 'comment') {
      const shouldBeDisabled = value.trim().length < 30;

      if (shouldBeDisabled !== isButtonDisabled) {
        setIsButtonDisabled(shouldBeDisabled);
      }
    }
  };
  const resetFormValues = () => {
    setFormValues({
      ...defaultFormValues,
    });
    setIsButtonDisabled(true);
  };

  async function fetchHealthStatus() {
    setIsLoading(true);
    try {
      const healthStatus = await checkHealthStatus();
      setIsHealthy(healthStatus);
      if (!healthStatus) {
        throw new Error('Health status failure');
      }
    } catch (error) {
      console.error(error);
      toast.error(
        'Our support system is currently experiencing issues. Please report this to our team.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchHealthStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="w-[70px] md:w-[100px] xl:w-[6%]" />
      </div>
    );
  }

  if (!isHealthy) {
    return <SupportUnavailable />;
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitForm(formValues, resetFormValues);
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
            "If you suspect a user or website is violating Fleek's Terms of Service, please report it using the form below."
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
            pattern={`${emailRegex}`}
            isRequired
            onChange={(value) => handleInputChange('email', value)}
            label="Your email address"
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
          />
        </div>

        <div className="my-[1.6rem] lg:my-[1.8rem]">
          <Input
            type="textarea"
            name="comment"
            minLength={30}
            maxLength={1000}
            value={formValues.comment}
            isRequired
            bottomText="Description must contain at least 30 characters"
            onChange={(value) => handleInputChange('comment', value)}
            label="Description"
          />
        </div>

        <Button isDisabled={isButtonDisabled} />
      </div>
    </form>
  );
}

export default ReportSiteForm;
