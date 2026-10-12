import React from 'react';

/* One stick figure per collapsed card. Same slot (glued to Show,
   pointing at it) but each posture and face is distinct. */
const POSE = {
    projects: 'stride',
    ai: 'lean',
    problems: 'think',
    notes: 'look',
    skills: 'hip',
    apps: 'kneel',
    logos: 'heels',
    ideas: 'aha',
    reviews: 'wave'
};

export function cueVariant(sectionId) {
    return POSE[sectionId] || 'stride';
}

const ink = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.85,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};

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

function PointingArm({ fromX, fromY, toX = 34, toY = 20.5 }) {
    return (
        <g className="pm-cue-arm">
            <path d={`M${fromX} ${fromY}L${toX} ${toY}`} {...ink} />
            <path d={`M${toX} ${toY}l6.5 -2.1`} {...ink} />
        </g>
    );
}

function StrideFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="16" cy="10" r="7" {...ink} />
                <Face cx={16} cy={10} mouth="smile" />
                <path d="M16 17v16" {...ink} />
                <path d="M16 22L7 31" {...ink} />
                <PointingArm fromX={16} fromY={22} toX={34} toY={18.5} />
                <path d="M16 33L7 54M16 33L27 50" {...ink} />
            </g>
        </svg>
    );
}

function LeanFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="19" cy="11" r="7" {...ink} />
                <Face cx={19} cy={11} mouth="grin" />
                <path d="M19 18L24 36" {...ink} />
                <path d="M20 24L12 22" {...ink} />
                <PointingArm fromX={21} fromY={24} toX={36} toY={20} />
                <path d="M24 36L16 55M24 36L31 52" {...ink} />
            </g>
        </svg>
    );
}

function ThinkFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <g transform="rotate(-14 15 12)">
                    <circle cx="15" cy="12" r="7" {...ink} />
                    <Face cx={15} cy={12} mouth="flat" />
                    <path d="M11 7.4q2.6-1.6 6.2 0" {...ink} />
                </g>
                <path d="M16 19.2v15" {...ink} />
                <path d="M16 24Q8 19 12.5 13" {...ink} />
                <PointingArm fromX={16} fromY={24} toX={34} toY={24} />
                <path d="M16 34.2L13.2 55M16 34.2L19.2 55" {...ink} />
            </g>
        </svg>
    );
}

function LookFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="16" cy="10" r="7" {...ink} />
                <Face cx={16} cy={10} eyes="right" mouth="smile" />
                <path d="M16 17v17.5" {...ink} />
                <path d="M16 23L9 12L14 7.5" {...ink} />
                <PointingArm fromX={16} fromY={23} toX={34} toY={23.5} />
                <path d="M16 34.5L11.5 55M16 34.5L21.5 55" {...ink} />
            </g>
        </svg>
    );
}

function HipFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="13" cy="10" r="7" {...ink} />
                <Face cx={13} cy={10} mouth="smirk" />
                <path d="M13 17v18" {...ink} />
                <path d="M13 23L6 28L11 35" {...ink} />
                <PointingArm fromX={13} fromY={23} toX={33} toY={19.5} />
                <path d="M13 35L5 55M13 35L24 53" {...ink} />
            </g>
        </svg>
    );
}

function KneelFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="17" cy="16" r="7" {...ink} />
                <Face cx={17} cy={16} eyes="wide" mouth="oh" />
                <path d="M17 23v12" {...ink} />
                <path d="M17 28L10 36" {...ink} />
                <PointingArm fromX={17.5} fromY={28} toX={35} toY={22} />
                <path d="M17 35L10 35L9 55M17 35L26 46L24 55" {...ink} />
            </g>
        </svg>
    );
}

function HeelsFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="15" cy="10" r="7" {...ink} />
                <Face cx={15} cy={10} mouth="flat" />
                <path d="M15 17v18" {...ink} />
                <path d="M15 22.5L15 36" {...ink} />
                <PointingArm fromX={15} fromY={22.5} toX={34} toY={21} />
                <path d="M15 35L13.4 55M15 35L16.6 55" {...ink} />
            </g>
        </svg>
    );
}

function AhaFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="18" cy="14" r="7" {...ink} />
                <Face cx={18} cy={14} eyes="wide" mouth="oh" />
                <path d="M18 21v14" {...ink} />
                <g className="pm-cue-up">
                    <path d="M18 26L8 8" {...ink} />
                    <path d="M8 8L8 2" {...ink} />
                </g>
                <PointingArm fromX={18} fromY={26} toX={35} toY={22} />
                <path d="M18 35L13 55M18 35L23 55" {...ink} />
            </g>
        </svg>
    );
}

function WaveFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="16" cy="10" r="7" {...ink} />
                <Face cx={16} cy={10} eyes="wink" mouth="grin" />
                <path d="M16 17v18" {...ink} />
                <g className="pm-cue-wave">
                    <path d="M16 22.5L9 16L4 7" {...ink} />
                </g>
                <PointingArm fromX={16} fromY={22.5} toX={34} toY={21} />
                <path d="M16 35L10 55M16 35L22 54" {...ink} />
            </g>
        </svg>
    );
}

const FIGURES = {
    stride: StrideFigure,
    lean: LeanFigure,
    think: ThinkFigure,
    look: LookFigure,
    hip: HipFigure,
    kneel: KneelFigure,
    heels: HeelsFigure,
    aha: AhaFigure,
    wave: WaveFigure
};

const FoldCue = ({ variant }) => {
    const Figure = FIGURES[variant] || StrideFigure;
    return (
        <span className={`pm-fold-cue pm-fold-cue--figure pm-fold-cue--${variant}`} aria-hidden="true">
            <Figure />
        </span>
    );
};

export default FoldCue;
