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
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import { useAuthentication } from '@components/AuthProvider/useAuthentication';
import Link, { Target } from './Link';
import { FaXmark } from 'react-icons/fa6';
import { LoadingSpinner } from './Icons';

type OverCapacityModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const OverCapacityModal: React.FC<OverCapacityModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const { login, isLoggedIn } = useAuthentication();

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

const NewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      modalContainerClassName="bg-elz-neutral-3 p-6"
    >
      <Box className="z-10">
        <Button variant="ghost" className="ml-auto" onClick={closeModal}>
          <FaXmark />
        </Button>
        <iframe
          src="https://embeds.beehiiv.com/b9b33b5f-b89e-4560-ab30-a62ce506b823"
          data-test-id="beehiiv-embed"
          style={{ minHeight: '320px' }}
        ></iframe>
      </Box>
      <Box className="absolute inset-0 self-center justify-self-center">
        <LoadingSpinner />
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
      <NewsletterModal />
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
