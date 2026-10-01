<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '$lib/content/types';

	let { older, newer }: { older?: Post; newer?: Post } = $props();
</script>

{#if older || newer}
	<nav class="post-nav" aria-label="More posts">
		{#if older}
			<a class="older" href={resolve('/blog/[slug]', { slug: older.slug })}>
				<span class="dir">Previous post</span>
				<span class="title">{older.title}</span>
			</a>
		{/if}
		{#if newer}
			<a class="newer" href={resolve('/blog/[slug]', { slug: newer.slug })}>
				<span class="dir">Next post</span>
				<span class="title">{newer.title}</span>
			</a>
		{/if}
	</nav>
{/if}

<style>
	.post-nav {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		border-block: 1px solid var(--color-rule);
	}

	a {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.75rem clamp(0rem, 2vw, 1.5rem);
		background: var(--color-paper);
		text-decoration: none;
		transition: background-color 150ms;
	}

	a:hover {
		background: color-mix(in srgb, var(--color-lichen) 35%, var(--color-paper));
	}

	.newer {
		grid-column: 2;
		text-align: right;
		border-left: 1px solid var(--color-rule);
	}

	.dir {
		font-size: var(--text-sm);
		color: var(--color-moss);
	}

	.title {
		font-size: var(--text-lg);
		font-weight: 680;
		line-height: 1.25;
		text-wrap: balance;
	}

	@media (max-width: 40rem) {
		.post-nav {
			grid-template-columns: minmax(0, 1fr);
		}
		.newer {
			grid-column: 1;
			text-align: left;
			border-left: 0;
		}
		.older + .newer {
			border-top: 1px solid var(--color-rule);
		}
	}
</style>
