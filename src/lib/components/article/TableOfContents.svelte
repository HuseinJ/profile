<script lang="ts">
	import type { TocEntry } from '$lib/content/types';

	let { entries }: { entries: TocEntry[] } = $props();

	let current = $state<string | undefined>(undefined);

	// Highlight the section whose heading most recently scrolled past the top third of the viewport.
	$effect(() => {
		const headings = entries
			.map((entry) => document.getElementById(entry.id))
			.filter((el): el is HTMLElement => el !== null);
		if (headings.length === 0) return;

		const observer = new IntersectionObserver(
			(observed) => {
				for (const item of observed) {
					if (item.isIntersecting) current = item.target.id;
				}
			},
			{ rootMargin: '0px 0px -65% 0px' }
		);
		headings.forEach((heading) => observer.observe(heading));
		return () => observer.disconnect();
	});
</script>

<nav class="toc" aria-labelledby="toc-heading">
	<h2 id="toc-heading">Contents</h2>
	<ol>
		{#each entries as entry (entry.id)}
			<li class:sub={entry.level === 'h3'}>
				<a href="#{entry.id}" aria-current={current === entry.id ? 'location' : undefined}>
					{entry.title}
				</a>
			</li>
		{/each}
	</ol>
</nav>

<style>
	.toc {
		font-size: var(--text-sm);
		line-height: 1.35;
	}

	h2 {
		font-size: var(--text-sm);
		font-weight: 700;
		margin-bottom: 0.75rem;
	}

	ol {
		border-left: 1px solid var(--color-rule);
	}

	a {
		display: block;
		padding: 0.35rem 0 0.35rem 0.9rem;
		margin-left: -1px;
		border-left: 3px solid transparent;
		color: var(--color-moss);
		text-decoration: none;
		transition: color 150ms, border-color 150ms;
	}

	.sub a {
		padding-left: 1.8rem;
	}

	a:hover {
		color: var(--color-ink);
	}

	a[aria-current='location'] {
		color: var(--color-ink);
		border-color: var(--color-pine);
	}
</style>
