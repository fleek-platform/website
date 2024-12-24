import React, { useCallback, useMemo, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import ChooseCharacterFile from './components/ChooseCharacterFile';
import EditCharacterFile from './components/EditCharacterFile';
import ConfigureEnvFile from './components/EditEnvFile';
import Step from './components/Step';
import ChooseEnvFile from './components/ChooseEnvFile';
import ConfirmAgentDetails from './components/ConfirmAgentDetails.tsx';
import DeploymentStatus from './components/DeploymentStatus.tsx';
import DeploymentFailed from './components/DeploymentFailed.tsx';
import {
  useDeployAIAgent,
  type UseDeployAIAgentProps,
} from './hooks/useDeployAIAgent.ts';
import {
  getDeploymentStatus,
  mockGetDeploymentStatus,
  mockTriggerDeployment,
  triggerDeployment,
} from './api/api.ts';
import {
  SubscriptionModal,
  useSubscriptionModal,
} from './components/SubscriptionModal.tsx';
import { delay } from './utils/delay.ts';
import { useElizaFeatureFlags } from './hooks/useElizaFeatureFlags.ts';
import { AUTH_TOKEN_NAME } from './utils/contants.ts';
import { AuthProvider } from '@components/AuthProvider/AuthProvider.tsx';
import { getCookie } from '@utils/cookies.ts';
interface StepConfig {
  id: string;
  condition: boolean;
  content: React.ReactElement;
}

interface ElizaCoreProps {}

const CoreEliza: React.FC<ElizaCoreProps> = () => {
  const subscriptionModalCallbackRef = useRef<(value?: boolean) => void>();

  const featureFlags = useElizaFeatureFlags([
    'subscriptionEnabled',
    'mocksEnabled',
  ]);
  const {
    isSubscriptionModalVisible,
    setIsSubscriptionModalVisible,
    onlyAiModule,
    setOnlyAiModule,
  } = useSubscriptionModal();

  const elizaIntegrations: UseDeployAIAgentProps = {
    checkUserSubscription: async (): Promise<{
      ok: boolean;
      missingSubscription: boolean;
      missingAiModule: boolean;
    }> => {
      if (!featureFlags.subscriptionEnabled) {
        return {
          ok: true,
          missingSubscription: false,
          missingAiModule: false,
        };
      }
      // TODO: Implement actual subscription check here
      // Import and trigger request to check user subscription
      toast.error('Your subscription is invalid :( - Pending implementation');

      await delay(1000);

      return {
        ok: false,
        missingSubscription: true,
        missingAiModule: true,
      };
    },
    triggerUserSubscription: async (params?: {
      onlyAiModule?: boolean;
    }): Promise<boolean> => {
      if (!featureFlags.subscriptionEnabled) {
        return true;
      }
      setOnlyAiModule(params?.onlyAiModule ?? false);
      setIsSubscriptionModalVisible(true);

      const result = await new Promise<boolean | undefined>((resolve) => {
        subscriptionModalCallbackRef.current = resolve;
      });

      return !!result;
    },
    triggerAgentDeployment: async (characterfile, env) => {
      const token = getCookie(AUTH_TOKEN_NAME);
      if (!token) return { ok: false };

      const res = featureFlags.mocksEnabled
        ? await mockTriggerDeployment(characterfile, env, token)
        : await triggerDeployment(characterfile, env, token);

      return {
        ok: res.ok,
        deploymentId: res?.data?.deploymentId ?? undefined,
      };
    },
    getDeploymentStatus: async (deploymentId: string) => {
      const token = getCookie(AUTH_TOKEN_NAME);
      if (!token) throw new Error('User is not authenticated.');

      return featureFlags.mocksEnabled
        ? mockGetDeploymentStatus(deploymentId, token)
        : getDeploymentStatus(deploymentId, token);
    },
  };

  const {
    activeStep,
    goToPreviousStep,
    goToNextStep,
    characterFile,
    setCharacterFile,
    envFile,
    setEnvFile,
    isDeploymentSuccessful,
    isDeploymentFailed,
    cancelDeployment,
    deploymentStatus,
    fleekMachineUrl,
  } = useDeployAIAgent(elizaIntegrations);

  const GoBackButton = (
    <button
      className="text-[14px] leading-[20px] text-[#F5E147]"
      onClick={goToPreviousStep}
    >
      {'< Go back'}
    </button>
  );

  const onUploadCharacterFile = useCallback(
    (content: string) => {
      setCharacterFile(content);
      goToNextStep();
    },
    [setCharacterFile, goToNextStep],
  );

  const onUploadEnvFile = useCallback(
    (content: string) => {
      setEnvFile(content);
      goToNextStep();
    },
    [setEnvFile, goToNextStep],
  );

  const steps = useMemo<StepConfig[]>(
    () => [
      /* STEP 1 - UPLOAD characterfile */
      {
        id: 'upload-characterfile',
        condition: activeStep === 1,
        content: (
          <Step
            title="Get started"
            description={
              <p>
                Deploy your AI agent personality using the Eliza framework,
                starting with your characterfile. Click{' '}
                <a
                  className="underline"
                  href="https://github.com/ai16z/eliza/blob/main/characters/trump.character.json"
                  target="_blank"
                >
                  here
                </a>{' '}
                to view a characterfile example.
              </p>
            }
            customTopElement="Deploy an AI agent"
          >
            <ChooseCharacterFile
              handleCharacterFileChange={onUploadCharacterFile}
            />
          </Step>
        ),
      },

      /* STEP 2 - EDIT characterfile */
      {
        id: 'edit-characterfile',
        condition: activeStep === 2,
        content: (
          <Step
            title="Edit characterfile"
            description="Make final edits to your characterfile. In the next step, you’ll add environment variables."
            customTopElement={GoBackButton}
          >
            <EditCharacterFile
              characterFile={characterFile}
              onCharacterFileChange={setCharacterFile}
              onSubmitClick={goToNextStep}
              className="max-w-screen-md"
            />
          </Step>
        ),
      },

      /* UPLOAD .env file */
      {
        id: 'upload-envfile',
        condition: activeStep === 3,
        content: (
          <Step
            title="Set up .env variables"
            description={
              <p>
                Add environment variables for any services your AI agent will
                access, including LLMs. Click{' '}
                <a
                  className="underline"
                  href="https://github.com/ai16z/eliza/blob/main/.env.example"
                  target="_blank"
                >
                  here
                </a>{' '}
                to view an example.
              </p>
            }
            customTopElement={GoBackButton}
          >
            <ChooseEnvFile handleEnvFileChange={onUploadEnvFile} />
          </Step>
        ),
      },

      /* EDIT .env file */
      {
        id: 'edit-envfile',
        condition: activeStep === 4,
        content: (
          <Step
            title="Edit .env variables"
            description="Make final edits to your .env file. In the next step, you’ll confirm details ahead of a deployment."
            customTopElement={GoBackButton}
          >
            <ConfigureEnvFile
              envFile={envFile}
              onEnvFileChange={setEnvFile}
              onSubmitClick={goToNextStep}
            />
          </Step>
        ),
      },

      /* REVIEW characterfile and .env file */
      {
        id: 'review-characterfile-and-envfile',
        condition: activeStep === 5,
        content: (
          <Step
            title="Confirm agent details"
            description="You'll be deploying an agent with the information below. This is the final step before your agent is deployed."
            customTopElement={GoBackButton}
          >
            <ConfirmAgentDetails
              characterFile={characterFile}
              onCharacterFileChange={setCharacterFile}
              envFile={envFile}
              onEnvFileChange={setEnvFile}
              onSubmitClick={goToNextStep}
            />
          </Step>
        ),
      },

      /* HANDLE deployment and show results */
      {
        id: 'handle-deployment',
        condition: !isDeploymentFailed && activeStep === 6,
        content: (
          <Step
            title={
              !isDeploymentSuccessful
                ? 'Deploy AI agent'
                : 'Your AI agent is live'
            }
            description={
              !isDeploymentSuccessful
                ? 'Give us a moment to deploy your AI agent. We’re running a few checks to ensure your agent functions as expected.'
                : 'Review the details below for information on how to engage with your AI agent, now live at the URL below.'
            }
            customTopElement={
              isDeploymentSuccessful ? <>🎉 Congratulations!</> : null
            }
          >
            <DeploymentStatus
              isDeploymentComplete={isDeploymentSuccessful}
              deploymentStatus={deploymentStatus}
              fleekMachineUrl={fleekMachineUrl}
            />
          </Step>
        ),
      },

      /* HANDLE deployment failure */
      {
        id: 'handle-deployment-failure',
        condition: isDeploymentFailed && activeStep === 6,
        content: (
          <Step
            title={
              deploymentStatus &&
              !Object.values(deploymentStatus).some(
                (status) => status === 'failed',
              )
                ? 'Deployment failed'
                : 'We found an issue'
            }
            description={
              deploymentStatus &&
              !Object.values(deploymentStatus).some(
                (status) => status === 'failed',
              )
                ? 'There was an issue with the deployment of your AI agent. Please try again, edit info from a previous step or contact Fleek support.'
                : 'Refer to the below error to continue with your deployment. If the error requires an edit, return to a previous step before retrying.'
            }
            customTopElement={GoBackButton}
          >
            <DeploymentFailed
              onRetryClick={goToPreviousStep}
              deploymentStatus={deploymentStatus}
            />
          </Step>
        ),
      },
    ],
    [
      activeStep,
      isDeploymentFailed,
      onUploadCharacterFile,
      onUploadEnvFile,
      setCharacterFile,
      setEnvFile,
      goToNextStep,
      goToPreviousStep,
      deploymentStatus,
      fleekMachineUrl,
    ],
  );

  return (
    <>
      {steps.map(
        (step) =>
          step.condition && (
            <React.Fragment key={step.id}>{step.content}</React.Fragment>
          ),
      )}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#222222',
            color: '#fff',
            fontSize: '12px',
          },
        }}
      />
      <SubscriptionModal
        isVisible={isSubscriptionModalVisible}
        setIsVisible={setIsSubscriptionModalVisible}
        onlyAiModule={onlyAiModule}
        onSuccess={subscriptionModalCallbackRef.current}
      />
    </>
  );
};

interface AuthPromiseContextProps {
  loginPromiseResolveRef: React.MutableRefObject<
    ((value: boolean) => void) | undefined
  >;
}

export const AuthPromiseContext = React.createContext<AuthPromiseContextProps>({
  loginPromiseResolveRef: { current: undefined },
});

const Eliza: React.FC = () => {
  return (
    <AuthProvider>
      <CoreEliza />
    </AuthProvider>
  );
};

export default Eliza;
