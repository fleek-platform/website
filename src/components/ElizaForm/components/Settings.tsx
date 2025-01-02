import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Box } from './Box';
import { Button } from './Button';
import { Text } from './Text';
import type { GoToProps } from '../types';
import type React from 'react';
import Link, { Target } from './Link';

type SettingsProps = GoToProps;

export const Settings: React.FC<SettingsProps> = ({ goTo }) => {
  return (
    <>
      <Box className="items-start gap-16">
        <Box className="w-full flex-row items-center justify-between">
          <Button
            variant="ghost"
            className="text-elz-accent-11"
            onClick={() => goTo('characterfile')}
          >
            <FaChevronLeft className="size-12" /> Characterfile
          </Button>
          <Button className="text-elz-accent-11" variant="ghost" disabled>
            Review <FaChevronRight />
          </Button>
        </Box>
        <Text>Settings</Text>
        <Text variant="description" className="text-wrap">
          Add environment variables for any services your AI agent will access,
          including LLMs. Click{' '}
          <Link
            href="https://github.com/elizaOS/eliza/blob/main/.env.example"
            className="underline hover:text-white"
            target={Target.Blank}
          >
            here
          </Link>{' '}
          to view an example.
        </Text>
      </Box>
    </>
  );
};
