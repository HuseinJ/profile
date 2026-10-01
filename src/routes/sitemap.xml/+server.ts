import { site } from '$lib/config/site';
import { getPosts } from '$lib/server/posts';

export const prerender = true;

interface Entry {
	path: string;
	lastmod: string;
	changefreq: 'weekly' | 'monthly';
	priority: number;
}

export function GET() {
	const posts = getPosts().filter((post) => /^\d{4}-\d{2}-\d{2}$/.test(post.date));
	const newest = posts[0]?.date ?? new Date().toISOString().slice(0, 10);

	const entries: Entry[] = [
		{ path: '', lastmod: newest, changefreq: 'weekly', priority: 1.0 },
		{ path: '/blog', lastmod: newest, changefreq: 'weekly', priority: 0.8 },
		...posts.map((post) => ({
			path: `/blog/${post.slug}`,
			lastmod: post.date,
			changefreq: 'monthly' as const,
			priority: 0.6
		}))
	];

	const urls = entries
		.map(
			(entry) => `  <url>
    <loc>${site.url}${entry.path}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
