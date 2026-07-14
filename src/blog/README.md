# Writing a post

Drop a new `.md` file in this folder. The filename (minus `.md`) becomes the
URL slug, e.g. `hello-world.md` → `/blog/hello-world`.

Start every file with frontmatter, then write normal markdown below it:

```md
---
title: Post title
date: 2026-07-14
excerpt: One or two sentences shown in the blog list.
tags: [ai, career]
lang: en
linkedin: https://www.linkedin.com/posts/agustin-gugliuzza_...
---

Body goes here. Standard markdown — headings, **bold**, links, lists, code
blocks, all supported.
```

- `date` (required) — posts without a `date` are skipped from the list.
- `tags` — optional, shown as chips.
- `lang` — `en` or `es`, defaults to `en`. Purely informational (no per-post
  translation), just lets you tag what language a post is in.
- `linkedin` — optional. If a post started life as a LinkedIn post, paste
  the URL here and the post page links back to it ("Also on LinkedIn").

No build step beyond the normal `npm run dev` / `npm run build` — new files
are picked up automatically via `import.meta.glob`.
