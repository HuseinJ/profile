<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '$lib/content/types';
	import { formatDate, formatDayMonth } from '$lib/utils/date';
	import TopicList from './TopicList.svelte';

	interface Props {
		post: Post;
		/** Rows inside a year group only need day and month. */
		groupedByYear?: boolean;
	}

	let { post, groupedByYear = false }: Props = $props();
</script>

<article class="row" class:compact={groupedByYear}>
	<time class="date" datetime={post.date}>
		{groupedByYear ? formatDayMonth(post.date) : formatDate(post.date)}
	</time>

	<div class="body">
		<h3 class="title">
			<a href={resolve('/blog/[slug]', { slug: post.slug })}>{post.title}</a>
		</h3>
		{#if post.summary}
			<p class="summary">{post.summary}</p>
		{/if}
		<TopicList tags={post.tags} />
	</div>

	{#if post.image}
		<div class="thumb">
			<img src={post.image} alt="" loading="lazy" />
		</div>
	{/if}
</article>

<style>
	.row {
		position: relative;
		display: grid;
		grid-template-columns: 8.5rem minmax(0, 1fr) 11rem;
		grid-template-areas: 'date body thumb';
		gap: 0.5rem clamp(1.25rem, 3vw, 2.5rem);
		padding-block: 1.75rem;
		border-top: 1px solid var(--color-rule);
	}

	.compact {
		grid-template-columns: 4.5rem minmax(0, 1fr) 11rem;
	}

	.date {
		grid-area: date;
		padding-top: 0.3rem;
		font-size: var(--text-sm);
		color: var(--color-moss);
		font-variant-numeric: tabular-nums;
	}

	.body {
		grid-area: body;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.title {
		font-size: var(--text-xl);
		font-weight: 680;
		line-height: 1.2;
		text-wrap: balance;
	}

	.title a {
		text-decoration: none;
		background-image: linear-gradient(var(--color-lichen), var(--color-lichen));
		background-size: 0% 0.35em;
		background-position: 0 88%;
		background-repeat: no-repeat;
		transition: background-size 250ms ease-out;
	}

	.title a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.row:hover .title a,
	.title a:focus-visible {
		background-size: 100% 0.35em;
	}

	.summary {
		font-family: var(--font-text);
		font-size: var(--text-md);
		line-height: 1.55;
		color: color-mix(in srgb, var(--color-ink) 82%, var(--color-paper));
		max-width: 38rem;
	}

	.thumb {
		grid-area: thumb;
		aspect-ratio: 3 / 2;
		overflow: hidden;
		border-radius: 2px;
		background: var(--color-rule);
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 52rem) {
		.row,
		.compact {
			grid-template-columns: minmax(0, 1fr) 6.5rem;
			grid-template-areas:
				'date date'
				'body thumb';
		}
		.date {
			padding-top: 0;
		}
	}

	@media (max-width: 34rem) {
		.row,
		.compact {
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas:
				'date'
				'body';
		}
		.thumb {
			display: none;
		}
	}
</style>
