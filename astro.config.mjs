import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Update this once the domain is live — used for canonical URLs and the
// hand-written sitemap endpoint at src/pages/sitemap.xml.ts.
export default defineConfig({
  site: 'https://retromakers.com',
  integrations: [mdx()],
});
