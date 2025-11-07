// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// 必要なら sitemap は後で戻せる
// import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arcanemi.com', // ← 仮のURLに変更
  integrations: [mdx()],
  // integrations: [mdx(), sitemap()],
  server: { host: true }
});
