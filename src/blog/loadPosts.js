// Loads every markdown file in ./posts/*.md at build time and parses
// its frontmatter. No backend, no CMS — write a .md file, ship it.

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

const parseFrontmatter = (raw) => {
    const match = raw.match(FRONTMATTER_RE);
    if (!match) return { data: {}, content: raw };
    const [, fm, content] = match;
    const data = {};
    fm.split('\n').forEach((line) => {
        const idx = line.indexOf(':');
        if (idx === -1) return;
        const key = line.slice(0, idx).trim();
        let value = line.slice(idx + 1).trim();
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value
                .slice(1, -1)
                .split(',')
                .map((s) => s.trim().replace(/^["']|["']$/g, ''))
                .filter(Boolean);
        } else {
            value = value.replace(/^["']|["']$/g, '');
        }
        data[key] = value;
    });
    return { data, content: content.trim() };
};

const modules = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' });

export const posts = Object.entries(modules)
    .map(([path, raw]) => {
        const slug = path.split('/').pop().replace(/\.md$/, '');
        const { data, content } = parseFrontmatter(raw);
        return {
            slug,
            content,
            title: data.title || slug,
            date: data.date || '',
            excerpt: data.excerpt || '',
            tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
            linkedin: data.linkedin || null,
            lang: data.lang || 'en'
        };
    })
    .filter((p) => p.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug);
