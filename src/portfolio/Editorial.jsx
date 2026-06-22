import React from 'react';

/* Renders text where {word} becomes Instrument Serif italic + blue accent.
   Shared by the hero, section headings, and the projects bento. */
const Editorial = ({ text }) => {
    const parts = text.split(/(\{[^}]+\})/g);
    return (
        <>
            {parts.map((p, i) => {
                if (p.startsWith('{') && p.endsWith('}')) {
                    return <em key={i}>{p.slice(1, -1)}</em>;
                }
                return <span key={i}>{p}</span>;
            })}
        </>
    );
};

export default Editorial;
