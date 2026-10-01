import { getPosts } from '$lib/server/posts';

export function load() {
	const posts = getPosts();
	return { latest: posts[0], recent: posts.slice(1, 4), total: posts.length };
}
