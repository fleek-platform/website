import { isProd } from '@utils/common';

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
