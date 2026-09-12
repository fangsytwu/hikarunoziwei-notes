import { getCollection, type CollectionEntry } from 'astro:content';
import { resolveUpdated } from './dates';

export type Post = CollectionEntry<'posts'> & { updated: Date };

/** 所有已發布文章，依最後更新時間由新到舊排序。 */
export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection('posts', ({ data }) => !data.draft);
  const posts = entries.map((entry) => ({
    ...entry,
    updated: resolveUpdated({
      pubDate: entry.data.pubDate,
      updated: entry.data.updated,
      filePath: entry.filePath,
    }),
  }));
  return posts.sort((a, b) => b.updated.getTime() - a.updated.getTime());
}
