<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/components/SEO.svelte';
	export let data: PageData;
	
	const contact = {
		email: "contact@hjusic.com",
		github: "HuseinJ",
		linkedin: "husein-jusic-7b0680165"
	};
</script>

<SEO 
	title="{data.seo.siteName} - {data.seo.description}"
	description={data.seo.description}
	canonical={data.seo.siteUrl}
	image={data.seo.image}
	author={data.seo.author}
/>

<!-- Hero Section -->
<section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-primary-100 to-primary-200">
	<div class="container mx-auto px-6 py-20">
		<div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
			<!-- Profile Image - First on mobile, second on desktop -->
			<div class="flex-1 flex justify-center lg:order-2 lg:justify-end">
				<div class="relative">
					<div class="absolute -inset-4 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full blur-2xl opacity-20"></div>
					<img 
						src="/profile.jpeg" 
						alt="{data.seo.author}"
						class="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl ring-8 ring-white"
					/>
				</div>
			</div>
			
			<!-- Text Content - Second on mobile, first on desktop -->
			<div class="flex-1 text-center lg:text-left lg:order-1">
				
				<h1 class="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
					Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">{data.seo.author}</span>
				</h1>
				
				<p class="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
					Building secure, scalable applications with a focus on software architecture and cybersecurity. 
				</p>
				
				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
					<a href="/blog" class="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
						Read My Blog
					</a>
				</div>
				
				<!-- Social Links -->
				<div class="flex gap-6 justify-center lg:justify-start">
					<a href="https://github.com/{contact.github}" 
					   class="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
					   aria-label="GitHub">
						<svg class="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
					</a>
					<a href="https://linkedin.com/in/{contact.linkedin}" 
					   class="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
					   aria-label="LinkedIn">
						<svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Latest Blog Posts Section -->
<section class="py-20 bg-white" id="blog">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16">
			<h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Latest Articles</h2>
			<p class="text-xl text-gray-600">thoughts, tutorials, and insights</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
			{#each data.posts as post}
				<article class="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-300">
					<a href="/blog/{post.slug}" class="block">
						<div class="h-48 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
							{#if post.meta.image}
								<img 
									src={post.meta.image} 
									alt={post.meta.title}
									class="absolute inset-0 w-full h-full object-cover"
								/>
							{/if}
							<div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
							<div class="absolute bottom-4 left-4 right-4">
								<span class="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-600 text-sm font-semibold rounded-full">
									{new Date(post.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
								</span>
							</div>
						</div>
						
						<div class="p-6">
							<h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors">
								{post.meta.title}
							</h3>
							<p class="text-gray-600 leading-relaxed mb-4">
								{post.meta.summary || 'Read more to discover...'}
							</p>
							<div class="flex items-center text-primary-500 font-semibold group-hover:gap-2 transition-all">
								Read article
								<svg class="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
								</svg>
							</div>
						</div>
					</a>
				</article>
			{/each}
		</div>

		<div class="text-center mt-12">
			<a href="/blog" class="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl">
				View All Articles →
			</a>
		</div>
	</div>
</section>