import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Cmd/Ctrl+K command palette. Controlled via open/setOpen so a nav chip can
   also open it. Filterable, keyboard navigable (arrows + Enter), Esc closes. */
const CommandPalette = ({ open, setOpen, actions, lang }) => {
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen((o) => !o);
            } else if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [setOpen]);

    useEffect(() => {
        if (open) {
            setQuery('');
            setActive(0);
            const t = setTimeout(() => inputRef.current?.focus(), 10);
            return () => clearTimeout(t);
        }
    }, [open]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return actions;
        return actions.filter(
            (a) => a.label.toLowerCase().includes(q) || (a.hint || '').toLowerCase().includes(q)
        );
    }, [query, actions]);

    const run = (a) => {
        setOpen(false);
        a.run();
    };

    const onInputKey = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filtered[active]) run(filtered[active]);
        }
    };

    const placeholder = lang === 'es' ? 'Buscar una acción...' : 'Search an action...';
    const emptyText = lang === 'es' ? 'Sin resultados' : 'No results';

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="pm-cmdk-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        className="pm-cmdk"
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, scale: 0.97, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -8 }}
                        transition={{ duration: 0.16 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <input
                            ref={inputRef}
                            className="pm-cmdk-input"
                            value={query}
                            placeholder={placeholder}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setActive(0);
                            }}
                            onKeyDown={onInputKey}
                        />
                        <ul className="pm-cmdk-list">
                            {filtered.length === 0 && <li className="pm-cmdk-empty">{emptyText}</li>}
                            {filtered.map((a, i) => (
                                <li
                                    key={a.id}
                                    className={`pm-cmdk-item ${i === active ? 'active' : ''}`}
                                    onMouseEnter={() => setActive(i)}
                                    onClick={() => run(a)}
                                >
                                    <span>{a.label}</span>
                                    {a.hint && <span className="pm-cmdk-hint">{a.hint}</span>}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
