export const removeTrailingSlash = (url: string): string => {
  if (!isValidUrl(url)) throw new Error('Invalid URL provided');

  return url.endsWith('/') && url.length > 1 ? url.slice(0, -1) : url;
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (error) {
    return false;
  }

  return true;
}
