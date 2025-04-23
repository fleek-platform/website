import type { APIRoute } from 'astro';
import settings from '@base/settings.json';

export const GET: APIRoute = async () => {
  const agentsAdminNotification = settings.agentsAdminNotification;
  return new Response(JSON.stringify(agentsAdminNotification));
};
