export const FLEEK_KEY_AGENTS_LEAD = 'fleek-xyz-agents-lead';

const keys = [FLEEK_KEY_AGENTS_LEAD] as const;

// TODO: Use `sessionStorage` instead of `localStorage`
// to prevent tab concurrency? Might not be necessary
// if the user journey happens in a particular route path
export const storeFunnelData = ({
  key,
  data,
}: {
  key: (typeof keys)[number];
  data: any;
}) => window.localStorage.setItem(key, JSON.stringify(data));

export const retrieveFunnelData = ({ key }: { key: (typeof keys)[number] }) =>
  window.localStorage.getItem(key);

export const clearFunnelData = ({ key }: { key: (typeof keys)[number] }) =>
  window.localStorage.removeItem(key);
