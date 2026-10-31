import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import mdsvexConfig from './mdsvex.config.js';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			extensions: ['.svelte', ...(mdsvexConfig.extensions ?? [])],
			preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
			alias: { '#lib': 'src/lib' },
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				strict: true
			}),
			prerender: {
				// Post pages are listed by `entries()` in src/routes/blog/[slug]/+page.server.ts
				entries: ['*', '/sitemap.xml'],
				handleMissingId: 'warn'
			}
		})
	]
});
