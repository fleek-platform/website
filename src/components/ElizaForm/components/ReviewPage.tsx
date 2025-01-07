import type React from 'react';
import type { GoToProps } from '../utils/types';
import { Box } from './Box';
import { useElizaForm } from '../hooks/useElizaForm';
import { transformSchemaToCharacter } from '../utils/transformData';
import { Button } from './Button';
import { FaChevronLeft } from 'react-icons/fa6';
import { Text } from './Text';
import { useState } from 'react';
import FileEditor from '@components/Eliza/components/FileEditor';
import { cn } from '@utils/cn';
import { Input } from './Input';
import { characterfileSchema } from '../utils/schema';

export type ReviewPageProps = {
  onDeployBtnClick: (characterfile: string | undefined) => void;
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
  const [errors, setErrors] = useState({
    json: false,
    form: {},
  });

  const onSubmit = () => {
    if (!characterFile) return;

    const parsedCharacterfile = JSON.parse(characterFile);
    const isValid = characterfileSchema.parse(parsedCharacterfile);

    console.log(isValid);
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
      <FileEditor
        fileType="json"
        fileContent={characterFile}
        onChange={setCharacterFile}
        onValidation={(jsonError) => setErrors({ ...errors, json: !jsonError })}
        className={cn({ 'border-elz-danger-8 transition-colors': errors.json })}
      />
      {errors.json && (
        <Box
          className={cn('flex-row items-center justify-end', {
            'justify-between': errors.json,
          })}
        >
          <Input.Hint error>
            There was an error parsing your code. Please fix it or revert the
            change above.
          </Input.Hint>
        </Box>
      )}
      <Button onClick={onSubmit}>Deploy agent</Button>
    </Box>
  );
};
