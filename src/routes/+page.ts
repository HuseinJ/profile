export const prerender = true;

export async function load({ parent }) {

  const { seo } = await parent();
  
  const postFiles = import.meta.glob('../posts/*.svx', { eager: true });
  
  const posts = Object.entries(postFiles)
    .map(([path, module]: [string, any]) => {
      const slug = path.split('/').pop()?.replace('.svx', '') ?? '';
      return {
        slug,
        meta: module.metadata
      };
    })
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
    .slice(0, 3);

  return { posts, seo };
}