import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import Editorial from './Editorial';

const TiltCard = ({ item, index }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 16 });
    const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 16 });

    const onMove = (e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mvX.set((e.clientX - r.left) / r.width - 0.5);
        mvY.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
        mvX.set(0);
        mvY.set(0);
    };

    return (
        <motion.article
            ref={ref}
            className={`pm-bento-card pm-bento-card--${index} pm-ticket-card`}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={reduce ? {} : { rotateX, rotateY, transformPerspective: 900 }}
            initial={reduce
                ? { opacity: 0 }
                : { opacity: 0, clipPath: 'inset(0 0 100% 0 round 18px)', y: -18 }}
            whileInView={reduce
                ? { opacity: 1 }
                : { opacity: 1, clipPath: 'inset(0 0 0% 0 round 18px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <span className="pm-bento-accent" style={{ background: item.accent }} aria-hidden="true" />
            <span className="pm-ticket-perf" aria-hidden="true" />
            <div className="pm-bento-top">
                <h3 className="pm-bento-title">{item.title}</h3>
                <span className="pm-bento-org">{item.org} · {item.year}</span>
            </div>
            <p className="pm-bento-outcome">{item.outcome}</p>
            <p className="pm-bento-ai">
                <span className="pm-bento-ai-label">AI</span> {item.aiAngle}
            </p>
            <div className="pm-bento-tags">
                {item.tags.map((t, i) => (
                    <span key={i} className="pm-bento-tag">{t}</span>
                ))}
            </div>
            <span className="pm-ticket-barcode" aria-hidden="true" />
        </motion.article>
    );
};

/* Selected Projects — bento grid framed around AI-driven transformation.
   Cards print out of a slot, then keep the existing 3D tilt. */
const ProjectsBento = ({ data }) => (
    <section className="pm-section pm-bento" id="projects">
        <div className="pm-bento-head">
            <div className="pm-eyebrow">{data.eyebrow}</div>
            <h2><Editorial text={data.heading} /></h2>
            <p className="pm-bento-lead">{data.lead}</p>
        </div>
        <div className="pm-print-rail" aria-hidden="true">
            <span className="pm-print-rail-led" />
            <span className="pm-print-rail-lip" />
        </div>
        <div className="pm-bento-grid">
            {data.items.map((item, i) => (
                <TiltCard key={i} item={item} index={i} />
            ))}
        </div>
    </section>
);

export default ProjectsBento;
