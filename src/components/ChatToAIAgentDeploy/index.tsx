import '@fleek-platform/agents-ui/styles';
import {
  ChatBox,
  type FileWithPreview,
  useDeployFromPrompt,
  SubscriptionModal,
  setDefined,
} from '@fleek-platform/agents-ui';
import { useAuthStore } from '@fleek-platform/login-button';
import { setReferralQueryKeyValuePair } from '@utils/referrals';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { isClient } from '@utils/common';
import toast from 'react-hot-toast';
import { ZodError } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

setDefined({
  PUBLIC_FLEEK_REST_API_HOST: import.meta.env.PUBLIC_FLEEK_REST_API_HOST,
  PUBLIC_PERSONA_GENERATOR_API_URL: import.meta.env
    .PUBLIC_PERSONA_GENERATOR_API_URL,
});

export const ChatToAIAgentDeploy = ({
  role,
  onDescriptionChange,
}: {
  role?: string;
  onDescriptionChange?: () => void;
}) => {
  const { triggerLoginModal, isLoggedIn, accessToken, projectId } =
    useAuthStore();

  const { deploy, isDeploying } = useDeployFromPrompt({
    onDeploy: ({ agentId }) => {
      window.location.href = `${import.meta.env.PUBLIC_UI_AGENTS_APP_URL}/drafts/${agentId}/deploying`;
    },
    onError: (error) => {
      let message = 'Failed to deploy agent';
      if (error instanceof ZodError) {
        message =
          'Your prompt didn’t generate a valid agent. Try refining it or click the magic wand button to enhance it.';
      }

      toast.error(message, {
        duration: 20_000,
      });
    },
  });

  const hasRun = useRef(false);
  const pendingPrompt = useRef<string>();
  useEffect(() => {
    if (isLoggedIn && !hasRun.current && pendingPrompt.current) {
      hasRun.current = true;
      deploy({
        prompt: pendingPrompt.current,
        accessToken,
        projectId,
      });
      pendingPrompt.current = undefined;
    }
  }, [isLoggedIn, accessToken, projectId, deploy]);

  const onSubmit = async (description: string, files: FileWithPreview[]) => {
    if (isLoggedIn) {
      deploy({
        prompt: description,
        accessToken,
        projectId,
      });

      return true;
    }

    pendingPrompt.current = description;
    hasRun.current = false;
    setReferralQueryKeyValuePair('agents');
    if (typeof triggerLoginModal !== 'function') {
      console.log('[debug] triggerLoginModal is not a fn!');

      return false;
    }

    triggerLoginModal(true);

    return true;
  };

  const onSuccess = () => {
    console.log('[debug] Submission successful');
  };

  const onError = (error: Error) => {
    console.error('[debug] Submission failed:', error);
  };

  return (
    <div className="agents-ui my-20 flex justify-center text-14">
      <ChatBox
        onSubmit={onSubmit}
        onSuccess={onSuccess}
        onError={onError}
        maxFileSize={MAX_FILE_SIZE}
        onDescriptionChange={onDescriptionChange}
        prompt={
          role ? `I want to create a ${role.toLocaleLowerCase()}.` : undefined
        }
        isSubmitting={isDeploying}
      />

      {isClient &&
        createPortal(
          <div className="agents-ui">
            <SubscriptionModal />
          </div>,
          document.body,
        )}
    </div>
  );
};
