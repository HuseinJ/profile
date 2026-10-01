import { error } from '@sveltejs/kit';
import { getNeighbours, getPost, getPosts } from '$lib/server/posts';

export function entries() {
	return getPosts().map((post) => ({ slug: post.slug }));
}

export function load({ params }) {
	const post = getPost(params.slug);
	if (!post) error(404, `There is no post at /blog/${params.slug}.`);

	return { post, ...getNeighbours(params.slug) };
}
