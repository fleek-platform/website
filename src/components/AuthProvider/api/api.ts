import settings from '@base/settings.json';

export const getProject = async (
  projectId?: string,
  token?: string,
): Promise<{
  ok: boolean;
  data?: {
    id: string;
    teamId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  error?: string;
}> => {
  if (!projectId || !token) return { ok: false };
  try {
    const response = await fetch(
      `${settings.site.auth.endpoints.projects}/${projectId}`,
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

export const getTeam = async (
  teamId?: string,
  token?: string,
): Promise<{
  ok: boolean;
  data?: {
    id: string;
    name: string;
    externalBillingId: string;
    updatedAt: string;
    createdAt: string;
    subscriptionId: string;
    paymentMethodId?: string;
  };
  error?: string;
}> => {
  if (!teamId || !token) return { ok: false };
  try {
    const response = await fetch(
      `${settings.site.auth.endpoints.teams}/${teamId}`,
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

export const getSubscription = async (
  subscriptionId?: string,
  token?: string,
): Promise<{
  ok: boolean;
  data?: {
    id: string;
    status: string;
    startDate: string;
    periodEndDate: string;
    endDate?: string;
    items: {
      id: string;
      name: string;
      description: string;
      price: number;
      createdAt: string;
      updatedAt: string;
      metadata?: Record<string, string>;
    }[];
  };
  error?: string;
}> => {
  if (!subscriptionId || !token) return { ok: false };
  try {
    const response = await fetch(
      `${settings.site.auth.endpoints.subscriptions}/${subscriptionId}`,
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

export const createSubscription = async (
  projectId?: string,
  planId?: string,
  token?: string,
): Promise<{
  ok: boolean;
  data?: {
    url?: string;
  };
  error?: string;
}> => {
  if (!projectId || !token || !planId) return { ok: false };
  try {
    const response = await fetch(
      `${settings.site.auth.endpoints.subscriptions}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId,
          planId,
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
  token: string,
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
    const response = await fetch(`${settings.site.auth.endpoints.plans}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
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
