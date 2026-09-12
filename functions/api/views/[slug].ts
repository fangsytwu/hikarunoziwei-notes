import { json, readCount, SLUG_RE, type Env } from './_shared';

// GET  /api/views/:slug  → { slug, count }
// POST /api/views/:slug  → 計數 +1，回傳 { slug, count }
export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const slug = String(params.slug ?? '');
  if (!SLUG_RE.test(slug)) return json({ error: 'bad slug' }, 400);
  return json({ slug, count: await readCount(env.VIEWS, slug) });
};

export const onRequestPost: PagesFunction<Env> = async ({ params, env }) => {
  const slug = String(params.slug ?? '');
  if (!SLUG_RE.test(slug)) return json({ error: 'bad slug' }, 400);
  const count = (await readCount(env.VIEWS, slug)) + 1;
  await env.VIEWS.put(slug, String(count));
  return json({ slug, count });
};
