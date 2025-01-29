import React from 'react';

import Step from './components/Step';
import DeploymentStatus from './components/DeploymentStatus';
import DeploymentFailed from './components/DeploymentFailed';

import {
  useDeployAIAgent,
  type UseDeployAIAgentProps,
} from './hooks/useDeployAIAgent';
import { Navigation } from '@components/Eliza/components/Navigation';
import { useState } from 'react';
import { Button } from '@components/Eliza/components/Button';
import { FaChevronLeft } from 'react-icons/fa6';
import type { NavigationState } from './utils/types';
import { Layout } from './components/Layout';
import { IllustrationIcon } from './components/CustomIcons';
import { Box } from './components/Box';
import { Text } from './components/Text';

import { pages } from './settings';
import { NewsletterSubscriber } from './components/NewsletterSubscriber';
import type { CaptureEventFn } from './types';
import { FormProviderCharacterBuilder } from './hooks/useElizaForm';

interface ElizaCoreProps {
  isLoggedIn: UseDeployAIAgentProps['isLoggedIn'];
  isLoggingIn: UseDeployAIAgentProps['isLoggingIn'];
  login: UseDeployAIAgentProps['login'];
  triggerAgentDeployment: UseDeployAIAgentProps['triggerAgentDeployment'];
  getAgentDeploymentStatus: UseDeployAIAgentProps['getAgentDeploymentStatus'];
  ensureUserSubscription: UseDeployAIAgentProps['ensureUserSubscription'];
  projectId: string | undefined;
  captureEvent?: CaptureEventFn;
}

export const CoreEliza: React.FC<ElizaCoreProps> = ({
  isLoggedIn,
  isLoggingIn,
  login,
  triggerAgentDeployment,
  ensureUserSubscription,
  getAgentDeploymentStatus,
  projectId,
  captureEvent: externalCaptureEvent,
}) => {
  const captureEvent: CaptureEventFn = (eventName, eventProperties) => {
    if (externalCaptureEvent) {
      try {
        externalCaptureEvent(eventName, eventProperties);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const elizaIntegrations: UseDeployAIAgentProps = {
    login,
    isLoggedIn,
    isLoggingIn,
    triggerAgentDeployment,
    getAgentDeploymentStatus,
    ensureUserSubscription,
    captureEvent,
  };

  const {
    deployAgent,
    resetDeployment,
    isDeploymentStarted,
    isDeploymentSuccessful,
    isDeploymentFailed,
    deploymentStatus,
    deployedAgentId,
  } = useDeployAIAgent({ ...elizaIntegrations });

  const [navigationState, setNavigationState] = useState<NavigationState>({
    page: 'getStarted',
    completedStep: 0,
    characterFile: undefined,
    options: {
      from: undefined,
      template: undefined,
    },
  });

  const [isDeploying, setIsDeploying] = useState(false);

  const handleNavigationStateChange = (newNavigationState: NavigationState) => {
    setNavigationState(newNavigationState);
  };

  const GoBackButton = (
    <Button
      variant="ghost"
      className="text-elz-accent-11"
      onClick={resetDeployment}
    >
      <FaChevronLeft />
      Go back
    </Button>
  );

  const onDeployButtonClick = async (characterfile?: string) => {
    if (isDeploying) return;
    setIsDeploying(true);
    await deployAgent(characterfile, projectId);
    setIsDeploying(false);
  };

  const steps = [
    /* STEP 1 - UPLOAD characterfile */
    {
      id: 'eliza-builder',
      condition: !isDeploymentStarted,
      content: (
        <Navigation
          navigationState={navigationState}
          handleNavigationStateChange={handleNavigationStateChange}
          onDeployBtnClick={onDeployButtonClick}
          login={login}
          isLoggedIn={isLoggedIn}
          captureEvent={captureEvent}
        />
      ),
    },

    /* HANDLE deployment and show results */
    {
      id: 'handle-deployment',
      condition: isDeploymentStarted && !isDeploymentFailed,
      content: (
        <Step
          title={
            !isDeploymentSuccessful
              ? 'Deploy AI agent'
              : 'Your AI agent is live'
          }
          description={
            !isDeploymentSuccessful ? (
              <Box>
                <Text variant="description">
                  Give us a moment to deploy your AI agent. We're running a few
                  checks to ensure your agent functions as expected.
                </Text>
                <IllustrationIcon className="h-304 animate-pulse pt-48" />
              </Box>
            ) : (
              'Review the details below for information on how to engage with your AI agent, now live at the URL below.'
            )
          }
          customTopElement={
            isDeploymentSuccessful ? <>🎉 Congratulations!</> : null
          }
        >
          <DeploymentStatus
            isDeploymentComplete={isDeploymentSuccessful}
            deploymentStatus={deploymentStatus}
            agentId={deployedAgentId}
            projectId={projectId}
          />
        </Step>
      ),
    },

    /* HANDLE deployment failure */
    {
      id: 'handle-deployment-failure',
      condition: isDeploymentStarted && isDeploymentFailed,
      content: (
        <Step
          title={
            deploymentStatus &&
            !Object.values(deploymentStatus).some(
              (status) => status === 'false',
            )
              ? 'Deployment failed'
              : 'We found an issue'
          }
          description={
            <Text as="h2" variant="description">
              There was an issue with the deployment of your AI agent. Please
              try again, edit info from a previous step or contact{' '}
              <a href={pages.supportExternalUrl}>Fleek support</a>.
            </Text>
          }
          customTopElement={GoBackButton}
        >
          <DeploymentFailed
            onRetryClick={resetDeployment}
            deploymentStatus={deploymentStatus}
          />
        </Step>
      ),
    },
  ];

  return (
    <Layout className="relative" page={navigationState.page}>
      <NewsletterSubscriber isLoggedIn={isLoggedIn} />
      {isLoggingIn && (
        <div className="absolute z-10 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,1)]">
          <IllustrationIcon className="h-304 animate-pulse pt-48" />
        </div>
      )}
      <FormProviderCharacterBuilder>
        {steps.map(
          (step) =>
            step.condition && (
              <React.Fragment key={step.id}>{step.content}</React.Fragment>
            ),
        )}
      </FormProviderCharacterBuilder>
    </Layout>
  );
};
