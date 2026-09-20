import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* Meeting ticket that prints from a slot when Contact enters view.
   The whole pass is the Reclaim booking link. */
const BoardingPass = ({ copy, href }) => {
    const reduce = useReducedMotion();

    return (
        <div className="pm-pass-machine">
            <div className="pm-pass-hood" aria-hidden="true">
                <span className="pm-pass-led" />
                <span className="pm-pass-hood-label">{copy.passKicker}</span>
                <span className="pm-pass-flight">{copy.passFlight}</span>
            </div>
            <div className="pm-pass-mouth">
                <motion.a
                    className="pm-pass"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    initial={reduce ? { opacity: 0 } : { y: '-108%' }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={reduce
                        ? { duration: 0.25 }
                        : { duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="pm-pass-main">
                        <div className="pm-pass-row">
                            <div>
                                <span className="pm-pass-label">{copy.passPassengerLabel}</span>
                                <span className="pm-pass-value">{copy.passPassenger}</span>
                            </div>
                            <div className="pm-pass-route">
                                <div>
                                    <span className="pm-pass-label">{copy.passFromLabel}</span>
                                    <span className="pm-pass-value">{copy.passFrom}</span>
                                </div>
                                <span className="pm-pass-arrow" aria-hidden="true">→</span>
                                <div>
                                    <span className="pm-pass-label">{copy.passToLabel}</span>
                                    <span className="pm-pass-value">{copy.passTo}</span>
                                </div>
                            </div>
                        </div>
                        <div className="pm-pass-row pm-pass-row--meta">
                            <div>
                                <span className="pm-pass-label">{copy.passGateLabel}</span>
                                <span className="pm-pass-value">{copy.passGate}</span>
                            </div>
                            <div>
                                <span className="pm-pass-label">{copy.passSeatLabel}</span>
                                <span className="pm-pass-value">{copy.passSeat}</span>
                            </div>
                            <div className="pm-pass-cta">
                                {copy.passCta} <span aria-hidden="true">→</span>
                            </div>
                        </div>
                    </div>
                    <div className="pm-pass-stub" aria-hidden="true">
                        <span className="pm-pass-stub-code">{copy.passFlight}</span>
                        <span className="pm-pass-barcode" />
                        <span className="pm-pass-note">{copy.passNote}</span>
                    </div>
                </motion.a>
            </div>
        </div>
    );
};

export default BoardingPass;
