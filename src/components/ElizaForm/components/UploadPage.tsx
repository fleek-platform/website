import type React from 'react';
import type { GoToProps } from '../utils/types';
import { Button } from './Button';
import { Box } from './Box';
import { FaChevronLeft } from 'react-icons/fa6';
import { Text } from './Text';
import Link, { Target } from './Link';
import ChooseCharacterFile from '@components/Eliza/components/ChooseCharacterFile';
import { useElizaForm } from '../hooks/useElizaForm';
import { transformCharacterToSchema } from '../utils/transformData';

export const UploadPage: React.FC<GoToProps> = ({ goTo }) => {
  const { reset } = useElizaForm();

  const onCharacterfileChange = (characterfile: string) => {
    const parseCharacterfile = JSON.parse(characterfile);
    const transformedCharacterfile =
      transformCharacterToSchema(parseCharacterfile);
    reset(transformedCharacterfile);
    goTo('review');
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
            href="https://github.com/elizaOS/eliza/blob/main/characters/trump.character.json"
            className="underline hover:text-white"
          >
            here
          </Link>{' '}
          to view a characterfile example.
        </Text>
      </Box>
      <ChooseCharacterFile handleCharacterFileChange={onCharacterfileChange} />
    </>
  );
};
