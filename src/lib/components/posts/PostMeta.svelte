<script lang="ts">
	import type { Post } from '$lib/content/types';
	import { formatDate } from '$lib/utils/date';

	let { post, showDate = true }: { post: Post; showDate?: boolean } = $props();
</script>

<p class="meta">
	{#if showDate}
		<time datetime={post.date}>{formatDate(post.date)}</time>
	{/if}
	<span>{post.readingMinutes} min read</span>
	{#if post.series}
		<span>
			{post.series.part ? `Part ${post.series.part} of` : 'From'}
			<em>{post.series.name}</em>
		</span>
	{/if}
</p>

<style>
	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.25rem;
		font-size: var(--text-sm);
		color: var(--color-moss);
		font-variant-numeric: tabular-nums;
	}

	em {
		font-style: normal;
		color: var(--color-ink);
	}
</style>
