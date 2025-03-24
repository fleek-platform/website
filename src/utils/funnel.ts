export const FLEEK_KEY_AGENTS_LEAD = 'fleek-xyz-agents-lead';

const keys = [FLEEK_KEY_AGENTS_LEAD] as const;

export const storeFunnelData = ({
  key,
  data
}: {
  key: typeof keys[number];
  data: any;
}) => window.localStorage.setItem(key, JSON.stringify(data));

export const retrieveFunnelData = ({
  key,
}: {
  key: typeof keys[number];
}) => window.localStorage.getItem(key);

export const clearFunnelData = ({
  key,
}: {
  key: typeof keys[number];  
}) => window.localStorage.removeItem(key);
