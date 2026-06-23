import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
    Mail, Phone, Linkedin, MapPin,
    Briefcase, GraduationCap, Code,
    Globe, Heart, Download, Sun, Moon,
    Copy, Calendar, Users, Flag,
    User, Award, ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataEN, dataES } from '../data/cvData';
import '../style.css';

const CVMode = ({ lang, setLang, onSwitchToPortfolio }) => {
    const [data, setData] = useState(lang === 'en' ? dataEN : dataES);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [toast, setToast] = useState(null);
    const [scrollDir, setScrollDir] = useState('up');

    useEffect(() => {
        setData(lang === 'en' ? dataEN : dataES);
    }, [lang]);

    useEffect(() => {
        document.documentElement.classList.toggle('light', !isDarkMode);
        return () => document.documentElement.classList.remove('light');
    }, [isDarkMode]);

    useEffect(() => {
        let lastScroll = 0;
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) setScrollDir('down');
            else setScrollDir('up');
            lastScroll = currentScroll;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`${label} copied!`);
    };

    const downloadPDF = () => {
        window.print();
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.8 } });
    };

    return (
        <MotionConfig reducedMotion="user">
        <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="toast"
                    >
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className={`nav-floating ${scrollDir === 'down' ? 'nav-hidden' : ''}`}>
                <button className="nav-btn" onClick={onSwitchToPortfolio} title={lang === 'en' ? 'Back to portfolio' : 'Volver al portfolio'}>
                    <ArrowLeft size={18} /> {lang === 'en' ? 'Portfolio' : 'Portfolio'}
                </button>
                <button className="nav-btn" onClick={() => setLang(lang === 'en' ? 'es' : 'en')}>
                    <Globe size={18} /> {lang.toUpperCase()}
                </button>
                <button className="nav-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button className="nav-btn active" onClick={downloadPDF}>
                    <Download size={18} /> PDF
                </button>
                <a className="nav-cta" href={data.calendly} target="_blank" rel="noreferrer">
                    <Calendar size={15} /> {lang === 'en' ? 'Book a call' : 'Agendar llamada'}
                </a>
            </nav>

            <div className="app-wrapper">
                <aside className="profile-section">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1>{data.name}</h1>
                        <div className="headline">{data.headline}</div>

                        <div className="contact-list">
                            {[
                                { icon: MapPin, val: data.location, label: lang === 'en' ? 'Location' : 'Ubicación' },
                                { icon: Flag, val: data.nationality, label: lang === 'en' ? 'Nationality' : 'Nacionalidad' },
                                { icon: Linkedin, val: data.linkedin, label: 'LinkedIn', link: data.linkedinUrl },
                                {
                                    icon: Mail,
                                    val: data.email,
                                    label: 'Email',
                                    link: `mailto:${data.email}`,
                                    fullWidth: true
                                },
                                {
                                    icon: Phone,
                                    val: data.phone,
                                    label: 'WhatsApp',
                                    link: `https://wa.me/${data.phone.replace(/[^\d]/g, '')}`
                                },
                                { icon: Calendar, val: 'Schedule a Meeting', label: 'Schedule', link: data.calendly }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="card contact-card"
                                    whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
                                    onClick={() => (item.link ? window.open(item.link, '_blank') : copyToClipboard(item.val, item.label))}
                                >
                                    <div className="contact-icon-box">
                                        <item.icon size={18} />
                                    </div>
                                    <div className="contact-text">
                                        <span className="contact-label">{item.label}</span>
                                        <div className="contact-val" style={item.fullWidth ? { whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip', maxWidth: 'none', wordBreak: 'break-all' } : {}}>
                                            {item.val}
                                        </div>
                                    </div>
                                    {item.link ? (
                                        <div className="external-hint"><Globe size={14} /></div>
                                    ) : (
                                        <Copy size={14} className="copy-hint" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </aside>

                <main>
                    {data.summary && (
                        <Section title={data.titles.summary} icon={User} delay={0.15}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{data.summary}</p>
                        </Section>
                    )}

                    <Section title={data.titles.experience} icon={Briefcase} delay={0.2}>
                        {data.experience.map((exp, i) => (
                            <div key={i} className="exp-row">
                                <div className="exp-dot"></div>
                                <h3 style={{ fontSize: '1.2rem' }}>{exp.company}</h3>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>{exp.location}</div>
                                {exp.roles.map((role, j) => (
                                    <div key={j} className="cv-role">
                                        <div className="cv-role-title">{role.title}</div>
                                        <div className="cv-role-dates">{role.dates}</div>
                                        <ul>
                                            {role.bullets.map((b, k) => (
                                                <li key={k}><span>•</span> {b}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Section>

                    {data.projects && data.projects.length > 0 && (
                        <Section title={data.titles.projects} icon={Award} delay={0.3}>
                            {data.projects.map((p, i) => (
                                <div key={i} className="cv-project">
                                    <div className="cv-project-title">{p.title}</div>
                                    <p className="cv-project-desc">{p.desc}</p>
                                </div>
                            ))}
                        </Section>
                    )}

                    <Section title={data.titles.education} icon={GraduationCap} delay={0.4}>
                        {data.education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '20px' }}>
                                <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{edu.school}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{edu.degree}</div>
                                <div style={{ color: 'var(--accent)', fontSize: '0.8rem', marginBottom: '6px' }}>{edu.dates} • {edu.location}</div>
                                {edu.specialization && (
                                    <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.85rem', marginBottom: '6px' }}>
                                        {edu.specialization}
                                    </div>
                                )}
                                {edu.courseworkByTerm && edu.courseworkByTerm.map((group, gi) => (
                                    <div key={gi} style={{ marginTop: gi === 0 ? '6px' : '10px' }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent)', marginBottom: '4px' }}>
                                            {group.term}
                                            {group.dates && (
                                                <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}> · {group.dates}</span>
                                            )}
                                        </div>
                                        <ul style={{ listStyle: 'none', paddingLeft: '4px', marginTop: 0 }}>
                                            {group.items.map((c, k) => (
                                                <li key={k} style={{ marginBottom: '4px', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                                                    <span style={{ color: 'var(--accent)' }}>•</span> {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                {edu.coursework && (
                                    <ul style={{ listStyle: 'none', paddingLeft: '4px', marginTop: '4px' }}>
                                        {edu.coursework.map((c, k) => (
                                            <li key={k} style={{ marginBottom: '4px', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                                                <span style={{ color: 'var(--accent)' }}>•</span> {c}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </Section>

                    <Section title={data.titles.additional} icon={Code} delay={0.5}>
                        <div className="cv-addl-row">
                            <span className="cv-addl-label">{lang === 'en' ? 'Languages' : 'Idiomas'}</span>
                            <div className="skills-grid">
                                {data.languages.map((l, i) => (
                                    <span key={i} className="skill-tag" style={{ background: 'rgba(93, 133, 255, 0.12)', color: 'var(--accent-secondary)', borderColor: 'rgba(93, 133, 255, 0.22)' }}>
                                        {l.name}: {l.level}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {data.skills.map((cat, i) => (
                            <div key={i} className="cv-addl-row">
                                <span className="cv-addl-label">{cat.category}</span>
                                <div className="skills-grid">
                                    {cat.items.map((s, j) => (
                                        <span key={j} className="skill-tag">{s}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Section>
                </main>
            </div>
        </div>
        </MotionConfig>
    );
};

const Section = ({ title, icon: Icon, children, delay }) => (
    <motion.section
        className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6 }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Icon className="text-accent" size={24} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{title}</h2>
        </div>
        {children}
    </motion.section>
);

export default CVMode;
