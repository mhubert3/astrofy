import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://mhubert3.github.io/',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap(), tailwind()],
  image: {
    service: passthroughImageService(),
  }
});