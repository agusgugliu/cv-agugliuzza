import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, ChevronDown, Twitter, Github, Linkedin, Sun, Moon } from 'lucide-react';

const SOCIAL_ICONS = { twitter: Twitter, github: Github, linkedin: Linkedin };
import confetti from 'canvas-confetti';
import { portfolioEN, portfolioES } from '../data/portfolioData';
import HeroBackdrop from './HeroBackdrop';
import Magnetic from './Magnetic';
import Editorial from './Editorial';
import ProjectsBento from './ProjectsBento';
import './portfolio.css';

const RECLAIM_URL = 'https://app.reclaim.ai/m/agustin-gugliuzza/high-priority';

/* Company logo: prefer local file (theme-aware via src/srcDark), fall
   back to Clearbit, then to a chip with the initial letter. */
const Logo = ({ src, srcDark, theme, domain, name, size = 'md' }) => {
    const [stage, setStage] = useState(src ? 'local' : (domain ? 'clearbit' : 'chip'));
    if (stage === 'chip' || (!src && !domain)) {
        const initial = (name || '?').charAt(0).toUpperCase();
        return (
            <span className={`pm-logo-chip pm-logo-chip--${size}`} title={name}>
                {initial}
            </span>
        );
    }
    const onErr = () => setStage(stage === 'local' && domain ? 'clearbit' : 'chip');
    if (stage === 'local') {
        // If we have explicit theme + srcDark, render an <img> that swaps with it.
        // Otherwise fall back to <picture> using prefers-color-scheme.
        if (srcDark && theme) {
            const url = theme === 'dark' ? srcDark : src;
            return (
                <img
                    className={`pm-logo-img pm-logo-img--${size}`}
                    src={url}
                    alt={name}
                    title={name}
                    loading="lazy"
                    onError={onErr}
                />
            );
        }
        if (srcDark) {
            return (
                <picture>
                    <source srcSet={srcDark} media="(prefers-color-scheme: dark)" />
                    <img
                        className={`pm-logo-img pm-logo-img--${size}`}
                        src={src}
                        alt={name}
                        title={name}
                        loading="lazy"
                        onError={onErr}
                    />
                </picture>
            );
        }
    }
    const url = stage === 'local' ? src : `https://logo.clearbit.com/${domain}`;
    return (
        <img
            className={`pm-logo-img pm-logo-img--${size}`}
            src={url}
            alt={name}
            title={name}
            loading="lazy"
            onError={onErr}
        />
    );
};

/* App icon: tries Google's favicon service for the host, falls back
   to a colored chip with the initial letter on error. */
const AppIcon = ({ url, initial, color }) => {
    const [errored, setErrored] = useState(false);
    let host = '';
    try { host = new URL(url).host; } catch { /* noop */ }
    if (errored || !host) {
        return <div className="pm-app-icon" style={{ background: color }}>{initial}</div>;
    }
    return (
        <div className="pm-app-icon pm-app-icon--favicon">
            <img
                src={`https://www.google.com/s2/favicons?domain=${host}&sz=128`}
                alt=""
                loading="lazy"
                onError={() => setErrored(true)}
            />
        </div>
    );
};

/* Compact factsheet rendered inline below a case body, or below the
   clients grid when a client chip is expanded. */
const InfoBlock = ({ info, lang, variant = 'inline' }) => {
    if (!info) return null;
    const desc = lang === 'es' ? info.descEs : info.descEn;
    const tEmployees = lang === 'es' ? 'empleados' : 'employees';
    const tFounded = lang === 'es' ? 'fundada' : 'founded';
    const facts = [];
    if (info.industry) facts.push(info.industry);
    if (info.country) facts.push(info.country);
    if (info.founded) facts.push(`${tFounded} ${info.founded}`);
    if (info.employees && info.employees !== 'n/a') facts.push(`${info.employees} ${tEmployees}`);
    if (info.revenue && info.revenue !== 'n/a') facts.push(info.revenue);
    return (
        <div className={`pm-info pm-info--${variant}`}>
            {facts.length > 0 && (
                <div className="pm-info-facts">
                    {facts.map((f, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <span className="pm-info-dot">·</span>}
                            <span>{f}</span>
                        </React.Fragment>
                    ))}
                </div>
            )}
            <p className="pm-info-desc">{desc}</p>
            {info.extra && <p className="pm-info-extra">{info.extra}</p>}
        </div>
    );
};

