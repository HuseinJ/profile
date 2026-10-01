<script lang="ts">
	import { resolve } from '$app/paths';
	import { links, site } from '$lib/config/site';
	import Seo from '$lib/components/seo/Seo.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import PostFeature from '$lib/components/posts/PostFeature.svelte';
	import PostRow from '$lib/components/posts/PostRow.svelte';

	let { data } = $props();
</script>

<Seo
	title="{site.name}, security-focused software engineer"
	description={site.description}
	path="/"
/>

<JsonLd
	data={{
		'@type': 'Person',
		name: site.name,
		url: site.url,
		image: `${site.url}${site.image}`,
		jobTitle: site.jobTitle,
		description: site.description,
		sameAs: [links.github, links.linkedin],
		knowsAbout: site.knowsAbout
	}}
/>

<Hero />

<section id="writing" class="writing" aria-labelledby="writing-heading">
	<div class="wrap">
		<header class="head">
			<h2 id="writing-heading">Writing</h2>
			<p>Long-form posts about things I've built and what I learned from them.</p>
		</header>

		{#if data.latest}
			<PostFeature post={data.latest} />
		{/if}

		{#if data.recent.length > 0}
			<div class="recent">
				{#each data.recent as post (post.slug)}
					<PostRow {post} />
				{/each}
			</div>
		{/if}

		{#if data.total > data.recent.length + 1}
			<a class="all text-link" href={resolve('/blog')}>See all {data.total} posts</a>
		{/if}
	</div>
</section>

<style>
	.writing {
		padding-block: clamp(3.5rem, 8vw, 6rem) clamp(4rem, 9vw, 7rem);
		background: color-mix(in srgb, var(--color-paper) 55%, white);
		border-top: 1px solid var(--color-rule);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem 2rem;
		margin-bottom: clamp(2rem, 5vw, 3.5rem);
	}

	h2 {
		font-size: clamp(var(--text-2xl), 5vw, var(--text-4xl));
		font-weight: 800;
		font-stretch: 125%;
		letter-spacing: -0.02em;
		line-height: 1;
		color: var(--color-pine);
	}

	.head p {
		font-family: var(--font-text);
		font-size: var(--text-md);
		color: var(--color-moss);
		max-width: 26rem;
	}

	.recent {
		margin-top: clamp(3rem, 6vw, 4.5rem);
		border-bottom: 1px solid var(--color-rule);
	}

	.all {
		display: inline-block;
		margin-top: 2rem;
		font-weight: 600;
		color: var(--color-pine);
	}
</style>
