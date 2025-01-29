// import { getDefined } from '../defined';
import { routes } from '../settings';

// TODO: It'll be replaced by the standalone version
// which distribution will replace the `process.env`
// due to `process.env` not working in astro
// and that the Eliza encapsulation shouldn't use the
// host application features, e.g. astro `import.meta.env`
// for this reason, it's hard-typed but will change shortly
// once ported to the agents-ui repo
// const restApiUrl = getDefined('PUBLIC_FLEEK_REST_API_URL');
const restApiUrl =
  typeof process.env.PUBLIC_FLEEK_REST_API_URL === 'undefined'
    ? import.meta.env.PUBLIC_FLEEK_REST_API_URL
    : '';

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
    // TODO: Should use lib rest-api
    // also, the endpoint settings should come from eliza scope
    // not the host app
    const response = await fetch(`${restApiUrl}${routes.endpoints.aiAgents}`, {
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
    });

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
      `${restApiUrl}${routes.endpoints.aiAgents}/${agentId}/status`,
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
      `${restApiUrl}${routes.endpoints.aiAgents}?projectId=${projectId}`,
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
      // TODO: Should use lib rest-api
      // also, the endpoint settings should come from eliza scope
      // not the host app
      `${restApiUrl}${routes.endpoints.subscriptions}?projectId=${projectId}`,
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
  // referralId?: string,
  getReferralId?: () => string,
): Promise<{
  ok: boolean;
  data?: {
    url?: string;
  };
  error?: string;
}> => {
  if (!projectId || !token || !productId) return { ok: false };

  // console.log('api createSubscription', referralId);
  console.log('[debug] createSubscription: getReferralId: ', typeof getReferralId === 'function' && getReferralId())

  const referralId =
    typeof getReferralId === 'function'
    ? getReferralId()
    : '';

  try {
    const response = await fetch(
      // TODO: Should use lib rest-api
      // also, the endpoint settings should come from eliza scope
      // not the host app
      `${restApiUrl}${routes.endpoints.subscriptions}/checkout`,
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
          metadata: {
            referralId,
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
      // TODO: Should use lib rest-api
      // also, the endpoint settings should come from eliza scope
      // not the host app
      `${restApiUrl}${routes.endpoints.plans}`,
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
