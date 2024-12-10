import { useState } from 'react';
import { getDeploymentStatus, triggerDeployment } from '../api/api';

const deploymentSteps = [
  'Checking LLM balance',
  'Formatting JSON file',
  'Formatting ENV file',
  'Checking systems',
  'Starting Fleek Machine',
  'Entering the enclave',
  'Validating AI operations',
  'Finalizing details',
];

export type DeploymentStatus = {
  [step: string]: 'success' | 'failed' | 'pending';
};

export const useDeployAIAgent = () => {
  const POLLING_TIME = 500;
  const [activeStep, setActiveStep] = useState<number>(1);
  const [characterFile, setCharacterFile] = useState<string | undefined>();
  const [envFile, setEnvFile] = useState<string | undefined>();

  // TODO: pending auth implementation
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [userHasSubscription, setUserHasSubscription] = useState(true);
  const [userHasAIAddon, setUserHasAIAddon] = useState(true);

  const [isDeploymentPending, setIsDeploymentPending] = useState(false);
  const [isDeploymentSuccessful, setIsDeploymentSuccessful] = useState(false);
  const [isDeploymentFailed, setIsDeploymentFailed] = useState(false);

  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus>(
    deploymentSteps.reduce((acc, step: string) => {
      acc[step] = 'pending';
      return acc;
    }, {} as DeploymentStatus),
  );

  const [fleekMachineUrl, setFleekMachineUrl] = useState<string | undefined>();

  // Mock function to cancel the deployment
  // TODO: needs implementation
  const dummyDeploymentAgentCancellationEndpointCall = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const pollDeploymentStatus = async (deploymentId: string, token: string) => {
    const poll = async () => {
      try {
        const response = await getDeploymentStatus(deploymentId, token);
        if (response.ok) {
          setDeploymentStatus(response.data.status);

          const hasFailed = Object.values(response.data.status).some(
            (status) => status === 'failed',
          );

          const isSuccessful = Object.values(response.data.status).every(
            (status) => status === 'success',
          );

          if (hasFailed || isSuccessful) {
            setIsDeploymentPending(false);
            setIsDeploymentFailed(hasFailed);
            setIsDeploymentSuccessful(isSuccessful);
            if (isSuccessful) {
              setFleekMachineUrl(response.data.fleekMachineUrl || undefined);
            }
          } else {
            setTimeout(poll, POLLING_TIME);
          }
        } else {
          setIsDeploymentPending(false);
          setIsDeploymentFailed(true);
        }
      } catch (error) {
        setIsDeploymentPending(false);
        setIsDeploymentFailed(true);
      }
    };

    poll();
  };

  const deployAgent = async () => {
    if (!characterFile || !envFile) {
      console.error('This is not supposed to happen. Reload the page, please.');
      return;
    }

    setIsDeploymentPending(true);
    setIsDeploymentFailed(false);
    setIsDeploymentSuccessful(false);

    const token = 'someToken'; // TODO: pending auth implementation

    const deploymentTriggerResult = await triggerDeployment(
      characterFile,
      envFile,
      token,
    );

    if (!deploymentTriggerResult.ok) {
      setIsDeploymentPending(false);
      setIsDeploymentFailed(true);
      return;
    }

    const deploymentId = 'some kind of deployment id?'; // TODO: pending BE implementation

    pollDeploymentStatus(deploymentId, token);
  };

  const goToNextStep = () => {
    if (activeStep === 5) {
      if (!isUserLoggedIn) {
        alert('Please log in to deploy your AI agent.'); // TODO: pending auth implementation
        return;
      }

      if (!userHasSubscription) {
        alert('Please subscribe to use Eliza Agent deployment'); // TODO: pending auth implementation
        return;
      }

      if (!userHasAIAddon) {
        alert('Please add AI addon to use Eliza Agent deployment'); // TODO: pending auth implementation
        return;
      }

      deployAgent();
    }
    setActiveStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setIsDeploymentFailed(false);
    setDeploymentStatus(
      deploymentSteps.reduce((acc, step: string) => {
        acc[step] = 'pending';
        return acc;
      }, {} as DeploymentStatus),
    );
    setActiveStep((prev) => prev - 1);
  };

  const cancelDeployment = () => {
    dummyDeploymentAgentCancellationEndpointCall();
    setIsDeploymentPending(false);
    setActiveStep((prev) => prev - 1);
  };

  return {
    activeStep,
    goToNextStep,
    goToPreviousStep,

    characterFile,
    setCharacterFile,

    envFile,
    setEnvFile,

    cancelDeployment,

    isDeploymentSuccessful,
    isDeploymentFailed,
    isDeploymentPending,

    deploymentStatus,
    fleekMachineUrl,
  };
};
