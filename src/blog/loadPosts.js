// Posts live in Supabase (table BLOG_TABLE), edited from the hidden
// admin page at /admin/blog. No CMS, no static markdown files at build
// time — just a fetch at runtime.

import { supabase, BLOG_TABLE } from '../lib/supabaseClient';

// No dedicated cover-image field: reuse the first inline image the author
// dropped into the markdown body (via the admin's "Insert image" button).
const firstImage = (content) => {
    const match = /!\[[^\]]*\]\(([^)\s]+)\)/.exec(content || '');
    return match ? match[1] : null;
};

const mapRow = (row) => ({
    id: row.id,
    slug: row.slug,
    content: row.content,
    title: row.title,
    date: row.published_at || '',
    excerpt: row.excerpt || '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    lang: row.lang || 'en',
    linkedin: row.linkedin_url || null,
    thumbnail: firstImage(row.content)
});

export const fetchPosts = async () => {
    const { data, error } = await supabase
        .from(BLOG_TABLE)
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });
    if (error) {
        console.error('Failed to load posts', error);
        return [];
    }
    return (data || []).map(mapRow);
};

export const fetchLatestPosts = async (limit = 3) => {
    const { data, error } = await supabase
        .from(BLOG_TABLE)
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(limit);
    if (error) {
        console.error('Failed to load latest posts', error);
        return [];
    }
    return (data || []).map(mapRow);
};

export const fetchPostBySlug = async (slug) => {
    const { data, error } = await supabase
        .from(BLOG_TABLE)
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
    if (error || !data) return null;
    return mapRow(data);
};
