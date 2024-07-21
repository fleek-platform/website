import { useEffect, useState, type FormEvent } from 'react';
import { type FormValuesType } from './ReportSiteForm';
import Input from './ui/Input';
import ToolTip from './ui/ToolTip';
import toast from 'react-hot-toast';
import Button from './ui/Button';
import { checkHealthStatus, submitForm } from './utils';
import FormTitle from './ui/FormTitle';
import { removeProtocolFromUrl } from '@utils/url';
import Spinner from '@components/Spinner';
import SupportUnavailable from '../SupportUnavailable';

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
  const [isHealthy, setIsHealthy] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (name: string, value: string) => {
    let error = '';
    if (name === 'email' && !value.includes('@')) {
      error = 'Please enter a valid email address';
    } else if (name === 'subject' && value.trim().length < 5) {
      error = 'Subject name should be more descriptive';
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
    setErrors({});
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      toast.error('Please adjust all input values before submitting');
      return;
    }
    await submitForm(formValues, resetFormValues);
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
            error={errors.email}
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
            error={errors.subject}
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

export default NewRequestForm;
