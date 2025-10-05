export const prerender = true;

export async function GET() {
  const postFiles = import.meta.glob('../blog/posts/*.svx', { eager: true });
  
  const posts = Object.entries(postFiles).map(([path, module]: [string, any]) => {
    const slug = path.replace('../blog/posts/', '').replace('.svx', '');
    return {
      slug,
      date: module.metadata.date
    };
  });

  const baseUrl = 'https://hjusic.com';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}