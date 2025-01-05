import settings from '@base/settings.json';

export const triggerDeployment = async (
  characterFile: string,
  token: string,
): Promise<{
  ok: boolean;
  data?: { deploymentId?: string };
  error?: string;
}> => {
  try {
    const response = await fetch(
      settings.elizaPage.endpoints.triggerAgentDeployment,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          characterFile,
        }),
      },
    );

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
      `${settings.elizaPage.endpoints.getAgentDeploymentStatus}/${deploymentId}`,
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
