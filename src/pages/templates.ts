import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ redirect }) => {
  return redirect('https://app.fleek.xyz/templates', 301);
};
