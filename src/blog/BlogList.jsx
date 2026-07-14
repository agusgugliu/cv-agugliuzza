import React from 'react';
import { Link } from 'react-router-dom';
import BlogLayout from './BlogLayout';
import { posts } from './loadPosts';

const COPY = {
    en: {
        title: 'Notes',
        subtitle: "Things I'm thinking about — AI, the MBA, whatever ends up on LinkedIn.",
        empty: 'Nothing here yet. First post coming soon.'
    },
    es: {
        title: 'Notas',
        subtitle: 'Cosas en las que estoy pensando — IA, el MBA, lo que termina en LinkedIn.',
        empty: 'Todavía no hay nada. Primer post pronto.'
    }
};

const formatDate = (date, lang) => {
    if (!date) return '';
    return new Date(`${date}T00:00:00`).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const BlogList = ({ lang, setLang, theme, toggleTheme }) => {
    const t = COPY[lang] || COPY.en;
    return (
        <BlogLayout lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
            <div className="blog-shell">
                <header className="blog-header">
                    <h1 className="blog-title">{t.title}</h1>
                    <p className="blog-subtitle">{t.subtitle}</p>
                </header>

                {posts.length === 0 ? (
                    <p className="blog-empty">{t.empty}</p>
                ) : (
                    <div className="blog-list">
                        {posts.map((post) => (
                            <Link className="blog-list-item" key={post.slug} to={`/blog/${post.slug}`}>
                                <div className="blog-list-meta">
                                    <span>{formatDate(post.date, lang)}</span>
                                    {post.tags.map((tag) => (
                                        <span className="blog-tag" key={tag}>{tag}</span>
                                    ))}
                                </div>
                                <h2 className="blog-list-title">{post.title}</h2>
                                {post.excerpt && <p className="blog-list-excerpt">{post.excerpt}</p>}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </BlogLayout>
    );
};

export default BlogList;
