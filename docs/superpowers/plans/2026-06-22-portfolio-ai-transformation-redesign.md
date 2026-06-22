# Portfolio AI-Transformation Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing `?mode=portfolio` React site so it reads as a strategic leader who builds with AI and transforms processes with AI, with higher visual impact, while staying on-brand.

**Architecture:** Edit the existing single `Portfolio.jsx` + `portfolio.css` + `portfolioData.js`. Add small focused pieces (a bento Projects section, a floating WhatsApp button, a command palette) as components co-located in `src/portfolio/`. Content stays bilingual in `portfolioData.js`. Animations use the already-installed framer-motion.

**Tech Stack:** Vite, React 18, framer-motion, lucide-react, canvas-confetti. No test runner — verification is `npm run build` + visual check in `npm run dev`.

## Global Constraints

- Brand tokens only: ink `#0B0E14`, paper `#F4F5F7`, electric blue `#1652F0`, deep `#0A2EAA`, sky `#5D85FF`. Blue is accent/verb only. No new gradient/shadow styles beyond existing CSS.
- Fonts: DM Sans + Instrument Serif italic + JetBrains Mono. No swaps.
- Bilingual parity: every new/changed string in BOTH `portfolioEN` and `portfolioES`.
- `{word}` syntax in copy renders Instrument Serif italic blue (existing `Editorial` component).
- Honor `prefers-reduced-motion: reduce` for every animation (no motion, instant state).
- Dark/light: every new element works in both themes (existing `theme` prop + CSS vars).
- No backend / no live data widgets in v1.
- WhatsApp number: **+34 610 01 05 76** → `https://wa.me/34610010576`.
- Portfolio URL for QR: `https://www.agustin-gugliuzza.com`.
- Clawdbot must NOT appear anywhere.
- Run `cd cv-agugliuzza` for all commands. Work on branch `portfolio-redesign`.

---

### Task 0: Branch + baseline build

**Files:** none (setup)

- [ ] **Step 1:** Create and switch branch.
```bash
cd cv-agugliuzza && git checkout -b portfolio-redesign
```
- [ ] **Step 2:** Install + baseline build to confirm green start.
```bash
npm install && npm run build
```
Expected: build succeeds, `dist/` produced.
- [ ] **Step 3:** Start dev server in background for visual checks throughout.
```bash
npm run dev
```
Expected: serves on localhost; open `/?mode=portfolio`.

---

### Task 1: Content layer — copy + data (`portfolioData.js`)

**Files:**
- Modify: `src/data/portfolioData.js`

**Interfaces produced:** new `projects` key on both `portfolioEN`/`portfolioES`:
```
projects: {
  eyebrow: string,
  heading: string,            // may contain {italic}
  lead: string,
  items: [{
    title: string,
    org: string,              // e.g. "IE Tech Lab · Microsoft"
    year: string,
    outcome: string,          // one-line result
    aiAngle: string,          // "how AI changed the process"
    tags: string[],
    accent: string            // hex from brand palette
  }]
}
```

- [ ] **Step 1:** Rewrite `hero.statement` (EN + ES) to lead with AI + transformation.
  - EN: `'I build with AI and redesign how work gets done — turning {operations} into {outcomes}.'`
  - ES: `'Construyo con IA y rediseño cómo se hace el trabajo — convirtiendo {operación} en {resultados}.'`
- [ ] **Step 2:** Add the `projects` object to `portfolioEN` (4 items): Almazara Co-Pilot, KS Advisory AI Deal Platform, Aitaca M&A & Growth Strategy, Corporate Data Lake (Life Seguros). Each with outcome + aiAngle + tags + accent (`#1652F0`/`#0A2EAA`/`#0B0E14`/`#5D85FF`). Use content from the CV + vault facts. No Clawdbot.
- [ ] **Step 3:** Add the mirrored `projects` object to `portfolioES`.
- [ ] **Step 4:** Relabel `apps` section copy: EN eyebrow → `'AI tools & automations I have shipped'`; lead reframes as prototypes that prove taking AI to production / automating processes. ES mirror.
- [ ] **Step 5:** Update `contact.links` WhatsApp entry (EN + ES): `value: '+34 610 01 05 76'`, `href: 'https://wa.me/34610010576'`.
- [ ] **Step 6:** Verify build.
```bash
npm run build
```
Expected: PASS.
- [ ] **Step 7:** Commit.
```bash
git add src/data/portfolioData.js && git commit -m "content: AI-transformation copy, projects data, +34 whatsapp"
```

---

### Task 2: Shared motion + utility CSS

**Files:**
- Modify: `src/portfolio/portfolio.css` (append a new section)

