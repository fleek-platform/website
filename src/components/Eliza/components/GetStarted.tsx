import { ActionBox } from './ActionBox';
import { Text } from './Text';
import type React from 'react';
import { Box } from './Box';
import type { GoToProps } from '../utils/types';
import {
  CloudUploadIcon,
  ExtensionPuzzleIcon,
  ReaderIcon,
} from './CustomIcons';
import { useElizaForm } from '../hooks/useElizaForm';
import { TEMPLATE_CHARACTERFILES_MAP } from '../utils/constants';

type GetStartedProps = GoToProps & {
  isOverCapacity: boolean;
};

export const GetStarted: React.FC<GetStartedProps> = ({
  isOverCapacity,
  goTo,
}) => {
  const { reset } = useElizaForm();

  const onTemplatePageSelect = () => {
    reset(TEMPLATE_CHARACTERFILES_MAP['eliza']);
    goTo('characterfile', { template: 'eliza' });
  };

  return (
    <Box className="gap-38">
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
        <ActionBox
          onClick={() => goTo('upload')}
          icon={<CloudUploadIcon className="size-34 shrink-0" />}
          title="Upload characterfile"
          description="Already have a characterfile? Create an agent with an upload."
        />
        <ActionBox
          onClick={() => goTo('characterfile')}
          icon={<ReaderIcon className="size-34 shrink-0" />}
          title="Build from scratch"
          description="Create an agent by entering details into a form."
        />
        <ActionBox
          onClick={onTemplatePageSelect}
          icon={<ExtensionPuzzleIcon className="size-34 shrink-0" />}
          title="Start with a template"
          description="Create an agent by customizing an existing template."
        />
      </Box>
    </Box>
  );
};
