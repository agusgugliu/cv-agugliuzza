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
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};

function PeekFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 78 90" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="30" cy="16" r="11" {...ink} fill="var(--paper-2)" />
                <path d="M22 11c4-6.5 16-6.5 18.5 1" {...ink} />
                <circle cx="26.2" cy="15.6" r="1.2" fill="currentColor" stroke="none" />
                <circle cx="33.6" cy="15.6" r="1.2" fill="currentColor" stroke="none" />
                <path d="M26.2 20.4q3.8 2.6 7.6 0" {...ink} />
                <path d="M30 27v4.5" {...ink} />
                <path d="M17 40c2.2-8 8.8-12 13-12s10.8 4 13 12v34H17V40z" {...ink} fill="var(--paper-2)" />
                <path d="M30 32.5v20" {...ink} />
                <path d="M22 74l-2 13M38 74l3 13" {...ink} />
                <g className="pm-cue-folder">
                    <rect x="6" y="54" width="16" height="13" rx="1.4" {...ink} fill="var(--card-bg)" />
                    <path d="M6 54l3.4-4h7.2L14 54" {...ink} />
                </g>
                <path d="M17 44c-6 6-8.5 12-6.5 16.5" {...ink} />
                <g className="pm-cue-arm">
                    <path d="M43 42c11-2 20-10 26-18" {...ink} />
                    <path d="M67 26l9-9" {...ink} />
                    <path className="pm-cue-accent" d="M72 14l8 1.5-4.5 6.5" fill="none" />
                </g>
            </g>
        </svg>
    );
}

function DossierFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 80 74" aria-hidden="true">
            <g className="pm-cue-bob">
                <path d="M8 60h46l5-32H18L8 60z" {...ink} fill="var(--paper-2)" />
                <path d="M18 28l-3-8h30l4 8" {...ink} fill="var(--card-bg)" />
                <g className="pm-cue-sheet">
                    <path d="M24 28l20-18 18 7-15 20" {...ink} fill="var(--card-bg)" />
                    <path d="M32 17.5l12 4.8M34 22.5l10 4" {...ink} />
                </g>
                <g className="pm-cue-arm">
                    <path d="M52 42c9 1 16 0 21-5" {...ink} />
                    <circle cx="74" cy="35" r="5" {...ink} fill="var(--paper-2)" />
                    <path className="pm-cue-accent" d="M77 31c2.4-3.4 6-4.2 8.5-2" fill="none" />
                </g>
            </g>
        </svg>
    );
}

function ReaderFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 78 90" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="30" cy="17" r="11" {...ink} fill="var(--paper-2)" />
                <path d="M22 12c4-6 16-6.2 18.5 1.2" {...ink} />
                <circle cx="26.4" cy="16.8" r="1.2" fill="currentColor" stroke="none" />
                <circle cx="33.8" cy="16.8" r="1.2" fill="currentColor" stroke="none" />
                <path d="M23.5 17h6.2M31.2 17h6.2" {...ink} strokeWidth="1.4" />
                <path d="M26.4 21.6q3.8 2.2 7.4 0" {...ink} />
                <path d="M30 28v4.5" {...ink} />
                <path d="M17 41c2.2-8 8.8-12 13-12s10.8 4 13 12v34H17V41z" {...ink} fill="var(--paper-2)" />
                <path d="M30 33.5v20" {...ink} />
                <path d="M22 75l-2 12M38 75l3 12" {...ink} />
                <path d="M17 45c-5.5 8-6.5 14-3.5 18" {...ink} />
                <g className="pm-cue-arm">
                    <path d="M43 43c10 3 17 10 20 18" {...ink} />
                    <path d="M58 58l14-6 3 8-14 6z" {...ink} fill="var(--card-bg)" />
                    <path d="M62 61.5l10-4.2" {...ink} />
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
