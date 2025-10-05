<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/components/SEO.svelte';
	export let data: PageData;
	
	const tableOfContents = data.meta.tableOfContents || [];
	const readingTime = data.meta.readingTime || '5 min read';
	const tags = data.meta.tags || [];
</script>

<SEO 
	title="{data.meta.title} - {data.seo.siteName}"
	description={data.meta.summary || data.seo.description}
	canonical="{data.seo.siteUrl}/blog/{data.slug}"
	image={data.meta.image || data.seo.image}
	type="article"
	author={data.meta.author || data.seo.author}
/>

<!-- Hero Section with Featured Image -->
<section class="relative h-[60vh] min-h-[400px] bg-gradient-to-br from-primary-500 to-primary-700 overflow-hidden">
	{#if data.meta.image}
		<img 
			src={data.meta.image} 
			alt={data.meta.title}
			class="absolute inset-0 w-full h-full object-cover opacity-20"
		/>
	{/if}
	<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
	
	<div class="relative container mx-auto px-6 h-full flex items-end pb-16">
		<div class="max-w-4xl text-white">
			<!-- Breadcrumb -->
			<nav class="mb-4 text-sm">
				<a href="/" class="hover:underline opacity-80">Home</a>
				<span class="mx-2 opacity-60">/</span>
				<a href="/blog" class="hover:underline opacity-80">Blog</a>
				<span class="mx-2 opacity-60">/</span>
				<span class="opacity-60">{data.meta.title}</span>
			</nav>
			
			<!-- Tags -->
			{#if tags.length > 0}
				<div class="flex flex-wrap gap-2 mb-4">
					{#each tags as tag}
						<span class="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
			
			<!-- Title -->
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
				{data.meta.title}
			</h1>
			
			<!-- Meta Info -->
			<div class="flex flex-wrap items-center gap-6 text-white/90">
				<div class="flex items-center gap-2">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
					</svg>
					<span>{data.meta.author || data.seo.author}</span>
				</div>
				<div class="flex items-center gap-2">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
					</svg>
					<time datetime={data.meta.date}>
						{new Date(data.meta.date).toLocaleDateString('en-US', { 
							year: 'numeric', 
							month: 'long', 
							day: 'numeric' 
						})}
					</time>
				</div>
				<div class="flex items-center gap-2">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<span>{readingTime}</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Main Content Area -->
<div class="bg-white py-16">
	<div class="container mx-auto px-6">
		<div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
			<!-- Table of Contents Sidebar (Desktop) -->
			{#if tableOfContents.length > 0}
				<aside class="hidden lg:block lg:w-64 shrink-0">
					<div class="sticky top-24">
						<div class="bg-neutral-50 rounded-xl p-6 border border-gray-200">
							<h2 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
								</svg>
								Table of Contents
							</h2>
							<nav class="space-y-2">
								{#each tableOfContents as item}
									<a 
										href="#{item.id}" 
										class="block text-sm text-gray-600 hover:text-primary-500 transition-colors py-1 {item.level === 'h3' ? 'pl-4' : ''}"
									>
										{item.title}
									</a>
								{/each}
							</nav>
						</div>
					</div>
				</aside>
			{/if}
			
			<!-- Article Content -->
			<article class="flex-1 min-w-0">
				<!-- Summary Box -->
				{#if data.meta.summary}
					<div class="bg-primary-100 border-l-4 border-primary-500 rounded-r-xl p-6 mb-12">
						<p class="text-lg text-gray-700 leading-relaxed italic">
							{data.meta.summary}
						</p>
					</div>
				{/if}
				
				<!-- Prose Content -->
				<div class="prose prose-lg max-w-none
					prose-headings:font-bold prose-headings:text-gray-900
					prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
					prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
					prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
					prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
					prose-strong:text-gray-900 prose-strong:font-semibold
					prose-code:text-primary-500 prose-code:bg-primary-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
					prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
					prose-blockquote:border-l-primary-500 prose-blockquote:bg-neutral-50 prose-blockquote:rounded-r-xl prose-blockquote:py-2
					prose-img:rounded-xl prose-img:shadow-lg
					prose-ul:list-disc prose-ul:ml-6
					prose-ol:list-decimal prose-ol:ml-6
					prose-li:text-gray-700 prose-li:mb-2
				">
					<svelte:component this={data.content} />
				</div>
				
				<!-- Author Bio -->
				<div class="mt-16 p-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl border border-primary-300">
					<div class="flex items-start gap-6">
						<div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold shrink-0">
							{(data.meta.author || data.seo.author).charAt(0)}
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold text-gray-900 mb-2">
								Written by {data.meta.author || data.seo.author}
							</h3>
							<p class="text-gray-600 mb-4">
								Full-Stack Developer passionate about creating elegant web solutions and sharing knowledge with the community.
							</p>
							<div class="flex gap-4">
								<a href="https://twitter.com/myhandle" class="text-primary-500 hover:text-primary-600 font-medium flex items-center gap-2">
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
									</svg>
									Follow on Twitter
								</a>
								<a href="https://github.com/mygithub" class="text-primary-500 hover:text-primary-600 font-medium flex items-center gap-2">
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
									</svg>
									GitHub
								</a>
							</div>
						</div>
					</div>
				</div>
			</article>
			
			<!-- Share Sidebar (Desktop) -->
			<aside class="hidden lg:block lg:w-16 shrink-0">
				<div class="sticky top-24">
					<div class="flex flex-col gap-4">
						<button class="w-12 h-12 flex items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-all shadow-md hover:shadow-lg" aria-label="Share on Twitter">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
							</svg>
						</button>
						<button class="w-12 h-12 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all shadow-md hover:shadow-lg" aria-label="Share on LinkedIn">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
							</svg>
						</button>
						<button class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-all shadow-md hover:shadow-lg" aria-label="Copy link">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
							</svg>
						</button>
					</div>
				</div>
			</aside>
		</div>
	</div>
</div>

<!-- Related Posts / Back to Blog -->
<section class="py-20 bg-neutral-50">
	<div class="container mx-auto px-6">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl font-bold text-gray-900 mb-6">Continue Reading</h2>
			<a href="/blog" class="inline-block px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl">
				← Back to All Articles
			</a>
		</div>
	</div>
</section>