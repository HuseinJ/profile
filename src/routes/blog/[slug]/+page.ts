import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

interface PostMetadata {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
}

interface SvxModule {
  default: any; // The Svelte component
  metadata: PostMetadata;
}

export const prerender = true;

export const load: PageLoad = async ({ params, parent }) => {
  const { seo } = await parent();
  
  try {
    const post = await import(`../posts/${params.slug}.svx`) as SvxModule;
    
    return {
      content: post.default,
      meta: post.metadata,
      slug: params.slug,
      seo
    };
  } catch (e) {
    throw error(404, `Post "${params.slug}" not found`);
  }
};