import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioEN, portfolioES } from '../data/portfolioData';
import './portfolio.css';

const RECLAIM_URL = 'https://app.reclaim.ai/m/agustin-gugliuzza/high-priority';

/* Render text where {word} renders as italic Instrument Serif + blue */
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

/* Company logo: prefer local file, fall back to Clearbit, then initial chip */
const Logo = ({ src, domain, name, size = 'md' }) => {
    const [stage, setStage] = useState(src ? 'local' : (domain ? 'clearbit' : 'chip'));
    if (stage === 'chip' || (!src && !domain)) {
        const initial = (name || '?').charAt(0).toUpperCase();
        return (
            <span className={`pm-logo-chip pm-logo-chip--${size}`} title={name}>
                {initial}
            </span>
        );
    }
    const url = stage === 'local' ? src : `https://logo.clearbit.com/${domain}`;
    return (
        <img
            className={`pm-logo-img pm-logo-img--${size}`}
            src={url}
            alt={name}
            title={name}
            loading="lazy"
            onError={() => setStage(stage === 'local' && domain ? 'clearbit' : 'chip')}
        />
    );
};

const Portfolio = ({ lang, setLang, onSwitchToCV }) => {
    const data = lang === 'en' ? portfolioEN : portfolioES;
    const [toast, setToast] = useState(null);

    useEffect(() => {
        document.documentElement.classList.remove('light');
        document.body.style.background = '#F4F5F7';
        return () => {
            document.body.style.background = '';
        };
    }, []);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    const handleContactClick = (link) => {
        if (link.label.toLowerCase() === 'email' || link.label.toLowerCase() === 'correo') {
            navigator.clipboard?.writeText(link.value);
            showToast(lang === 'en' ? 'Email copied' : 'Email copiado');
        }
        window.open(link.href, '_blank');
    };

    const smoothScrollTo = (id) => (e) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const downloadPDF = () => {
        window.print();
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.85 } });
    };

    return (
        <div className="portfolio-mode">
            <AnimatePresence>
                {toast && (
                    <motion.div
                        className="pm-toast"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Nav */}
            <nav className="pm-nav">
                <div className="pm-nav-inner">
                    <a className="pm-brand" href="#top" onClick={smoothScrollTo('top')}>
                        <img className="pm-brand-avatar" src="/assets/photo.PNG" alt="Agustín Gugliuzza" />
                        <span>agust&iacute;n gugliuzza<span className="pm-brand-dot">.</span></span>
                    </a>

                    <div className="pm-nav-links">
                        <a className="pm-nav-link" href="#work" onClick={smoothScrollTo('work')}>
                            {data.nav.work}
                        </a>
                        <a className="pm-nav-link" href="#apps" onClick={smoothScrollTo('apps')}>
                            {data.nav.apps}
                        </a>
                        <a className="pm-nav-link" href="#ideas" onClick={smoothScrollTo('ideas')}>
                            {data.nav.ideas}
                        </a>
                        <a className="pm-nav-link" href="#contact" onClick={smoothScrollTo('contact')}>
                            {data.nav.contact}
                        </a>
                    </div>

                    <div className="pm-nav-actions">
                        <div className="pm-lang-toggle">
                            <button
                                className={`pm-nav-btn ${lang === 'en' ? 'active' : ''}`}
                                onClick={() => setLang('en')}
                            >
                                EN
                            </button>
                            <span className="sep">/</span>
                            <button
                                className={`pm-nav-btn ${lang === 'es' ? 'active' : ''}`}
                                onClick={() => setLang('es')}
                            >
                                ES
                            </button>
                        </div>
                        <button className="pm-nav-btn pm-nav-icon" onClick={downloadPDF} title="Print / PDF">
                            <Download size={15} />
                        </button>
                        <button className="pm-mode-pill" onClick={onSwitchToCV}>
                            {data.nav.cv}
                        </button>
                    </div>
                </div>
            </nav>

            <div className="pm-shell" id="top">
                {/* Hero */}
                <section className="pm-section pm-hero">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="pm-hero-meta">
                            {data.hero.meta.map((m, i) => (
                                <span key={i}>
                                    {i > 0 && <span className="dot"></span>}
                                    {m}
                                </span>
                            ))}
                        </div>
                        <h1><Editorial text={data.hero.statement} /></h1>
                        <div className="pm-hero-actions">
                            <a className="pm-hero-cta" href={RECLAIM_URL} target="_blank" rel="noreferrer">
                                {data.hero.cta} <span className="arrow">&rarr;</span>
                            </a>
                            <a className="pm-hero-cta pm-hero-cta--ghost" href="#work" onClick={smoothScrollTo('work')}>
                                {data.hero.ctaSecondary} <span className="arrow">&darr;</span>
                            </a>
                        </div>
                    </motion.div>
                </section>

                {/* Problems */}
                <section className="pm-section pm-problems" id="problems">
                    <div className="pm-eyebrow">{data.problems.eyebrow}</div>
                    <h2><Editorial text={data.problems.heading} /></h2>
                    <div className="pm-problem-grid">
                        {data.problems.items.map((p, i) => (
                            <motion.div
                                key={i}
                                className="pm-problem"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                            >
                                <div className="pm-problem-num">{p.num}</div>
                                <div className="pm-problem-title"><Editorial text={p.title} /></div>
                                <p className="pm-problem-body">{p.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Track record */}
                <section className="pm-section" id="work">
                    <div className="pm-eyebrow">{data.track.eyebrow}</div>
                    <div className="pm-track-head">
                        <h2><Editorial text={data.track.heading} /></h2>
                        <button className="pm-mode-pill" onClick={onSwitchToCV}>
                            {data.track.cta} &rarr;
                        </button>
                    </div>
                    <div className="pm-track-legend">
                        <span className="pm-track-legend-item">
                            <span className="pm-track-legend-dot pm-track-legend-dot--work" />
                            {data.track.legend.work}
                        </span>
                        <span className="pm-track-legend-item">
                            <span className="pm-track-legend-dot pm-track-legend-dot--education" />
                            {data.track.legend.education}
                        </span>
                    </div>
                    <div className="pm-track-list">
                    {data.track.cases.map((c, i) => (
                        <motion.div
                            key={i}
                            className={`pm-case pm-case--${c.kind || 'work'}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="pm-case-meta">
                                <div className="pm-case-org-line">
                                    <Logo src={c.logo} domain={c.domain} name={c.org} size="md" />
                                </div>
                                <div className="role">{c.role}</div>
                                <div>{c.org}</div>
                                <div className="dates">{c.dates}</div>
                                <div className="stat">{c.stat}</div>
                                <div className="stat-label">{c.statLabel}</div>
                            </div>
                            <div className="pm-case-body">
                                <h3><Editorial text={c.heading} /></h3>
                                <p>{c.body}</p>
                                <div className="pm-case-tags">
                                    {c.tags.map((t, j) => (
                                        <span key={j} className="pm-case-tag">{t}</span>
                                    ))}
                                </div>
                                {c.clients && (
                                    <div className="pm-clients">
                                        <div className="pm-clients-label">{c.clientsLabel}</div>
                                        <div className="pm-clients-grid">
                                            {c.clients.map((cl, k) => (
                                                <div key={k} className="pm-client">
                                                    <Logo domain={cl.domain} name={cl.name} size="sm" />
                                                    <span className="pm-client-name">{cl.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    </div>
                </section>

                {/* Apps */}
                <section className="pm-section pm-apps" id="apps">
                    <div className="pm-eyebrow">{data.apps.eyebrow}</div>
                    <h2><Editorial text={data.apps.heading} /></h2>
                    <p className="pm-ai-lead">{data.apps.lead}</p>
                    <div className="pm-apps-grid">
                        {data.apps.items.map((a, i) => (
                            <motion.a
                                key={i}
                                className="pm-app"
                                href={a.url}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.45, delay: i * 0.05 }}
                            >
                                <div className="pm-app-icon" style={{ background: a.color }}>
                                    {a.initial}
                                </div>
                                <div className="pm-app-body">
                                    <div className="pm-app-name">
                                        {a.name}
                                        <ExternalLink size={13} className="pm-app-ext" />
                                    </div>
                                    <p className="pm-app-desc">{a.desc}</p>
                                    <div className="pm-app-host">{new URL(a.url).host}</div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>

                {/* Logos */}
                <section className="pm-section pm-logos">
                    <div className="pm-eyebrow">{data.logos.eyebrow}</div>
                    <div className="pm-logos-grid">
                        {data.logos.items.map((l, i) => (
                            <Logo key={i} src={l.logo} domain={l.domain} name={l.name} size="lg" />
                        ))}
                    </div>
                </section>

                {/* Principles */}
                <section className="pm-section pm-principles" id="ideas">
                    <div className="pm-eyebrow">{data.principles.eyebrow}</div>
                    <h2><Editorial text={data.principles.heading} /></h2>
                    <div className="pm-principle-list">
                        {data.principles.items.map((p, i) => (
                            <motion.div
                                key={i}
                                className="pm-principle"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                            >
                                <div className="pm-principle-num">{p.num}</div>
                                <h4>{p.title}</h4>
                                <p>{p.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* AI stack */}
                <section className="pm-section pm-ai">
                    <div className="pm-eyebrow">{data.ai.eyebrow}</div>
                    <h2><Editorial text={data.ai.heading} /></h2>
                    <p className="pm-ai-lead">{data.ai.lead}</p>
                    <div className="pm-ai-flow">
                        {data.ai.flow.map((f, i) => (
                            <React.Fragment key={i}>
                                <span>{f}</span>
                                {i < data.ai.flow.length - 1 && <span className="arrow">&rarr;</span>}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="pm-ai-stack">
                        {data.ai.steps.map((s, i) => (
                            <div key={i} className="pm-ai-step">
                                <div className="pm-ai-step-num">{s.num}</div>
                                <h5>{s.title}</h5>
                                <p>{s.body}</p>
                                <div className="pm-ai-tools">{s.tools}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="pm-section pm-contact" id="contact">
                    <div className="pm-eyebrow">{data.contact.eyebrow}</div>
                    <h2><Editorial text={data.contact.heading} /></h2>
                    <p className="pm-contact-lead">{data.contact.lead}</p>
                    <div className="pm-contact-links">
                        {data.contact.links.map((l, i) => (
                            <div
                                key={i}
                                className="pm-contact-link"
                                onClick={() => handleContactClick(l)}
                            >
                                <span className="label">{l.label}</span>
                                <span className="value">{l.value}</span>
                                <span className="action">{l.action} &rarr;</span>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="pm-footer">
                    <span>{data.footer.left}</span>
                    <a href="#top">{lang === 'en' ? 'Back to top' : 'Volver arriba'} &uarr;</a>
                </footer>
            </div>
        </div>
    );
};

export default Portfolio;
