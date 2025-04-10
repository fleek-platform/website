import fs from 'fs';
import settings from '@base/settings.json';

export const getSiteUrl = (): string => {
  const name = 'PUBLIC_FLEEK_WEBSITE_URL';
  const url = import.meta.env[name];

  if (!url) {
    throw new Error(
      `👹 Oops! Environment "${name}" is not setup`,
    );
  }

  return url;
};

export const getTopLevelDomain = (url: string) => {
  if (!url) throw Error('Oops! Invalid URL');

  try {
    const { hostname } = new URL(url);

    // The only expected hostnames
    // are a maximum of three levels
    // at time of writting
    // e.g. staging -> fleek-xyz-staging.on-fleek.app
    // and prod -> fleek.xyz
    const topLevelDomain = hostname.split('.').slice(-2).join('.');

    return topLevelDomain;
  } catch (e) {
    throw Error('Oops! Failed to parse the URL');
  }
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
  path.toLowerCase().includes(term.toLowerCase());

export const hasSecondaryMenuItem = (pathname: string): boolean => {
  const supportMenuItems = settings.support.supportMenu.map(
    (item) => item.path.split('/')[1],
  );
  const uniqueMenuItems = [...new Set(supportMenuItems)];

  const pathSegments = pathname.split('/');

  return uniqueMenuItems.some((item) => pathSegments.includes(item));
};

export const removeProtocolFromUrl = (userUrl: string) => {
  try {
    const url = userUrl.replace(/^https?:\/\//, '');
    return url;
  } catch (error) {
    console.error('👹 Oops! The provided URL is invalid', userUrl);
    return;
  }
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (error) {
    return false;
  }

  return true;
};

export const removeTrailingSlash = (url: string): string => {
  if (!isValidUrl(url)) throw new Error('Invalid URL provided');

  return url.endsWith('/') && url.length > 1 ? url.slice(0, -1) : url;
};
