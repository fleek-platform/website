export function generateCanonicalUrl(baseUrl: string, slug?: string) {
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');

  if (!slug) return `${cleanBaseUrl}/`;

  const sanitizedSlug = slug
    .replace(/^\/|\/$/g, '')
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `${cleanBaseUrl}/${sanitizedSlug}/`;
}
