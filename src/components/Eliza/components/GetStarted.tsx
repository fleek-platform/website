import { ActionBox } from './ActionBox';
import { Text } from './Text';
import type React from 'react';
import { Box } from './Box';
import type { GoToProps } from '../utils/types';
import {
  CloudUploadIcon,
  ExtensionPuzzleIcon,
  IllustrationIcon,
  ReaderIcon,
} from './CustomIcons';
import { useElizaForm } from '../hooks/useElizaForm';
import { TEMPLATE_CHARACTERFILES_MAP } from '../utils/constants';
import { useState } from 'react';
import { Button } from './Button';
import { FaXmark } from 'react-icons/fa6';
import { useOnKeyDown } from '../hooks/useOnKeyDown';
import { useDisableScroll } from '../hooks/useDisableScroll';
import { Modal } from './Modal';

type OverCapacityModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const OverCapacityModal: React.FC<OverCapacityModalProps> = ({
  isOpen,
  closeModal,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Box className="flex-row justify-between">
        <Box className="gap-12">
          <Text>Sorry,</Text>
          <Text variant="description">
            We are over capacity right now to deploy new AI agents.
          </Text>
          <IllustrationIcon className="mr-auto h-200" />
          <Text variant="description">Sign in and don't miss next time:</Text>
          <Button>Sign in</Button>
        </Box>
        <Button
          size="lg"
          variant="ghost"
          onClick={closeModal}
          className="size-44"
        >
          <FaXmark />
        </Button>
      </Box>
    </Modal>
  );
};

type GetStartedProps = GoToProps & {
  isOverCapacity: boolean;
};

export const GetStarted: React.FC<GetStartedProps> = ({
  isOverCapacity,
  goTo,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { reset } = useElizaForm();

  const withCapacityCheck = (callbackFn: () => void) => () => {
    if (isOverCapacity) {
      setIsOpen(true);
    } else {
      callbackFn();
    }
  };

  const onTemplatePageSelect = () => {
    reset(TEMPLATE_CHARACTERFILES_MAP['eliza']);
    goTo('characterfile', { template: 'eliza' });
  };

  return (
    <Box className="relative gap-38">
      <OverCapacityModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
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
          onClick={withCapacityCheck(() => goTo('upload'))}
          icon={<CloudUploadIcon className="size-34 shrink-0" />}
          title="Upload characterfile"
          description="Already have a characterfile? Create an agent with an upload."
        />
        <ActionBox
          onClick={withCapacityCheck(() => goTo('characterfile'))}
          icon={<ReaderIcon className="size-34 shrink-0" />}
          title="Build from scratch"
          description="Create an agent by entering details into a form."
        />
        <ActionBox
          onClick={withCapacityCheck(() => onTemplatePageSelect)}
          icon={<ExtensionPuzzleIcon className="size-34 shrink-0" />}
          title="Start with a template"
          description="Create an agent by customizing an existing template."
        />
      </Box>
    </Box>
  );
};
