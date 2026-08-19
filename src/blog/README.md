# Writing a post

Posts live in Supabase (table `portfolio_blog_posts`), not as files in this
repo. Add, edit, or delete them from the hidden admin page:

```
/admin/blog
```

Sign in with a one-time email code (OTP) sent to the admin address. Nobody
else can authenticate — Supabase RLS only lets that one email read drafts or
write anything; everyone else only ever sees rows with `published = true`.

Fields:

- **Title** — required.
- **Slug** — the URL segment, e.g. `hello-world` → `/blog/hello-world`. Auto-filled from the title, editable.
- **Excerpt** — one or two sentences shown in the blog list.
- **Tags** — comma-separated, shown as chips.
- **Language** — `en` or `es`. Purely informational (no per-post translation).
- **Source** — `Personal note` or `Dispatch`. The public Notes page shows personal notes by default; readers can toggle either source.
- **LinkedIn URL** — optional. If a post started life as a LinkedIn post, paste
  the URL and the post page links back to it ("Also on LinkedIn").
- **Published date** — controls sort order in the list (newest first).
- **Published** — unpublished posts stay as drafts, visible only in the admin page.
- **Content** — standard markdown (headings, **bold**, links, lists, code blocks, images).

No build step, no redeploy needed — publishing a post is immediate.
