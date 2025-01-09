import type React from 'react';
import type { GoToProps } from '../utils/types';
import { Button } from './Button';
import { Box } from './Box';
import { FaChevronLeft } from 'react-icons/fa6';
import { Text } from './Text';
import Link, { Target } from './Link';
import ChooseCharacterFile from '@components/Eliza/components/ChooseCharacterFile';
import { useElizaForm } from '../hooks/useElizaForm';
import {
  type FormattedError,
  transformCharacterToSchema,
} from '../utils/transformData';
import { validateZod } from '../utils/validateHelper';
import { characterfileSchema } from '../utils/schema';
import { useEffect, useState } from 'react';
import { cn } from '@utils/cn';
import { Input } from './Input';

interface UploadPageProps extends GoToProps {
  initialState?: {
    characterFile: string | undefined;
  };
  onCharacterfileUpload: (characterfile: string | undefined) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({
  goTo,
  onCharacterfileUpload,
  initialState,
}) => {
  const [errors, setErrors] = useState<FormattedError[]>([]);

  const { reset } = useElizaForm();

  useEffect(() => {
    if (initialState?.characterFile) {
      onCharacterfileChange(initialState.characterFile);
    }
  }, [initialState]);

  const onCharacterfileChange = (characterfile: string) => {
    setErrors([]);
    onCharacterfileUpload?.(characterfile);
    const parsedCharacterfile = JSON.parse(characterfile);

    const validated = validateZod({
      payload: parsedCharacterfile,
      schema: characterfileSchema,
    });

    if (Array.isArray(validated)) {
      setErrors(validated);
    }

    const transformedCharacterfile =
      transformCharacterToSchema(parsedCharacterfile);
    reset(transformedCharacterfile);
    goTo('review', { from: 'upload' });
  };

  return (
    <>
      <Box className="gap-16">
        <Button
          variant="ghost"
          className="w-fit text-elz-accent-11"
          onClick={() => goTo('getStarted')}
        >
          <FaChevronLeft /> Go back
        </Button>
        <Text>Upload characterfile</Text>
        <Text variant="description">
          Deploy your AI agent personality using the Eliza framework, starting
          with a .json characterfile. Click{' '}
          <Link
            target={Target.Blank}
            href="https://github.com/elizaOS/eliza/blob/main/characters/dobby.character.json"
            className="underline hover:text-white"
          >
            here
          </Link>{' '}
          to view a characterfile example.
        </Text>
      </Box>
      <Box className="gap-4">
        <ChooseCharacterFile
          handleCharacterFileChange={onCharacterfileChange}
          className={cn({ 'border-elz-danger-8': errors.length > 0 })}
        />
        {errors.length > 0 && (
          <Box className="gap-4 duration-300 animate-in fade-in-75 slide-in-from-top-12">
            {errors.map((error, idx) => (
              <Input.Hint error key={idx}>
                - {error.path}: {error.message}
              </Input.Hint>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};
