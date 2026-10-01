<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '$lib/content/types';
	import PostMeta from './PostMeta.svelte';
	import TopicList from './TopicList.svelte';

	let { post }: { post: Post } = $props();
</script>

<article class="feature">
	{#if post.image}
		<div class="image">
			<img src={post.image} alt="" loading="lazy" />
		</div>
	{/if}

	<div class="body">
		<p class="latest">Latest post</p>
		<h3 class="title">
			<a href={resolve('/blog/[slug]', { slug: post.slug })}>{post.title}</a>
		</h3>
		{#if post.summary}
			<p class="summary">{post.summary}</p>
		{/if}
		<PostMeta {post} />
		<TopicList tags={post.tags} />
	</div>
</article>

<style>
	.feature {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
		gap: clamp(1.5rem, 4vw, 3.5rem);
		align-items: center;
	}

	.image {
		aspect-ratio: 3 / 2;
		overflow: hidden;
		border-radius: 3px;
		background: var(--color-rule);
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.latest {
		align-self: flex-start;
		font-size: var(--text-sm);
		font-weight: 600;
		background: var(--color-lichen);
		padding: 0.2rem 0.55rem;
		border-radius: 2px;
	}

	.title {
		font-size: clamp(var(--text-xl), 3.2vw, 2.6rem);
		font-weight: 750;
		font-stretch: 110%;
		line-height: 1.08;
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	.title a {
		text-decoration: none;
	}

	/* The whole feature is one click target, reachable via the title link. */
	.title a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.feature:hover .title a {
		color: var(--color-pine);
	}

	.summary {
		font-family: var(--font-text);
		font-size: var(--text-lg);
		line-height: 1.5;
		max-width: 34rem;
	}

	@media (max-width: 52rem) {
		.feature {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
