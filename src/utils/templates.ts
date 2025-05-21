import { isProd, isClient } from '@utils/common';
import { removeTrailingSlash } from '@utils/url';

const appUrl = import.meta.env.PUBLIC_APP_HOSTING_URL;

if (!appUrl) {
  throw new Error('App url is required to generate template deployment link');
}

export const getTemplateByEnvironment = async () => {
  const env = isProd ? 'production' : 'staging';
  try {
    const templates = await import(`../templates/${env}.json`);
    return templates.default;
  } catch (error) {
    console.error('Failed to load templates:', error);
    throw error;
  }
};

export const getDeploymentUrl = (
  projectId: string,
  templateId: string,
): string => {
  if (!isClient) return '';

  let hostingAppUrl = appUrl;

  if (window.location.hostname.startsWith('resources.')) {
    hostingAppUrl = 'https://hosting.fleek.xyz/dashboard';
  }

  const deploymentUrl = `${removeTrailingSlash(hostingAppUrl)}/projects/${projectId}/sites/new/?templateId=${templateId}`;

  return deploymentUrl;
};
