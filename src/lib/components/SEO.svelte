<script lang="ts">
    export let title: string;
    export let description: string;
    export let canonical: string;
    export let image: string = '';
    export let type: string = 'website';
    export let author: string = '';
  </script>
  
  <svelte:head>
    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    {#if author}
      <meta name="author" content={author} />
    {/if}
  
    <!-- Canonical URL -->
    <link rel="canonical" href={canonical} />
  
  </svelte:head>