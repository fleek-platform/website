import type { APIRoute } from 'astro';
import templates from '@base/templates.json';

export const GET: APIRoute = () => new Response(JSON.stringify(templates));
