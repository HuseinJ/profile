<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '$lib/content/types';
	import PostMeta from '$lib/components/posts/PostMeta.svelte';

	let { post }: { post: Post } = $props();
</script>

<header class="article-header">
	<a class="back text-link" href={resolve('/blog')}>All writing</a>

	<h1>{post.title}</h1>

	{#if post.summary}
		<p class="deck">{post.summary}</p>
	{/if}

	<PostMeta {post} />

	{#if post.tags.length > 0}
		<ul class="tags" aria-label="Topics">
			{#each post.tags as tag (tag.key)}
				<li>{tag.label}</li>
			{/each}
		</ul>
	{/if}
</header>

<style>
	.article-header {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-width: 52rem;
	}

	.back {
		align-self: flex-start;
		font-size: var(--text-sm);
		color: var(--color-moss);
	}

	h1 {
		font-size: clamp(2.25rem, 5.5vw, var(--text-4xl));
		font-weight: 800;
		font-stretch: 112%;
		line-height: 1.02;
		letter-spacing: -0.02em;
		color: var(--color-pine);
		text-wrap: balance;
	}

	.deck {
		font-family: var(--font-text);
		font-size: clamp(var(--text-lg), 2.2vw, 1.625rem);
		line-height: 1.45;
		max-width: 40rem;
		text-wrap: pretty;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		font-size: var(--text-sm);
	}

	.tags li {
		padding: 0.15rem 0.55rem;
		border: 1px solid var(--color-rule);
		border-radius: 2px;
	}
</style>
