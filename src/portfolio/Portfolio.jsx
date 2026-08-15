import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Download, ExternalLink, ChevronDown, Twitter, Github, Linkedin, Sun, Moon, Calendar, BriefcaseBusiness, GraduationCap, BadgeCheck, Trophy, Compass, HeartPulse, Recycle, BookOpenText, Sparkles } from 'lucide-react';

/* Map a grade chip (IE band or numeric 0-10) to a color tier. */
const gradeTier = (band) => {
    const key = String(band).toLowerCase();
    if (['honors', 'excellence', 'proficiency', 'pass'].includes(key)) return key;
    if (key === 'a') return 'proficiency';
    const n = parseFloat(String(band).replace(',', '.'));
    if (!isNaN(n)) {
        if (n >= 9) return 'honors';
        if (n >= 8) return 'excellence';
        if (n >= 7) return 'proficiency';
        return 'pass';
    }
    return 'pass';
};

/* Concept icon per shipped app (keyed by name). */
const APP_ICONS = {
    'Obrex': Recycle,
    'Lect.io': GraduationCap,
    'Terranova': Compass,
    'Kick-Off Central': Trophy,
    'Bionic Reader': BookOpenText,
    'Sanctuary 75': HeartPulse
};

const SOCIAL_ICONS = { twitter: Twitter, github: Github, linkedin: Linkedin };
import confetti from 'canvas-confetti';
import { portfolioEN, portfolioES } from '../data/portfolioData';
import HeroBackdrop from './HeroBackdrop';
import Magnetic from './Magnetic';
import Editorial from './Editorial';
import ProjectsBento from './ProjectsBento';
import ReviewsSection from './ReviewsSection';
import LatestPosts from './LatestPosts';
import FloatingWhatsApp from './FloatingWhatsApp';
import CommandPalette from './CommandPalette';
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

/* App icon: a brand-colored tile with a concept line-icon (lucide). Falls
   back to the initial letter if no icon is mapped for the app. */
const AppIcon = ({ name, initial }) => {
    const Icon = APP_ICONS[name] || Sparkles;
    if (!Icon) {
        return <div className="pm-app-icon pm-app-icon--brand">{initial}</div>;
    }
    return (
        <div className="pm-app-icon pm-app-icon--brand">
            <Icon size={24} strokeWidth={1.75} />
        </div>
    );
};

/* Compact factsheet rendered inline below a case body, or below the
   clients grid when a client chip is expanded. */
const InfoBlock = ({ info, lang, variant = 'inline' }) => {
    if (!info) return null;
    const desc = lang === 'es' ? info.descEs : info.descEn;
    const work = lang === 'es' ? info.workEs : info.workEn;
    const tWork = lang === 'es' ? 'El trabajo' : 'The work';
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
            {work && (
                <div className="pm-info-work">
                    <span className="pm-info-work-label">{tWork}</span>
                    <p className="pm-info-work-text">{work}</p>
                </div>
            )}
        </div>
    );
};

