import type React from 'react';
import type { GoToProps } from '../utils/types';
import { Box } from './Box';
import { useElizaForm } from '../hooks/useElizaForm';
import {
  formatZodError,
  transformSchemaToCharacter,
  type FormattedError,
} from '../utils/transformData';
import { Button } from './Button';
import { FaChevronLeft } from 'react-icons/fa6';
import { Text } from './Text';
import { useState } from 'react';
import FileEditor from '@components/Eliza/components/FileEditor';
import { cn } from '@utils/cn';
import { Input } from './Input';
import { characterfileSchema } from '../utils/schema';
import { ZodError } from 'zod';

export type ReviewPageProps = {
  onDeployBtnClick: (characterfile: string | undefined) => void;
};

type Errors = { json: boolean; form: FormattedError[] };

const INITIAL_ERRORS = {
  json: false,
  form: [],
};

export const ReviewPage: React.FC<ReviewPageProps & GoToProps> = ({
  goTo,
  onDeployBtnClick,
}) => {
  const { getValues } = useElizaForm();
  const data = getValues();
  const transformedData = transformSchemaToCharacter(data);

  const [characterFile, setCharacterFile] = useState<string | undefined>(
    JSON.stringify(transformedData, null, 2),
  );
  const [errors, setErrors] = useState<Errors>(INITIAL_ERRORS);

  const hasErrors = errors.json || errors.form.length > 0;

  const onSubmit = () => {
    if (!characterFile) return;

    setErrors(INITIAL_ERRORS);

    try {
      const parsedCharacterFile = JSON.parse(characterFile);
      const validCharacterfile = characterfileSchema.parse(parsedCharacterFile);
      const payload = JSON.stringify(validCharacterfile);
      onDeployBtnClick(payload);
    } catch (e) {
      if (e instanceof ZodError) {
        setErrors({ ...errors, form: formatZodError(e) });
      } else {
        console.error('Unexpected error:', e);
      }
    }
  };

  return (
    <Box className="gap-38">
      <Box className="items-start gap-16">
        <Box className="w-full flex-row items-center justify-between">
          <Button
            variant="ghost"
            className="text-elz-accent-11"
            onClick={() => goTo('settings')}
          >
            <FaChevronLeft />
            Settings
          </Button>
        </Box>
        <Text>Confirm agent details</Text>
        <Text variant="description" className="text-wrap">
          You will be deploying an agent with the information below. This is the
          final step before your agent is deployed.
        </Text>
      </Box>
      <Box className="gap-8">
        <FileEditor
          fileType="json"
          fileContent={characterFile}
          onChange={setCharacterFile}
          onValidation={(jsonError) =>
            setErrors({ ...errors, json: !jsonError })
          }
          className={cn({ 'border-elz-danger-8 transition-colors': hasErrors })}
        />
        {errors.json && (
          <Input.Hint error>
            - JSON error: there was an error parsing your code. Please fix it or
            revert the change above.
          </Input.Hint>
        )}
        {errors.form.length > 0 &&
          errors.form.map((error, idx) => (
            <Input.Hint key={idx} error>
              - {error.path}: {error.message}
            </Input.Hint>
          ))}
      </Box>
      <Button onClick={onSubmit}>Deploy agent</Button>
    </Box>
  );
};