**Interfaces produced:** reusable classes `.pm-reveal` (opacity/translate base for scroll reveal), `.pm-magnetic` (cursor-follow transform target), `.pm-tilt` (3D tilt card base), and a `@media (prefers-reduced-motion: reduce)` block that neutralizes them.

- [ ] **Step 1:** Append motion utility classes + reduced-motion guard to `portfolio.css`, using existing CSS vars.
- [ ] **Step 2:** Verify build + visually confirm nothing regressed.
```bash
npm run build
```
- [ ] **Step 3:** Commit.
```bash
git add src/portfolio/portfolio.css && git commit -m "css: shared motion/tilt/magnetic utilities + reduced-motion guard"
```

---

### Task 3: Hero — entrance animation, abstract visual, magnetic CTAs

**Files:**
- Create: `src/portfolio/HeroBackdrop.jsx` (cursor-reactive blue dot-grid on `<canvas>`, respects reduced-motion)
- Modify: `src/portfolio/Portfolio.jsx` (hero block), `src/portfolio/portfolio.css`

**Interfaces consumed:** `.pm-magnetic`, `.pm-reveal` from Task 2.

- [ ] **Step 1:** Create `HeroBackdrop.jsx`: canvas of blue dots reacting to mouse, `prefers-reduced-motion` → static grid. Absolutely positioned behind hero text, `pointer-events:none`, theme-aware color.
- [ ] **Step 2:** Mount `HeroBackdrop` in the hero section of `Portfolio.jsx`; add staggered framer-motion entrance to hero eyebrow/statement/CTAs.
- [ ] **Step 3:** Add magnetic hover to the two hero CTAs (primary "Book a call" → Reclaim URL, secondary "Download CV"). Confirm "Download CV" triggers the existing PDF download path.
- [ ] **Step 4:** CSS for backdrop layering + CTA magnetic styles, both themes.
- [ ] **Step 5:** Verify build + visual check hero in dark/light + reduced-motion (DevTools emulate).
```bash
npm run build
```
- [ ] **Step 6:** Commit.
```bash
git add -A && git commit -m "feat(hero): animated entrance, abstract backdrop, magnetic CTAs"
```

---

### Task 4: Selected Projects — bento section with 3D tilt

**Files:**
- Create: `src/portfolio/ProjectsBento.jsx`
- Modify: `src/portfolio/Portfolio.jsx` (render section + nav anchor), `src/portfolio/portfolio.css`

**Interfaces consumed:** `data.projects` (Task 1), `.pm-tilt`, `.pm-reveal` (Task 2).

- [ ] **Step 1:** Create `ProjectsBento.jsx`: bento grid (CSS grid, varied tile spans), each card shows title, org · year, outcome, aiAngle, tag chips; subtle 3D tilt on mouse via framer-motion (disabled under reduced-motion); accent per item.
- [ ] **Step 2:** Render `<ProjectsBento>` in `Portfolio.jsx` after the hero (and before/around the AI section per Task 5 ordering); add a "Projects" nav item + anchor id.
- [ ] **Step 3:** CSS for bento grid responsive layout (1-col mobile → multi-span desktop), card surfaces in both themes.
- [ ] **Step 4:** Verify build + visual check: 4 cards, tilt, bilingual toggle, both themes, mobile width.
```bash
npm run build
```
- [ ] **Step 5:** Commit.
```bash
git add -A && git commit -m "feat: Selected Projects bento section with 3D tilt"
```

---

### Task 5: Elevate AI end-to-end section + reframe apps + GitHub to footer

**Files:**
- Modify: `src/portfolio/Portfolio.jsx` (section order + apps label + nav), `src/portfolio/portfolio.css`

- [ ] **Step 1:** Reorder render so the `ai` (whiteboard→production) section sits high (right after hero or after Projects bento); add on-scroll reveal to the 5 steps and animate the flow line; tool chips in JetBrains Mono.
- [ ] **Step 2:** Apply the relabeled `apps` copy (from Task 1); ensure section reads as "AI tools & automations shipped".
- [ ] **Step 3:** Remove GitHub from primary nav/contact emphasis; ensure it remains in `footer.socials` only. (Contact keeps Email/WhatsApp/LinkedIn/Schedule.)
- [ ] **Step 4:** Verify build + visual check ordering + reveals.
```bash
npm run build
```
- [ ] **Step 5:** Commit.
```bash
git add -A && git commit -m "feat: elevate AI E2E section, reframe apps, GitHub to footer"
```

---

### Task 6: Floating WhatsApp button + QR "scan to connect" tile

**Files:**
- Create: `src/portfolio/FloatingWhatsApp.jsx`
- Create asset: `public/assets/qr-portfolio.svg` (generated)
- Modify: `src/portfolio/Portfolio.jsx` (mount button + QR tile in contact), `src/portfolio/portfolio.css`

