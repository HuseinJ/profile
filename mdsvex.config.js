// mdsvex.config.js
import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
// v2 matches the remark-parse 8 that mdsvex uses; newer versions need remark 13+
import remarkFootnotes from 'remark-footnotes';

const config = defineConfig({
  extensions: ['.svx', '.md'],
  
  smartypants: {
    dashes: 'oldschool'
  },

  // Renders [^1] references and their [^1]: definitions
  remarkPlugins: [
    remarkFootnotes
  ],

  // This is what adds the IDs to your headings!
  rehypePlugins: [
    rehypeSlug
  ]
});

export default config;