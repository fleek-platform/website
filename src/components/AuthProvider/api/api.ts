import settings from '@base/settings.json';

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
      `${settings.site.auth.endpoints.subscriptions}?projectId=${projectId}`,
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
      `${settings.site.auth.endpoints.subscriptions}/checkout`,
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

export const updateSubscription = async (
  projectId?: string,
  productId?: string,
  quantity?: number,
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
      `${settings.site.auth.endpoints.subscriptions}/checkout`,
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
            quantity,
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
