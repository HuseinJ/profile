import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params, parent }) {
  const { seo } = await parent();
  
  try {
    const post = await import(`../posts/${params.slug}.svx`);
    
    return {
      content: post.default,
      meta: post.metadata,
      slug: params.slug,
      seo
    };
  } catch (e) {
    throw error(404, `Post "${params.slug}" not found`);
  }
}