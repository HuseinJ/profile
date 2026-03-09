<script lang="ts">
    export let title: string;
    export let description: string;
    export let canonical: string;
    export let image: string = '';
    export let type: string = 'website';
    export let author: string = '';
    export let publishedTime: string = '';
    export let tags: string[] = [];

    // Ensure image is absolute URL
    const absoluteImage = image && !image.startsWith('http')
      ? `https://hjusic.com${image}`
      : image || 'https://hjusic.com/profile.jpeg';
  </script>

  <svelte:head>
    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    {#if author}
      <meta name="author" content={author} />
    {/if}
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />

    <!-- Canonical URL -->
    <link rel="canonical" href={canonical} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={type} />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={absoluteImage} />
    <meta property="og:site_name" content="HJusic" />
    <meta property="og:locale" content="en_US" />
    {#if type === 'article' && publishedTime}
      <meta property="article:published_time" content={publishedTime} />
      <meta property="article:author" content={author} />
      {#each tags as tag}
        <meta property="article:tag" content={tag} />
      {/each}
    {/if}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={canonical} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={absoluteImage} />
    {#if author}
      <meta name="twitter:creator" content="@{author}" />
    {/if}
  </svelte:head>