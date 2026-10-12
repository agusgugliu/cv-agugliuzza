import React from 'react';

/* One stick figure per collapsed card. Same slot (glued to Show,
   pointing at it) but each posture and face is distinct. */
const POSE = {
    projects: 'stride',
    ai: 'lean',
    problems: 'think',
    notes: 'look',
    skills: 'hip',
    apps: 'reach',
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
    const left =
        eyes === 'right' ? cx - 0.2 :
        eyes === 'wide' ? cx - 2.6 :
        cx - 2.1;
    const right =
        eyes === 'right' ? cx + 4.4 :
        eyes === 'wide' ? cx + 2.6 :
        cx + 2.2;
    const eyeR = eyes === 'wide' ? 1.2 : 1.05;
    return (
        <>
            {eyes === 'wink' ? (
                <>
                    <path d={`M${cx - 3.2} ${eyeY}h3.2`} {...ink} />
                    <circle cx={cx + 2.3} cy={eyeY} r={1.05} fill="currentColor" stroke="none" />
                </>
            ) : (
                <>
                    <circle cx={left} cy={eyeY} r={eyeR} fill="currentColor" stroke="none" />
                    <circle cx={right} cy={eyeY} r={eyeR} fill="currentColor" stroke="none" />
                </>
            )}
            {mouth === 'smile' && <path d={`M${cx - 2.4} ${cy + 2.7}q2.4 1.55 4.8 0`} {...ink} />}
            {mouth === 'grin' && <path d={`M${cx - 2.8} ${cy + 2.4}q2.8 2.2 5.6 0`} {...ink} />}
            {mouth === 'flat' && <path d={`M${cx - 2} ${cy + 3}h4`} {...ink} />}
            {mouth === 'oh' && <circle cx={cx} cy={cy + 3.1} r={1.45} {...ink} />}
            {mouth === 'smirk' && <path d={`M${cx - 1.2} ${cy + 2.8}q2.2 1.3 4.2 -0.2`} {...ink} />}
        </>
    );
}

function PointingArm({ fromX, fromY, toX = 34, toY = 20.5 }) {
    return (
        <g className="pm-cue-arm">
            <path d={`M${fromX} ${fromY}L${toX} ${toY}`} {...ink} />
            <path d={`M${toX} ${toY}l6.4 -2`} {...ink} />
        </g>
    );
}

function StrideFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="15" cy="10" r="7" {...ink} />
                <Face cx={15} cy={10} mouth="smile" />
                <path d="M15 17v17" {...ink} />
                <path d="M15 22.5L8 30" {...ink} />
                <PointingArm fromX={15} fromY={22.5} toX={34} toY={19.5} />
                <path d="M15 34L9 55M15 34L24 52" {...ink} />
            </g>
        </svg>
    );
}

function LeanFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="17" cy="10" r="7" {...ink} />
                <Face cx={17} cy={10} mouth="grin" />
                <path d="M17 17.2L20 35" {...ink} />
                <path d="M17.4 23Q11 27 12.5 34" {...ink} />
                <PointingArm fromX={17.6} fromY={22.5} toX={35} toY={19.8} />
                <path d="M20 35L13.5 55M20 35L26 53" {...ink} />
            </g>
        </svg>
    );
}

function ThinkFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <g transform="rotate(-12 16 11)">
                    <circle cx="16" cy="11" r="7" {...ink} />
                    <Face cx={16} cy={11} mouth="flat" />
                    <path d="M12.2 6.6q2.4-1.4 5.6-.2" {...ink} />
                </g>
                <path d="M16 18.2v16" {...ink} />
                <path d="M16 23.5Q9.5 20 13.2 13.4" {...ink} />
                <PointingArm fromX={16} fromY={23.5} toX={34} toY={23} />
                <path d="M16 34.2L13 55M16 34.2L19.6 55" {...ink} />
            </g>
        </svg>
    );
}

function LookFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="16" cy="10.2" r="7" {...ink} />
                <Face cx={16} cy={10.2} eyes="right" mouth="smile" />
                <path d="M16 17.2v17.6" {...ink} />
                <path d="M16 23L8.5 32" {...ink} />
                <PointingArm fromX={16} fromY={23} toX={33.5} toY={24.5} />
                <path d="M16 34.8L12 55M16 34.8L21 55" {...ink} />
            </g>
        </svg>
    );
}

function HipFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="14" cy="10" r="7" {...ink} />
                <Face cx={14} cy={10} mouth="smirk" />
                <path d="M14 17v18" {...ink} />
                <path d="M14 23Q7.5 28 11.5 35" {...ink} />
                <PointingArm fromX={14} fromY={23} toX={33} toY={20} />
                <path d="M14 35L7.5 55M14 35L22.5 54" {...ink} />
            </g>
        </svg>
    );
}

function ReachFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="16" cy="8.5" r="7" {...ink} />
                <Face cx={16} cy={8.5} eyes="wide" mouth="oh" />
                <path d="M16 15.6L18.5 32" {...ink} />
                <path d="M16.4 21L8 17.5" {...ink} />
                <PointingArm fromX={17} fromY={21} toX={36} toY={17.5} />
                <path d="M18.5 32L13 55M18.5 32L23 46L25.5 55" {...ink} />
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
                <path d="M15 22.5L10 34" {...ink} />
                <PointingArm fromX={15} fromY={22.5} toX={34} toY={21} />
                <path d="M15 35L13.2 55M15 35L16.8 55" {...ink} />
            </g>
        </svg>
    );
}

function AhaFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="16" cy="11" r="7" {...ink} />
                <Face cx={16} cy={11} eyes="wide" mouth="oh" />
                <path d="M16 18v16.5" {...ink} />
                <g className="pm-cue-up">
                    <path d="M16 23L9 11" {...ink} />
                    <path d="M9 11v-6" {...ink} />
                </g>
                <PointingArm fromX={16} fromY={23} toX={34} toY={21} />
                <path d="M16 34.5L12.5 55M16 34.5L20.5 55" {...ink} />
            </g>
        </svg>
    );
}

function WaveFigure() {
    return (
        <svg className="pm-cue-svg" viewBox="0 0 44 58" aria-hidden="true">
            <g className="pm-cue-bob">
                <circle cx="15" cy="10" r="7" {...ink} />
                <Face cx={15} cy={10} eyes="wink" mouth="grin" />
                <path d="M15 17v18" {...ink} />
                <g className="pm-cue-wave">
                    <path d="M15 22.5L8 14" {...ink} />
                    <path d="M8 14L5.5 8.5" {...ink} />
                </g>
                <PointingArm fromX={15} fromY={22.5} toX={34} toY={21.5} />
                <path d="M15 35L10.5 55M15 35L21 54" {...ink} />
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
    reach: ReachFigure,
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
