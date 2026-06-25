import React, { useEffect, useState } from 'react';
import { Star, Check, Trash2, LogOut } from 'lucide-react';
import { supabase, REVIEWS_TABLE, ADMIN_EMAIL } from '../lib/supabaseClient';

const Stars = ({ value }) => (
    <span className="pm-rev-stars">
        {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} size={14} fill={n <= value ? 'currentColor' : 'none'} strokeWidth={1.75} className={n <= value ? 'on' : ''} />
        ))}
    </span>
);

const AdminReviews = () => {
    const [session, setSession] = useState(undefined); // undefined = checking
    const [email, setEmail] = useState(ADMIN_EMAIL);
    const [code, setCode] = useState('');
    const [step, setStep] = useState('email'); // email | code
    const [authMsg, setAuthMsg] = useState('');
    const [busy, setBusy] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [filter, setFilter] = useState('pending');

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => setSession(data.session || null));
        const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s || null));
        return () => sub.subscription.unsubscribe();
    }, []);

    const load = async () => {
        const { data, error } = await supabase
            .from(REVIEWS_TABLE)
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) setReviews(data || []);
    };

    useEffect(() => {
        if (session) load();
    }, [session]);

    const sendCode = async (e) => {
        e.preventDefault();
        setBusy(true);
        setAuthMsg('');
        const { error } = await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: { shouldCreateUser: true }
        });
        setBusy(false);
        if (error) {
            setAuthMsg(error.message);
            return;
        }
        setStep('code');
        setAuthMsg('We emailed you a 6-digit code.');
    };

    const verify = async (e) => {
        e.preventDefault();
        setBusy(true);
        setAuthMsg('');
        const { error } = await supabase.auth.verifyOtp({
            email: email.trim(),
            token: code.trim(),
            type: 'email'
        });
        setBusy(false);
        if (error) setAuthMsg(error.message);
    };

    const setStatus = async (id, status) => {
        setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
        const { error } = await supabase.from(REVIEWS_TABLE).update({ status }).eq('id', id);
        if (error) load();
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    if (session === undefined) {
        return <div className="pm-admin-wrap"><p>Loading…</p></div>;
    }

    if (!session) {
        return (
            <div className="pm-admin-wrap">
                <div className="pm-admin-card">
                    <h1>Reviews admin</h1>
                    {step === 'email' ? (
                        <form onSubmit={sendCode} className="pm-rev-form">
                            <label>
                                <span>Admin email</span>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </label>
                            <button className="pm-nav-cta" type="submit" disabled={busy}>
                                {busy ? 'Sending…' : 'Send code'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={verify} className="pm-rev-form">
                            <label>
                                <span>6-digit code</span>
                                <input value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" maxLength={8} required />
                            </label>
                            <button className="pm-nav-cta" type="submit" disabled={busy}>
                                {busy ? 'Verifying…' : 'Verify & sign in'}
                            </button>
                            <button type="button" className="pm-admin-link" onClick={() => setStep('email')}>Use a different email</button>
                        </form>
                    )}
                    {authMsg && <p className="pm-rev-sub">{authMsg}</p>}
                </div>
            </div>
        );
    }

    const counts = {
        pending: reviews.filter((r) => r.status === 'pending').length,
        approved: reviews.filter((r) => r.status === 'approved').length,
        rejected: reviews.filter((r) => r.status === 'rejected').length
    };
    const shown = reviews.filter((r) => r.status === filter);

    return (
        <div className="pm-admin-wrap">
            <header className="pm-admin-head">
                <h1>Reviews</h1>
                <button className="pm-admin-link" onClick={signOut}><LogOut size={14} /> Sign out</button>
            </header>

            <div className="pm-admin-tabs">
                {['pending', 'approved', 'rejected'].map((s) => (
                    <button
                        key={s}
                        className={`pm-admin-tab ${filter === s ? 'active' : ''}`}
                        onClick={() => setFilter(s)}
                    >
                        {s} ({counts[s]})
                    </button>
                ))}
            </div>

            {shown.length === 0 ? (
                <p className="pm-reviews-empty">Nothing here.</p>
            ) : (
                <div className="pm-admin-list">
                    {shown.map((r) => (
                        <div key={r.id} className="pm-admin-item">
                            <div className="pm-admin-item-top">
                                <Stars value={r.rating} />
                                <span className="pm-admin-date">{new Date(r.created_at).toLocaleDateString()}</span>
                            </div>
                            <blockquote className="pm-review-body">{r.body}</blockquote>
                            <div className="pm-review-by">
                                <span className="pm-review-name">{r.name}</span>
                                {(r.role || r.company) && (
                                    <span className="pm-review-role">{[r.role, r.company].filter(Boolean).join(' · ')}</span>
                                )}
                                {r.relationship && <span className="pm-review-rel">{r.relationship}</span>}
                                {r.email && <span className="pm-admin-email">{r.email}</span>}
                            </div>
                            <div className="pm-admin-actions">
                                {r.status !== 'approved' && (
                                    <button className="pm-admin-btn approve" onClick={() => setStatus(r.id, 'approved')}>
                                        <Check size={14} /> Approve
                                    </button>
                                )}
                                {r.status !== 'rejected' && (
                                    <button className="pm-admin-btn reject" onClick={() => setStatus(r.id, 'rejected')}>
                                        <Trash2 size={14} /> Reject
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminReviews;
