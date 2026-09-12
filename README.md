# 阿光的紫微斗數筆記

Hikaru no Ziwei Notes — 阿光（ひかる）的紫微斗數學習筆記。

- 網站：https://hikarunoziwei-notes.pages.dev
- 技術：[Astro](https://astro.build)（靜態輸出）＋ Cloudflare Pages（Git 連動自動部署）＋ Pages Functions + KV（瀏覽計數）

## 新增文章

在 `src/content/posts/` 新增一個 Markdown 檔，**檔名就是網址**：

```
src/content/posts/20260915-fourteen-stars.md  →  /20260915-fourteen-stars/
```

檔案開頭的 frontmatter：

```md
---
title: 文章標題
description: 一句話摘要（會顯示在首頁卡片）
pubDate: 2026-09-15
author: 阿光            # 可省略，預設「阿光」
image: /images/xxx.jpg  # 可省略；放在 public/images/ 底下
imageAlt: 圖片說明
imageCredit: 圖：阿光自繪   # 可省略；可含 HTML 連結
tags: [十四主星, 入門]
draft: false            # true 則不會發布
---

內文用 Markdown 寫……
```

存檔後 `git add`、`git commit`、`git push`，Cloudflare Pages 會自動重新建置並上線，首頁卡片會自動新增、依「最後更新」排序（最新在前）。

## 更新日期怎麼來的

每篇文章的「更新」日期在建置時自動取自該檔案最後一次 git commit 的時間，不需手動維護。若想手動指定，在 frontmatter 加 `updated: 2026-09-20` 即可。

## 本機開發

```bash
npm install
npm run dev        # http://localhost:4321（純靜態，沒有瀏覽計數）
npm run build
npm run preview    # 用 wrangler 模擬 Cloudflare Pages，含瀏覽計數 API
```

## 授權

- 首頁圖片 [A Mix of Colours and Wonder](https://commons.wikimedia.org/wiki/File:A_Mix_of_Colours_and_Wonder.jpg)，ESO/B. Tafreshi (twanight.org)，[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。
- 文章內容 © 阿光。
