import { createClient } from '@supabase/supabase-js';

// The Supabase URL and publishable (anon) key are safe to ship in client code:
// Row Level Security is what protects the data, not key secrecy. Env vars
// override the defaults so the values can be rotated without a code change.
const SUPABASE_URL =
    import.meta.env.VITE_SUPABASE_URL || 'https://ryghzbtuxvsadkuuqjek.supabase.co';
const SUPABASE_ANON_KEY =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    'sb_publishable_xzahJ8cl0zYLDnqwztEvUg_cwcGWVVg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
});

export const REVIEWS_TABLE = 'portfolio_reviews';
export const BLOG_TABLE = 'portfolio_blog_posts';
export const BLOG_IMAGES_BUCKET = 'blog-images';
export const ADMIN_EMAIL = 'agusgugliuzza@gmail.com';

// Dedicated, isolated auth account for the blog admin — separate from
// ADMIN_EMAIL (which is shared with other apps on this Supabase project)
// so a password change here can never affect those. The login form takes
// a plain username; this is the real address behind it.
export const BLOG_ADMIN_USERNAME = 'agugliuzza';
export const BLOG_ADMIN_EMAIL = 'agugliuzza@blog.cv-agugliuzza.internal';
