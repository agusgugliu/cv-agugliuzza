import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchLatestPosts } from '../blog/loadPosts';

const COPY = {
    en: {
        eyebrow: 'Notes',
        heading: 'Latest from the blog',
        cta: 'See all posts',
        empty: 'Nothing here yet. First post coming soon.'
    },
    es: {
        eyebrow: 'Notas',
        heading: 'Últimas entradas del blog',
        cta: 'Ver todos los posts',
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

const LatestPosts = ({ lang }) => {
    const t = COPY[lang] || COPY.en;
    const [posts, setPosts] = useState(null); // null = loading

    useEffect(() => {
        let alive = true;
        fetchLatestPosts(3).then((data) => {
            if (alive) setPosts(data);
        });
        return () => {
            alive = false;
        };
    }, []);

    if (posts !== null && posts.length === 0) return null;

    return (
        <section className="pm-section pm-posts" id="notes">
            <div className="pm-eyebrow">{t.eyebrow}</div>
            <div className="pm-posts-head">
                <h2>{t.heading}</h2>
                <Link className="pm-mode-pill" to="/blog">
                    {t.cta} &rarr;
                </Link>
            </div>

            {posts === null ? null : (
                <div className="pm-posts-grid">
                    {posts.map((post) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.45 }}
                        >
                            <Link className="pm-post" to={`/blog/${post.slug}`}>
                                {post.thumbnail && (
                                    <div className="pm-post-thumb">
                                        <img src={post.thumbnail} alt="" loading="lazy" />
                                    </div>
                                )}
                                <div className="pm-post-body">
                                    <span className="pm-post-date">{formatDate(post.date, lang)}</span>
                                    <h3 className="pm-post-title">{post.title}</h3>
                                    {post.excerpt && <p className="pm-post-excerpt">{post.excerpt}</p>}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default LatestPosts;
