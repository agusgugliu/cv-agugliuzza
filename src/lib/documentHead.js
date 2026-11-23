const SITE = 'https://agustin-gugliuzza.com';
const DEFAULT_OG = `${SITE}/og-image.png`;

function upsertMeta(selector, create, attrs) {
    let el = document.head.querySelector(selector);
    if (!el) {
        el = create();
        document.head.appendChild(el);
    }
    Object.entries(attrs).forEach(([k, v]) => {
        if (v == null) el.removeAttribute(k);
        else el.setAttribute(k, v);
    });
    return el;
}

function upsertLink(rel, href, extra = {}) {
    let el = document.head.querySelector(`link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ':not([hreflang])'}`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
}

/** @param {{ title, description, canonical, ogImage?, ogType?, locale?, hreflangs? }} opts */
export function applyDocumentHead({
    title,
    description,
    canonical,
    ogImage = DEFAULT_OG,
    ogType = 'website',
    locale = 'en_US',
    hreflangs = null
}) {
    if (title) document.title = title;

    upsertMeta('meta[name="description"]', () => document.createElement('meta'), {
        name: 'description',
        content: description
    });

    upsertLink('canonical', canonical);

    upsertMeta('meta[property="og:type"]', () => document.createElement('meta'), {
        property: 'og:type',
        content: ogType
    });
    upsertMeta('meta[property="og:url"]', () => document.createElement('meta'), {
        property: 'og:url',
        content: canonical
    });
    upsertMeta('meta[property="og:title"]', () => document.createElement('meta'), {
        property: 'og:title',
        content: title
    });
    upsertMeta('meta[property="og:description"]', () => document.createElement('meta'), {
        property: 'og:description',
        content: description
    });
    upsertMeta('meta[property="og:image"]', () => document.createElement('meta'), {
        property: 'og:image',
        content: ogImage
    });
    upsertMeta('meta[property="og:locale"]', () => document.createElement('meta'), {
        property: 'og:locale',
        content: locale
    });

    upsertMeta('meta[name="twitter:card"]', () => document.createElement('meta'), {
        name: 'twitter:card',
        content: 'summary_large_image'
    });
    upsertMeta('meta[name="twitter:title"]', () => document.createElement('meta'), {
        name: 'twitter:title',
        content: title
    });
    upsertMeta('meta[name="twitter:description"]', () => document.createElement('meta'), {
        name: 'twitter:description',
        content: description
    });
    upsertMeta('meta[name="twitter:image"]', () => document.createElement('meta'), {
        name: 'twitter:image',
        content: ogImage
    });

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
    if (hreflangs) {
        hreflangs.forEach(({ hreflang, href }) => {
            const link = document.createElement('link');
            link.setAttribute('rel', 'alternate');
            link.setAttribute('hreflang', hreflang);
            link.setAttribute('href', href);
            document.head.appendChild(link);
        });
    }
}

export function setThemeColor(theme) {
    const color = theme === 'dark' ? '#0B0E14' : '#F4F5F7';
    upsertMeta('meta[name="theme-color"]', () => document.createElement('meta'), {
        name: 'theme-color',
        content: color
    });
}

export { SITE, DEFAULT_OG };