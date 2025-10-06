// mdsvex.config.js
import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import rehypeSlug from 'rehype-slug';

const config = defineConfig({
  extensions: ['.svx', '.md'],
  
  smartypants: {
    dashes: 'oldschool'
  },

  // This is what adds the IDs to your headings!
  rehypePlugins: [
    rehypeSlug
  ]
});

export default config;