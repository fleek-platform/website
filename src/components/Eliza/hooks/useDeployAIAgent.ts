import { useCallback, useMemo } from 'react';
import { useState } from 'react';

export type DeploymentStatus = {
  [step: string]: 'success' | 'failed' | 'pending';
};

export interface UseDeployAIAgentProps {
  isLoggedIn: boolean;
  login: () => void;
  ensureUserSubscription: () => Promise<boolean>;
  triggerAgentDeployment: (
    characterfile: string,
  ) => Promise<{ ok: boolean; deploymentId?: string }>;
  getAgentDeploymentStatus: (deploymentId: string) => Promise<{
    ok?: boolean;
    data?: {
      status: Record<string, 'pending' | 'success' | 'failed'>;
      fleekMachineUrl?: string;
    };
  }>;
}

export const useDeployAIAgent = ({
  isLoggedIn,
  login,
  ensureUserSubscription,
  triggerAgentDeployment,
  getAgentDeploymentStatus,
}: UseDeployAIAgentProps) => {
  const POLLING_TIME = 500;

  const [isDeploymentPending, setIsDeploymentPending] = useState(false);
  const [isDeploymentSuccessful, setIsDeploymentSuccessful] = useState(false);
  const [isDeploymentFailed, setIsDeploymentFailed] = useState(false);

  const [deploymentStatus, setDeploymentStatus] = useState<
    DeploymentStatus | undefined
  >();
  const [fleekMachineUrl, setFleekMachineUrl] = useState<string | undefined>();

  const pollDeploymentStatus = async (deploymentId: string) => {
    const MAX_ATTEMPTS = 15;

    const poll = async (attempt: number) => {
      try {
        const response = await getAgentDeploymentStatus(deploymentId);
        if (response.ok && response?.data?.status) {
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

  const deployAgent = useCallback(
    async (characterFile: string | undefined) => {
      resetDeployment();

      if (!characterFile) {
        return false;
      }

      if (!isLoggedIn) {
        login();
        return false;
      }

      const subscriptionResult = await ensureUserSubscription();
      if (!subscriptionResult) {
        return false;
      }

      setIsDeploymentPending(true);
      const deploymentTriggerResult =
        await triggerAgentDeployment(characterFile);
      if (
        !deploymentTriggerResult.ok ||
        !deploymentTriggerResult.deploymentId
      ) {
        setIsDeploymentPending(false);
        setIsDeploymentFailed(true);
        return false;
      }

      pollDeploymentStatus(deploymentTriggerResult.deploymentId);
      return true;
    },
    [isLoggedIn],
  );

  const resetDeployment = () => {
    setIsDeploymentPending(false);
    setIsDeploymentFailed(false);
    setIsDeploymentSuccessful(false);
  };

  const isDeploymentStarted = useMemo(
    () => isDeploymentSuccessful || isDeploymentFailed || isDeploymentPending,
    [isDeploymentSuccessful, isDeploymentFailed, isDeploymentPending],
  );

  return {
    resetDeployment,
    deployAgent,

    isDeploymentStarted,
    isDeploymentSuccessful,
    isDeploymentFailed,
    isDeploymentPending,

    deploymentStatus,
    fleekMachineUrl,
  };
};
