import React from 'react';

import Step from './components/Step';
import DeploymentStatus from './components/DeploymentStatus.tsx';
import DeploymentFailed from './components/DeploymentFailed.tsx';

import {
  useDeployAIAgent,
  type UseDeployAIAgentProps,
} from './hooks/useDeployAIAgent.ts';
import { Navigation } from '@components/Eliza/components/Navigation.tsx';
import { useState } from 'react';
import { Button } from '@components/Eliza/components/Button.tsx';
import { FaChevronLeft } from 'react-icons/fa6';
import type { NavigationState } from './utils/types.ts';
import { Layout } from './components/Layout.tsx';
import { IllustrationIcon } from './components/CustomIcons.tsx';
import { Box } from './components/Box.tsx';
import { Text } from './components/Text.tsx';

interface ElizaCoreProps {
  isLoggedIn: UseDeployAIAgentProps['isLoggedIn'];
  isLoggingIn: UseDeployAIAgentProps['isLoggingIn'];
  login: UseDeployAIAgentProps['login'];
  triggerAgentDeployment: UseDeployAIAgentProps['triggerAgentDeployment'];
  getAgentDeploymentStatus: UseDeployAIAgentProps['getAgentDeploymentStatus'];
  ensureUserSubscription: UseDeployAIAgentProps['ensureUserSubscription'];
  projectId: string | undefined;
}

export const CoreEliza: React.FC<ElizaCoreProps> = ({
  isLoggedIn,
  isLoggingIn,
  login,
  triggerAgentDeployment,
  ensureUserSubscription,
  getAgentDeploymentStatus,
  projectId,
}) => {
  const elizaIntegrations: UseDeployAIAgentProps = {
    login,
    isLoggedIn,
    isLoggingIn,
    triggerAgentDeployment,
    getAgentDeploymentStatus,
    ensureUserSubscription,
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

  const steps = [
    /* STEP 1 - UPLOAD characterfile */
    {
      id: 'eliza-builder',
      condition: !isDeploymentStarted,
      content: (
        <Navigation
          navigationState={navigationState}
          handleNavigationStateChange={handleNavigationStateChange}
          onDeployBtnClick={(characterfile) => {
            deployAgent(characterfile);
          }}
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
            deploymentStatus &&
            !Object.values(deploymentStatus).some(
              (status) => status === 'false',
            )
              ? 'There was an issue with the deployment of your AI agent. Please try again, edit info from a previous step or contact Fleek support.'
              : 'Refer to the below error to continue with your deployment. If the error requires an edit, return to a previous step before retrying.'
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
    <Layout className="relative">
      {isLoggingIn && (
        <div className="absolute z-10 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,1)]">
          <IllustrationIcon className="h-304 animate-pulse pt-48" />
        </div>
      )}
      {steps.map(
        (step) =>
          step.condition && (
            <React.Fragment key={step.id}>{step.content}</React.Fragment>
          ),
      )}
    </Layout>
  );
};
