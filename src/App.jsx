import React, { useState, useEffect } from 'react';
import Portfolio from './portfolio/Portfolio';
import CVMode from './modes/CVMode';

const getInitialState = () => {
    if (typeof window === 'undefined') return { mode: 'portfolio', lang: 'en' };
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');
    const urlLang = params.get('lang');
    const storedMode = localStorage.getItem('ag.mode');
    const storedLang = localStorage.getItem('ag.lang');
    const browserLang = (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
    return {
        mode: urlMode === 'cv' || urlMode === 'portfolio' ? urlMode : (storedMode || 'portfolio'),
        lang: urlLang === 'es' || urlLang === 'en' ? urlLang : (storedLang || browserLang)
    };
};

const App = () => {
    const initial = getInitialState();
    const [mode, setMode] = useState(initial.mode);
    const [lang, setLang] = useState(initial.lang);

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
            onSwitchToCV={() => {
                setMode('cv');
                window.scrollTo({ top: 0 });
            }}
        />
    );
};

export default App;
