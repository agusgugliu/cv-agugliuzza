import React, { useEffect, useRef, useState } from 'react';
import { Pencil, Trash2, LogOut, Plus, X, Image as ImageIcon } from 'lucide-react';
import { supabase, BLOG_TABLE, BLOG_ADMIN_USERNAME, BLOG_ADMIN_EMAIL, BLOG_IMAGES_BUCKET } from '../lib/supabaseClient';

const slugify = (s) =>
    s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm = () => ({
    id: null,
    title: '',
    slug: '',
    excerpt: '',
    tags: '',
    lang: 'en',
    source: 'personal',
    linkedin_url: '',
    published_at: today(),
    published: true,
    content: '',
    slugTouched: false
});

const AdminBlog = () => {
    const [session, setSession] = useState(undefined); // undefined = checking
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authMsg, setAuthMsg] = useState('');
    const [busy, setBusy] = useState(false);

    const [posts, setPosts] = useState([]);
    const [form, setForm] = useState(null); // null = list view, object = editor open
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const contentRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => setSession(data.session || null));
        const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s || null));
        return () => sub.subscription.unsubscribe();
    }, []);

    const load = async () => {
        const { data, error: err } = await supabase
            .from(BLOG_TABLE)
            .select('*')
            .order('published_at', { ascending: false, nullsFirst: false })
            .order('created_at', { ascending: false });
        if (!err) setPosts(data || []);
    };

    useEffect(() => {
        if (session) load();
    }, [session]);

    const signIn = async (e) => {
        e.preventDefault();
        setBusy(true);
        setAuthMsg('');
        if (username.trim() !== BLOG_ADMIN_USERNAME) {
            setBusy(false);
            setAuthMsg('Invalid username or password.');
            return;
        }
        const { error: err } = await supabase.auth.signInWithPassword({
            email: BLOG_ADMIN_EMAIL,
            password
        });
        setBusy(false);
        if (err) setAuthMsg('Invalid username or password.');
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    const openNew = () => {
        setError('');
        setForm(emptyForm());
    };

    const openEdit = (post) => {
        setError('');
        setForm({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || '',
            tags: (post.tags || []).join(', '),
            lang: post.lang || 'en',
            source: post.source === 'dispatch' ? 'dispatch' : 'personal',
            linkedin_url: post.linkedin_url || '',
            published_at: post.published_at || today(),
            published: post.published,
            content: post.content,
            slugTouched: true
        });
    };

    const closeForm = () => {
        setForm(null);
        setError('');
    };

    const onTitleChange = (title) => {
        setForm((f) => ({
            ...f,
            title,
            slug: f.slugTouched ? f.slug : slugify(title)
        }));
    };

    const save = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
            setError('Title, slug, and content are required.');
            return;
        }
        setSaving(true);
        setError('');
        const payload = {
            title: form.title.trim(),
            slug: slugify(form.slug),
            excerpt: form.excerpt.trim(),
            tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
            lang: form.lang,
            source: form.source,
            linkedin_url: form.linkedin_url.trim() || null,
            published_at: form.published_at || null,
            published: form.published,
            content: form.content
        };
        const query = form.id
            ? supabase.from(BLOG_TABLE).update(payload).eq('id', form.id)
            : supabase.from(BLOG_TABLE).insert(payload);
        const { error: err } = await query;
        setSaving(false);
        if (err) {
            setError(err.message);
            return;
        }
        await load();
        closeForm();
    };

    const insertAtCursor = (text) => {
        const el = contentRef.current;
        if (!el) {
            setForm((f) => ({ ...f, content: `${f.content}\n${text}\n` }));
            return;
        }
        const start = el.selectionStart ?? el.value.length;
        const end = el.selectionEnd ?? el.value.length;
        setForm((f) => ({
            ...f,
            content: `${f.content.slice(0, start)}${text}${f.content.slice(end)}`
        }));
        requestAnimationFrame(() => {
            el.focus();
            const pos = start + text.length;
            el.setSelectionRange(pos, pos);
        });
    };

    const uploadImage = async (file) => {
        if (!file) return;
        setUploading(true);
        setError('');
        const ext = file.name.split('.').pop().toLowerCase();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: uploadErr } = await supabase.storage
            .from(BLOG_IMAGES_BUCKET)
            .upload(path, file, { contentType: file.type });
        setUploading(false);
        if (uploadErr) {
            setError(uploadErr.message);
            return;
        }
        const { data } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(path);
        const alt = file.name.replace(/\.[^.]+$/, '');
        insertAtCursor(`![${alt}](${data.publicUrl})`);
    };

    const onImagePicked = (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        uploadImage(file);
    };

    const remove = async (post) => {
        if (!window.confirm(`Delete "${post.title}"? This can't be undone.`)) return;
        const { error: err } = await supabase.from(BLOG_TABLE).delete().eq('id', post.id);
        if (err) {
            window.alert(err.message);
            return;
        }
        load();
    };

    if (session === undefined) {
        return <div className="pm-admin-wrap"><p>Loading…</p></div>;
    }

    if (!session) {
        return (
            <div className="pm-admin-wrap">
                <div className="pm-admin-card">
                    <h1>Blog admin</h1>
                    <form onSubmit={signIn} className="pm-rev-form">
                        <label>
                            <span>Username</span>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </label>
                        <label>
                            <span>Password</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </label>
                        <button className="pm-nav-cta" type="submit" disabled={busy}>
                            {busy ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>
                    {authMsg && <p className="pm-rev-sub">{authMsg}</p>}
                </div>
            </div>
        );
    }

    if (form) {
        return (
            <div className="pm-admin-wrap">
                <header className="pm-admin-head">
                    <h1>{form.id ? 'Edit post' : 'New post'}</h1>
                    <button className="pm-admin-link" onClick={closeForm}><X size={14} /> Cancel</button>
                </header>

                <form onSubmit={save} className="pm-rev-form">
                    <label>
                        <span>Title</span>
                        <input value={form.title} onChange={(e) => onTitleChange(e.target.value)} required />
                    </label>
                    <label>
                        <span>Slug</span>
                        <input
                            value={form.slug}
                            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value, slugTouched: true }))}
                            required
                        />
                    </label>
                    <label>
                        <span>Excerpt</span>
                        <input value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
                    </label>
                    <div className="pm-rev-row">
                        <label>
                            <span>Tags (comma-separated)</span>
                            <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} />
                        </label>
                        <label>
                            <span>Language</span>
                            <select value={form.lang} onChange={(e) => setForm((f) => ({ ...f, lang: e.target.value }))}>
                                <option value="en">EN</option>
                                <option value="es">ES</option>
                            </select>
                        </label>
                    </div>
                    <label>
                        <span>Source</span>
                        <select value={form.source} onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}>
                            <option value="personal">Personal note</option>
                            <option value="dispatch">Dispatch</option>
                        </select>
                    </label>
                    <div className="pm-rev-row">
                        <label>
                            <span>Published date</span>
                            <input
                                type="date"
                                value={form.published_at || ''}
                                onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))}
                            />
                        </label>
                        <label>
                            <span>LinkedIn URL (optional)</span>
                            <input value={form.linkedin_url} onChange={(e) => setForm((f) => ({ ...f, linkedin_url: e.target.value }))} />
                        </label>
                    </div>
                    <label className="pm-rev-rating-field">
                        <span>Published (uncheck to keep as draft)</span>
                        <input
                            type="checkbox"
                            checked={form.published}
                            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                        />
                    </label>
                    <label>
                        <div className="pm-admin-head" style={{ margin: 0 }}>
                            <span>Content (markdown)</span>
                            <button
                                type="button"
                                className="pm-admin-link"
                                disabled={uploading}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImageIcon size={14} /> {uploading ? 'Uploading…' : 'Insert image'}
                            </button>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                            onChange={onImagePicked}
                            style={{ display: 'none' }}
                        />
                        <textarea
                            ref={contentRef}
                            rows={18}
                            value={form.content}
                            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                            required
                        />
                    </label>

                    {error && <p className="pm-rev-error">{error}</p>}

                    <button className="pm-nav-cta pm-rev-submit" type="submit" disabled={saving}>
                        {saving ? 'Saving…' : 'Save post'}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="pm-admin-wrap">
            <header className="pm-admin-head">
                <h1>Blog admin</h1>
                <button className="pm-admin-link" onClick={signOut}><LogOut size={14} /> Sign out</button>
            </header>

            <button className="pm-nav-cta" onClick={openNew} style={{ marginBottom: 24 }}>
                <Plus size={14} /> New post
            </button>

            {posts.length === 0 ? (
                <p className="pm-reviews-empty">No posts yet.</p>
            ) : (
                <div className="pm-admin-list">
                    {posts.map((p) => (
                        <div key={p.id} className="pm-admin-item">
                            <div className="pm-admin-item-top">
                                <span className="pm-admin-date">
                                    {p.published_at || 'no date'} · {p.source === 'dispatch' ? 'dispatch' : 'personal'} {!p.published && '· draft'}
                                </span>
                            </div>
                            <strong>{p.title}</strong>
                            <div className="pm-admin-email">/blog/{p.slug}</div>
                            <div className="pm-admin-actions">
                                <button className="pm-admin-btn" onClick={() => openEdit(p)}>
                                    <Pencil size={14} /> Edit
                                </button>
                                <button className="pm-admin-btn reject" onClick={() => remove(p)}>
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminBlog;
