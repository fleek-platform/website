export function generateCanonicalUrl(baseUrl: string, slug?: string) {
  if (!slug) return baseUrl;

  return `${baseUrl}/${slug.replace(/\/$/, '')}/`;
}
