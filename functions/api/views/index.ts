import { json, readCount, SLUG_RE, type Env } from './_shared';

// GET /api/views?slugs=a,b,c → { a: 12, b: 3, c: 0 }
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const raw = new URL(request.url).searchParams.get('slugs') ?? '';
  const slugs = raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => SLUG_RE.test(s))
    .slice(0, 200);
  const entries = await Promise.all(slugs.map(async (s) => [s, await readCount(env.VIEWS, s)] as const));
  return json(Object.fromEntries(entries));
};
