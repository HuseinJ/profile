<script lang="ts">
	import '@fontsource-variable/archivo/wdth.css';
	import '@fontsource-variable/source-serif-4/opsz.css';
	import '@fontsource-variable/source-serif-4/opsz-italic.css';
	import '@fontsource-variable/jetbrains-mono';
	import '../app.css';
	import archivo from '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preload" href={archivo} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<a class="skip" href="#content">Skip to content</a>
<SiteHeader />
<main id="content">
	{@render children()}
</main>
<SiteFooter />

<style>
	.skip {
		position: absolute;
		left: 1rem;
		top: -3rem;
		padding: 0.5rem 0.9rem;
		background: var(--color-pine);
		color: var(--color-paper);
		z-index: 10;
	}
	.skip:focus {
		top: 1rem;
	}
</style>
