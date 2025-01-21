export type Defined = {
  PUBLIC_FLEEK_REST_API_URL?: string;
  PUBLIC_UI_APP_URL?: string;
};

export const defined: Defined = {
  PUBLIC_FLEEK_REST_API_URL: process.env.PUBLIC_FLEEK_REST_API_URL,
  PUBLIC_UI_APP_URL: process.env.PUBLIC_UI_APP_URL,
};

export const getDefined = (key: keyof typeof defined): string => {
  const value = defined[key];

  if (value === undefined || value === null) {
    throw new Error(`Expected key "${key}" to be defined but got ${typeof value}`);
  }

  if (typeof value !== 'string') {
    throw new Error(`Expected key "${key}" to be string but got ${typeof value}`);
  }

  return value;
};
