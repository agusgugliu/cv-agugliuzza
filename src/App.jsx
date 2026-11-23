import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Portfolio from './portfolio/Portfolio';
import CVMode from './modes/CVMode';
import { applyDocumentHead, setThemeColor, SITE } from './lib/documentHead';

const BlogList = lazy(() => import('./blog/BlogList'));
const BlogPost = lazy(() => import('./blog/BlogPost'));
const AdminBlog = lazy(() => import('./portfolio/AdminBlog'));

const RouteFallback = () => (
    <div role="status" aria-label="Loading" style={{ minHeight: '100vh', background: '#F4F5F7' }} />
);

const getInitialState = () => {
    if (typeof window === 'undefined') return { mode: 'portfolio', lang: 'en', theme: 'light' };
    const params = new URLSearchParams(window.location.search);
    const pathIsEs = window.location.pathname === '/es' || window.location.pathname.startsWith('/es/');
    const urlMode = params.get('mode');
    const urlLang = params.get('lang');
    const storedMode = localStorage.getItem('ag.mode');
    const storedLang = localStorage.getItem('ag.lang');
    const storedTheme = localStorage.getItem('ag.theme');
    const browserLang = (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  return {
        mode: urlMode === 'cv' || urlMode === 'portfolio' ? urlMode : (storedMode || 'portfolio'),
        lang: pathIsEs || urlLang === 'es' ? 'es' : urlLang === 'en' ? 'en' : (storedLang || browserLang),
        theme: storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    };
};

const HOME_DESC = {
    en: 'Project and strategy leadership for companies turning operations into outcomes. Digital transformation, AI ops and data, across LATAM and Europe.',
    es: 'Liderazgo de proyectos y estrategia para empresas que convierten operaciones en resultados. Transformación digital, AI ops y datos, en LATAM y Europa.'
};

const hreflangsForHome = () => [
    { hreflang: 'en', href: `${SITE}/` },
    { hreflang: 'es', href: `${SITE}/es` },
    { hreflang: 'x-default', href: `${SITE}/` }
];

const hreflangsForBlog = () => [
    { hreflang: 'en', href: `${SITE}/blog` },
    { hreflang: 'es', href: `${SITE}/es/blog` },
    { hreflang: 'x-default', href: `${SITE}/blog` }
];

const App = () => {
    const initial = getInitialState();
    const location = useLocation();
    const [mode, setMode] = useState(initial.mode);
    const [lang, setLang] = useState(initial.lang);
    const [theme, setTheme] = useState(initial.theme);

    useEffect(() => {
        const path = location.pathname;
        if (/^\/blog\/.+/.test(path)) return;
        const name = 'Agustín Gugliuzza';
        if (path === '/blog' || path === '/blog/') {
            const title = lang === 'es' ? `Notas · ${name}` : `Notes · ${name}`;
            const desc = lang === 'es'
                ? "Cosas en las que estoy pensando — IA, el MBA, lo que termina en LinkedIn."
                : "Things I'm thinking about — AI, the MBA, whatever ends up on LinkedIn.";
            applyDocumentHead({
                title,
                description: desc,
                canonical: `${SITE}/blog`,
                locale: lang === 'es' ? 'es_ES' : 'en_US',
                hreflangs: hreflangsForBlog()
            });
            return;
        }
        if (path.startsWith('/admin')) {
            document.title = `Blog admin · ${name}`;
            return;
        }
        if (mode === 'cv') {
            document.title = `CV · ${name}`;
            return;
        }
        const title = lang === 'es'
            ? `${name} · PM, Estrategia y AI Ops · Buenos Aires`
            : `${name} · PM, Strategy & AI Ops · Buenos Aires`;
        const canonical = lang === 'es' ? `${SITE}/es` : `${SITE}/`;
        applyDocumentHead({
            title,
            description: HOME_DESC[lang] || HOME_DESC.en,
            canonical,
            locale: lang === 'es' ? 'es_ES' : 'en_US',
            hreflangs: hreflangsForHome()
        });
    }, [location.pathname, lang, mode]);

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
        setThemeColor(theme);
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
        <Suspense fallback={<RouteFallback />}>
            <Routes>
                <Route path="/blog" element={<BlogList {...blogProps} />} />
                <Route path="/blog/:slug" element={<BlogPost {...blogProps} />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/es/*" element={<Home />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Suspense>
    );
};

export default App;