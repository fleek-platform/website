const key = 'fleek-xyz-funnel-data-key-agents';
// TODO: Use `sessionStorage` instead of `localStorage`
// to prevent tab concurrency? Might not be necessary
// if the user journey happens in a particular route path
export const storeFunnelData = ({ data }: { data: unknown }) =>
  window.localStorage.setItem(key, JSON.stringify(data));

export const retrieveFunnelData = () => window.localStorage.getItem(key);

export const clearFunnelData = () => window.localStorage.removeItem(key);
