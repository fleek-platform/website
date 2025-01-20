import settings from '@base/settings.json';

const API_BASE_URL = import.meta.env.PUBLIC_FLEEK_REST_API_URL;

type AiAgentCreationSuccessData = {
  id: string;
  projectId: string;
  name: string;
  host: string;
  slotNumber: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const triggerDeployment = async (
  projectId: string,
  characterFile: string,
  token: string,
): Promise<{
  ok: boolean;
  data?: { agentId?: string };
  error?: string;
}> => {
  if (!token || !projectId || !characterFile) {
    return { ok: false, error: 'Missing required parameters' };
  }

  try {
    const { name } = JSON.parse(characterFile);
    const response = await fetch(
      `${API_BASE_URL}${settings.elizaPage.endpoints.aiAgents}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          config: characterFile,
          projectId,
          name,
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

    const data: AiAgentCreationSuccessData = await response.json();

    return {
      ok: true,
      data: {
        agentId: data.id,
      },
    };
  } catch (error: any) {
    return { ok: false, error: error.message };
  }
};

type DeploymentStepStatus = 'true' | 'false';

export type DeploymentStatus = Record<string, DeploymentStepStatus>;

interface DeploymentResponse {
  ok: boolean;
  data?: DeploymentStatus;
}

export const getDeploymentStatus = async (
  agentId: string,
  token: string,
): Promise<DeploymentResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${settings.elizaPage.endpoints.aiAgents}/${agentId}/status`,
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

    const data: DeploymentStatus = await response.json();

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
  createdAt: string;
  createdBy: string;
  deletedAt?: String;
  host: string;
  id: string;
  name: string;
  projectId: string;
  slotNumber: number;
  updatedAt: string;
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
      `${API_BASE_URL}${settings.elizaPage.endpoints.aiAgents}?projectId=${projectId}`,
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

export const getSubscriptions = async (
  projectId?: string,
  token?: string,
): Promise<{
  ok: boolean;
  data?: {
    id: string;
    status: string;
    startDate: string;
    periodEndDate: string;
    productId: string;
    endDate?: string;
    items: {
      quantity: number;
      id: string;
      name: string;
      description: string;
      price: number;
      createdAt: string;
      updatedAt: string;
      metadata?: Record<string, string>;
      productId: string;
    }[];
  }[];
  error?: string;
}> => {
  if (!projectId || !token) return { ok: false };
  try {
    const response = await fetch(
      `${API_BASE_URL}${settings.site.auth.endpoints.subscriptions}?projectId=${projectId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok && response.status === 404) {
      return {
        ok: true,
        data: [],
      };
    } else if (!response.ok) {
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

export const createSubscription = async (
  projectId?: string,
  productId?: string,
  token?: string,
): Promise<{
  ok: boolean;
  data?: {
    url?: string;
  };
  error?: string;
}> => {
  if (!projectId || !token || !productId) return { ok: false };

  try {
    const response = await fetch(
      `${API_BASE_URL}${settings.site.auth.endpoints.subscriptions}/checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId,
          product: {
            id: productId,
            quantity: 1,
          },
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

export const getPlans = async (
  token?: string,
): Promise<{
  ok: boolean;
  data?: {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    metadata: Record<string, string>;
  }[];
  error?: string;
}> => {
  if (!token) return { ok: false };
  try {
    const response = await fetch(
      `${API_BASE_URL}${settings.site.auth.endpoints.plans}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
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
