import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
  const latestPosts = sortedPosts.slice(0, 10).map((post) => ({
    title: post.data.title,
    date: post.data.date,
    description: post.data.desc,
    imageSrc: post.data.image?.src,
    slug: post.slug,
  }));

  return new Response(JSON.stringify(latestPosts));
}
