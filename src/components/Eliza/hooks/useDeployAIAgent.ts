import { useState } from 'react';
import { useElizaFeatureFlags } from './useElizaFeatureFlags';
import { useAuthentication } from '@components/AuthProvider/useAuthentication';

export type DeploymentStatus = {
  [step: string]: 'success' | 'failed' | 'pending';
};

export interface UseDeployAIAgentProps {
  triggerUserSubscription: (params?: {
    onlyAiModule?: boolean;
  }) => Promise<boolean>;
  checkUserSubscription: () => Promise<{
    ok: boolean;
    missingSubscription: boolean;
    missingAiModule: boolean;
  }>;

  triggerAgentDeployment: (
    characterfile: string,
    env: string,
  ) => Promise<{ ok: boolean; deploymentId?: string }>;
  getDeploymentStatus: (deploymentId: string) => Promise<{
    ok?: boolean;
    data: {
      status: Record<string, 'pending' | 'success' | 'failed'>;
      fleekMachineUrl?: string;
    };
  }>;
}

export const useDeployAIAgent = ({
  triggerUserSubscription,
  checkUserSubscription,
  triggerAgentDeployment,
  getDeploymentStatus,
}: UseDeployAIAgentProps) => {
  const POLLING_TIME = 500;
  const [activeStep, setActiveStep] = useState<number>(1);
  const [characterFile, setCharacterFile] = useState<string | undefined>();
  const [envFile, setEnvFile] = useState<string | undefined>();

  const [isDeploymentPending, setIsDeploymentPending] = useState(false);
  const [isDeploymentSuccessful, setIsDeploymentSuccessful] = useState(false);
  const [isDeploymentFailed, setIsDeploymentFailed] = useState(false);
  const featureFlags = useElizaFeatureFlags('subscriptionEnabled');
  const { isLoggedIn, login } = useAuthentication();

  const [deploymentStatus, setDeploymentStatus] = useState<
    DeploymentStatus | undefined
  >();
  const [fleekMachineUrl, setFleekMachineUrl] = useState<string | undefined>();

  const pollDeploymentStatus = async (deploymentId: string) => {
    const MAX_ATTEMPTS = 15;

    const poll = async (attempt: number) => {
      try {
        const response = await getDeploymentStatus(deploymentId);
        if (response.ok) {
          setDeploymentStatus(response.data.status);

          const hasFailed =
            attempt >= MAX_ATTEMPTS
              ? true
              : Object.values(response.data.status).some(
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
            setTimeout(() => poll(attempt + 1), POLLING_TIME);
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

    poll(0);
  };

  const deployAgent = async () => {
    setIsDeploymentPending(true);
    setIsDeploymentFailed(false);
    setIsDeploymentSuccessful(false);

    if (!characterFile || !envFile) {
      console.error('Characterfile or .env file missing', {
        characterFile,
        envFile,
      });
      setIsDeploymentPending(false);
      setIsDeploymentFailed(true);
      return false;
    }

    if (!isLoggedIn()) {
      const loginResult = await login();

      if (!loginResult) {
        setIsDeploymentPending(false);
        setIsDeploymentFailed(true);
        return false;
      }
    }

    if (featureFlags.subscriptionEnabled) {
      const subscriptionResult = await checkUserSubscription();
      if (!subscriptionResult.ok) {
        const res = await triggerUserSubscription({
          onlyAiModule: subscriptionResult.missingSubscription
            ? subscriptionResult.missingAiModule
            : false,
        });

        if (!res) {
          setIsDeploymentPending(false);
          setIsDeploymentFailed(true);
          return false;
        }
      }
    }

    const deploymentTriggerResult = await triggerAgentDeployment(
      characterFile,
      envFile,
    );
    if (!deploymentTriggerResult.ok || !deploymentTriggerResult.deploymentId) {
      setIsDeploymentPending(false);
      setIsDeploymentFailed(true);
      return false;
    }

    pollDeploymentStatus(deploymentTriggerResult.deploymentId);
    return true;
  };

  const goToNextStep = async () => {
    if (activeStep === 5) {
      const res = await deployAgent();
      if (!res) return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setIsDeploymentFailed(false);
    setDeploymentStatus(undefined);
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

    isDeploymentSuccessful,
    isDeploymentFailed,
    isDeploymentPending,

    deploymentStatus,
    fleekMachineUrl,
  };
};
