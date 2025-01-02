import {
  GET_AGENT_DEPLOYMENT_STATUS_URL,
  TRIGGER_ELIZA_AGENT_DEPLOYMENT_URL,
} from '../utils/contants';

export const triggerDeployment = async (
  characterFile: string,
  envFile: string,
  token: string,
): Promise<{
  ok: boolean;
  data?: { deploymentId?: string };
  error?: string;
}> => {
  try {
    const response = await fetch(TRIGGER_ELIZA_AGENT_DEPLOYMENT_URL, {
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

    const data = await response.json();

    return { ok: true, data };
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

export const getDeploymentStatus = async (
  deploymentId: string,
  token: string,
): Promise<DeploymentResponse> => {
  try {
    const response = await fetch(
      `${GET_AGENT_DEPLOYMENT_STATUS_URL}/${deploymentId}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

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