- [ ] **Step 1:** Generate the QR SVG for `https://www.agustin-gugliuzza.com`.
```bash
python3 -c "import qrcode, qrcode.image.svg as s; qrcode.make('https://www.agustin-gugliuzza.com', image_factory=s.SvgPathImage).save('public/assets/qr-portfolio.svg')"
```
If `qrcode` missing: `pip3 install qrcode[pil]` then rerun. Expected: file exists.
- [ ] **Step 2:** Create `FloatingWhatsApp.jsx`: fixed bottom-right lucide MessageCircle button → `https://wa.me/34610010576?text=<prefilled greeting>` (URL-encoded), theme-aware, entrance after scroll, reduced-motion safe.
- [ ] **Step 3:** Mount the button globally in `Portfolio.jsx`; add a QR tile ("Scan to connect") inside the contact section referencing `/assets/qr-portfolio.svg`.
- [ ] **Step 4:** CSS for floating button + QR tile, both themes.
- [ ] **Step 5:** Verify build + visual: button links open WhatsApp with +34 prefilled; QR renders + scans to the site.
```bash
npm run build
```
- [ ] **Step 6:** Commit.
```bash
git add -A && git commit -m "feat: floating WhatsApp (+34) + QR scan-to-connect tile"
```

---

### Task 7: Command palette (Cmd/Ctrl+K)

**Files:**
- Create: `src/portfolio/CommandPalette.jsx`
- Modify: `src/portfolio/Portfolio.jsx` (mount + wire actions), `src/portfolio/portfolio.css`

**Interfaces consumed:** existing handlers for download CV, theme toggle, language toggle; section anchor ids (Task 4/5).

- [ ] **Step 1:** Create `CommandPalette.jsx`: modal opened by Cmd/Ctrl+K (and Esc to close), filterable action list: Download CV, Book a call, Switch language, Toggle theme, Jump to {Projects, AI, Work, Contact}. Keyboard navigable (arrows + Enter). framer-motion fade/scale, reduced-motion safe.
- [ ] **Step 2:** Wire actions to existing Portfolio handlers/anchors; mount globally.
- [ ] **Step 3:** CSS for palette overlay + list, both themes; a small "⌘K" hint chip in the nav.
- [ ] **Step 4:** Verify build + manual: Cmd/Ctrl+K opens, each action works, Esc closes, keyboard nav works.
```bash
npm run build
```
- [ ] **Step 5:** Commit.
```bash
git add -A && git commit -m "feat: Cmd/Ctrl+K command palette"
```

---

### Task 8: Consistency pass — scroll reveals + micro-interactions

**Files:**
- Modify: `src/portfolio/Portfolio.jsx`, `src/portfolio/portfolio.css`

- [ ] **Step 1:** Apply `.pm-reveal` on-scroll (framer-motion `whileInView`) consistently to remaining sections (problems, track, principles, logos, contact) with sensible stagger.
- [ ] **Step 2:** Add restrained micro-interactions (hover lift on cards, underline-grow on links) reusing existing tokens; mono only on stats/tool names.
- [ ] **Step 3:** Full reduced-motion audit: emulate reduce, confirm no motion anywhere.
- [ ] **Step 4:** Verify build + full-page visual sweep both themes + mobile.
```bash
npm run build
```
- [ ] **Step 5:** Commit.
```bash
git add -A && git commit -m "polish: consistent scroll reveals + micro-interactions"
```

---

### Task 9: Final verification

- [ ] **Step 1:** Production build clean.
```bash
npm run build
```
Expected: no errors/warnings that fail the build.
- [ ] **Step 2:** `npm run preview`, walk the 5 success criteria from the spec (positioning legible, bento renders, WhatsApp+QR work, palette works, motion respects reduced-motion).
- [ ] **Step 3:** Confirm no Clawdbot references.
```bash
grep -ri clawdbot src/ ; echo "exit: $?"
```
Expected: no matches.
- [ ] **Step 4:** Report status to the user with the dev URL; await OK before any deploy/push.

## Self-Review

- **Spec coverage:** hero (T3), AI E2E elevate (T5), bento projects (T4), apps reframe + GitHub footer (T5), WhatsApp + QR (T6), command palette (T7), reveals/micro-interactions (T2/T8), copy + WhatsApp number + projects data (T1), reduced-motion/brand/bilingual (Global + each task). All spec sections mapped.
- **Placeholder scan:** copy strings given verbatim where they set the pattern; data items enumerated by name; no "TBD".
- **Type consistency:** `data.projects.items[]` shape defined in T1 and consumed in T4; motion classes named in T2 and reused in T3/T4/T8.
