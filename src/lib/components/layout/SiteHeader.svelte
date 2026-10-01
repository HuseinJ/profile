<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { site } from '$lib/config/site';

	const onHome = $derived(page.url.pathname === '/');
	const inWriting = $derived(page.url.pathname.startsWith('/blog'));
</script>

<header class="wrap header">
	{#if onHome}
		<span class="mark">hjusic.com</span>
	{:else}
		<a href={resolve('/')} class="mark">{site.name}</a>
	{/if}

	<nav aria-label="Main">
		<a href={resolve('/blog')} aria-current={inWriting ? 'page' : undefined}>Writing</a>
		<a href="https://github.com/{site.github}">GitHub</a>
		<a href="https://www.linkedin.com/in/{site.linkedin}">LinkedIn</a>
	</nav>
</header>

<style>
	.header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem 2rem;
		padding-block: 1.5rem;
		font-size: var(--text-base);
	}

	.mark {
		font-weight: 700;
		font-stretch: 112%;
		text-decoration: none;
		color: var(--color-pine);
	}

	nav {
		display: flex;
		gap: 1.5rem;
	}

	nav a {
		text-decoration: none;
		color: var(--color-moss);
		padding-block: 0.25rem;
		border-bottom: 2px solid transparent;
		transition: color 150ms, border-color 150ms;
	}

	nav a:hover,
	nav a[aria-current='page'] {
		color: var(--color-ink);
		border-color: var(--color-lichen);
	}
</style>
