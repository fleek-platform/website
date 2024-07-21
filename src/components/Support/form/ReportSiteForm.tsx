import { useEffect, useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import ToolTip from './ui/ToolTip';
import type { FormEvent } from 'react';
import { checkHealthStatus, submitForm } from './utils';
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (name: string, value: string) => {
    let error = '';
    if (name === 'email' && !value.includes('@')) {
      error = 'Please enter a valid email address';
    } else if (name === 'comment' && value.trim().length < 30) {
      error = 'Description must be at least 30 characters';
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    validate(name, value);

    const shouldBeDisabled = value.trim().length < 30;

    if (shouldBeDisabled !== isButtonDisabled) {
      setIsButtonDisabled(shouldBeDisabled);
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
            isRequired
            onChange={(value) => handleInputChange('email', value)}
            label="Your email address"
            error={errors.email}
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
            value={formValues.comment}
            isRequired
            bottomText="Description must contain at least 30 characters"
            onChange={(value) => handleInputChange('comment', value)}
            label="Description"
            error={errors.comment}
          />
        </div>

        <Button isDisabled={isButtonDisabled} />
      </div>
    </form>
  );
}

export default ReportSiteForm;
