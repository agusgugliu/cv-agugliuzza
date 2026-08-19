import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogLayout from './BlogLayout';
import { fetchPosts } from './loadPosts';

const COPY = {
    en: {
        title: 'Notes',
        subtitle: "Things I'm thinking about — AI, the MBA, whatever ends up on LinkedIn.",
        filterLabel: 'Show',
        personal: 'Personal notes',
        dispatch: 'Dispatch',
        empty: 'Nothing here yet. First post coming soon.',
        emptyFiltered: 'No notes match these filters.'
    },
    es: {
        title: 'Notas',
        subtitle: 'Cosas en las que estoy pensando — IA, el MBA, lo que termina en LinkedIn.',
        filterLabel: 'Mostrar',
        personal: 'Notas personales',
        dispatch: 'Dispatch',
        empty: 'Todavía no hay nada. Primer post pronto.',
        emptyFiltered: 'No hay notas que coincidan con estos filtros.'
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
    const [posts, setPosts] = useState(null);
    const [sources, setSources] = useState({ personal: true, dispatch: false });

    useEffect(() => {
        fetchPosts().then(setPosts);
    }, []);

    const toggleSource = (source) => {
        setSources((current) => {
            const next = { ...current, [source]: !current[source] };
            return next.personal || next.dispatch ? next : current;
        });
    };

    const visiblePosts = posts?.filter((post) => sources[post.source]);

    return (
        <BlogLayout lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
            <div className="blog-shell">
                <header className="blog-header">
                    <h1 className="blog-title">{t.title}</h1>
                    <p className="blog-subtitle">{t.subtitle}</p>
                    <div className="blog-source-filter" role="group" aria-label={t.filterLabel}>
                        <span className="blog-source-filter-label">{t.filterLabel}</span>
                        <button
                            type="button"
                            className="blog-source-filter-btn"
                            aria-pressed={sources.personal}
                            onClick={() => toggleSource('personal')}
                        >
                            <span className="blog-source-dot personal" aria-hidden="true" />
                            {t.personal}
                        </button>
                        <button
                            type="button"
                            className="blog-source-filter-btn"
                            aria-pressed={sources.dispatch}
                            onClick={() => toggleSource('dispatch')}
                        >
                            <span className="blog-source-dot dispatch" aria-hidden="true" />
                            {t.dispatch}
                        </button>
                    </div>
                </header>

                {!posts ? null : posts.length === 0 ? (
                    <p className="blog-empty">{t.empty}</p>
                ) : visiblePosts.length === 0 ? (
                    <p className="blog-empty">{t.emptyFiltered}</p>
                ) : (
                    <div className="blog-list">
                        {visiblePosts.map((post) => (
                            <Link className="blog-list-item" key={post.slug} to={`/blog/${post.slug}`}>
                                {post.thumbnail && (
                                    <div className="blog-list-thumb">
                                        <img src={post.thumbnail} alt="" loading="lazy" />
                                    </div>
                                )}
                                <div className="blog-list-body">
                                    <div className="blog-list-meta">
                                        <span>{formatDate(post.date, lang)}</span>
                                        {post.tags.map((tag) => (
                                            <span className="blog-tag" key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                    <h2 className="blog-list-title">{post.title}</h2>
                                    {post.excerpt && <p className="blog-list-excerpt">{post.excerpt}</p>}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </BlogLayout>
    );
};

export default BlogList;
