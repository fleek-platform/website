// TODO: Use `sessionStorage` instead of `localStorage`
// to prevent tab concurrency? Might not be necessary
// if the user journey happens in a particular route path
export const storeFunnelData = ({
  key,
  data,
}: {
  key: string;
  data: unknown;
}) => window.localStorage.setItem(key, JSON.stringify(data));

export const retrieveFunnelData = ({ key }: { key: string }) =>
  window.localStorage.getItem(key);

export const clearFunnelData = ({ key }: { key: string }) =>
  window.localStorage.removeItem(key);
