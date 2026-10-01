<script lang="ts">
	let { data }: { data: Record<string, unknown> } = $props();

	// Escape "<" so post titles can never close the script tag early.
	const json = $derived(JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c'));
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON.stringify output with "<" escaped above -->
	{@html '<script type="application/ld+json">' + json + '</' + 'script>'}
</svelte:head>
