import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfolio from './portfolio/Portfolio';
import CVMode from './modes/CVMode';
import BlogList from './blog/BlogList';
import BlogPost from './blog/BlogPost';
import AdminBlog from './portfolio/AdminBlog';

const getInitialState = () => {
    if (typeof window === 'undefined') return { mode: 'portfolio', lang: 'en', theme: 'light' };
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');
    const urlLang = params.get('lang');
    const storedMode = localStorage.getItem('ag.mode');
    const storedLang = localStorage.getItem('ag.lang');
    const storedTheme = localStorage.getItem('ag.theme');
    const browserLang = (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return {
        mode: urlMode === 'cv' || urlMode === 'portfolio' ? urlMode : (storedMode || 'portfolio'),
        lang: urlLang === 'es' || urlLang === 'en' ? urlLang : (storedLang || browserLang),
        theme: storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : (prefersDark ? 'dark' : 'light')
    };
};

const App = () => {
    const initial = getInitialState();
    const [mode, setMode] = useState(initial.mode);
    const [lang, setLang] = useState(initial.lang);
    const [theme, setTheme] = useState(initial.theme);

    useEffect(() => {
        localStorage.setItem('ag.mode', mode);
        const url = new URL(window.location.href);
        url.searchParams.set('mode', mode);
        window.history.replaceState({}, '', url);
    }, [mode]);

    useEffect(() => {
        localStorage.setItem('ag.lang', lang);
        document.documentElement.lang = lang;
    }, [lang]);

    useEffect(() => {
        localStorage.setItem('ag.theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    const Home = () => {
        if (mode === 'cv') {
            return (
                <CVMode
                    lang={lang}
                    setLang={setLang}
                    onSwitchToPortfolio={() => {
                        setMode('portfolio');
                        window.scrollTo({ top: 0 });
                    }}
                />
            );
        }

        return (
            <Portfolio
                lang={lang}
                setLang={setLang}
                theme={theme}
                toggleTheme={toggleTheme}
                onSwitchToCV={() => {
                    setMode('cv');
                    window.scrollTo({ top: 0 });
                }}
            />
        );
    };

    const blogProps = { lang, setLang, theme, toggleTheme };

    return (
        <Routes>
            <Route path="/blog" element={<BlogList {...blogProps} />} />
            <Route path="/blog/:slug" element={<BlogPost {...blogProps} />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
};

export default App;
