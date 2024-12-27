import { ActionBox } from './ActionBox';
import { Layout } from './Layout';
import { Text } from './Text';
import type React from 'react';
import { Box } from './Box';
import type { GoToProps } from '../types';
import {
  CloudUploadIcon,
  ExtensionPuzzleIcon,
  ReaderIcon,
} from './CustomIcons';

export const GetStarted: React.FC<GoToProps> = ({ goTo }) => {
  return (
    <Box className="gap-38 animate-in zoom-in-[1.025]">
      <Box className="items-start gap-16">
        <Text variant="secondary" className="flex h-32 items-center">
          Deploy an AI agent
        </Text>
        <Text>Get started</Text>
        <Text variant="description" className="text-wrap">
          To start developing your AI agent, please select one of the options
          provided below.
        </Text>
      </Box>
      <Box className="gap-22">
        {/* <ActionBox
          onClick={() => goTo('upload')}
          icon={<CloudUploadIcon className="size-34 shrink-0" />}
          title="Upload characterfile"
          description="Already have a characterfile? Create an agent with an upload."
        /> */}
        <ActionBox
          onClick={() => goTo('characterfile')}
          icon={<ReaderIcon className="size-34 shrink-0" />}
          title="Build from scratch"
          description="Create an agent by entering details into a form."
        />
        <ActionBox
          onClick={() =>
            goTo('characterfile', { forwardProps: { template: 'eliza' } })
          }
          icon={<ExtensionPuzzleIcon className="size-34 shrink-0" />}
          title="Start with template"
          description="Create an agent by customizing an existing template."
        />
      </Box>
    </Box>
  );
};
