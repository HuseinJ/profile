// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

interface PostMetadata {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
}

interface Post {
  slug: string;
  meta: PostMetadata;
}

export const load: PageLoad = async () => {
  const modules = import.meta.glob('./posts/*.svx');
  const posts = await Promise.all(
    Object.entries(modules).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const slug = path.split('/').pop()?.replace('.svx', '') ?? '';
      return { 
        slug, 
        meta: {
          ...metadata,
          tags: metadata.tags || []
        }
      };
    })
  );

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );

  return { posts: sortedPosts };
};