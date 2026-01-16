import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import path from 'path';
import fs from 'fs';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import mdsvexConfig from './mdsvex.config.js';

// Blog-Posts einlesen
const blogPosts = fs.readdirSync('./src/posts')
  .filter(file => file.endsWith('.svx') || file.endsWith('.md'))
  .map(file => `/blog/${file.replace(/\.(svx|md)$/, '')}`);

const config = {
  extensions: ['.svelte', '.svx', '.md', ...mdsvexConfig.extensions],
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexConfig)
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    paths: {
      relative: false
    },
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