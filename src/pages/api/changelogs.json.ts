import { getCollection } from 'astro:content';

export async function GET() {
  const changelogs = (await getCollection('changelog'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 10);

  return new Response(JSON.stringify(changelogs));
}
