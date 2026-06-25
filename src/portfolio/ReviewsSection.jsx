import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { supabase, REVIEWS_TABLE } from '../lib/supabaseClient';
import { reviewsCopy } from '../data/reviewsData';

// Render a heading string with {highlighted} words in editorial italic.
const Editorial = ({ text }) => (
    <>
        {text.split(/(\{[^}]+\})/g).map((part, i) =>
            part.startsWith('{') && part.endsWith('}') ? (
                <em key={i}>{part.slice(1, -1)}</em>
            ) : (
                <React.Fragment key={i}>{part}</React.Fragment>
            )
        )}
    </>
);

const Stars = ({ value, onChange, size = 16 }) => (
    <span className="pm-rev-stars" role={onChange ? 'radiogroup' : undefined}>
        {[1, 2, 3, 4, 5].map((n) => {
            const filled = n <= value;
            const star = (
                <Star
                    size={size}
                    fill={filled ? 'currentColor' : 'none'}
                    strokeWidth={1.75}
                />
            );
            return onChange ? (
                <button
                    key={n}
                    type="button"
                    className={`pm-rev-star ${filled ? 'on' : ''}`}
                    onClick={() => onChange(n)}
                    aria-label={`${n} / 5`}
                >
                    {star}
                </button>
            ) : (
                <span key={n} className={`pm-rev-star ${filled ? 'on' : ''}`}>
                    {star}
                </span>
            );
        })}
    </span>
);

const initialForm = {
    name: '',
    role: '',
    company: '',
    relationship: '',
    rating: 5,
    body: '',
    email: '',
    website: '' // honeypot — must stay empty
};

const ReviewsSection = ({ lang }) => {
    const t = reviewsCopy[lang] || reviewsCopy.en;
    const [reviews, setReviews] = useState(null); // null = loading
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [state, setState] = useState('idle'); // idle | submitting | success | error
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        let alive = true;
        (async () => {
            const { data, error } = await supabase
                .from(REVIEWS_TABLE)
                .select('id, name, role, company, relationship, rating, body, created_at')
                .eq('show', true)
                .order('created_at', { ascending: false });
            if (!alive) return;
            setReviews(error ? [] : data || []);
        })();
        return () => {
            alive = false;
        };
    }, []);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (form.website) return; // honeypot tripped — silently drop
        if (!form.name.trim() || !form.body.trim()) {
            setState('error');
            setErrorMsg(t.form.required);
            return;
        }
        setState('submitting');
        const { error } = await supabase.from(REVIEWS_TABLE).insert({
            name: form.name.trim().slice(0, 120),
            role: form.role.trim().slice(0, 160) || null,
            company: form.company.trim().slice(0, 160) || null,
            relationship: form.relationship.trim().slice(0, 280) || null,
            rating: form.rating,
            body: form.body.trim().slice(0, 1500),
            email: form.email.trim().slice(0, 200) || null,
            show: false
        });
        if (error) {
            setState('error');
            setErrorMsg(t.form.error);
            return;
        }
        setState('success');
        setForm(initialForm);
    };

    const closeForm = () => {
        setOpen(false);
        setTimeout(() => {
            setState('idle');
            setErrorMsg('');
        }, 200);
    };

    return (
        <section className="pm-section pm-reviews" id="reviews">
            <div className="pm-eyebrow">{t.eyebrow}</div>
            <div className="pm-reviews-head">
                <h2><Editorial text={t.heading} /></h2>
                <button className="pm-mode-pill" onClick={() => setOpen(true)}>
                    {t.cta} &rarr;
                </button>
            </div>
            <p className="pm-ai-lead">{t.lead}</p>

            {reviews === null ? (
                <p className="pm-reviews-empty">{t.loading}</p>
            ) : reviews.length === 0 ? (
                <p className="pm-reviews-empty">{t.empty}</p>
            ) : (
                <div className="pm-reviews-grid">
                    {reviews.map((r) => (
                        <motion.figure
                            key={r.id}
                            className="pm-review"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.45 }}
                        >
                            <blockquote className="pm-review-body">{r.body}</blockquote>
                            <figcaption className="pm-review-by">
                                <Stars value={r.rating} />
                                <span className="pm-review-name">{r.name}</span>
                                {(r.role || r.company) && (
                                    <span className="pm-review-role">
                                        {[r.role, r.company].filter(Boolean).join(' · ')}
                                    </span>
                                )}
                                {r.relationship && (
                                    <span className="pm-review-rel">{r.relationship}</span>
                                )}
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="pm-rev-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeForm}
                    >
                        <motion.div
                            className="pm-rev-modal"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="pm-rev-close" onClick={closeForm} aria-label="Close">
                                <X size={18} />
                            </button>
                            {state === 'success' ? (
                                <div className="pm-rev-success">
                                    <h3>{t.form.title}</h3>
                                    <p>{t.form.success}</p>
                                    <button className="pm-nav-cta" onClick={closeForm}>OK</button>
                                </div>
                            ) : (
                                <form className="pm-rev-form" onSubmit={submit}>
                                    <h3>{t.form.title}</h3>
                                    <p className="pm-rev-sub">{t.form.subtitle}</p>

                                    <div className="pm-rev-row">
                                        <label>
                                            <span>{t.form.name} *</span>
                                            <input value={form.name} onChange={set('name')} maxLength={120} required />
                                        </label>
                                        <label>
                                            <span>{t.form.role}</span>
                                            <input value={form.role} onChange={set('role')} maxLength={160} />
                                        </label>
                                    </div>

                                    <div className="pm-rev-row">
                                        <label>
                                            <span>{t.form.company}</span>
                                            <input value={form.company} onChange={set('company')} maxLength={160} />
                                        </label>
                                        <label>
                                            <span>{t.form.email}</span>
                                            <input type="email" value={form.email} onChange={set('email')} maxLength={200} />
                                        </label>
                                    </div>

                                    <label>
                                        <span>{t.form.relationship}</span>
                                        <input
                                            value={form.relationship}
                                            onChange={set('relationship')}
                                            placeholder={t.form.relationshipPlaceholder}
                                            maxLength={280}
                                        />
                                    </label>

                                    <label className="pm-rev-rating-field">
                                        <span>{t.form.rating}</span>
                                        <Stars value={form.rating} onChange={(n) => setForm((f) => ({ ...f, rating: n }))} size={22} />
                                    </label>

                                    <label>
                                        <span>{t.form.body} *</span>
                                        <textarea
                                            value={form.body}
                                            onChange={set('body')}
                                            placeholder={t.form.bodyPlaceholder}
                                            rows={4}
                                            maxLength={1500}
                                            required
                                        />
                                    </label>

                                    {/* Honeypot: hidden from humans, bots fill it */}
                                    <input
                                        className="pm-rev-honey"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={form.website}
                                        onChange={set('website')}
                                        aria-hidden="true"
                                    />

                                    {state === 'error' && <p className="pm-rev-error">{errorMsg}</p>}

                                    <button className="pm-nav-cta pm-rev-submit" type="submit" disabled={state === 'submitting'}>
                                        {state === 'submitting' ? t.form.submitting : t.form.submit}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ReviewsSection;
