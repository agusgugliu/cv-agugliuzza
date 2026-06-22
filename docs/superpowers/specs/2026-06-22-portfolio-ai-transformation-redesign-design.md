# Portfolio Redesign — AI-Driven Digital Transformation

**Date:** 2026-06-22
**Repo:** cv-agugliuzza (Vite + React, deployed on Vercel)
**Scope:** Visual + narrative upgrade of the existing portfolio mode (`?mode=portfolio`). Not a rebuild.

## Goal

Reposition the portfolio so it reads as the site of a **strategic leader pivoting to digital transformation, who builds with AI and redesigns processes with AI** — not a developer portfolio. Raise visual impact ("tech-savvy, attention-grabbing") while staying on the personal brand (ink `#0B0E14`, electric blue `#1652F0`, DM Sans + Instrument Serif italic, dark/light).

## North star (positioning)

Every flashy/technical element must signal **executive sophistication + genuine AI fluency in service of strategy**, never "hire me to code". The narrative spine across the whole site: *Agus builds AI tools and redesigns how work gets done.* The things he ships are central **evidence of the digital-transformation pivot**, always framed by outcome, not code.

## Current state (baseline)

- `src/portfolio/Portfolio.jsx` (581 lines) + `src/portfolio/portfolio.css` (1419 lines).
- Content in `src/data/portfolioData.js` (EN + ES objects).
- Already has: hero statement, "6 problems I solve", career timeline (`track`), apps grid, company logos, principles, **AI end-to-end flow** (`ai`, currently low on the page), contact (incl. WhatsApp + socials), footer. Uses framer-motion, lucide-react, canvas-confetti. Dark/light theme. Bilingual EN/ES.

## Design

### 1. Hero
- Keep text-first statement; rewrite to lead with AI + transformation. EN draft: *"I build with AI and redesign how work gets done — turning {operations} into {outcomes}."* ES mirror. (`{...}` = Instrument Serif italic blue, existing convention.)
- Staggered entrance animation (reveal/slide via framer-motion).
- **Abstract animated visual** in blue: cursor-reactive dot-grid or subtle mesh on a canvas/SVG. Executive, not "hacker". Respect `prefers-reduced-motion`.
- **Magnetic CTAs:** primary "Book a call" (Reclaim URL), secondary "Download CV".
- Keep eyebrow meta (Madrid · Strategy · AI · Digital Transformation).

### 2. Elevate the AI end-to-end section
- Move the existing `ai` flow (whiteboard→production, 5 steps) high on the page, right after hero (or after Selected Projects). It is the strongest asset for digital-transformation roles.
- Visual reinforcement: the 5 steps as an animated horizontal flow with on-scroll reveal; tool chips in monospace.

### 3. Selected Projects — NEW bento section
Bento grid with subtle 3D tilt on hover. Each card: title, outcome line, "how AI changed the process", tag chips. Framed strategically.
- **Almazara Co-Pilot** (IE Tech Lab · Microsoft) — AI product (vision + grade model) that redesigns mill operations.
- **KS Advisory AI Deal Platform** — AI agent system Agus built to transform deal analysis/tracking.
- **Aitaca M&A & Growth Strategy** (IE Final Project) — strategy for an AI startup.
- **Corporate Data Lake (Life Seguros)** — the data foundation that enables analytics/AI.
- Clawdbot is explicitly excluded.
- New content lives in `portfolioData.js` under a new `projects` key (EN + ES).

### 4. Reframe "apps I built"
- Relabel the `apps` section → "AI tools & automations I've shipped": prototypes proving Agus takes AI to production and automates processes. Keep the live Vercel links.
- Push GitHub from primary nav/contact emphasis down to the footer (avoid dev-for-hire signal).

### 5. Contact upgrades
- **Floating WhatsApp button** using the Spain number **+34 610 01 05 76** (`https://wa.me/34610010576?text=<prefilled>`), with a pre-filled greeting. Visible on scroll, bottom-right, respects theme.
- Update the WhatsApp entry in `contact.links` to the +34 number (currently +54).
- Keep social row; add a **QR code** tile ("scan to connect") pointing to `https://www.agustin-gugliuzza.com` so the printed CV handoff closes the loop. Generate QR as a static asset in `public/assets/`.

### 6. Tech-fluency signals (re-scoped away from "developer")
- **Command palette (Cmd/Ctrl+K):** quick nav + actions (download CV, book call, switch language, toggle theme, jump to section). Reads as a modern power-user product, not code.
- **Monospace only** on stats/numbers and tool names (already partially done). No terminal/code motifs.
- **Scroll-driven reveals + micro-interactions** applied consistently across all sections.

### Untouched (receive motion polish + AI-leaning copy only)
Career timeline (`track`), "6 problems", principles, company logos. Copy nudged toward AI/transformation where it fits; no structural change.

## Constraints

- Brand fidelity: no new colors/fonts/gradient styles beyond `brand.css` tokens; blue is the accent/verb only.
- Bilingual parity: every new/changed string in both `portfolioEN` and `portfolioES`.
- Accessibility: honor `prefers-reduced-motion`; keyboard-reachable command palette and CTAs.
- No backend. Live "widgets" (e.g. GitHub activity) are out of scope for v1 (would need data sources) — only static/derived content.
- Verify visually with `npm run dev` before considering done.

## Out of scope (v1)

- Live data widgets (GitHub feed, now-playing).
- CV-mode (`cvData.js`) changes.
- Terminal/dev aesthetic.

## Success criteria

1. A first-time visitor reads "strategic leader who builds with AI and transforms processes" within the hero + first scroll.
2. Selected Projects bento renders the 4 cards with tilt, bilingual, on both themes.
3. Floating WhatsApp (+34) and QR work; command palette opens with Cmd/Ctrl+K and runs all actions.
4. Motion is consistent and respects reduced-motion.
5. Build passes (`npm run build`) and the page renders correctly in dev.
