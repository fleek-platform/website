import { isProd } from '@utils/common';
import { isClient } from '@utils/common';

const appUrl = import.meta.env.PUBLIC_UI_APP_URL;
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

  const deploymentUrl = `${appUrl}projects/${projectId}/sites/new/?templateId=${templateId}`;

  return deploymentUrl;
};
