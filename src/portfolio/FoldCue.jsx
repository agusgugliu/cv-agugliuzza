import React from 'react';

/* One Pixar-style figure per collapsed card. Pose/prop matches the
   section. Same slot: glued to Show, pointing at the pill. */
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

const SRC = {
    execute: '/assets/cues/execute.webp',
    stairs: '/assets/cues/stairs.webp',
    knot: '/assets/cues/knot.webp',
    read: '/assets/cues/read.webp',
    wrench: '/assets/cues/wrench.webp',
    proto: '/assets/cues/proto.webp',
    campus: '/assets/cues/campus.webp',
    bulb: '/assets/cues/bulb.webp',
    speak: '/assets/cues/speak.webp'
};

export function cueVariant(sectionId) {
    return POSE[sectionId] || 'execute';
}

const FoldCue = ({ variant }) => {
    const src = SRC[variant] || SRC.execute;
    return (
        <span className={`pm-fold-cue pm-fold-cue--figure pm-fold-cue--${variant}`} aria-hidden="true">
            <img className="pm-cue-img" src={src} alt="" width="48" height="64" draggable="false" />
        </span>
    );
};

export default FoldCue;
