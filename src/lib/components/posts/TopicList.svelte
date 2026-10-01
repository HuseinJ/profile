<script lang="ts">
	import type { Tag } from '$lib/content/types';

	let { tags, limit = 4 }: { tags: Tag[]; limit?: number } = $props();

	const shown = $derived(tags.slice(0, limit));
</script>

{#if shown.length > 0}
	<p class="topics">
		<span class="sr-only">Topics:</span>
		{shown.map((tag) => tag.label).join(', ')}
	</p>
{/if}

<style>
	.topics {
		font-size: var(--text-sm);
		color: var(--color-moss);
	}
</style>