const Portfolio = ({ lang, setLang, theme, toggleTheme, onSwitchToCV }) => {
    const data = lang === 'en' ? portfolioEN : portfolioES;
    const [toast, setToast] = useState(null);
    const [openClient, setOpenClient] = useState({ caseIdx: null, clientIdx: null });
    const toggleClient = (caseIdx, clientIdx) => {
        setOpenClient((o) =>
            o.caseIdx === caseIdx && o.clientIdx === clientIdx
                ? { caseIdx: null, clientIdx: null }
                : { caseIdx, clientIdx }
        );
    };
    const [openBandLogo, setOpenBandLogo] = useState({ groupIdx: null, itemIdx: null });
    const toggleBandLogo = (groupIdx, itemIdx) => {
        setOpenBandLogo((o) =>
            o.groupIdx === groupIdx && o.itemIdx === itemIdx
                ? { groupIdx: null, itemIdx: null }
                : { groupIdx, itemIdx }
        );
    };

    useEffect(() => {
        document.documentElement.classList.remove('light');
        return () => { /* noop */ };
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
                        <span>Agust&iacute;n Gugliuzza<span className="pm-brand-dot">.</span></span>
                    </a>

                    <div className="pm-nav-links">
                        <a className="pm-nav-link" href="#projects" onClick={smoothScrollTo('projects')}>
                            {data.nav.projects}
                        </a>
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
                        <button
                            className="pm-nav-btn pm-nav-icon"
                            onClick={toggleTheme}
                            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                        </button>
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
                    <HeroBackdrop theme={theme} />
                    <motion.div
                        className="pm-hero-inner"
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
                        }}
                    >
                        <motion.div
                            className="pm-hero-meta"
                            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                        >
                            {data.hero.meta.map((m, i) => (
                                <span key={i}>
                                    {i > 0 && <span className="dot"></span>}
                                    {m}
                                </span>
                            ))}
                        </motion.div>
                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                        >
                            <Editorial text={data.hero.statement} />
                        </motion.h1>
                        <motion.div
                            className="pm-hero-actions"
                            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                        >
                            <Magnetic className="pm-hero-cta" href={RECLAIM_URL} target="_blank" rel="noreferrer">
                                {data.hero.cta} <span className="arrow">&rarr;</span>
                            </Magnetic>
                            <Magnetic className="pm-hero-cta pm-hero-cta--ghost" href="#work" onClick={smoothScrollTo('work')}>
                                {data.hero.ctaSecondary} <span className="arrow">&darr;</span>
                            </Magnetic>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Selected Projects */}
                <ProjectsBento data={data.projects} />

                {/* AI end-to-end (elevated) */}
                <section className="pm-section pm-ai" id="ai">
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
                            <motion.div
                                key={i}
                                className="pm-ai-step"
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <div className="pm-ai-step-num">{s.num}</div>
                                <h5>{s.title}</h5>
                                <p>{s.body}</p>
                                <div className="pm-ai-tools">{s.tools}</div>
                            </motion.div>
                        ))}
                    </div>
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
                            <span className="pm-case-rail-date">{c.startDate}</span>
                            <div className="pm-case-meta">
                                <div className="pm-case-org-line">
                                    <Logo src={c.logo} domain={c.domain} name={c.org} size="md" theme={theme} />
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
                                <InfoBlock info={c.info} lang={lang} variant="inline" />
                                <div className="pm-case-tags">
                                    {c.tags.map((t, j) => (
                                        <span key={j} className="pm-case-tag">{t}</span>
                                    ))}
                                </div>
                                {c.clients && (
                                    <div className="pm-clients">
                                        <div className="pm-clients-label">{c.clientsLabel}</div>
                                        <div className="pm-clients-grid">
                                            {c.clients.map((cl, k) => {
                                                const isOpen = openClient.caseIdx === i && openClient.clientIdx === k;
                                                return (
                                                    <React.Fragment key={k}>
                                                        <button
                                                            type="button"
                                                            className={`pm-client ${isOpen ? 'is-open' : ''}`}
                                                            onClick={() => toggleClient(i, k)}
                                                            aria-expanded={isOpen}
                                                        >
                                                            <Logo src={cl.logo} srcDark={cl.logoDark} domain={cl.domain} name={cl.name} size="sm" theme={theme} />
                                                            <span className="pm-client-name">{cl.name}</span>
                                                            <ChevronDown size={13} className="pm-client-chev" />
                                                        </button>
                                                        {isOpen && (
                                                            <div className="pm-client-detail">
                                                                <div className="pm-client-detail-head">
                                                                    <Logo
                                                                        src={cl.logo}
                                                                        srcDark={cl.logoDark}
                                                                        domain={cl.domain}
                                                                        name={cl.name}
                                                                        size="md"
                                                                        theme={theme}
                                                                    />
                                                                    <div className="pm-client-detail-name">{cl.name}</div>
                                                                </div>
                                                                <InfoBlock info={cl.info} lang={lang} variant="detail" />
                                                            </div>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
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
                                <AppIcon url={a.url} initial={a.initial} color={a.color} />
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
                    {data.logos.groups.map((g, gi) => (
                        <div key={gi} className="pm-logos-group">
                            <div className="pm-logos-group-label">{g.label}</div>
                            <div className="pm-logos-grid">
                                {g.items.map((l, i) => {
                                    const isOpen = openBandLogo.groupIdx === gi && openBandLogo.itemIdx === i;
                                    return (
                                        <React.Fragment key={i}>
                                            <button
                                                type="button"
                                                className={`pm-band-logo ${isOpen ? 'is-open' : ''}`}
                                                onClick={() => toggleBandLogo(gi, i)}
                                                aria-expanded={isOpen}
                                                aria-label={l.name}
                                            >
                                                <Logo src={l.logo} srcDark={l.logoDark} domain={l.domain} name={l.name} size="lg" theme={theme} />
                                            </button>
                                            {isOpen && (
                                                <div className="pm-band-detail">
                                                    <div className="pm-band-detail-head">
                                                        <Logo src={l.logo} srcDark={l.logoDark} domain={l.domain} name={l.name} size="md" theme={theme} />
                                                        <div>
                                                            <div className="pm-band-detail-name">{l.name}</div>
                                                            {l.domain && (
                                                                <a className="pm-band-detail-link" href={`https://${l.domain}`} target="_blank" rel="noreferrer">
                                                                    {l.domain} <ExternalLink size={11} />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <InfoBlock info={l.info} lang={lang} variant="detail" />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
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
                    <div className="pm-footer-signature">
                        <div className="pm-footer-name">{data.footer.name}</div>
                        <div className="pm-footer-meta">{data.footer.meta}</div>
                        <div className="pm-footer-credit">{data.footer.credit}</div>
                    </div>
                    <div className="pm-footer-utility">
                        <div className="pm-footer-socials">
                            {data.footer.socials.map((s, i) => {
                                const Icon = SOCIAL_ICONS[s.platform];
                                if (!Icon) return null;
                                return (
                                    <a
                                        key={i}
                                        className="pm-footer-social"
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={s.label}
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}
                        </div>
                        <a className="pm-footer-top" href="#top" onClick={smoothScrollTo('top')}>
                            {data.footer.backToTop} &uarr;
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Portfolio;
