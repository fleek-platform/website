import { useState } from 'react';
import { type FormValuesType } from './ReportSiteForm';
import Input from './ui/Input';
import Tooltip from './ui/Tooltip';
import Button from './ui/Button';
import toast from 'react-hot-toast';

export const { zenDeskEndpoint } = (() => {
  const zenDeskEndpoint = import.meta.env.PUBLIC_SUPPORT_API;

  if (!zenDeskEndpoint) {
    throw Error(
      `👹 Oops! Missing environment variable (host ${zenDeskEndpoint})`,
    );
  }

  return {
    zenDeskEndpoint,
  };
})();

export type DynamicFormProps = {};

function NewRequestForm() {
  const [formValues, setFormValues] = useState<FormValuesType>({
    name: '',
    email: '',
    subject: '',
    comment: '',
  });

  const handleInputChange = (name: string, value: string | FileList) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetFormValues = () => {
    setFormValues({
      name: '',
      email: '',
      subject: '',
      comment: '',
    });
  };

  const submitForm = async () => {
    const formData = new URLSearchParams();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    try {
      const response = await fetch(`${zenDeskEndpoint}/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok === false) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success == false) {
        toast.error(data.error.issues[0].message);
      } else {
        toast.success('Request submitted successfully');
        resetFormValues();
      }
    } catch (error) {
      toast.error('Request not submitted, an error occurred');
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto my-[35px] w-[90%] max-w-[768px] lg:w-[70%] xl:w-[65%]"
    >
      <div className="rounded-[8px] border border-[#313538] px-[2.5rem] py-[3rem] md:px-[4rem]">
        <h1 className="text-[3.2rem] font-medium text-[#ECEDEE] md:text-[3.5rem] xl:text-[4rem]">
          Submit a request
        </h1>

        <div className="mt-[4rem] md:mt-[5rem] xl:mt-[6.5rem]">
          <Tooltip />
        </div>

        <div className="my-[1.6rem] lg:my-[1.8rem]">
          <Input
            type="text"
            name="name"
            value={formValues.name as string}
            isRequired={true}
            onChange={(value) => handleInputChange('name', value)}
            label="Name"
          />
        </div>

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
            type="textarea"
            name="comment"
            value={formValues.comment as string}
            isRequired={true}
            bottomText="Description must contain at least 30 character(s)"
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
