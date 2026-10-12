import React from 'react';

/* Stick figures sit in the Show cluster and point at it.
   Poses vary so the row doesn't look stamped, but every arm aims right. */
const POSE = {
    projects: 'point',
    ai: 'lean',
    problems: 'point',
    notes: 'look',
    skills: 'look',
    apps: 'lean',
    logos: 'point',
    ideas: 'point',
    reviews: 'look'
};

export function cueVariant(sectionId) {
    return POSE[sectionId] || 'point';
}

const ink = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.85,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};

function PointFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="15" cy="10" r="7" {...ink} />
                <circle cx="13" cy="9.3" r="1.05" fill="currentColor" stroke="none" />
                <circle cx="17.3" cy="9.3" r="1.05" fill="currentColor" stroke="none" />
                <path d="M12.7 12.7q2.4 1.55 4.8 0" {...ink} />
                <path d="M15 17v18" {...ink} />
                <path d="M15 22.5L7.5 33" {...ink} />
                <g className="pm-cue-arm">
                    <path d="M15 22.5L34 20.5" {...ink} />
                    <path d="M34 20.5l6.5-2" {...ink} />
                </g>
                <path d="M15 35L11 55M15 35L21.5 55" {...ink} />
            </g>
        </svg>
    );
}

function LookFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="15" cy="10.2" r="7" {...ink} />
                <circle cx="15.4" cy="9.4" r="1.05" fill="currentColor" stroke="none" />
                <circle cx="19.4" cy="9.4" r="1.05" fill="currentColor" stroke="none" />
                <path d="M14.4 12.8q2.6 1.45 5 0" {...ink} />
                <path d="M15 17.2v17.8" {...ink} />
                <path d="M15 23L8 32.5" {...ink} />
                <g className="pm-cue-arm">
                    <path d="M15 23L33 24.5" {...ink} />
                    <path d="M33 24.5l7 1.2" {...ink} />
                </g>
                <path d="M15 35L11.2 55M15 35L21.2 55" {...ink} />
            </g>
        </svg>
    );
}

function LeanFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="17" cy="10" r="7" {...ink} />
                <circle cx="15.4" cy="9.2" r="1.05" fill="currentColor" stroke="none" />
                <circle cx="19.6" cy="9.2" r="1.05" fill="currentColor" stroke="none" />
                <path d="M15 12.6q2.4 1.55 4.8 0" {...ink} />
                <path d="M17 17.2L20 35" {...ink} />
                <path d="M17.4 23Q11 27 12.5 34" {...ink} />
                <g className="pm-cue-arm">
                    <path d="M17.6 22.5L35 19.8" {...ink} />
                    <path d="M35 19.8l6.2-2.2" {...ink} />
                </g>
                <path d="M20 35L13.5 55M20 35L26 53" {...ink} />
            </g>
        </svg>
    );
}

const FIGURES = {
    point: PointFigure,
    look: LookFigure,
    lean: LeanFigure
};

const FoldCue = ({ variant }) => {
    const Figure = FIGURES[variant] || PointFigure;
    return (
        <span className={`pm-fold-cue pm-fold-cue--figure pm-fold-cue--${variant}`} aria-hidden="true">
            <Figure />
        </span>
    );
};

export default FoldCue;
