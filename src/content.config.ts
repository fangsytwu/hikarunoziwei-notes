import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 每篇文章是 src/content/posts/ 底下的一個 .md 檔。
// 檔名就是網址：20260912-introduction.md → /20260912-introduction/
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(), // 可手動指定；未指定時自動取 git 最後修改時間
    author: z.string().default('阿光'),
    image: z.string().optional(), // 放在 public/ 底下的路徑，例如 /images/xxx.jpg
    imageAlt: z.string().optional(),
    imageCredit: z.string().optional(), // 圖片出處（HTML 允許）
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
