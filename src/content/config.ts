import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 感情💙SQL
const feelingsSQL = defineCollection({
  loader: glob({ base: './src/content/feelings-sql', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    episode: z.number(),                // 第◯話
    title: z.string(),                  // タイトル
    description: z.string().optional(), // 概要
    date: z.coerce.date(),              // 公開日
    ogImage: z.string().optional(),     // OGP画像など（任意）
  }),
});

// 感情💙Python
const feelingsPython = defineCollection({
  loader: glob({ base: './src/content/feelings-python', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    episode: z.number(),
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { feelingsSQL, feelingsPython };
