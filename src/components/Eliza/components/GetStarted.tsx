import settings from '../../../settings.json';
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
import { Modal } from './Modal';
import Link, { Target } from './Link';
import type { UseDeployAIAgentProps } from '../hooks/useDeployAIAgent';

type OverCapacityModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  isLoggedIn: UseDeployAIAgentProps['isLoggedIn'];
  login: UseDeployAIAgentProps['login'];
};

const OverCapacityModal: React.FC<OverCapacityModalProps> = ({
  isOpen,
  closeModal,
  login,
  isLoggedIn,
}) => {
  const title = isLoggedIn ? "You're in" : 'Sorry,';

  const description = isLoggedIn
    ? 'When we have capacity to deploy new AI agents you will be first in line. Please try again later!'
    : "We're currently over capacity and unable to deploy new AI agents. Sign in now to save time and try again later!";

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Box className="gap-12">
        <Text>{title}</Text>
        <Text variant="description">{description}</Text>
        <IllustrationIcon className="mt-16 h-200" />
        <Box className="flex-row items-center gap-16 *:flex-1">
          <Button variant="ghost" onClick={closeModal}>
            Close
          </Button>
          {!isLoggedIn && <Button onClick={login}>Sign in</Button>}
        </Box>
      </Box>
    </Modal>
  );
};

type GetStartedProps = GoToProps & {
  isOverCapacity: boolean;
  isLoggedIn: UseDeployAIAgentProps['isLoggedIn'];
  login: UseDeployAIAgentProps['login'];
};

export const GetStarted: React.FC<GetStartedProps> = ({
  isOverCapacity,
  goTo,
  login,
  isLoggedIn,
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
      <OverCapacityModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        login={login}
        isLoggedIn={isLoggedIn}
      />
      <Box className="items-start gap-16">
        <Text variant="secondary" className="flex h-32 items-center">
          Deploy an AI agent
        </Text>
        <Text>Get started</Text>
        <Text variant="description" className="text-wrap">
          To start developing your AI agent, please select one of the options
          provided below. Check our{' '}
          <Link
            target={Target.Blank}
            href={settings.elizaPage.guides.getStarted}
            className="underline hover:text-elz-white"
          >
            guide
          </Link>{' '}
          for reference.
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
          onClick={withCapacityCheck(() => onTemplatePageSelect())}
          icon={<ExtensionPuzzleIcon className="size-34 shrink-0" />}
          title="Start with a template"
          description="Create an agent by customizing an existing template."
        />
      </Box>
    </Box>
  );
};
