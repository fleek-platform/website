import settings from '@base/settings.json';

export const triggerDeployment = async (
  projectId: string,
  characterFile: string,
  token: string,
): Promise<{
  ok: boolean;
  data?: { deploymentId?: string };
  error?: string;
}> => {
  if (!token || !projectId || !characterFile) {
    return { ok: false, error: 'Missing required parameters' };
  }

  try {
    const response = await fetch(settings.elizaPage.endpoints.aiAgents, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        config: characterFile,
        project_id: projectId,
        name: 'test',
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
  data?: DeploymentResponseData;
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

type AiAgent = {
  created_at: string;
  created_by: string;
  deleted_at?: String;
  host: string;
  id: string;
  name: string;
  project_id: string;
  slot_number: number;
  updated_at: string;
};

type AiAgentsResponseData = {
  data: AiAgent[];
};
interface AiAgentsResponse {
  ok?: boolean;
  data?: AiAgentsResponseData;
}

export const getAgentsByProjectId = async (
  projectId?: string,
  token?: string,
): Promise<AiAgentsResponse> => {
  if (!token || !projectId)
    return {
      ok: false,
    };
  try {
    const response = await fetch(
      `${settings.elizaPage.endpoints.aiAgents}?project_id=${projectId}`,
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

    const data = await response.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('Error fetching deployment status:', error);
    throw error;
  }
};
