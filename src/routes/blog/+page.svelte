<script lang="ts">
	import { site } from '$lib/config/site';
	import { collectTags } from '$lib/content/tags';
	import { yearOf } from '$lib/utils/date';
	import Seo from '$lib/components/seo/Seo.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import PostFilter from '$lib/components/posts/PostFilter.svelte';
	import PostRow from '$lib/components/posts/PostRow.svelte';

	let { data } = $props();

	const description = 'Long-form posts on security, identity, and the backend systems around them.';

	const FILTER_THRESHOLD = 4;

	let query = $state('');
	let selected = $state<string[]>([]);

	const tags = $derived(collectTags(data.posts.map((post) => post.tags)));
	const filtering = $derived(query.trim() !== '' || selected.length > 0);

	const matches = $derived(
		data.posts.filter((post) => {
			const needle = query.trim().toLowerCase();
			const text = `${post.title} ${post.summary ?? ''}`.toLowerCase();
			const keys = post.tags.map((tag) => tag.key);
			return (!needle || text.includes(needle)) && selected.every((key) => keys.includes(key));
		})
	);

	const years = $derived.by(() => {
		const groups: [number, typeof matches][] = [];
		for (const post of matches) {
			const year = yearOf(post.date);
			const group = groups.find(([y]) => y === year);
			if (group) group[1].push(post);
			else groups.push([year, [post]]);
		}
		return groups;
	});

	function clear() {
		query = '';
		selected = [];
	}
</script>

<Seo title="Writing by {site.name}" {description} path="/blog" />

<JsonLd
	data={{
		'@type': 'Blog',
		name: `Writing by ${site.name}`,
		description,
		url: `${site.url}/blog`,
		author: { '@type': 'Person', name: site.name, url: site.url }
	}}
/>

<div class="wrap page">
	<header class="intro">
		<h1>Writing</h1>
		<p>{description}</p>
	</header>

	<!-- Search and topics only pay off once there's something to narrow down. -->
	{#if data.posts.length >= FILTER_THRESHOLD}
		<PostFilter {tags} bind:query bind:selected />
	{/if}

	<p class="status" aria-live="polite">
		{#if filtering}
			{matches.length} of {data.posts.length} posts match.
			<button type="button" class="text-link" onclick={clear}>Clear filters</button>
		{/if}
	</p>

	{#if matches.length === 0}
		<div class="empty">
			<p>No posts match those filters. Remove a topic or shorten the search to see more.</p>
		</div>
	{:else}
		{#each years as [year, posts] (year)}
			<section class="year" aria-labelledby="year-{year}">
				<h2 id="year-{year}">{year}</h2>
				<div class="rows">
					{#each posts as post (post.slug)}
						<PostRow {post} groupedByYear />
					{/each}
				</div>
			</section>
		{/each}
	{/if}
</div>

<style>
	.page {
		padding-block: clamp(2rem, 6vw, 4.5rem) clamp(4rem, 9vw, 7rem);
	}

	.intro {
		margin-bottom: clamp(2rem, 5vw, 3rem);
	}

	h1 {
		font-size: clamp(3.25rem, 12vw, 9rem);
		font-weight: 850;
		font-stretch: 125%;
		letter-spacing: -0.035em;
		line-height: 0.9;
		color: var(--color-pine);
	}

	.intro p {
		margin-top: 1.25rem;
		font-family: var(--font-text);
		font-size: var(--text-lg);
		max-width: 34rem;
	}

	.status {
		min-height: 1.5rem;
		margin-block: 1.5rem 0.5rem;
		font-size: var(--text-sm);
		color: var(--color-moss);
	}

	.status button {
		margin-left: 0.75rem;
		color: var(--color-pine);
		font-weight: 600;
		cursor: pointer;
	}

	.year {
		display: grid;
		grid-template-columns: 7rem minmax(0, 1fr);
		gap: 0 clamp(1rem, 3vw, 2.5rem);
		margin-top: 2.5rem;
	}

	.year h2 {
		padding-top: 1.55rem;
		font-size: var(--text-2xl);
		font-weight: 800;
		font-stretch: 125%;
		line-height: 1;
		color: var(--color-pine);
		font-variant-numeric: tabular-nums;
	}

	.rows {
		border-bottom: 1px solid var(--color-rule);
	}

	.empty {
		margin-top: 2rem;
		padding: 2rem 0;
		border-top: 1px solid var(--color-rule);
		font-family: var(--font-text);
		font-size: var(--text-lg);
		max-width: 36rem;
	}

	@media (max-width: 52rem) {
		.year {
			grid-template-columns: minmax(0, 1fr);
		}
		.year h2 {
			padding-top: 0;
			margin-bottom: 0.75rem;
		}
	}
</style>
