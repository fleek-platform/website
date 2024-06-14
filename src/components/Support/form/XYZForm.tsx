import React, { Suspense, useState } from 'react';
import Input from './ui/Input';

const EditorLazyComponent = React.lazy(() => import('./ui/RichTextEditor'));

function XYZForm() {
  const [formValues, setFormValues] = useState<{
    [key: string]: string | FileList | null;
  }>({
    name: '',
    file: null,
    email: '',
    password: '',
  });

  const handleInputChange = (name: string, value: string | FileList) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <form>
      <div className="my-[1.8rem]">
        <Input
          type="text"
          name="name"
          value={formValues.name as string}
          isRequired={true}
          onChange={(value) => handleInputChange('name', value)}
          label="Name"
        />
      </div>

      <div>
        <Input
          type="file"
          isRequired={false}
          name="file"
          onChange={(value) => handleInputChange('file', value)}
          label="File"
        />
      </div>

      <div>
        <label className="my-[.5rem] inline-block text-[1.4rem]">
          Description
          <span className="text-[#FC8181]">*</span>
        </label>
        <Suspense fallback={<div>Loading...</div>}>
          <EditorLazyComponent
            name="Description"
            onChange={(data) => console.log(data)}
          />
        </Suspense>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default XYZForm;
