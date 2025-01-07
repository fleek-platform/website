import React, { useCallback, useMemo } from 'react';

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
import { Button } from '@components/ElizaForm/components/Button.tsx';
import { FaChevronLeft } from 'react-icons/fa6';
import type { GoToProps } from '@components/ElizaForm/types.ts';
import Link, { Target } from '@components/ElizaForm/components/Link.tsx';

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

export const CoreEliza: React.FC<ElizaCoreProps & Partial<GoToProps>> = ({
  isLoggedIn,
  login,
  triggerAgentDeployment,
  ensureUserSubscription,
  getAgentDeploymentStatus,
  goTo,
}) => {
  const elizaIntegrations: UseDeployAIAgentProps = {
    login,
    isLoggedIn,
    triggerAgentDeployment,
    getAgentDeploymentStatus,
    ensureUserSubscription,
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
    deploymentStatus,
    fleekMachineUrl,
  } = useDeployAIAgent({ ...elizaIntegrations });

  const GoBackButton = (
    <Button
      variant="ghost"
      onClick={goToPreviousStep}
      className="text-elz-accent-11"
    >
      <FaChevronLeft /> Go back
    </Button>
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
            title="Upload characterfile"
            description={
              <>
                Deploy your AI agent personality using the Eliza framework,
                starting with a .json characterfile. Click{' '}
                <Link
                  className="underline hover:text-white"
                  href="https://github.com/ai16z/eliza/blob/main/characters/trump.character.json"
                  target={Target.Blank}
                >
                  here
                </Link>{' '}
                to view a characterfile example.
              </>
            }
            customTopElement={
              <Button
                variant="ghost"
                onClick={() => (goTo ? goTo('getStarted') : undefined)}
                className="text-elz-accent-11"
              >
                <FaChevronLeft /> Go back
              </Button>
            }
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
              <>
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
              </>
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
    </>
  );
};