const Portfolio = ({ lang, setLang, theme, toggleTheme, onSwitchToCV }) => {
    const data = lang === 'en' ? portfolioEN : portfolioES;
    const [toast, setToast] = useState(null);
    const [cmdOpen, setCmdOpen] = useState(false);
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

    const [navCompact, setNavCompact] = useState(false);
    useEffect(() => {
        const onScroll = () => setNavCompact(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
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

    const scrollToId = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const cmdActions = [
        { id: 'cv', label: lang === 'es' ? 'Descargar CV' : 'Download CV', hint: 'PDF', run: downloadPDF },
        { id: 'call', label: lang === 'es' ? 'Agendar llamada' : 'Book a call', hint: 'Reclaim', run: () => window.open(RECLAIM_URL, '_blank') },
        { id: 'lang', label: lang === 'es' ? 'Cambiar idioma' : 'Switch language', hint: lang === 'es' ? 'EN' : 'ES', run: () => setLang(lang === 'en' ? 'es' : 'en') },
        { id: 'theme', label: lang === 'es' ? 'Cambiar tema' : 'Toggle theme', hint: theme === 'dark' ? 'Light' : 'Dark', run: toggleTheme },
        { id: 'projects', label: lang === 'es' ? 'Ir a Proyectos' : 'Go to Projects', run: () => scrollToId('projects') },
        { id: 'ai', label: lang === 'es' ? 'Ir a IA' : 'Go to AI', run: () => scrollToId('ai') },
        { id: 'work', label: lang === 'es' ? 'Ir a Trabajo' : 'Go to Work', run: () => scrollToId('work') },
        { id: 'contact', label: lang === 'es' ? 'Ir a Contacto' : 'Go to Contact', run: () => scrollToId('contact') }
    ];

    return (
        <div className="portfolio-mode">
          <MotionConfig reducedMotion="user">
            <FloatingWhatsApp lang={lang} />
            <CommandPalette open={cmdOpen} setOpen={setCmdOpen} actions={cmdActions} lang={lang} />
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
            <nav className={`pm-nav ${navCompact ? 'pm-nav--compact' : ''}`}>
                <div className="pm-nav-inner">
                    <a className="pm-brand" href="#top" onClick={smoothScrollTo('top')}>
                        <img className="pm-brand-avatar" src="/assets/photo.PNG" alt="Agustín Gugliuzza" />
                        <span className="pm-brand-name">Agust&iacute;n Gugliuzza<span className="pm-brand-dot">.</span></span>
                        <span className="pm-brand-flags" aria-label="Argentina, Mexico, Italy" title="Argentina · México · Italia">🇦🇷🇲🇽🇮🇹</span>
                    </a>

                    <span className="pm-nav-divider" aria-hidden="true" />

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
                        <a className="pm-nav-link" href="#reviews" onClick={smoothScrollTo('reviews')}>
                            {data.nav.reviews}
                        </a>
                        <Link className="pm-nav-link" to="/blog">
                            {data.nav.blog}
                        </Link>
                        <a className="pm-nav-link" href="#contact" onClick={smoothScrollTo('contact')}>
                            {data.nav.contact}
                        </a>
                    </div>

                    <span className="pm-nav-divider" aria-hidden="true" />

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
                            className="pm-nav-btn pm-cmdk-chip"
                            onClick={() => setCmdOpen(true)}
                            title={lang === 'es' ? 'Abrir paleta de comandos' : 'Open command palette'}
                            aria-label="Command palette"
                        >
                            <span className="pm-cmdk-chip-key">&#8984;K</span>
                        </button>
                        <button
                            className="pm-nav-btn pm-nav-icon"
                            onClick={toggleTheme}
                            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                        </button>
                        <button className="pm-nav-btn pm-nav-icon pm-nav-download" onClick={downloadPDF} title="Print / PDF">
                            <Download size={15} />
                        </button>
                        <a className="pm-nav-cta" href={RECLAIM_URL} target="_blank" rel="noreferrer">
                            <Calendar size={14} /> <span>{data.hero.cta}</span>
                        </a>
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
                    <div className="pm-hero-grid">
                    <motion.div
                        className="pm-hero-photo-col"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="pm-hero-photo">
                            <img src="/assets/photo.PNG" alt="Agustín Gugliuzza" />
                            <span className="pm-hero-badge">Agust&iacute;n</span>
                        </div>
                        <div className="pm-hero-socials">
                            {data.footer.socials.map((s, i) => {
                                const Icon = SOCIAL_ICONS[s.platform];
                                if (!Icon) return null;
                                return (
                                    <a
                                        key={i}
                                        className="pm-hero-social"
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
                    </motion.div>
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
                        {data.hero.substatement && (
                            <motion.p
                                className="pm-hero-sub"
                                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
                            >
                                {data.hero.substatement}
                            </motion.p>
                        )}
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
                    </div>
                </section>

                {/* Selected Projects */}
                <ProjectsBento data={data.projects} />

                {/* AI end-to-end (elevated) */}
                <section className="pm-section pm-ai pm-card-section" id="ai">
                    <div className="pm-card">
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
                        <button className="pm-mode-pill pm-pill--solid" onClick={onSwitchToCV}>
                            {data.track.cta} &rarr;
                        </button>
                    </div>
                    <div className="pm-track-legend">
                        <span className="pm-track-legend-item">
                            <span className="pm-track-legend-icon pm-track-legend-icon--work" aria-hidden="true">
                                <BriefcaseBusiness size={14} strokeWidth={2} />
                            </span>
                            {data.track.legend.work}
                        </span>
                        <span className="pm-track-legend-item">
                            <span className="pm-track-legend-icon pm-track-legend-icon--education" aria-hidden="true">
                                <GraduationCap size={15} strokeWidth={2} />
                            </span>
                            {data.track.legend.education}
                        </span>
                        <span className="pm-track-legend-item">
                            <span className="pm-track-legend-icon pm-track-legend-icon--credential" aria-hidden="true">
                                <BadgeCheck size={15} strokeWidth={2} />
                            </span>
                            {data.track.legend.credential}
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
                            <span className="pm-case-marker" aria-hidden="true">
                                {c.kind === 'education' ? <GraduationCap size={15} strokeWidth={2.2} />
                                    : c.kind === 'credential' ? <BadgeCheck size={15} strokeWidth={2.2} />
                                    : <BriefcaseBusiness size={14} strokeWidth={2.2} />}
                            </span>
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
                                {c.credential && (
                                    <div className="pm-credential-card">
                                        <div className="pm-credential-brand">
                                            <span className="pm-credential-monogram">{c.credential.monogram}</span>
                                            <span className="pm-credential-kicker">{c.credential.kicker}</span>
                                        </div>
                                        <div className="pm-credential-result">
                                            <span className="pm-credential-metric">{c.credential.metric}</span>
                                            <span className="pm-credential-metric-label">{c.credential.metricLabel}</span>
                                        </div>
                                        {c.credential.details?.length > 0 && (
                                            <div className="pm-credential-details">
                                                {c.credential.details.map((d, di) => (
                                                    <span key={di}><strong>{d.value}</strong>{d.label}</span>
                                                ))}
                                            </div>
                                        )}
                                        {c.credential.verifyUrl && (
                                            <a className="pm-credential-link" href={c.credential.verifyUrl} target="_blank" rel="noreferrer">
                                                {c.credential.verifyLabel} <ExternalLink size={13} />
                                            </a>
                                        )}
                                    </div>
                                )}
                                <InfoBlock info={c.info} lang={lang} variant="inline" />
                                <div className="pm-case-tags">
                                    {c.tags.map((t, j) => (
                                        <span key={j} className="pm-case-tag">{t}</span>
                                    ))}
                                </div>
                                {c.transcript && (() => {
                                    const allCourses = c.transcript.terms.flatMap((t) => t.courses);
                                    const bc = (b) => allCourses.filter((co) => co.band === b).length;
                                    return (
                                        <details className="pm-transcript">
                                            <summary>
                                                <span className="pm-transcript-toggle">{lang === 'es' ? 'Ver transcript' : 'View transcript'}</span>
                                                <span className="pm-transcript-gpa">GPA {c.transcript.gpa}</span>
                                            </summary>
                                            <div className="pm-transcript-body">
                                                <div className="pm-transcript-stats">
                                                    {c.transcript.statsLine || `${bc('Honors')} Honors · ${bc('Excellence')} Excellence · ${bc('Proficiency')} Proficiency · ${bc('Pass')} Pass`}
                                                </div>
                                                {c.transcript.terms.map((t, ti) => (
                                                    <div key={ti} className="pm-transcript-term">
                                                        <div className="pm-transcript-term-head">
                                                            <span className="pm-transcript-term-name">{t.name}</span>
                                                            {t.gpa && <span className="pm-transcript-term-gpa">GPA {t.gpa}</span>}
                                                        </div>
                                                        <div className="pm-transcript-grid">
                                                            {t.courses.map((co, ci) => (
                                                                <div key={ci} className="pm-transcript-course" title={co.summary || undefined}>
                                                                    <span className="pm-transcript-course-name">{co.name}</span>
                                                                    <span className={`pm-band pm-band--${gradeTier(co.band)}`}>{co.band}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </details>
                                    );
                                })()}
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

                <LatestPosts lang={lang} />

                {/* Apps */}
                <section className="pm-section pm-apps" id="apps">
                    <div className="pm-eyebrow">{data.apps.eyebrow}</div>
                    <h2><Editorial text={data.apps.heading} /></h2>
                    <p className="pm-ai-lead">{data.apps.lead}</p>
                    <div className="pm-apps-grid">
                        {data.apps.items.map((a, i) => {
                            const Tag = a.url ? motion.a : motion.div;
                            const linkProps = a.url ? { href: a.url, target: '_blank', rel: 'noreferrer' } : {};
                            return (
                                <Tag
                                    key={i}
                                    className={`pm-app ${a.url ? '' : 'pm-app--static'}`}
                                    {...linkProps}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.45, delay: i * 0.05 }}
                                >
                                    <AppIcon name={a.name} initial={a.initial} />
                                    <div className="pm-app-body">
                                        <div className="pm-app-name">
                                            {a.name}
                                            {a.url && <ExternalLink size={13} className="pm-app-ext" />}
                                        </div>
                                        <p className="pm-app-desc">{a.desc}</p>
                                        <div className="pm-app-host">
                                            {a.url ? new URL(a.url).host : (lang === 'es' ? 'Demo privada' : 'Private demo')}
                                        </div>
                                    </div>
                                </Tag>
                            );
                        })}
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
                <section className="pm-section pm-principles pm-card-section" id="ideas">
                    <div className="pm-card">
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
                    </div>
                </section>

                {/* Reviews (Supabase-backed, moderated) */}
                <ReviewsSection lang={lang} />

                {/* Contact */}
                <section className="pm-section pm-contact pm-card-section" id="contact">
                    <div className="pm-card">
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
                    <div className="pm-contact-qr">
                        <img src="/assets/qr-portfolio.svg" alt="QR to agustin-gugliuzza.com" />
                        <span className="pm-contact-qr-label">
                            {lang === 'es' ? 'Escaneá para conectar' : 'Scan to connect'}
                        </span>
                    </div>
                    </div>
                </section>

                <footer className="pm-footer">
                    <div className="pm-footer-signature">
                        <div className="pm-footer-name">{data.footer.name}</div>
                        <div className="pm-footer-meta">{data.footer.meta}</div>
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
          </MotionConfig>
        </div>
    );
};

export default Portfolio;
