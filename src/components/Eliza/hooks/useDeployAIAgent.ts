import { useCallback, useMemo, useState } from 'react';

import type { DeploymentStatus } from '../api';
import type { TriggerTrackingEventFn } from '../types';

export interface UseDeployAIAgentProps {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  login: () => void;
  ensureUserSubscription: (projectId: string) => Promise<boolean>;
  triggerAgentDeployment: (
    characterfile: string,
    projectId: string,
  ) => Promise<{ ok: boolean; agentId?: string }>;
  getAgentDeploymentStatus: (agentId: string) => Promise<{
    ok?: boolean;
    data?: DeploymentStatus;
  }>;
  triggerTrackingEvent?: TriggerTrackingEventFn;
}

export const useDeployAIAgent = ({
  isLoggedIn,
  login,
  ensureUserSubscription,
  triggerAgentDeployment,
  getAgentDeploymentStatus,
  triggerTrackingEvent,
}: UseDeployAIAgentProps) => {
  const POLLING_TIME = 500;

  const [isDeploymentPending, setIsDeploymentPending] = useState(false);
  const [isDeploymentSuccessful, setIsDeploymentSuccessful] = useState(false);
  const [isDeploymentFailed, setIsDeploymentFailed] = useState(false);

  const [deploymentStatus, setDeploymentStatus] = useState<
    DeploymentStatus | undefined
  >();
  const [deployedAgentId, setDeployedAgentId] = useState<string | undefined>();

  const pollDeploymentStatus = async (agentId: string) => {
    const MAX_ATTEMPTS = 15;
    triggerTrackingEvent?.('agent-ui-wizard.deployment-status-polling-started');

    const poll = async (attempt: number) => {
      try {
        const response = await getAgentDeploymentStatus(agentId);
        if (response.ok && response?.data) {
          setDeploymentStatus(response.data);

          const hasFailed =
            attempt >= MAX_ATTEMPTS
              ? true
              : Object.entries(response.data).some(
                  ([, status]) =>
                    status === 'false' ||
                    // @ts-ignore
                    status === '"false"' ||
                    // @ts-ignore
                    status === false,
                );

          const isSuccessful = Object.entries(response.data).every(
            ([, status]) =>
              // @ts-ignore
              status === 'true' || status === '"true"' || status === true,
          );

          if (hasFailed || isSuccessful) {
            setIsDeploymentPending(false);
            setIsDeploymentFailed(hasFailed);
            setIsDeploymentSuccessful(isSuccessful);
            if (isSuccessful) {
              triggerTrackingEvent?.(
                'agent-ui-wizard.deployment-status-polling-completed',
                { msg: 'success' },
              );
              setDeployedAgentId(agentId || undefined);
            } else {
              triggerTrackingEvent?.(
                'agent-ui-wizard.deployment-status-polling-completed',
                { msg: 'failure' },
              );
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
    async (characterFile?: string, projectId?: string) => {
      resetDeployment();
      setIsDeploymentPending(true);
      triggerTrackingEvent?.('agent-ui-wizard.deployment-validation-started');

      if (!characterFile) {
        triggerTrackingEvent?.('agent-ui-wizard.deployment-validation-failed', {
          msg: 'No characterfile provided',
        });
        setIsDeploymentPending(false);
        return false;
      }

      if (!isLoggedIn) {
        triggerTrackingEvent?.('agent-ui-wizard.deployment-validation-failed', {
          msg: 'Not logged in',
        });
        login();
        setIsDeploymentPending(false);
        return false;
      }

      if (!projectId) {
        triggerTrackingEvent?.('agent-ui-wizard.deployment-validation-failed', {
          msg: 'No project ID provided',
        });
        setIsDeploymentPending(false);
        return false;
      }

      const subscriptionResult = await ensureUserSubscription(projectId);
      if (!subscriptionResult) {
        triggerTrackingEvent?.('agent-ui-wizard.deployment-validation-failed', {
          msg: 'User has not enough subscriptions',
        });
        setIsDeploymentPending(false);
        return false;
      }

      const deploymentTriggerResult = await triggerAgentDeployment(
        characterFile,
        projectId,
      );
      if (!deploymentTriggerResult.ok || !deploymentTriggerResult.agentId) {
        triggerTrackingEvent?.('agent-ui-wizard.deployment-validation-failed', {
          msg: 'Failed to trigger agent deployment',
        });
        setIsDeploymentPending(false);
        setIsDeploymentFailed(true);
        return false;
      }

      triggerTrackingEvent?.('agent-ui-wizard.deployment-validation-success');
      pollDeploymentStatus(deploymentTriggerResult.agentId);
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
    deployedAgentId,
  };
};
