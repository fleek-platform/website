import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import plugins, { formatBlock } from 'suneditor/src/plugins';
import type { UploadInfo } from 'suneditor-react/dist/types/upload';
import type {
  UploadBeforeReturn,
  UploadBeforeHandler,
} from 'suneditor-react/dist/types/upload';
import type { FormatTagName } from 'suneditor/src/options';

interface EditorProps {
  name: string;
  onChange: (content: string) => void;
  bottomText?: string;
}

const Editor = ({ name, bottomText, onChange, ...props }: EditorProps) => {
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
        // 'image',
      ],
    ],
    formats: [
      'p',
      'div',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ] as FormatTagName[],
  };

  const handleImageUploadBefore = (
    files: Array<File>,
    info: object,
    uploadHandler: UploadBeforeHandler,
  ): UploadBeforeReturn => {
    const KEY = 'docs_upload_example_us_preset';
    const Data = new FormData();
    Data.append('file', files[0]);
    Data.append('upload_preset', KEY);

    fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
      method: 'POST',
      body: Data,
    })
      .then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data })),
      )
      .then(({ status, body }) => {
        if (status >= 200 && status < 300) {
          const res = {
            errorMessage: body?.message,
            result: [
              {
                url: body.secure_url,
                size: body.bytes, // Cloudinary uses 'bytes' for file size
                name: body.public_id,
              },
            ],
          };
          uploadHandler(res);
        } else {
          throw new Error(body.message || 'Failed to upload image');
        }
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });

    // Return false to prevent the default upload behavior
    return false;
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
    <>
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
      {bottomText && (
        <span className="my-[6px] inline-block text-[1.2rem] font-medium text-[#718096] md:text-[1.3rem] xl:text-[1.35rem]">
          {bottomText}
        </span>
      )}
    </>
  );
};

export default Editor;
