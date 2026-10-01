import { error } from '@sveltejs/kit';
import { loadPostBody } from '$lib/content/components';

export async function load({ data, params }) {
	const body = await loadPostBody(params.slug);
	if (!body) error(404, `There is no post at /blog/${params.slug}.`);

	return { ...data, body };
}
