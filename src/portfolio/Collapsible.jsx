import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const EXPAND_SECTION_EVENT = 'pm-expand-section';

const COPY = {
    en: { collapse: 'Collapse section', expand: 'Expand section' },
    es: { collapse: 'Contraer sección', expand: 'Expandir sección' }
};

export function expandSection(id) {
    if (typeof window === 'undefined' || !id) return;
    window.dispatchEvent(new CustomEvent(EXPAND_SECTION_EVENT, { detail: id }));
}

function useSectionCollapse(id, defaultOpen = true) {
    const [open, setOpen] = useState(defaultOpen);

    useEffect(() => {
        const expand = () => setOpen(true);
        const onEvent = (e) => {
            if (e.detail === id) expand();
        };
        const onHash = () => {
            const hash = window.location.hash.replace(/^#/, '');
            if (hash && hash === id) expand();
        };
        window.addEventListener(EXPAND_SECTION_EVENT, onEvent);
        window.addEventListener('hashchange', onHash);
        onHash();
        return () => {
            window.removeEventListener(EXPAND_SECTION_EVENT, onEvent);
            window.removeEventListener('hashchange', onHash);
        };
    }, [id]);

    const toggle = useCallback(() => setOpen((v) => !v), []);
    return { open, setOpen, toggle };
}

export function SectionToggle({ open, onToggle, panelId, lang, children }) {
    const t = COPY[lang] || COPY.en;
    const hint = open ? t.collapse : t.expand;
    return (
        <button
            type="button"
            className={`pm-section-toggle${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls={panelId}
            title={hint}
            onClick={onToggle}
        >
            {children}
            <ChevronDown className="pm-section-toggle-icon" aria-hidden="true" strokeWidth={2.25} />
            <span className="pm-section-toggle-hint">{hint}</span>
        </button>
    );
}

export function SectionPanel({ id, open, children, className = '' }) {
    return (
        <div
            id={id}
            className={`pm-section-panel${open ? ' is-open' : ''}${className ? ` ${className}` : ''}`}
            role="region"
            aria-hidden={!open}
            {...(!open ? { inert: '' } : {})}
        >
            <div className="pm-section-panel-inner">{children}</div>
        </div>
    );
}

/* Render-prop wrapper so each section keeps its own markup.
   Toggle/Panel identities stay stable so the heading button is not remounted. */
const Collapsible = ({ id, lang, defaultOpen = true, children }) => {
    const { open, toggle } = useSectionCollapse(id, defaultOpen);
    const panelId = `${id}-panel`;
    const apiRef = useRef({ open, toggle, panelId, lang });
    apiRef.current = { open, toggle, panelId, lang };
    const usedId = useRef(false);
    usedId.current = false;

    const Toggle = useCallback(({ children: label }) => {
        const api = apiRef.current;
        return (
            <SectionToggle open={api.open} onToggle={api.toggle} panelId={api.panelId} lang={api.lang}>
                {label}
            </SectionToggle>
        );
    }, []);

    const Panel = useCallback(({ children: body, className }) => {
        const api = apiRef.current;
        const thisId = usedId.current ? undefined : api.panelId;
        usedId.current = true;
        return (
            <SectionPanel id={thisId} open={api.open} className={className}>
                {body}
            </SectionPanel>
        );
    }, []);

    return children({ open, Toggle, Panel, panelId });
};

export default Collapsible;
