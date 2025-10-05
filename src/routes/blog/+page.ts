import type { PageLoad } from './$types';

interface PostMetadata {
  title: string;
  date: string;
  summary?: string;
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
      return { slug, meta: metadata };
    })
  );

  return { posts };
};