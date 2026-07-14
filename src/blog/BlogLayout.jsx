import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import '../portfolio/portfolio.css';
import './blog.css';

const COPY = {
    en: { back: 'Back to portfolio' },
    es: { back: 'Volver al portfolio' }
};

const BlogLayout = ({ lang, setLang, theme, toggleTheme, children }) => {
    const t = COPY[lang] || COPY.en;
    return (
        <div className="portfolio-mode">
            <nav className="blog-nav">
                <Link className="blog-nav-back" to="/">
                    <ArrowLeft size={14} /> {t.back}
                </Link>
                <div className="blog-nav-actions">
                    <button
                        className={`blog-nav-btn ${lang === 'en' ? 'active' : ''}`}
                        onClick={() => setLang('en')}
                    >
                        EN
                    </button>
                    <button
                        className={`blog-nav-btn ${lang === 'es' ? 'active' : ''}`}
                        onClick={() => setLang('es')}
                    >
                        ES
                    </button>
                    <button
                        className="blog-nav-btn"
                        onClick={toggleTheme}
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
                    </button>
                </div>
            </nav>
            {children}
        </div>
    );
};

export default BlogLayout;
