import React from 'react';

/* A quiet unfolding brief on a few folded cards; a paper curl on the rest.
   Same family — no stick figures, no caption. */
const FOLIO = new Set(['projects', 'ai', 'skills', 'ideas']);

export function cueVariant(sectionId) {
    return FOLIO.has(sectionId) ? 'folio' : 'dogear';
}

const ink = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};

function Folio() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 56 42" aria-hidden="true">
            <g className="pm-cue-bob">
                <path
                    d="M6 12.5h28.5c1.2 0 2.2.9 2.2 2.1V35H8.2C7 35 6 34.1 6 32.9V12.5z"
                    {...ink}
                    fill="var(--paper-2)"
                />
                <path d="M6 12.5l3.4-4.6h16.8L22.5 12.5" {...ink} fill="var(--card-bg)" />
                <g className="pm-cue-sheet">
                    <path
                        d="M18 14.5l20.5-9.5 11 8.2-16.8 14.2H20.2c-1.2 0-2.2-.9-2.2-2.1V14.5z"
                        {...ink}
                        fill="var(--card-bg)"
                    />
                    <path className="pm-cue-accent" d="M38.5 5.2l11 8.2-7.4 1.6z" />
                    <path d="M24 16.2h14.5M25.5 20.2h12.2M27 24.2h9.5" {...ink} strokeWidth="1.35" />
                </g>
            </g>
        </svg>
    );
}

function DogEar() {
    return (
        <svg className="pm-cue-dogear-svg" viewBox="0 0 26 26" aria-hidden="true">
            <path className="pm-cue-dogear-back" d="M26 0v16.5A7.5 7.5 0 0 1 18.5 24H0L26 0z" />
            <path className="pm-cue-dogear-face" d="M26 0L11.5 14.5H18A7.5 7.5 0 0 0 26 7V0z" />
            <path className="pm-cue-dogear-crease" d="M11.5 14.5L26 0" />
        </svg>
    );
}

const FoldCue = ({ variant }) => {
    if (variant === 'dogear') {
        return (
            <span className="pm-fold-cue pm-fold-cue--dogear" aria-hidden="true">
                <DogEar />
            </span>
        );
    }
    return (
        <span className="pm-fold-cue pm-fold-cue--figure pm-fold-cue--folio" aria-hidden="true">
            <Folio />
        </span>
    );
};

export default FoldCue;
