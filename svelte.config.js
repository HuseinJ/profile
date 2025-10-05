import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import path from 'path';
import fs from 'fs';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Blog-Posts einlesen
const blogPosts = fs.readdirSync('./src/routes/blog/posts')
  .filter(file => file.endsWith('.svx') || file.endsWith('.md'))
  .map(file => `/blog/${file.replace(/\.(svx|md)$/, '')}`);

const config = {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx', '.md'],
    })
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    prerender: {
      entries: [
        '/',
        '/blog',
        '/sitemap.xml',
        ...blogPosts
      ],
      handleMissingId: 'warn'
    }
  }
};

export default config;