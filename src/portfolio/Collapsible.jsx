import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const EXPAND_SECTION_EVENT = 'pm-expand-section';

const COPY = {
    en: {
        collapse: 'Collapse section',
        expand: 'Expand section',
        hide: 'Hide',
        show: 'Show'
    },
    es: {
        collapse: 'Contraer sección',
        expand: 'Expandir sección',
        hide: 'Ocultar',
        show: 'Mostrar'
    }
};

export function expandSection(id) {
    if (typeof window === 'undefined' || !id) return;
    window.dispatchEvent(new CustomEvent(EXPAND_SECTION_EVENT, { detail: id }));
}

export const plainHeading = (text) => String(text || '').replace(/[{}]/g, '');

const remembered = new Map();

function useSectionCollapse(id, defaultOpen = false) {
    const [open, setOpen] = useState(() => (remembered.has(id) ? remembered.get(id) : defaultOpen));

    useEffect(() => {
        remembered.set(id, open);
    }, [id, open]);

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

export function FoldButton({
    open,
    onToggle,
    panelId,
    lang,
    kicker,
    title,
    preview,
    avatar
}) {
    const t = COPY[lang] || COPY.en;
    const action = open ? t.hide : t.show;
    const hint = open ? t.collapse : t.expand;
    return (
        <button
            type="button"
            className={`pm-fold${open ? ' is-open' : ''}${avatar ? ' pm-fold--portrait' : ''}`}
            aria-expanded={open}
            aria-controls={panelId}
            title={hint}
            onClick={onToggle}
        >
            {avatar && !open && (
                <img className="pm-fold-avatar" src={avatar} alt="" width="56" height="56" />
            )}
            <span className="pm-fold-copy">
                {kicker && <span className="pm-fold-kicker">{kicker}</span>}
                {!open && title && <span className="pm-fold-title">{title}</span>}
                {!open && preview && <span className="pm-fold-preview">{preview}</span>}
            </span>
            <span className="pm-fold-action">
                {action}
                <ChevronDown className="pm-fold-chevron" aria-hidden="true" strokeWidth={2.25} />
            </span>
            <span className="pm-fold-hint">{hint}</span>
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

const Collapsible = ({
    id,
    lang,
    defaultOpen = false,
    kicker,
    title,
    preview,
    children
}) => {
    const { open, toggle } = useSectionCollapse(id, defaultOpen);
    const panelId = `${id}-panel`;
    const apiRef = useRef({ open, toggle, panelId, lang, kicker, title, preview });
    apiRef.current = { open, toggle, panelId, lang, kicker, title, preview };
    const usedId = useRef(false);
    usedId.current = false;

    const Fold = useCallback(({ avatar } = {}) => {
        const api = apiRef.current;
        return (
            <FoldButton
                open={api.open}
                onToggle={api.toggle}
                panelId={api.panelId}
                lang={api.lang}
                kicker={api.kicker}
                title={api.title}
                preview={api.preview}
                avatar={avatar}
            />
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

    return children({ open, Fold, Panel, panelId });
};

export default Collapsible;
