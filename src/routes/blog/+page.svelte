<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/components/SEO.svelte';
	export let data: PageData;
	const { posts } = data;
</script>

<SEO 
	title="Blog - {data.seo?.siteName || 'My Blog'}"
	description="Articles, tutorials, and insights on web development"
	canonical="{data.seo?.siteUrl || ''}/blog"
	image={data.seo?.image || ''}
/>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-neutral-100 via-primary-100 to-primary-200 py-20">
	<div class="container mx-auto px-6 text-center">
		<h1 class="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
			Blog & Articles
		</h1>
		<p class="text-xl text-gray-700 max-w-2xl mx-auto">
            Deep dives into software architecture, cybersecurity, and emerging technologies.
        </p>
	</div>
</section>

<!-- Blog Posts Grid -->
<section class="py-20 bg-white">
	<div class="container mx-auto px-6">
		<div class="max-w-6xl mx-auto">
			{#if posts.length === 0}
				<div class="text-center py-20">
					<div class="text-6xl mb-4">📝</div>
					<h2 class="text-2xl font-bold text-gray-900 mb-2">No posts yet</h2>
					<p class="text-gray-600">Check back soon for new articles!</p>
				</div>
			{:else}
				<div class="grid md:grid-cols-2 gap-8">
					{#each posts as post, index}
						<article class="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-neutral-200 hover:border-primary-400 {index === 0 ? 'md:col-span-2' : ''}">
							<a href="/blog/{post.slug}" class="block">
								<!-- Featured Image Placeholder -->
								<div class="h-64 {index === 0 ? 'md:h-96' : ''} bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 relative overflow-hidden">
									<div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
									<div class="absolute bottom-6 left-6 right-6">
										<div class="flex items-center gap-4">
											<span class="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm text-primary-700 text-sm font-bold rounded-full shadow-md">
												{new Date(post.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
											</span>
											{#if index === 0}
												<span class="inline-block px-4 py-2 bg-primary-700/95 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-md">
													Latest Post
												</span>
											{/if}
										</div>
									</div>
								</div>
								
								<!-- Content -->
								<div class="p-8 bg-gradient-to-b from-white to-neutral-50">
									<h2 class="text-2xl {index === 0 ? 'md:text-3xl' : ''} font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
										{post.meta.title}
									</h2>
									
									{#if post.meta.summary}
										<p class="text-gray-700 leading-relaxed mb-6 {index === 0 ? 'text-lg' : ''}">
											{post.meta.summary}
										</p>
									{/if}
									
									<div class="flex items-center text-primary-600 font-bold group-hover:gap-2 transition-all">
										Read full article
										<svg class="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
										</svg>
									</div>
								</div>
							</a>
						</article>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>