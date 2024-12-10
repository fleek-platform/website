import React from 'react';
import { Toaster } from 'react-hot-toast';

import ChooseCharacterFile from './components/ChooseCharacterFile';
import EditCharacterFile from './components/EditCharacterFile';
import ConfigureEnvFile from './components/EditEnvFile';
import Step from './components/Step';
import ChooseEnvFile from './components/ChooseEnvFile';
import ConfirmAgentDetails from './components/ConfirmAgentDetails.tsx';
import DeploymentStatus from './components/DeploymentStatus.tsx';
import DeploymentFailed from './components/DeploymentFailed.tsx';
import { useDeployAIAgent } from './hooks/useDeployAIAgent.tsx';

const Eliza: React.FC = () => {
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
  } = useDeployAIAgent();

  const handleCharacterFileUpload = (content: string) => {
    setCharacterFile(content);
    goToNextStep();
  };

  const handleEnvFileUpload = (content: string) => {
    setEnvFile(content);
    goToNextStep();
  };

  const GoBackButton = (
    <button
      className="text-[14px] leading-[20px] text-[#F5E147]"
      onClick={goToPreviousStep}
    >
      {'< Go back'}
    </button>
  );

  const CancelDeploymentButton = (
    <button
      className="text-[14px] leading-[20px] text-[#b4b4b4] underline"
      onClick={cancelDeployment}
    >
      Cancel deployment
    </button>
  );

  return (
    <>
      <>
        {activeStep === 1 && (
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
              handleCharacterFileChange={handleCharacterFileUpload}
            />
          </Step>
        )}

        {activeStep === 2 && (
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
        )}

        {activeStep === 3 && (
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
            <ChooseEnvFile handleEnvFileChange={handleEnvFileUpload} />
          </Step>
        )}

        {activeStep === 4 && (
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
        )}

        {activeStep === 5 && (
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
        )}

        {activeStep === 6 && !isDeploymentFailed && (
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
              !isDeploymentSuccessful ? (
                CancelDeploymentButton
              ) : (
                <>🎉 Congratulations!</>
              )
            }
          >
            <DeploymentStatus
              isDeploymentComplete={isDeploymentSuccessful}
              deploymentStatus={deploymentStatus}
              fleekMachineUrl={fleekMachineUrl}
            />
          </Step>
        )}
      </>

      {activeStep === 6 && isDeploymentFailed && (
        <Step
          title={
            !Object.values(deploymentStatus).some(
              (status) => status === 'failed',
            )
              ? 'Deployment failed'
              : 'We found an issue'
          }
          description={
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
    </>
  );
};

export default Eliza;
