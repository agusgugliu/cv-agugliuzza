import React, { useEffect, useState } from 'react';

export const FOLD_CUE_KEY = 'ag.foldCue';
export const FOLD_CUE_EVENT = 'pm-fold-cue';

const COPY = {
    en: { more: "There's more." },
    es: { more: 'Hay m\u00e1s.' }
};

/* First collapsed cards a visitor meets get a small ink figure.
   The rest get a paper dog-ear — same lesson, less noise. */
const FIGURE = {
    projects: 'peek',
    ai: 'dossier',
    skills: 'reader',
    ideas: 'peek'
};

const listeners = new Set();
let cueActive = false;
let cueShown = false;

function readForced() {
    if (typeof window === 'undefined') return null;
    const q = new URLSearchParams(window.location.search).get('guide');
    if (q === '1') return true;
    if (q === '0') return false;
    return null;
}

function readInitial() {
    const forced = readForced();
    if (forced !== null) return forced;
    try {
        return localStorage.getItem(FOLD_CUE_KEY) !== '1';
    } catch {
        return true;
    }
}

if (typeof window !== 'undefined') {
    cueActive = readInitial();
    window.addEventListener('pagehide', () => {
        if (!cueShown) return;
        try {
            localStorage.setItem(FOLD_CUE_KEY, '1');
        } catch {
            /* ignore quota / private mode */
        }
    });
}

function notify() {
    listeners.forEach((fn) => fn());
}

export function dismissFoldCue() {
    if (!cueActive) return;
    cueActive = false;
    try {
        localStorage.setItem(FOLD_CUE_KEY, '1');
    } catch {
        /* ignore */
    }
    notify();
    window.dispatchEvent(new CustomEvent(FOLD_CUE_EVENT, { detail: false }));
}

export function useFoldCue() {
    const [active, setActive] = useState(cueActive);

    useEffect(() => {
        const sync = () => setActive(cueActive);
        listeners.add(sync);
        const onEvent = (e) => setActive(Boolean(e.detail));
        window.addEventListener(FOLD_CUE_EVENT, onEvent);
        return () => {
            listeners.delete(sync);
            window.removeEventListener(FOLD_CUE_EVENT, onEvent);
        };
    }, []);

    useEffect(() => {
        if (active) cueShown = true;
    }, [active]);

    return active;
}

export function cueVariant(sectionId) {
    return FIGURE[sectionId] || 'dogear';
}

const ink = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};

function PeekFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 72 88" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="28" cy="17" r="10.5" {...ink} />
                <path d="M21.5 12.5c3.5-6 13-6.5 16.5.5" {...ink} />
                <circle className="pm-cue-eye" cx="24.5" cy="16.5" r="1.15" fill="currentColor" stroke="none" />
                <circle className="pm-cue-eye" cx="31.5" cy="16.5" r="1.15" fill="currentColor" stroke="none" />
                <path d="M24.5 21q3.5 2.4 7 0" {...ink} />
                <path d="M28 27.5v5" {...ink} />
                <path d="M16 38c2-6 8.5-9.5 12-9.5S38 32 40 38" {...ink} />
                <path d="M16 38c1.5 18 3 28 7 36M40 38c.2 16 1.2 28 2 36" {...ink} />
                <path d="M28 36.5v18" {...ink} />
                <path d="M23 74l-2.5 12M33 74l3 12" {...ink} />
                <g className="pm-cue-folder">
                    <path d="M7 54.5h15.5v12.5H7z" {...ink} />
                    <path d="M7 54.5l3.2-3.8h7.4L14 54.5" {...ink} />
                </g>
                <path d="M16 42c-6 6-9 12-7.5 16" {...ink} />
                <g className="pm-cue-arm">
                    <path d="M40 41c10-3 18-11 24-19" {...ink} />
                    <path d="M62.5 24.5l7.5-8.5M64 27.5l8.5-4" {...ink} />
                </g>
            </g>
        </svg>
    );
}

function DossierFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 76 72" aria-hidden="true">
            <g className="pm-cue-bob">
                <path d="M10 58h42l4-28H18L10 58z" {...ink} />
                <path d="M18 30l-2.5-7.5h28L46 30" {...ink} />
                <g className="pm-cue-sheet">
                    <path d="M22 28l18-16 16 6-14 18" {...ink} />
                    <path d="M28 18.5l12 4.5" {...ink} />
                    <path d="M30.5 23l9 3.5" {...ink} />
                </g>
                <g className="pm-cue-arm">
                    <path d="M48 40c8 2 14 1 18-4" {...ink} />
                    <circle cx="68" cy="34" r="4.5" {...ink} />
                    <path d="M70.5 31.5c2-3 5-4 7-2.5" {...ink} />
                </g>
            </g>
        </svg>
    );
}

function ReaderFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 72 88" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="30" cy="18" r="10.5" {...ink} />
                <path d="M23 13c3.2-5.5 12-6 16 0" {...ink} />
                <circle className="pm-cue-eye" cx="26.5" cy="18" r="1.15" fill="currentColor" stroke="none" />
                <circle className="pm-cue-eye" cx="33.5" cy="18" r="1.15" fill="currentColor" stroke="none" />
                <path d="M23.5 18.2h6M30.5 18.2h6" {...ink} strokeWidth="1.35" />
                <path d="M29.5 18.2h1.2" {...ink} />
                <path d="M26 22.5q4 1.8 8 0" {...ink} />
                <path d="M30 28.5v5" {...ink} />
                <path d="M18 39c2-6.5 8-10 12-10s10 3.5 12 10" {...ink} />
                <path d="M18 39c1.2 18 2.8 28 6.5 36M42 39c.4 16 1 28 1.6 36" {...ink} />
                <path d="M30 37.5v17" {...ink} />
                <path d="M24.5 75l-2 11M35.5 75l2.6 11" {...ink} />
                <path d="M18 43c-5 8-6 14-3 18" {...ink} />
                <g className="pm-cue-arm">
                    <path d="M42 42c9 2 16 8 20 16" {...ink} />
                    <path d="M60 56h10.5v9.5H60z" {...ink} />
                    <path d="M62 56v9.5M68.5 56v9.5" {...ink} />
                </g>
            </g>
        </svg>
    );
}

function DogEar() {
    return (
        <svg className="pm-cue-dogear-svg" viewBox="0 0 28 28" aria-hidden="true">
            <path className="pm-cue-dogear-back" d="M28 0v18c0 4-4 8-8 8H0L28 0z" />
            <path className="pm-cue-dogear-face" d="M28 0l-16 16h8c4 0 8-4 8-8V0z" />
            <path className="pm-cue-dogear-crease" d="M12 16l16-16" />
        </svg>
    );
}

const FIGURES = {
    peek: PeekFigure,
    dossier: DossierFigure,
    reader: ReaderFigure
};

const FoldCue = ({ variant, lang }) => {
    const t = COPY[lang] || COPY.en;
    if (variant === 'dogear') {
        return (
            <span className="pm-fold-cue pm-fold-cue--dogear" aria-hidden="true">
                <DogEar />
            </span>
        );
    }
    const Figure = FIGURES[variant] || PeekFigure;
    return (
        <span className={`pm-fold-cue pm-fold-cue--figure pm-fold-cue--${variant}`} aria-hidden="true">
            <Figure />
            <span className="pm-fold-cue-caption">{t.more}</span>
        </span>
    );
};

export default FoldCue;
