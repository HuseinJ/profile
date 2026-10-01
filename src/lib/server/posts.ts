import type { Post, PostFrontmatter } from '$lib/content/types';
import { collectTags, toTag } from '$lib/content/tags';

const frontmatter = import.meta.glob<PostFrontmatter>('/src/posts/*.svx', {
	eager: true,
	import: 'metadata'
});

const sources = import.meta.glob<string>('/src/posts/*.svx', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const WORDS_PER_MINUTE = 230;

function slugOf(path: string): string {
	return path.split('/').pop()!.replace(/\.svx$/, '');
}

function readingMinutes(source: string): number {
	const body = source.replace(/^---[\s\S]*?\n---/, '');
	const words = body.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function toPost(path: string, meta: PostFrontmatter): Post {
	return {
		slug: slugOf(path),
		title: meta.title,
		date: meta.date,
		summary: meta.summary,
		image: meta.image,
		author: meta.author,
		tags: (meta.tags ?? []).map(toTag),
		series: meta.series ? { name: meta.series, part: meta.part } : undefined,
		readingMinutes: readingMinutes(sources[path] ?? ''),
		tableOfContents: meta.tableOfContents ?? []
	};
}

const parsed = Object.entries(frontmatter)
	.map(([path, meta]) => toPost(path, meta))
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Give every post the same label for a tag, whichever spelling it used.
const canonical = new Map(collectTags(parsed.map((post) => post.tags)).map((tag) => [tag.key, tag]));
const posts: Post[] = parsed.map((post) => ({
	...post,
	tags: post.tags.map((tag) => canonical.get(tag.key) ?? tag)
}));

/** All posts, newest first. */
export function getPosts(): Post[] {
	return posts;
}

export function getPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

/** The posts published right before and after the given one. */
export function getNeighbours(slug: string): { newer?: Post; older?: Post } {
	const index = posts.findIndex((post) => post.slug === slug);
	return { newer: posts[index - 1], older: posts[index + 1] };
}
