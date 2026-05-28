import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    Mail, Phone, Linkedin, MapPin,
    Briefcase, GraduationCap, Code,
    Globe, Heart, Download, Sun, Moon,
    Copy, Calendar, Users, Flag,
    User, Award, ArrowUpRight, ArrowDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataEN, dataES } from './data/cvData';

const SECTION_IDS = ['about', 'experience', 'education', 'skills', 'contact'];

const App = () => {
    const [lang, setLang] = useState('en');
    const [data, setData] = useState(dataEN);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [toast, setToast] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        setData(lang === 'en' ? dataEN : dataES);
    }, [lang]);

    useEffect(() => {
        document.documentElement.classList.toggle('light', !isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const t = lang === 'en'
        ? {
            available: 'Available for opportunities',
            navLabels: ['About', 'Experience', 'Education', 'Skills', 'Contact'],
            scroll: 'Scroll',
            heroCtaPrimary: 'Get in touch',
            heroCtaPdf: 'Download CV',
            heroCtaSchedule: 'Schedule a call',
            location: 'Based in',
            age: 'Age',
            years: 'years',
            nationality: 'Citizenship',
            stats: [
                { num: '5+', label: 'Years leading digital and operational transformation programs' },
                { num: '20%', label: 'Time-to-market reduction through PMO governance' },
                { num: '10+', label: 'ICT initiatives delivered in multi-vendor environments' },
                { num: 'IMBA', label: 'IE Business School, expected Jul 2026' }
            ],
            contactHeading: 'Let’s build',
            contactHeadingEm: 'something.',
            contactSub: 'Open to senior PM and strategy roles in digital and operational transformation. Reach out — I usually reply within 24 hours.',
            copyright: '© Agustín Gugliuzza Piccinini'
        }
        : {
            available: 'Disponible para oportunidades',
            navLabels: ['Sobre mí', 'Experiencia', 'Educación', 'Skills', 'Contacto'],
            scroll: 'Bajar',
            heroCtaPrimary: 'Hablemos',
            heroCtaPdf: 'Descargar CV',
            heroCtaSchedule: 'Agendar llamada',
            location: 'Vivo en',
            age: 'Edad',
            years: 'años',
            nationality: 'Nacionalidad',
            stats: [
                { num: '5+', label: 'Años liderando programas de transformación digital y operativa' },
                { num: '20%', label: 'Reducción de time-to-market mediante gobierno PMO' },
                { num: '10+', label: 'Iniciativas ICT entregadas en entornos multi-proveedor' },
                { num: 'IMBA', label: 'IE Business School, esperado Jul 2026' }
            ],
            contactHeading: 'Construyamos',
            contactHeadingEm: 'algo juntos.',
            contactSub: 'Abierto a roles senior de PM y estrategia en transformación digital y operativa. Escribime — suelo responder en menos de 24 horas.',
            copyright: '© Agustín Gugliuzza Piccinini'
        };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2400);
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`${label} ${lang === 'en' ? 'copied' : 'copiado'}`);
    };

    const downloadPDF = () => {
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.85 },
            colors: ['#6366f1', '#ec4899', '#10b981', '#ffffff']
        });
        setTimeout(() => window.print(), 250);
    };

    const splitFirstPhrase = (text) => {
        const idx = text.indexOf(':');
        if (idx > -1 && idx < 80) {
            return { phrase: text.slice(0, idx + 1), rest: text.slice(idx + 1) };
        }
        return { phrase: '', rest: text };
    };

    return (
        <div className="app">
            <BackgroundDecor />
            <motion.div className="scroll-progress" style={{ scaleX: progress }} />

            <header className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
                <a href="#top" className="brand">
                    <span className="brand-dot" />
                    <span>Agustín <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>G.</em></span>
                </a>

                <nav className="nav-links">
                    {SECTION_IDS.map((id, i) => (
                        <a key={id} href={`#${id}`} className="nav-link">
                            <span className="nav-link-num">{String(i + 1).padStart(2, '0')}</span>
                            {t.navLabels[i]}
                        </a>
                    ))}
                </nav>

                <div className="nav-controls">
                    <button
                        className="icon-btn"
                        onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                        aria-label="Toggle language"
                        title={lang === 'en' ? 'Español' : 'English'}
                    >
                        <Globe size={16} />
                        <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>{lang.toUpperCase()}</span>
                    </button>
                    <button
                        className="icon-btn"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button className="icon-btn primary" onClick={downloadPDF}>
                        <Download size={14} />
                        <span>PDF</span>
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="toast"
                    >
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            <main id="top">
                <Hero data={data} lang={lang} t={t} calculateAge={calculateAge} downloadPDF={downloadPDF} />

                <section id="about" className="section">
                    <div className="container">
                        <SectionEyebrow num="01">{t.navLabels[0]}</SectionEyebrow>
                        <SectionHeading>
                            {lang === 'en'
                                ? <>A strategist who turns complex programs into <em>measurable outcomes</em>.</>
                                : <>Un estratega que convierte programas complejos en <em>resultados medibles</em>.</>
                            }
                        </SectionHeading>

                        <div className="about-grid">
                            <Reveal>
                                <div className="about-text">
                                    <p>{data.summary}</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <div className="about-stats">
                                    {t.stats.map((s, i) => (
                                        <div key={i} className="stat-card">
                                            <div className="stat-number">
                                                <span className="em">{s.num}</span>
                                            </div>
                                            <div className="stat-label">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                <section id="experience" className="section">
                    <div className="container">
                        <SectionEyebrow num="02">{t.navLabels[1]}</SectionEyebrow>
                        <SectionHeading>
                            {lang === 'en'
                                ? <>Where I’ve <em>delivered</em>.</>
                                : <>Donde he <em>entregado</em>.</>
                            }
                        </SectionHeading>

                        <div className="timeline">
                            {data.experience.flatMap((exp) =>
                                exp.roles.map((role, j) => ({
                                    company: exp.company,
                                    location: exp.location,
                                    ...role,
                                    key: `${exp.company}-${j}`
                                }))
                            ).map((item, i) => (
                                <Reveal key={item.key} delay={i * 0.05}>
                                    <article className="timeline-item">
                                        <div className="timeline-meta">
                                            <div className="timeline-dates">{item.dates}</div>
                                            <div className="timeline-company">{item.company}</div>
                                            <div className="timeline-location">
                                                <MapPin size={12} /> {item.location}
                                            </div>
                                        </div>
                                        <div className="timeline-body">
                                            <h3 className="timeline-title">{item.title}</h3>
                                            <ul className="bullet-list">
                                                {item.bullets.map((b, k) => {
                                                    const { phrase, rest } = splitFirstPhrase(b);
                                                    return (
                                                        <li key={k}>
                                                            {phrase && <span className="phrase">{phrase}</span>}{rest}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="education" className="section">
                    <div className="container">
                        <SectionEyebrow num="03">{t.navLabels[2]}</SectionEyebrow>
                        <SectionHeading>
                            {lang === 'en'
                                ? <>Trained in <em>business</em> and <em>systems</em>.</>
                                : <>Formado en <em>negocio</em> y <em>sistemas</em>.</>
                            }
                        </SectionHeading>

                        <div className="edu-grid">
                            {data.education.map((edu, i) => (
                                <Reveal key={i} delay={i * 0.08}>
                                    <article className="edu-card">
                                        <div className="edu-head">
                                            <h3 className="edu-school">{edu.school}</h3>
                                            <div className="edu-dates">{edu.dates}</div>
                                        </div>
                                        <div className="edu-degree">{edu.degree}</div>
                                        {edu.specialization && <div className="edu-spec">{edu.specialization}</div>}
                                        <div className="edu-location"><MapPin size={12} /> {edu.location}</div>

                                        {edu.courseworkByTerm && edu.courseworkByTerm.map((group, gi) => (
                                            <div key={gi} className="edu-term">
                                                <div className="edu-term-title">{group.term}</div>
                                                {group.dates && <div className="edu-term-dates">{group.dates}</div>}
                                                <ul className="edu-list">
                                                    {group.items.map((c, k) => <li key={k}>{c}</li>)}
                                                </ul>
                                            </div>
                                        ))}

                                        {edu.coursework && (
                                            <div className="edu-term">
                                                <ul className="edu-list">
                                                    {edu.coursework.map((c, k) => <li key={k}>{c}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="skills" className="section">
                    <div className="container">
                        <SectionEyebrow num="04">{t.navLabels[3]}</SectionEyebrow>
                        <SectionHeading>
                            {lang === 'en'
                                ? <>Tools I <em>think</em> and <em>build</em> with.</>
                                : <>Herramientas con las que <em>pienso</em> y <em>construyo</em>.</>
                            }
                        </SectionHeading>

                        <div className="skills-wrap">
                            {data.skills.map((cat, i) => (
                                <Reveal key={i} delay={i * 0.05}>
                                    <div className="skill-block">
                                        <h3 className="skill-category">{cat.category}</h3>
                                        <div className="skill-chips">
                                            {cat.items.map((s, j) => (
                                                <span key={j} className="chip">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <div className="row-grid" style={{ marginTop: 24 }}>
                            <Reveal>
                                <div className="skill-block">
                                    <h3 className="skill-category">{data.titles.languages}</h3>
                                    <div className="skill-chips">
                                        {data.languages.map((l, i) => (
                                            <span key={i} className="chip lang">
                                                {l.name}<span className="lvl">· {l.level}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={0.05}>
                                <div className="skill-block">
                                    <h3 className="skill-category">{data.titles.softSkills}</h3>
                                    <div className="skill-chips">
                                        {data.softSkills.map((s, i) => <span key={i} className="chip">{s}</span>)}
                                    </div>
                                </div>
                            </Reveal>

                            {data.certifications && data.certifications.length > 0 && (
                                <Reveal delay={0.1}>
                                    <div className="skill-block">
                                        <h3 className="skill-category">{data.titles.certifications}</h3>
                                        <div className="skill-chips">
                                            {data.certifications.map((c, i) => <span key={i} className="chip accent">{c}</span>)}
                                        </div>
                                    </div>
                                </Reveal>
                            )}

                            <Reveal delay={0.15}>
                                <div className="skill-block">
                                    <h3 className="skill-category">{data.titles.other}</h3>
                                    <div className="skill-chips">
                                        {data.other.map((o, i) => <span key={i} className="chip">{o}</span>)}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                <section id="contact" className="contact">
                    <div className="container">
                        <Reveal>
                            <h2 className="contact-heading">
                                {t.contactHeading} <em>{t.contactHeadingEm}</em>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.05}>
                            <p className="contact-sub">{t.contactSub}</p>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div className="contact-list">
                                <ContactCard
                                    icon={Mail}
                                    label="Email"
                                    value={data.email}
                                    link={`mailto:${data.email}`}
                                />
                                <ContactCard
                                    icon={Calendar}
                                    label={lang === 'en' ? 'Schedule' : 'Agendá'}
                                    value={lang === 'en' ? 'Book a call' : 'Reservá una llamada'}
                                    link={data.calendly}
                                />
                                <ContactCard
                                    icon={Phone}
                                    label="WhatsApp"
                                    value={data.phone}
                                    link={`https://wa.me/${data.phone.replace(/[^\d]/g, '')}`}
                                />
                                <ContactCard
                                    icon={Linkedin}
                                    label="LinkedIn"
                                    value={`@${data.linkedin}`}
                                    link={data.linkedinUrl}
                                />
                            </div>
                        </Reveal>

                        <div className="footer-bottom">
                            <div>{t.copyright} — {new Date().getFullYear()}</div>
                            <div className="footer-bottom-meta">
                                <span><MapPin size={12} /> {data.location}</span>
                                <span><Flag size={12} /> {data.nationality}</span>
                                <span><Calendar size={12} /> {calculateAge(data.dob)} {t.years}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

/* ---------- Sub-components ---------- */

const BackgroundDecor = () => (
    <div className="bg-decor" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="grain" />
    </div>
);

const SectionEyebrow = ({ num, children }) => (
    <Reveal>
        <div className="section-eyebrow">
            <span>{num}</span>
            <span>/</span>
            <span>{children}</span>
        </div>
    </Reveal>
);

const SectionHeading = ({ children }) => (
    <Reveal delay={0.05}>
        <h2 className="section-heading">{children}</h2>
    </Reveal>
);

const Reveal = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

const Hero = ({ data, lang, t, calculateAge, downloadPDF }) => {
    const [first, ...rest] = data.name.split(' ');
    const surname = rest.join(' ');

    return (
        <section className="hero container">
            <div className="hero-grid">
                <div>
                    <motion.div
                        className="hero-status"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="status-dot" />
                        <span>{t.available} · {data.location}</span>
                    </motion.div>

                    <h1 className="hero-name">
                        <motion.span
                            className="line"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {first}
                        </motion.span>
                        <motion.span
                            className="line"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="em">{surname}</span>
                        </motion.span>
                    </h1>

                    <motion.p
                        className="hero-headline"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        {data.headline}
                    </motion.p>

                    <motion.div
                        className="hero-ctas"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <a className="cta primary" href={`mailto:${data.email}`}>
                            <Mail size={16} />
                            {t.heroCtaPrimary}
                            <ArrowUpRight size={16} className="cta-arrow" />
                        </a>
                        <a className="cta" href={data.calendly} target="_blank" rel="noreferrer">
                            <Calendar size={16} />
                            {t.heroCtaSchedule}
                        </a>
                        <button className="cta" onClick={downloadPDF}>
                            <Download size={16} />
                            {t.heroCtaPdf}
                        </button>
                    </motion.div>

                    <motion.div
                        className="hero-meta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.55 }}
                    >
                        <div className="hero-meta-item">
                            <div>
                                <div className="hero-meta-label">{t.location}</div>
                                <div>{data.location}</div>
                            </div>
                        </div>
                        <div className="hero-meta-item">
                            <div>
                                <div className="hero-meta-label">{t.nationality}</div>
                                <div>{data.nationality}</div>
                            </div>
                        </div>
                        <div className="hero-meta-item">
                            <div>
                                <div className="hero-meta-label">{t.age}</div>
                                <div>{calculateAge(data.dob)} {t.years}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="hero-photo"
                    initial={{ opacity: 0, scale: 0.94, rotate: 3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <img src="/assets/photo.PNG" alt={data.name} />
                    <div className="hero-photo-tag">
                        <span>{lang === 'en' ? 'Currently' : 'Actualmente'}</span>
                        <span>IMBA · IE Business School</span>
                    </div>
                </motion.div>
            </div>

            <a className="scroll-cue" href="#about" aria-label="Scroll to about">
                <span>{t.scroll}</span>
                <span className="scroll-cue-line" />
            </a>
        </section>
    );
};

const ContactCard = ({ icon: Icon, label, value, link }) => (
    <a className="contact-card" href={link} target={link.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        <div className="contact-card-icon">
            <Icon size={20} />
        </div>
        <div className="contact-card-body">
            <div className="contact-card-label">{label}</div>
            <div className="contact-card-value">{value}</div>
        </div>
        <ArrowUpRight size={16} className="contact-card-hint" />
    </a>
);

export default App;
