<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/components/SEO.svelte';
	export let data: PageData;
	const { posts } = data;
	
	let searchQuery = '';
	let selectedTags: string[] = [];
	
	$: allTags = [...new Set(posts.flatMap(post => post.meta.tags || []))].sort();
	
	$: filteredPosts = posts.filter(post => {
		const matchesSearch = searchQuery === '' || 
			post.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(post.meta.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
		
		const matchesTags = selectedTags.length === 0 ||
			selectedTags.every(tag => post.meta.tags?.includes(tag));
		
		return matchesSearch && matchesTags;
	});
	
	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter(t => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}
	
	function clearFilters() {
		searchQuery = '';
		selectedTags = [];
	}
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
		<p class="text-xl text-gray-700 max-w-2xl mx-auto mb-10">
			Deep dives into software architecture, cybersecurity, and emerging technologies.
		</p>
		
		<!-- Search Bar -->
		<div class="max-w-2xl mx-auto">
			<div class="relative">
				<input 
					type="text" 
					bind:value={searchQuery}
					placeholder="Search articles by title or content..."
					class="w-full px-6 py-4 pl-14 text-lg rounded-xl border-2 border-primary-300 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200 transition-all shadow-lg"
				/>
				<svg class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
				</svg>
				{#if searchQuery}
					<button 
						on:click={() => searchQuery = ''}
						class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</button>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Filters Section -->
{#if allTags.length > 0}
	<section class="py-8 bg-white border-b border-gray-200">
		<div class="container mx-auto px-6">
			<div class="max-w-6xl mx-auto">
				<div class="flex flex-wrap items-center gap-3">
					<span class="text-sm font-semibold text-gray-700">Filter by tags:</span>
					{#each allTags as tag}
						<button
							on:click={() => toggleTag(tag)}
							class="px-4 py-2 rounded-full text-sm font-medium transition-all {
								selectedTags.includes(tag)
									? 'bg-primary-500 text-white shadow-md'
									: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
							}"
						>
							{tag}
						</button>
					{/each}
					{#if selectedTags.length > 0 || searchQuery}
						<button
							on:click={clearFilters}
							class="ml-auto px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
						>
							Clear all filters
						</button>
					{/if}
				</div>
				
				<!-- Active filters display -->
				{#if selectedTags.length > 0 || searchQuery}
					<div class="mt-4 flex items-center gap-2 text-sm text-gray-600">
						<span class="font-medium">Active filters:</span>
						{#if searchQuery}
							<span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
								Search: "{searchQuery}"
							</span>
						{/if}
						{#each selectedTags as tag}
							<span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full flex items-center gap-1">
								{tag}
								<button on:click={() => toggleTag(tag)} class="hover:text-primary-900">
									<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
									</svg>
								</button>
							</span>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}

<!-- Blog Posts Grid -->
<section class="py-20 bg-white">
	<div class="container mx-auto px-6">
		<div class="max-w-6xl mx-auto">
			<!-- Results count -->
			{#if searchQuery || selectedTags.length > 0}
				<div class="mb-6 text-gray-600">
					Found <strong class="text-gray-900">{filteredPosts.length}</strong> 
					{filteredPosts.length === 1 ? 'article' : 'articles'}
				</div>
			{/if}
			
			{#if filteredPosts.length === 0}
				<div class="text-center py-20">
					<div class="text-6xl mb-4">🔍</div>
					<h2 class="text-2xl font-bold text-gray-900 mb-2">No articles found</h2>
					<p class="text-gray-600 mb-6">Try adjusting your search or filters</p>
					{#if searchQuery || selectedTags.length > 0}
						<button
							on:click={clearFilters}
							class="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
						>
							Clear all filters
						</button>
					{/if}
				</div>
			{:else}
				<div class="grid md:grid-cols-2 gap-8">
					{#each filteredPosts as post, index}
						<article class="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-neutral-200 hover:border-primary-400 {index === 0 && !searchQuery && selectedTags.length === 0 ? 'md:col-span-2' : ''}">
							<a href="/blog/{post.slug}" class="block">
								<!-- Featured Image Placeholder -->
								<div class="h-64 {index === 0 && !searchQuery && selectedTags.length === 0 ? 'md:h-96' : ''} bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 relative overflow-hidden">
									<div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
									<div class="absolute bottom-6 left-6 right-6">
										<div class="flex items-center gap-2 flex-wrap">
											<span class="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm text-primary-700 text-sm font-bold rounded-full shadow-md">
												{new Date(post.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
											</span>
											{#if index === 0 && !searchQuery && selectedTags.length === 0}
												<span class="inline-block px-4 py-2 bg-primary-700/95 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-md">
													Latest Post
												</span>
											{/if}
											{#if post.meta.tags && post.meta.tags.length > 0}
												{#each post.meta.tags.slice(0, 2) as tag}
													<span class="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-semibold rounded-full shadow-sm">
														{tag}
													</span>
												{/each}
											{/if}
										</div>
									</div>
								</div>
								
								<!-- Content -->
								<div class="p-8 bg-gradient-to-b from-white to-neutral-50">
									<h2 class="text-2xl {index === 0 && !searchQuery && selectedTags.length === 0 ? 'md:text-3xl' : ''} font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
										{post.meta.title}
									</h2>
									
									{#if post.meta.summary}
										<p class="text-gray-700 leading-relaxed mb-6 {index === 0 && !searchQuery && selectedTags.length === 0 ? 'text-lg' : ''}">
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