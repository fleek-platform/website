import type { APIRoute } from 'astro';
import { getTemplateByEnvironment } from '@utils/templates';

export const GET: APIRoute = async () => {
  const templates = await getTemplateByEnvironment();
  return new Response(JSON.stringify(templates));
};
