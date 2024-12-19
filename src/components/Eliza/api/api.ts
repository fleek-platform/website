// @ts-nocheck

import { delay } from '../utils/delay';
import getConfig from '../getConfig';

export const mockTriggerDeployment = async (
  characterFile: string,
  envFile: string,
  token: string,
): Promise<{ ok: boolean; data: { deploymentId?: string } }> => {
  await delay(1000);
  return { ok: true, data: { deploymentId: 'dummy-deployment-id' } };
};

export const triggerDeployment = async (
  characterFile: string,
  envFile: string,
  token: string,
): Promise<{
  ok: boolean;
  data?: { deploymentId?: string };
  error?: string;
}> => {
  const { triggerDeploymentUrl } = getConfig();
  try {
    const response = await fetch(triggerDeploymentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        characterFile,
        envFile,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        ok: false,
        error: `HTTP Error ${response.status}: ${errorText}`,
      };
    }

    const responseData = await response.json();
    const deploymentId = responseData.deploymentId;

    return { ok: true, data: { deploymentId } };
  } catch (error: any) {
    return { ok: false, error: error.message };
  }
};

type DeploymentStepStatus = 'success' | 'failed' | 'pending';

interface DeploymentStatus {
  [key: string]: DeploymentStepStatus;
}

interface DeploymentResponseData {
  status: DeploymentStatus;
  fleekMachineUrl?: string;
}

interface DeploymentResponse {
  ok: boolean;
  data: DeploymentResponseData;
}

export const mockGetDeploymentStatus = (() => {
  const INIT_RESPONSE: DeploymentStatus = {
    'Checking LLM balance': 'pending',
    'Formatting characterfile': 'pending',
    'Formatting .env file': 'pending',
    'Checking systems': 'pending',
    'Starting Fleek Machine': 'pending',
    'Entering the enclave': 'pending',
    'Validating AI operations': 'pending',
    'Finalizing details': 'pending',
  };

  let tempResponse: DeploymentStatus = { ...INIT_RESPONSE };

  const FAILURE_RATE = 0.02;
  const RANDOM_FAILURE_RATE = 0.01;

  return async (
    deploymentId: string,
    token: string,
  ): Promise<DeploymentResponse> => {
    await delay(750);

    // Update one pending step
    for (const [key, value] of Object.entries(tempResponse)) {
      if (value === 'pending') {
        tempResponse[key] = Math.random() < FAILURE_RATE ? 'failed' : 'success';
        if (tempResponse[key] === 'failed') {
          console.error(
            `A critical failure occurred during deployment at step: ${key}`,
          );
        }
        break;
      }
    }

    const isComplete = Object.values(tempResponse).every(
      (value) => value === 'success',
    );

    if (Math.random() < RANDOM_FAILURE_RATE) {
      console.error('A random critical failure occurred.');
      throw new Error('Operation failed due to a random failure.');
    }

    const result: DeploymentResponse = {
      ok: true,
      data: {
        status: { ...tempResponse },
        fleekMachineUrl: isComplete ? 'https://fleek.machine.url' : undefined,
      },
    };

    if (isComplete || Object.values(tempResponse).includes('failed')) {
      tempResponse = { ...INIT_RESPONSE };
    }

    return result;
  };
})();

export const getDeploymentStatus = async (
  deploymentId: string,
  token: string,
): Promise<DeploymentResponse> => {
  const { getDeploymentStatusUrl } = getConfig();

  try {
    const response = await fetch(`${getDeploymentStatusUrl}/${deploymentId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: DeploymentResponseData = await response.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Error fetching deployment status:', error);
    throw error;
  }
};
