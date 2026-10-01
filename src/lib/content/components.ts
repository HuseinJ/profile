import type { Component } from 'svelte';

const modules = import.meta.glob<{ default: Component }>('/src/posts/*.svx');

/** Lazily loads the rendered body of a post; undefined if no such post exists. */
export async function loadPostBody(slug: string): Promise<Component | undefined> {
	const load = modules[`/src/posts/${slug}.svx`];
	return load ? (await load()).default : undefined;
}
