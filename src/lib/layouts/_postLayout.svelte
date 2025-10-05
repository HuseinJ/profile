<script lang="ts">
	export const prerender = true;
	export let content: typeof import('svelte').SvelteComponent;
	export let meta: { title: string; date: string; summary?: string };
  </script>
  
  <article class="max-w-3xl mx-auto p-6">
	<h1 class="text-3xl font-bold mb-2">{meta.title}</h1>
	<small class="text-gray-500 mb-4 block">{meta.date}</small>
	<svelte:component this={content} />
  </article>