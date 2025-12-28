import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Phone, Linkedin, MapPin,
    Briefcase, GraduationCap, Code,
    Globe, Heart, Download, Sun, Moon,
    Copy, Calendar, Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataEN, dataES } from './data/cvData';

const App = () => {
    const [lang, setLang] = useState('en');
    const [data, setData] = useState(dataEN);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [toast, setToast] = useState(null);
    const [scrollDir, setScrollDir] = useState("up");

    useEffect(() => {
        setData(lang === 'en' ? dataEN : dataES);
    }, [lang]);

    useEffect(() => {
        document.documentElement.classList.toggle('light', !isDarkMode);
    }, [isDarkMode]);

    // Scroll logic for floating nav
    useEffect(() => {
        let lastScroll = 0;
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) setScrollDir("down");
            else setScrollDir("up");
            lastScroll = currentScroll;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`${label} copied!`);
    };

    const downloadPDF = () => {
        window.print();
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.8 }
        });
    };



    return (
        <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>

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

            <nav className={`nav-floating ${scrollDir === "down" ? "nav-hidden" : ""}`}>
                <button className="nav-btn" onClick={() => setLang(lang === 'en' ? 'es' : 'en')}>
                    <Globe size={18} /> {lang.toUpperCase()}
                </button>
                <button className="nav-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button className="nav-btn active" onClick={downloadPDF}>
                    <Download size={18} /> PDF
                </button>
            </nav>

            <div className="app-wrapper">
                {/* Sidebar */}
                <aside className="profile-section">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="photo-frame">
                            <img src="/assets/photo.PNG" alt={data.name} />
                        </div>
                        <h1>{data.name}</h1>
                        <div className="headline">{data.headline}</div>

                        <div className="contact-list">
                            {[
                                {
                                    icon: Mail,
                                    val: data.email,
                                    label: "Email",
                                    link: `mailto:${data.email}`
                                },
                                {
                                    icon: Phone,
                                    val: data.phone,
                                    label: "WhatsApp",
                                    link: `https://wa.me/${data.phone.replace(/[^\d]/g, '')}`
                                },
                                {
                                    icon: Linkedin,
                                    val: data.linkedin,
                                    label: "LinkedIn",
                                    link: `https://${data.linkedin}`
                                },
                                {
                                    icon: MapPin,
                                    val: data.location,
                                    label: "Location"
                                },
                                {
                                    icon: Calendar,
                                    val: "Schedule a Meeting",
                                    label: "Calendly",
                                    link: data.calendly
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="card contact-card"
                                    whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
                                    onClick={() => item.link ? window.open(item.link, '_blank') : copyToClipboard(item.val, item.label)}
                                >
                                    <div className="contact-icon-box">
                                        <item.icon size={18} />
                                    </div>
                                    <div className="contact-text">
                                        <span className="contact-label">{item.label}</span>
                                        <div className="contact-val">{item.val}</div>
                                    </div>
                                    {item.link ? (
                                        <div className="external-hint">
                                            <Globe size={14} />
                                        </div>
                                    ) : (
                                        <Copy size={14} className="copy-hint" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </aside>

                {/* Main Content */}
                <main>
                    <Section title={data.titles.experience} icon={Briefcase} delay={0.2}>
                        {data.experience.map((exp, i) => (
                            <div key={i} className="exp-row">
                                <div className="exp-dot"></div>
                                <h3 style={{ fontSize: '1.2rem' }}>{exp.company}</h3>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>{exp.location}</div>
                                {exp.roles.map((role, j) => (
                                    <div key={j} style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px' }}>
                                        <div style={{ fontWeight: 600 }}>{role.title}</div>
                                        <div style={{ color: 'var(--accent)', fontSize: '0.85rem', marginBottom: '8px' }}>{role.dates}</div>
                                        <ul style={{ listStyle: 'none', paddingLeft: '4px' }}>
                                            {role.bullets.map((b, k) => (
                                                <li key={k} style={{ marginBottom: '6px', fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                                                    <span style={{ color: 'var(--accent)' }}>•</span> {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Section>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <Section title={data.titles.education} icon={GraduationCap} delay={0.4}>
                            {data.education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: '16px' }}>
                                    <div style={{ fontWeight: 700 }}>{edu.school}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{edu.degree}</div>
                                    <div style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>{edu.dates} • {edu.location}</div>
                                </div>
                            ))}
                        </Section>

                        <Section title={data.titles.languages} icon={Globe} delay={0.5}>
                            <div className="skills-grid">
                                {data.languages.map((l, i) => (
                                    <span key={i} className="skill-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                        {l.name}: {l.level}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <Section title={data.titles.skills} icon={Code} delay={0.6}>
                            <div className="skills-grid">
                                {data.skills.map((s, i) => (
                                    <motion.span
                                        key={i}
                                        className="skill-tag"
                                        whileHover={{ scale: 1.1, backgroundColor: 'var(--accent)', color: 'white' }}
                                    >
                                        {s}
                                    </motion.span>
                                ))}
                            </div>
                        </Section>

                        <Section title={data.titles.softSkills} icon={Users} delay={0.65}>
                            <div className="skills-grid">
                                {data.softSkills.map((s, i) => (
                                    <motion.span
                                        key={i}
                                        className="skill-tag"
                                        whileHover={{ scale: 1.1, backgroundColor: 'var(--accent)', color: 'white' }}
                                    >
                                        {s}
                                    </motion.span>
                                ))}
                            </div>
                        </Section>
                    </div>

                    <Section title={data.titles.other} icon={Heart} delay={0.7}>
                        {data.other.map((o, i) => (
                            <p key={i} style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.95rem' }}>• {o}</p>
                        ))}
                    </Section>
                </main>
            </div>


        </div>
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

export default App;
