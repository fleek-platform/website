import { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Tooltip from './ui/Tooltip';
import { zenDeskEndpoint } from './NewRequestForm';
import toast from 'react-hot-toast';

export type FormValuesType = {
  email: string;
  subject: string;
  name: string;
  comment: string;
};
const defaultFormValues = {
      name: '',
      email: '',
      subject: 'Report a site',
      comment: '',
};

function ReportSiteForm() {
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
  const submitForm = async () => {
    const formData = new URLSearchParams();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(`//${zenDeskEndpoint}/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (!data.success) {
        const msg =
          data.error?.issues?.[0]?.message ?? 'Oops! An unknown error occurred';
        toast.error(msg);
      } else {
        toast.success('Request submitted successfully');
        resetFormValues();
      }
    } catch (error) {
      toast.error('Request not submitted, an error occurred');
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto my-[35px] w-[90%] max-w-[768px] lg:w-[70%] xl:w-[65%]"
    >
      <div className="rounded-[8px] border border-[#313538] px-[2.5rem] py-[3rem] md:px-[4rem]">
        <h1 className="text-[3.2rem] font-medium text-ui-faded-gray md:text-[3.5rem] xl:text-[4rem]">
          Report a site
        </h1>

        <div className="mt-[4rem] md:mt-[5rem] xl:mt-[6.5rem]">
          <Tooltip />
        </div>

        <div className="my-[1.6rem] lg:my-[1.8rem]">
          <Input
            type="text"
            name="name"
            value={formValues.name}
            isRequired={true}
            onChange={(value) => handleInputChange('name', value)}
            label="Name"
          />
        </div>

        <div className="my-[1.6rem] lg:my-[1.8rem]">
          <Input
            type="email"
            name="email"
            value={formValues.email}
            isRequired={true}
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
            isRequired={true}
            label="Subject"
          />
        </div>

        <div className="my-[1.6rem] lg:my-[1.8rem]">
          <Input
            type="textarea"
            name="comment"
            value={formValues.comment}
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

export default ReportSiteForm;
