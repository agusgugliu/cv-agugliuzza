import React, { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { marked } from 'marked';
import { Linkedin } from 'lucide-react';
import BlogLayout from './BlogLayout';
import { getPostBySlug } from './loadPosts';

const COPY = {
    en: { back: '← All notes', linkedin: 'Also on LinkedIn' },
    es: { back: '← Todas las notas', linkedin: 'También en LinkedIn' }
};

const formatDate = (date, lang) => {
    if (!date) return '';
    return new Date(`${date}T00:00:00`).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const BlogPost = ({ lang, setLang, theme, toggleTheme }) => {
    const { slug } = useParams();
    const post = getPostBySlug(slug);
    const html = useMemo(() => (post ? marked.parse(post.content) : ''), [post]);
    const t = COPY[lang] || COPY.en;

    useEffect(() => {
        if (post) document.title = `${post.title} — Agustín Gugliuzza`;
    }, [post]);

    if (!post) return <Navigate to="/blog" replace />;

    return (
        <BlogLayout lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
            <div className="blog-shell">
                <article>
                    <div className="blog-post-meta">
                        <span>{formatDate(post.date, lang)}</span>
                        {post.tags.map((tag) => (
                            <span className="blog-tag" key={tag}>{tag}</span>
                        ))}
                    </div>
                    <h1 className="blog-post-title">{post.title}</h1>
                    <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: html }} />
                </article>

                <div className="blog-post-footer">
                    <Link className="blog-back-link" to="/blog">{t.back}</Link>
                    {post.linkedin && (
                        <a className="blog-linkedin-link" href={post.linkedin} target="_blank" rel="noreferrer">
                            <Linkedin size={14} /> {t.linkedin}
                        </a>
                    )}
                </div>
            </div>
        </BlogLayout>
    );
};

export default BlogPost;
