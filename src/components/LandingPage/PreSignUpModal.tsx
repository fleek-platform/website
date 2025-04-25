import { Modal } from '@components/Modal/Modal';
import type React from 'react';
import { Text } from './Text';
import { useDeployAgentCta } from '@hooks/useDeployAgentCta';

type PreSignUpModalProps = {
  isOpen: boolean;
  avatar: string;
  name: string;
  closeModal: () => void;
};

export const PreSignUpModal: React.FC<PreSignUpModalProps> = ({
  isOpen,
  avatar,
  name,
  closeModal,
}) => {
  const { deployAgentCta } = useDeployAgentCta();

  const handleClick = async () => {
    deployAgentCta();
    await new Promise((r) => setTimeout(r, 400));
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      backdropClassName="bg-transparent backdrop-blur-[4px]"
      modalContainerClassName="w-[340px] py-24 px-16 gap-16 rounded-[24px] bg-gray-dark-2 top-1/3"
    >
      <img
        src={avatar}
        alt="Agent avatar"
        className="size-64 shrink-0 rounded-12 object-cover"
      />
      <div>
        <Text variant="subtitle" className="font-inter font-medium">
          {name} is waiting for you!
        </Text>
        <Text variant="paragraph" className="max-w-[200px] font-inter">
          Sign in or sign up to reach your full potential with Fleek.
        </Text>
      </div>
      <div className="w-full space-y-12">
        <button
          type="button"
          onClick={handleClick}
          className="flex h-36 w-full items-center justify-center rounded-12 bg-neutral-12 font-medium text-neutral-1"
        >
          Sign up
        </button>
        <button
          type="button"
          onClick={handleClick}
          className="flex h-36 w-full items-center justify-center rounded-12 bg-gray-dark-3 font-medium text-neutral-12"
        >
          Sign in
        </button>
      </div>
    </Modal>
  );
};
