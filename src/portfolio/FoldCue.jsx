import React from 'react';

/* Each collapsed card gets a stick figure whose pose/prop belongs
   to that section. Same slot: glued to Show, pointing at the pill. */
const POSE = {
    projects: 'execute',
    ai: 'stairs',
    problems: 'knot',
    notes: 'read',
    skills: 'wrench',
    apps: 'proto',
    logos: 'campus',
    ideas: 'bulb',
    reviews: 'speak'
};

export function cueVariant(sectionId) {
    return POSE[sectionId] || 'execute';
}

const ink = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.85,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};

const fine = { ...ink, strokeWidth: 1.4 };

function Face({ cx, cy, eyes = 'front', mouth = 'smile' }) {
    const eyeY = cy - 0.7;
    const left = eyes === 'right' ? cx + 0.2 : cx - 2.2;
    const right = eyes === 'right' ? cx + 4.5 : cx + 2.2;
    const eyeR = eyes === 'wide' ? 1.25 : 1.05;
    return (
        <>
            {eyes === 'wink' ? (
                <>
                    <path d={`M${cx - 3.4} ${eyeY}h3.4`} {...ink} />
                    <circle cx={cx + 2.4} cy={eyeY} r={1.05} fill="currentColor" stroke="none" />
                </>
            ) : (
                <>
                    <circle cx={eyes === 'wide' ? cx - 2.7 : left} cy={eyeY} r={eyeR} fill="currentColor" stroke="none" />
                    <circle cx={eyes === 'wide' ? cx + 2.7 : right} cy={eyeY} r={eyeR} fill="currentColor" stroke="none" />
                </>
            )}
            {mouth === 'smile' && <path d={`M${cx - 2.4} ${cy + 2.7}q2.4 1.55 4.8 0`} {...ink} />}
            {mouth === 'grin' && <path d={`M${cx - 2.9} ${cy + 2.3}q2.9 2.3 5.8 0`} {...ink} />}
            {mouth === 'flat' && <path d={`M${cx - 2} ${cy + 3}h4`} {...ink} />}
            {mouth === 'oh' && <circle cx={cx} cy={cy + 3.2} r={1.2} {...ink} />}
            {mouth === 'smirk' && <path d={`M${cx - 1} ${cy + 2.8}q2.4 1.4 4.4 -0.3`} {...ink} />}
        </>
    );
}

function PointingArm({ fromX, fromY, toX = 38, toY = 20.5 }) {
    return (
        <g className="pm-cue-arm">
            <path d={`M${fromX} ${fromY}L${toX} ${toY}`} {...ink} />
            <path d={`M${toX} ${toY}l6.2 -2`} {...ink} />
        </g>
    );
}

/* Selected projects — planting a flag: strategy that actually lands. */
function ExecuteFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 48 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="20" cy="10" r="7" {...ink} />
                <Face cx={20} cy={10} mouth="smile" />
                <path d="M20 17v16" {...ink} />
                <path d="M20 23L11 34" {...ink} />
                <g className="pm-cue-prop">
                    <path d="M11 34V18" {...fine} />
                    <path d="M11 18l11 4.5-11 4.5" {...fine} />
                </g>
                <PointingArm fromX={20} fromY={23} toX={40} toY={19} />
                <path d="M20 33L12 55M20 33L29 50" {...ink} />
            </g>
        </svg>
    );
}

/* Transformation — walking the stairs from boardroom to shop floor. */
function StairsFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 48 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <path d="M3 34h9v7h9v7h9" {...fine} />
                <circle cx="22" cy="11" r="7" {...ink} />
                <Face cx={22} cy={11} mouth="grin" />
                <path d="M22 18L24 33" {...ink} />
                <path d="M22 24L15 21" {...ink} />
                <PointingArm fromX={23.5} fromY={24} toX={41} toY={21} />
                <path d="M24 33L18 41M24 33L30 48" {...ink} />
            </g>
        </svg>
    );
}

/* Problems I solve — holding the question, pointing at Show. */
function KnotFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 48 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="20" cy="12" r="7" {...ink} />
                <Face cx={20} cy={12} mouth="flat" />
                <path d="M16.2 7.4q2.6-1.4 6 0" {...ink} />
                <path d="M20 19v15.5" {...ink} />
                <path d="M20 25L10 18" {...ink} />
                <g className="pm-cue-knot">
                    <path d="M5.5 7.5q0-4.2 4.4-4.2q4.4 0 4.4 4q0 2.8-4.4 3.8v3" {...ink} />
                    <circle cx="9.9" cy="18.6" r="1.15" fill="currentColor" stroke="none" />
                </g>
                <PointingArm fromX={20} fromY={25} toX={40} toY={24} />
                <path d="M20 34.5L15 55M20 34.5L25.5 55" {...ink} />
            </g>
        </svg>
    );
}

