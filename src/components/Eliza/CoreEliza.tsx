import React, { useMemo } from 'react';

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

interface StepConfig {
  id: string;
  condition: boolean;
  content: React.ReactElement;
}

interface ElizaCoreProps {
  isLoggedIn: UseDeployAIAgentProps['isLoggedIn'];
  login: UseDeployAIAgentProps['login'];
  triggerAgentDeployment: UseDeployAIAgentProps['triggerAgentDeployment'];
  getAgentDeploymentStatus: UseDeployAIAgentProps['getAgentDeploymentStatus'];
  ensureUserSubscription: UseDeployAIAgentProps['ensureUserSubscription'];
}

export const CoreEliza: React.FC<ElizaCoreProps> = ({
  isLoggedIn,
  login,
  triggerAgentDeployment,
  ensureUserSubscription,
  getAgentDeploymentStatus,
}) => {
  const elizaIntegrations: UseDeployAIAgentProps = {
    login,
    isLoggedIn,
    triggerAgentDeployment,
    getAgentDeploymentStatus,
    ensureUserSubscription,
  };

  const [characterFile, setCharacterFile] = useState<string | undefined>();

  const {
    deployAgent,
    resetDeployment,
    isDeploymentStarted,
    isDeploymentSuccessful,
    isDeploymentFailed,
    deploymentStatus,
    fleekMachineUrl,
  } = useDeployAIAgent({ ...elizaIntegrations });

  const GoBackButton = (
    <Button onClick={resetDeployment}>
      <FaChevronLeft />
      Go back
    </Button>
  );

  const steps = useMemo<StepConfig[]>(
    () => [
      /* STEP 1 - UPLOAD characterfile */
      {
        id: 'eliza-builder',
        condition: !isDeploymentStarted,
        content: (
          <Navigation
            onDeployBtnClick={(characterfile) => {
              setCharacterFile(characterfile);
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
        condition: isDeploymentStarted && isDeploymentFailed,
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
              onRetryClick={() => {
                resetDeployment();
                deployAgent(characterFile);
              }}
              deploymentStatus={deploymentStatus}
            />
          </Step>
        ),
      },
    ],
    [
      isDeploymentStarted,
      isDeploymentFailed,
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
    </>
  );
};
