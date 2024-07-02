import { useState, type FormEvent } from 'react';
import { type FormValuesType } from './ReportSiteForm';
import Input from './ui/Input';
import Tooltip from './ui/Tooltip';
import Button from './ui/Button';
import { submitForm } from './utils';
import Formtitle from './ui/Formtitle';

export const { zenDeskEndpoint } = (() => {
  const zenDeskEndpoint = import.meta.env.PUBLIC_SUPPORT_API;

  if (!zenDeskEndpoint) {
    throw Error(`👹 Oops! Missing environment variable PUBLIC_SUPPORT_API`);
  }

  return {
    zenDeskEndpoint,
  };
})();

const defaultFormValues = {
  name: '',
  email: '',
  subject: '',
  comment: '',
};

function NewRequestForm() {
  const [formValues, setFormValues] = useState<FormValuesType>({
    ...defaultFormValues,
  });

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

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto my-[40px] w-[90%] max-w-[768px] lg:w-[70%] xl:w-[65%]"
    >
      <div className="rounded-[8px] border border-[#313538] px-[2.5rem] py-[3rem] md:px-[4rem]">
        <Formtitle
          title={'Submit a request'}
          subTitle={
            "If you are encountering issues with Fleek, please explain the problem you're facing in the form below"
          }
        />
        <div className="mt-[3rem]">
          <Tooltip />
        </div>

        <div className="my-[1.6rem] lg:my-[1.8rem]">
          <Input
            type="text"
            name="name"
            value={formValues.name}
            isRequired
            onChange={(value) => handleInputChange('name', value)}
            label="Name"
          />
        </div>

        <div className="my-[1.6rem] lg:my-[1.8rem]">
          <Input
            type="email"
            name="email"
            value={formValues.email}
            isRequired
            onChange={(value) => handleInputChange('email', value)}
            label="Your email address"
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
          />
        </div>

        <Button />
      </div>
    </form>
  );
}

export default NewRequestForm;