/* Notes / blog — reading a page, not a sealed envelope. */
function ReadFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 48 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="20" cy="10" r="7" {...ink} />
                <Face cx={20} cy={10} eyes="right" mouth="smile" />
                <path d="M20 17v17.5" {...ink} />
                <path d="M20 23L12 30" {...ink} />
                <g className="pm-cue-prop">
                    <rect x="4" y="20" width="11" height="15" rx="1" {...fine} />
                    <path d="M6.2 24h6.6M6.2 27.5h6.6M6.2 31h4.8" {...fine} />
                </g>
                <PointingArm fromX={20} fromY={23} toX={40} toY={23} />
                <path d="M20 34.5L14 55M20 34.5L26 54" {...ink} />
            </g>
        </svg>
    );
}

/* Skills & tools — a hammer from the toolkit. */
function WrenchFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 48 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="18" cy="10" r="7" {...ink} />
                <Face cx={18} cy={10} mouth="smirk" />
                <path d="M18 17v18" {...ink} />
                <path d="M18 23L11 22" {...ink} />
                <g className="pm-cue-wrench">
                    <path d="M4 18h12" {...ink} />
                    <path d="M10 18v16" {...ink} />
                    <path d="M4 18l-2 3M16 18l2 3" {...fine} />
                </g>
                <PointingArm fromX={18} fromY={23} toX={40} toY={20} />
                <path d="M18 35L10 55M18 35L27 53" {...ink} />
            </g>
        </svg>
    );
}

/* Prototypes — a phone wireframe, not another page. */
function ProtoFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 48 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="20" cy="12" r="7" {...ink} />
                <Face cx={20} cy={12} eyes="wide" mouth="oh" />
                <path d="M20 19v16" {...ink} />
                <path d="M20 25L12 30" {...ink} />
                <g className="pm-cue-prop">
                    <rect x="4" y="20" width="11" height="18" rx="2" {...fine} />
                    <circle cx="9.5" cy="35.5" r="1.1" {...fine} />
                    <path d="M7.4 27.5l5.2 3-5.2 3z" {...fine} />
                </g>
                <PointingArm fromX={20.5} fromY={25} toX={40} toY={21} />
                <path d="M20 35L13 55M20 35L28 48L26 55" {...ink} />
            </g>
        </svg>
    );
}

/* Companies & institutions — a small building. */
function CampusFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 48 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <g className="pm-cue-prop">
                    <path d="M4 34l7.5-9 7.5 9" {...fine} />
                    <path d="M6 34v16M11.5 34v16M17 34v16" {...fine} />
                    <path d="M4 50h15" {...fine} />
                    <path d="M10 42h3v8h-3z" {...fine} />
                </g>
                <circle cx="24" cy="10" r="7" {...ink} />
                <Face cx={24} cy={10} mouth="flat" />
                <path d="M24 17v18" {...ink} />
                <path d="M24 23L24 34" {...ink} />
                <PointingArm fromX={24} fromY={23} toX={41} toY={21} />
                <path d="M24 35L21.5 55M24 35L26.5 55" {...ink} />
            </g>
        </svg>
    );
}

/* Beliefs / how I run a project — a lightbulb. */
function BulbFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 48 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="22" cy="13" r="7" {...ink} />
                <Face cx={22} cy={13} eyes="wide" mouth="oh" />
                <path d="M22 20v15" {...ink} />
                <g className="pm-cue-up">
                    <path d="M22 26L11 14" {...ink} />
                    <circle cx="8.5" cy="9" r="4.2" {...fine} />
                    <path d="M6.6 13.4h3.8v2.4H6.6z" {...fine} />
                    <path d="M8.5 6.6v3" {...fine} />
                </g>
                <PointingArm fromX={22} fromY={26} toX={40} toY={22} />
                <path d="M22 35L16 55M22 35L28 55" {...ink} />
            </g>
        </svg>
    );
}

/* What people say — a speech bubble. */
function SpeakFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 48 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <g className="pm-cue-bubble">
                    <rect x="2.5" y="3" width="16" height="11" rx="3.5" {...fine} />
                    <path d="M8 14l3 5 3.5-5" {...fine} />
                    <path d="M6 8.5h9" {...fine} />
                    <path d="M6 11h6" {...fine} />
                </g>
                <circle cx="20" cy="16" r="7" {...ink} />
                <Face cx={20} cy={16} eyes="wink" mouth="grin" />
                <path d="M20 23v14" {...ink} />
                <path d="M20 28L12 34" {...ink} />
                <PointingArm fromX={20} fromY={28} toX={40} toY={24} />
                <path d="M20 37L14 55M20 37L27 54" {...ink} />
            </g>
        </svg>
    );
}

const FIGURES = {
    execute: ExecuteFigure,
    stairs: StairsFigure,
    knot: KnotFigure,
    read: ReadFigure,
    wrench: WrenchFigure,
    proto: ProtoFigure,
    campus: CampusFigure,
    bulb: BulbFigure,
    speak: SpeakFigure
};

const FoldCue = ({ variant }) => {
    const Figure = FIGURES[variant] || ExecuteFigure;
    return (
        <span className={`pm-fold-cue pm-fold-cue--figure pm-fold-cue--${variant}`} aria-hidden="true">
            <Figure />
        </span>
    );
};

export default FoldCue;
