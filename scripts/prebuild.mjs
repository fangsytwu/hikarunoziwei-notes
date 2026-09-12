// 建置前：Cloudflare Pages 的 CI 只抓最新一個 commit（shallow clone），
// 這樣就查不到每篇文章各自的最後修改時間。這裡嘗試把完整 git 歷史抓回來。
// 失敗也不影響建置，只是「更新」日期會退回用發布日期。
import { execSync } from 'node:child_process';

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 120_000 }).trim();
}

try {
  if (sh('git rev-parse --is-shallow-repository') === 'true') {
    console.log('[prebuild] shallow clone 偵測到，抓取完整 git 歷史…');
    sh('git fetch --unshallow --quiet');
    console.log('[prebuild] 完成，commit 數：' + sh('git rev-list --count HEAD'));
  } else {
    console.log('[prebuild] git 歷史完整，略過。');
  }
} catch (e) {
  console.warn('[prebuild] 無法取得完整 git 歷史，更新日期將退回發布日期：' + (e?.message ?? e).split('\n')[0]);
}
