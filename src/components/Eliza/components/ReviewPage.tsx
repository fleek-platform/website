import type React from 'react';
import type { GoToProps, Options } from '../utils/types';
import { Box } from './Box';
import { useElizaForm } from '../hooks/useElizaForm';
import {
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
import { validateZod } from '../utils/validateHelper';
import { INITIAL_FORM } from '../utils/constants';
import { Collapsible } from './Collapsible';

type HeaderProps = {
  from: Options['from'];
  onPrevious: () => void;
};

const Header: React.FC<HeaderProps> = ({ from, onPrevious }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const label = from ? 'Discard and go back' : 'Settings';

  if (isOpen)
    return (
      <Box className="h-32 w-full flex-row items-center justify-between rounded-10 border border-elz-neutral-6 bg-elz-neutral-1 p-4 pl-12 animate-in fade-in-95 zoom-in-[.99]">
        <Text variant="primary" weight={500}>
          Discard characterfile?
        </Text>
        <Box className="flex-row gap-8">
          <Button variant="ghost" size="xs" onClick={toggle}>
            Cancel
          </Button>
          <Button variant="danger" size="xs" onClick={onPrevious}>
            Discard
          </Button>
        </Box>
      </Box>
    );

  return (
    <Box className="w-full flex-row items-center justify-between">
      <Button
        variant="ghost"
        className="text-elz-accent-11"
        onClick={from ? toggle : onPrevious}
      >
        <FaChevronLeft /> {label}
      </Button>
    </Box>
  );
};

type Errors = { json: boolean; form: FormattedError[] };

const INITIAL_ERRORS = {
  json: false,
  form: [],
};

export type ReviewPageProps = GoToProps & {
  characterfile: string | undefined;
  from: Options['from'];
  onDeployBtnClick: (characterfile: string) => void;
};

export const ReviewPage: React.FC<ReviewPageProps> = ({
  characterfile,
  from,
  goTo,
  onDeployBtnClick,
}) => {
  const { getValues, reset } = useElizaForm();
  const data = getValues();
  const transformedData = transformSchemaToCharacter(data);

  const [characterFile, setCharacterFile] = useState<string | undefined>(
    characterfile || JSON.stringify(transformedData, null, 2),
  );
  const [errors, setErrors] = useState<Errors>(INITIAL_ERRORS);

  const hasErrors = errors.json || errors.form.length > 0;

  const onPrevious = () => {
    if (from === 'upload') {
      reset(INITIAL_FORM);
      goTo(from);
    } else {
      goTo('settings');
    }
  };

  const onSubmit = () => {
    if (!characterFile) return;

    setErrors(INITIAL_ERRORS);

    const parsedCharacterFile = JSON.parse(characterFile);
    const validated = validateZod({
      payload: parsedCharacterFile,
      schema: characterfileSchema,
    });

    if (!validated) return;

    if (Array.isArray(validated)) {
      return setErrors({ ...errors, form: validated });
    }
    const payload = JSON.stringify(parsedCharacterFile);
    onDeployBtnClick(payload);
  };

  return (
    <Box className="gap-38">
      <Box className="items-start gap-16">
        <Header onPrevious={onPrevious} from={from} />
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
        {errors.form.length > 0 && (
          <Box className="gap-4 duration-300 animate-in fade-in-75 slide-in-from-top-12">
            {errors.form.map((error, idx) => {
              const isLastItem = idx === errors.form.length - 1;
              const errorMsg = `${error.path}: ${error.message}`;
              return (
                <Box
                  key={idx}
                  className={cn({
                    'border-b border-elz-neutral-3 pb-4': !isLastItem,
                  })}
                >
                  {error.options ? (
                    <Collapsible
                      header={<Input.Hint error>{errorMsg}</Input.Hint>}
                      details={
                        <Input.Hint>
                          Supported options: {error.options.join(', ')}
                        </Input.Hint>
                      }
                    />
                  ) : (
                    <Input.Hint error>{errorMsg}</Input.Hint>
                  )}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <Button variant="primary" onClick={onSubmit}>
        Deploy agent
      </Button>
    </Box>
  );
};
