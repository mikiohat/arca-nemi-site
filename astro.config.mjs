// astro.config.mjs
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';

// 必要なら sitemap は後で戻せる
// import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arcanemi.com', // ← 仮のURLに変更
  integrations: [mdx()],
  // integrations: [mdx(), sitemap()],
  server: { host: true },

  vite: { 
      resolve: { 
          alias: { 
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@common': fileURLToPath(new URL('./src/components/common', import.meta.url)),
            '@playground': fileURLToPath(new URL('./src/components/playground', import.meta.url)),
            '@talk': fileURLToPath(new URL('./src/components/talk', import.meta.url)),
            '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),          
          },
      },
  },

});

