import React from 'react';

/* One Pixar-style figure per section — the portfolio portrait as 3D
   clay, pose/prop matching the section. Glued to Show/Hide, pointing
   at the pill. Track Record and Contact keep theirs while expanded. */
const POSE = {
    work: 'track',
    projects: 'execute',
    ai: 'stairs',
    problems: 'knot',
    notes: 'read',
    skills: 'wrench',
    apps: 'proto',
    logos: 'campus',
    ideas: 'bulb',
    reviews: 'speak',
    contact: 'coffee'
};

const SRC = {
    track: '/assets/cues/track.webp',
    execute: '/assets/cues/execute.webp',
    stairs: '/assets/cues/stairs.webp',
    knot: '/assets/cues/knot.webp',
    read: '/assets/cues/read.webp',
    wrench: '/assets/cues/wrench.webp',
    proto: '/assets/cues/proto.webp',
    campus: '/assets/cues/campus.webp',
    bulb: '/assets/cues/bulb.webp',
    speak: '/assets/cues/speak.webp',
    coffee: '/assets/cues/coffee.webp'
};

const OPEN_CUES = new Set(['work', 'contact']);

export function cueVariant(sectionId, { open = false } = {}) {
    if (open && !OPEN_CUES.has(sectionId)) return null;
    return POSE[sectionId] || null;
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
