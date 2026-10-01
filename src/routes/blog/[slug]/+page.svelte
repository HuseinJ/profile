<script lang="ts">
	import { absoluteUrl, site } from '$lib/config/site';
	import Seo from '$lib/components/seo/Seo.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import ArticleHeader from '$lib/components/article/ArticleHeader.svelte';
	import TableOfContents from '$lib/components/article/TableOfContents.svelte';
	import AuthorCard from '$lib/components/article/AuthorCard.svelte';
	import PostNav from '$lib/components/article/PostNav.svelte';

	let { data } = $props();

	const post = $derived(data.post);
	const path = $derived(`/blog/${post.slug}`);
	const author = $derived(post.author ?? site.name);
</script>

<Seo
	title="{post.title} by {site.name}"
	description={post.summary ?? site.description}
	{path}
	image={post.image}
	type="article"
	publishedTime={post.date}
	tags={post.tags.map((tag) => tag.label)}
/>

<JsonLd
	data={{
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.summary ?? site.description,
		image: absoluteUrl(post.image ?? site.image),
		datePublished: post.date,
		keywords: post.tags.map((tag) => tag.label).join(', '),
		author: { '@type': 'Person', name: author, url: site.url },
		mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) }
	}}
/>

<JsonLd
	data={{
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
			{ '@type': 'ListItem', position: 2, name: 'Writing', item: absoluteUrl('/blog') },
			{ '@type': 'ListItem', position: 3, name: post.title, item: absoluteUrl(path) }
		]
	}}
/>

<article class="wrap article" class:has-toc={post.tableOfContents.length > 0}>
	<div class="head">
		<ArticleHeader {post} />
	</div>

	{#if post.image}
		<figure class="cover">
			<img src={post.image} alt="" />
		</figure>
	{/if}

	<div class="main">
		{#if post.tableOfContents.length > 0}
			<div class="toc">
				<TableOfContents entries={post.tableOfContents} />
			</div>
		{/if}

		<div class="body">
			<div class="prose">
				<data.body />
			</div>

			<div class="after">
				<AuthorCard />
				<PostNav older={data.older} newer={data.newer} />
			</div>
		</div>
	</div>
</article>

<style>
	.article {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		row-gap: clamp(2rem, 5vw, 3.5rem);
		padding-block: clamp(1.5rem, 5vw, 3.5rem) clamp(4rem, 9vw, 6rem);
	}

	/* Desktop: contents in a left rail, everything else on one shared left edge. */
	@media (min-width: 64rem) {
		.has-toc {
			grid-template-columns: 13rem minmax(0, 1fr);
			column-gap: clamp(2.5rem, 5vw, 5rem);
		}
		.has-toc > :not(.main) {
			grid-column: 2;
		}
		.has-toc .main {
			grid-column: 1 / -1;
			display: grid;
			grid-template-columns: subgrid;
		}
		.toc > :global(*) {
			position: sticky;
			top: 2rem;
		}
	}

	.main {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.cover {
		max-width: 52rem;
	}

	.cover img {
		width: 100%;
		max-height: 34rem;
		object-fit: cover;
		border-radius: 3px;
		background: white;
	}

	.after {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		max-width: var(--measure);
		margin-top: clamp(3.5rem, 7vw, 5rem);
	}

	@media (max-width: 63.99rem) {
		.toc {
			padding: 1.25rem 1.25rem 1rem;
			background: color-mix(in srgb, var(--color-paper) 55%, white);
			border-radius: 3px;
		}
	}
</style>
