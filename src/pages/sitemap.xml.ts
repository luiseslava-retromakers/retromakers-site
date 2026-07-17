import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Simple hand-written sitemap — avoids pulling in @astrojs/sitemap, which had
// a version mismatch with this Astro release at scaffold time. Submit this
// URL (https://retromakers.com/sitemap.xml) to Google Search Console.
export const GET: APIRoute = async ({ site }) => {
  const staticPaths = ['', '/blog', '/games', '/about', '/contact'];

  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);
  const games = await getCollection('games', ({ data }) => !data.draft);

  const urls = [
    ...staticPaths,
    ...blogPosts.map((post) => `/blog/${post.id}`),
    ...games.map((game) => `/games/${game.id}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
