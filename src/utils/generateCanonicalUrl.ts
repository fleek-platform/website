import { getSiteUrl } from './url';

const BASE_URL = getSiteUrl();

export function generateCanonicalUrl(slug?: string) {
  if (!slug) return `${BASE_URL}/`;

  const sanitizedSlug = slug
    .trim()
    .split('/')
    .filter((item) => item)
    .join('/');

  return `${BASE_URL}/${sanitizedSlug}/`;
}
