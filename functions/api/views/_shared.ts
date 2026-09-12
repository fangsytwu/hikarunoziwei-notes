export interface Env {
  VIEWS: KVNamespace;
}

// slug 只允許網址安全字元，避免 KV key 被塞奇怪內容
export const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,120}$/i;

export const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

export async function readCount(kv: KVNamespace, slug: string): Promise<number> {
  const v = await kv.get(slug);
  const n = v ? Number.parseInt(v, 10) : 0;
  return Number.isFinite(n) ? n : 0;
}
