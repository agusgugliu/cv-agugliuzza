// Posts live in Supabase (table BLOG_TABLE), edited from the hidden
// admin page at /admin/blog. No CMS, no static markdown files at build
// time — just a fetch at runtime.

import { supabase, BLOG_TABLE } from '../lib/supabaseClient';

const mapRow = (row) => ({
    id: row.id,
    slug: row.slug,
    content: row.content,
    title: row.title,
    date: row.published_at || '',
    excerpt: row.excerpt || '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    lang: row.lang || 'en',
    linkedin: row.linkedin_url || null
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
