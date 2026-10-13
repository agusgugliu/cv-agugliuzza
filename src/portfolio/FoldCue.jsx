import React from 'react';

/* One Pixar-style figure per section — the portfolio portrait as 3D
   clay, pose/prop matching the section. Clustered with Show/Hide, each
   in a different spot around the pill. Track Record and Contact keep
   theirs while expanded. */
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

/* How the figure sits around the Show/Hide pill. */
const PLACE = {
    execute: 'beside',
    stairs: 'climb',
    knot: 'peek',
    read: 'atop',
    wrench: 'bend',
    proto: 'peek-right',
    campus: 'lean',
    bulb: 'pop',
    speak: 'drape',
    track: 'atop',
    coffee: 'bend'
};

const OPEN_CUES = new Set(['work', 'contact']);

export function cueVariant(sectionId, { open = false } = {}) {
    if (open && !OPEN_CUES.has(sectionId)) return null;
    return POSE[sectionId] || null;
}

const FoldCue = ({ variant }) => {
    const src = SRC[variant] || SRC.execute;
    const place = PLACE[variant] || 'beside';
    return (
        <span className={`pm-fold-cue pm-fold-cue--figure pm-fold-cue--${variant} pm-fold-cue--${place}`} aria-hidden="true">
            <img className="pm-cue-img" src={src} alt="" width="48" height="64" draggable="false" />
        </span>
    );
};

export default FoldCue;
