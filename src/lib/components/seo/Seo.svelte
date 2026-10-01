<script lang="ts">
	import { absoluteUrl, site } from '$lib/config/site';

	interface Props {
		title: string;
		description: string;
		path: string;
		image?: string;
		type?: 'website' | 'article';
		publishedTime?: string;
		tags?: string[];
	}

	let {
		title,
		description,
		path,
		image = site.image,
		type = 'website',
		publishedTime,
		tags = []
	}: Props = $props();

	const canonical = $derived(absoluteUrl(path));
	const imageUrl = $derived(absoluteUrl(image));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={site.name} />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content="en_US" />
	{#if type === 'article' && publishedTime}
		<meta property="article:published_time" content={publishedTime} />
		<meta property="article:author" content={site.name} />
		{#each tags as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
