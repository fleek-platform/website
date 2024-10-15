export function generateCanonicalUrl(baseUrl: string, slug?: string) {
  if (!slug) return baseUrl;

  if (slug === 'docs/') {
    return `${baseUrl}/${slug}`;
  }

  return `${baseUrl}/${slug}/`;
}
