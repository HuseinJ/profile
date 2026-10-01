<script lang="ts">
	import type { Tag } from '$lib/content/types';

	interface Props {
		tags: Tag[];
		query: string;
		selected: string[];
	}

	let { tags, query = $bindable(), selected = $bindable() }: Props = $props();

	function toggle(key: string) {
		selected = selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key];
	}
</script>

<div class="filter">
	<label class="search">
		<span class="sr-only">Search posts</span>
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<circle cx="11" cy="11" r="7" />
			<path d="m20 20-4-4" stroke-linecap="round" />
		</svg>
		<input type="search" bind:value={query} placeholder="Search titles and summaries" autocomplete="off" />
	</label>

	<fieldset class="topics">
		<legend class="sr-only">Filter by topic</legend>
		{#each tags as tag (tag.key)}
			<button type="button" aria-pressed={selected.includes(tag.key)} onclick={() => toggle(tag.key)}>
				{tag.label}
			</button>
		{/each}
	</fieldset>
</div>

<style>
	.filter {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.search {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		max-width: 32rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--color-ink);
		color: var(--color-moss);
	}

	.search:focus-within {
		border-color: var(--color-pine);
		color: var(--color-pine);
	}

	input {
		flex: 1;
		min-width: 0;
		background: none;
		border: 0;
		outline: none;
		font: inherit;
		font-size: var(--text-lg);
		color: var(--color-ink);
	}

	input::placeholder {
		color: var(--color-moss);
	}

	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		border: 0;
		padding: 0;
	}

	button {
		padding: 0.3rem 0.7rem;
		font-size: var(--text-sm);
		color: var(--color-ink);
		border: 1px solid var(--color-rule);
		border-radius: 2px;
		cursor: pointer;
		transition: border-color 120ms, background-color 120ms;
	}

	button:hover {
		border-color: var(--color-pine);
	}

	button[aria-pressed='true'] {
		background: var(--color-pine);
		border-color: var(--color-pine);
		color: var(--color-paper);
	}
</style>
