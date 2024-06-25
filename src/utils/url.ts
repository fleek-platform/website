import fs from 'fs';
import settings from '@base/settings.json';

export const getSiteUrl = (): string => {
  const env = process.env.NODE_ENV || 'staging';

  if (!(settings.site as any)[env]) {
    throw new Error(
      `👹 Oops! Environment "${env}" is not configured in settings.`,
    );
  }

  return (settings.site as any)[env].url;
};

export const isActivePath = ({
  lookup,
  pathname,
}: {
  lookup: string;
  pathname?: string;
}) => {
  const basePath = (pathname || window.location.pathname)
    .split('/')
    .filter(Boolean)[0];

  const re = new RegExp(`^\\/${basePath}(\\/[^\/]+)?$`);

  return re.test(lookup);
};

export const generateGitHubEditLink = ({
  collection,
  id,
}: {
  collection: string;
  id: string;
}) => {
  const path = `src/content/${collection}/${id}`;

  if (!fs.existsSync(path)) {
    throw Error(
      `👹 Oops! The GitHub source link verification, couldn't find the resource ${path}`,
    );
  }

  return `${collection}/${id}`;
};

export const generateSlug = (input: string): string => {
  let normalized = input.toLowerCase().replace(/\s+/g, '-');
  normalized = normalized.replace(/[^a-z0-9\-]/gi, '');
  normalized = normalized.trim();
  return normalized;
};

export const pathContains = (term: string, path: string): boolean =>
  path.includes(term);
