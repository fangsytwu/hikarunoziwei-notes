import { execSync } from 'node:child_process';

/**
 * 取得檔案在 git 裡的最後 commit 時間。
 * 若 repo 是 shallow clone（例如某些 CI 只抓最新一個 commit），
 * 每個檔案都會回傳同一個時間，這種情況視為不可信，回傳 null。
 */
let shallowChecked = false;
let isShallow = false;

function checkShallow(): boolean {
  if (shallowChecked) return isShallow;
  shallowChecked = true;
  try {
    isShallow = execSync('git rev-parse --is-shallow-repository', { encoding: 'utf8' }).trim() === 'true';
  } catch {
    isShallow = true;
  }
  return isShallow;
}

export function gitLastModified(filePath: string): Date | null {
  if (checkShallow()) return null;
  try {
    const out = execSync(`git log -1 --format=%cI -- "${filePath}"`, { encoding: 'utf8' }).trim();
    return out ? new Date(out) : null;
  } catch {
    return null;
  }
}

/** 最後更新時間：frontmatter 的 updated > git 最後 commit > 發布日期，並且不會早於發布日期。 */
export function resolveUpdated(opts: { pubDate: Date; updated?: Date; filePath?: string }): Date {
  const candidate = opts.updated ?? (opts.filePath ? gitLastModified(opts.filePath) : null) ?? opts.pubDate;
  return candidate < opts.pubDate ? opts.pubDate : candidate;
}

const fmt = new Intl.DateTimeFormat('zh-TW', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'Asia/Taipei',
});

export function formatDate(d: Date): string {
  // zh-TW 會輸出 2026/09/12，統一改成 2026-09-12
  return fmt.format(d).replace(/\//g, '-');
}
