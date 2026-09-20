import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/* Rotations stay deterministic so the pile doesn't reshuffle on re-render. */
const ROT = {
    projects: -7.5,
    ai: 5.5,
    problems: -3.2,
    work: 6.8,
    apps: -5.4,
    ideas: 3.6,
    contact: -2.1
};

const STUB_SPRING = { type: 'spring', stiffness: 320, damping: 24, mass: 0.8 };

/* Fixed printer on the left. As each flagged section crosses mid-viewport,
   a perforated stub ejects and lands on the growing pile. Clicking a stub
   jumps back to that section. Bidirectional: scrolling up retracts stubs. */
const EvidencePile = ({ copy }) => {
    const reduce = useReducedMotion();
    const [printed, setPrinted] = useState([]);
    const [armed, setArmed] = useState(false);

    useEffect(() => {
        const tickets = copy.tickets || [];
        const update = () => {
            const line = window.innerHeight * 0.46;
            setArmed(window.scrollY > 220);
            const next = [];
            tickets.forEach((t) => {
                const el = document.getElementById(t.id);
                if (!el) return;
                if (el.getBoundingClientRect().top < line) next.push(t.id);
            });
            setPrinted((prev) => {
                if (prev.length === next.length && prev.every((id, i) => id === next[i])) return prev;
                return next;
            });
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [copy.tickets]);

    const visible = (copy.tickets || []).filter((t) => printed.includes(t.id));

    const jump = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <aside
            className={`pm-pile${armed ? ' is-armed' : ''}${reduce ? ' is-reduced' : ''}`}
            aria-label={copy.pileLabel}
            title={copy.pileHint}
        >
            <div className="pm-pile-machine" aria-hidden="true">
                <span className="pm-pile-led" />
                <span className="pm-pile-brand">{copy.pileLabel}</span>
                <span className="pm-pile-slot" />
            </div>
            <div className="pm-pile-ejector">
                <div className="pm-pile-stack">
                    <AnimatePresence initial={false}>
                        {visible.map((t, i) => (
                            <motion.button
                                key={t.id}
                                type="button"
                                className="pm-stub"
                                onClick={() => jump(t.id)}
                                title={t.title}
                                initial={reduce ? { opacity: 0 } : { y: -72, opacity: 0, scaleY: 0.18, rotate: 0 }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    scaleY: 1,
                                    rotate: ROT[t.id] || 0
                                }}
                                exit={reduce ? { opacity: 0 } : { y: -48, opacity: 0, scaleY: 0.2 }}
                                transition={reduce ? { duration: 0.2 } : { ...STUB_SPRING, delay: 0.02 }}
                                style={{ zIndex: i + 1 }}
                            >
                                <span className="pm-stub-perf" aria-hidden="true" />
                                <span className="pm-stub-kicker">{t.kicker}</span>
                                <span className="pm-stub-title">{t.title}</span>
                                <span className="pm-stub-meta">{t.meta}</span>
                                <span className="pm-stub-barcode" aria-hidden="true" />
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </aside>
    );
};

export default EvidencePile;
