import React, { useRef } from 'react';

/* Magnetic hover wrapper: the element drifts toward the cursor via CSS vars
   (--mx/--my consumed by .pm-magnetic). Reduced-motion is handled in CSS,
   which forces transform:none, so the vars become no-ops. */
const Magnetic = ({ as: Tag = 'a', strength = 0.35, className = '', children, ...rest }) => {
    const ref = useRef(null);

    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
    };

    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
    };

    return (
        <Tag
            ref={ref}
            className={`pm-magnetic ${className}`.trim()}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            {...rest}
        >
            {children}
        </Tag>
    );
};

export default Magnetic;
