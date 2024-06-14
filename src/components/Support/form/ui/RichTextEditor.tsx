import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import plugins from 'suneditor/src/plugins';
import type { UploadInfo } from 'suneditor-react/dist/types/upload';
import type {
  UploadBeforeReturn,
  UploadBeforeHandler,
} from 'suneditor-react/dist/types/upload';

interface EditorProps {
  name: string;
  onChange: (content: string) => void;
}

type UploadBeforeReturnCustom = (UploadBeforeReturn & void) | boolean;

const Editor: React.FC<EditorProps> = ({ name, onChange, ...props }) => {
  const options = {
    plugins: plugins,
    height: '250',
    buttonList: [
      [
        'font',
        'fontSize',
        'bold',
        'blockquote',
        'textStyle',
        'list',
        'link',
        'image',
      ],
    ],
  };

  const handleImageUploadBefore = (
    files: Array<File>,
    info: object,
    uploadHandler: UploadBeforeHandler,
  ): UploadBeforeReturnCustom => {
    console.log(files);
    // const KEY = 'docs_upload_example_us_preset';
    // const Data = new FormData();
    // Data.append('file', files[0]);
    // Data.append('upload_preset', KEY);

    // fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
    //   method: 'POST',
    //   body: Data,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const res = {
    //       // The response must have a "result" array.
    //       errorMessage: data?.message,
    //       result: [
    //         {
    //           url: data.secure_url,
    //           size: data.bytes, // Changed to bytes as file_size is not available
    //           name: data.public_id,
    //         },
    //       ],
    //     };
    //     uploadHandler(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleImageUpload = (
    targetImgElement: HTMLImageElement,
    index: number,
    state: 'create' | 'update' | 'delete',
    imageInfo: UploadInfo<HTMLImageElement>,
    remainingFilesCount: number,
    // core: any,
  ) => {
    // console.log(core);
  };

  const handleImageUploadError = (errorMessage: string, result: any) => {
    console.log(errorMessage, result);
  };

  return (
    <SunEditor
      {...props}
      placeholder="Please type here..."
      name={name}
      setDefaultStyle="font-family: Arial; font-size: 16px;"
      setOptions={options}
      onImageUploadBefore={handleImageUploadBefore}
      onImageUpload={handleImageUpload}
      onImageUploadError={handleImageUploadError}
      onChange={onChange}
    />
  );
};

export default Editor;
