# LB Brand Haus — Website

Production website for LB Brand Haus, a creative studio offering editorial photography, brand strategy, content creation, and studio rental in Calgary, AB.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Bundler | Vite 8 |
| Routing | React Router 7 |
| Animation | GSAP 3 + ScrollTrigger |
| Styling | Plain CSS (no Tailwind, no CSS Modules) |
| Booking | Nuvoro (external links) |
| Contact | Resend (stub — ready to wire) |

---

## Getting started

```bash
cd Website
npm install
npm run dev       # dev server → http://localhost:5173
```

```bash
npm run build     # typecheck (tsc -b) + production build
npm run preview   # serve the production build locally
npm run lint      # ESLint over all .ts / .tsx files
```

No test suite is configured.

---

## Project structure

```
src/
├── App.tsx                   # Route definitions
├── main.tsx                  # Entry — mounts React, imports global CSS
│
├── components/
│   ├── Intro.tsx             # First-load preloader (cream panels, Lb mark, grey→colour crossfade)
│   ├── Cursor.tsx            # Custom cursor
│   ├── PageTransition.tsx    # Between-page fade
│   ├── PortfolioExpand.tsx   # Card expand modal (GSAP, React Portal)
│   └── layout/
│       ├── SiteLayout.tsx    # Nav + MobileMenu + main + Footer wrapper
│       ├── Nav.tsx           # Fixed top bar with live time + temperature
│       ├── NavMeta.tsx       # Time/weather display inside Nav
│       ├── MobileMenu.tsx    # Full-screen overlay menu
│       ├── Footer.tsx        # Onyx footer with optional massive wordmark
│       └── Ticker.tsx        # CSS marquee strip
│
├── pages/
│   ├── HomePage.tsx          # Hero, stats counter, horizontal scroll work section
│   ├── ServicesPage.tsx      # 2-per-row service grid with external booking links
│   ├── PortfolioPage.tsx     # Filterable portfolio grid with expand modal
│   ├── StudioPage.tsx        # Studio rental page with calendar
│   └── ContactPage.tsx       # Contact form (Resend stub)
│
├── data/                     # All page content as typed exports — pages are display-only
│   ├── site.ts               # Nav links, ticker items, contact info, footer config
│   ├── services.ts           # Service rows, process steps, booking URLs
│   ├── portfolio.ts          # Portfolio projects + getPortfolioProject() lookup
│   └── studio.ts             # Studio specs and amenities
│
├── hooks/
│   └── useNavMeta.ts         # Live Calgary time + Open-Meteo temperature (no API key)
│
├── lib/
│   └── contact.ts            # submitContactForm stub — wire up Resend here
│
└── styles/
    ├── tokens.css            # CSS custom properties (colors, radii, spacing, --nav-height)
    ├── site.css              # All component styles, scr-* class prefix
    └── responsive.css        # Mobile overrides only (max-width: 768px / 480px)
```

---

## Key conventions

**CSS class prefix:** `scr-*` for layout sections, `pex-*` for the portfolio expand modal, `intro-*` for the preloader.

**Full-width sections** use `.scr-band`. Centred content uses `.scr-main` (`max-width: 1280px; margin-inline: auto`). A section that needs edge-to-edge background but centred content uses `.scr-band > .scr-main`. Sections that must escape the centred constraint (e.g. the horizontal scroll work track) add `.scr-band` directly to the section element.

**Fonts:** Fraunces (display/serif) and Geist / Geist Mono (sans/mono), loaded via Google Fonts in `index.html`.

**Colour tokens** (defined in `tokens.css`):

| Token | Value | Use |
|---|---|---|
| `--ink` | `#101014` | Onyx — primary text, dark backgrounds |
| `--bone` | `#F2F0E4` | Default page background |
| `--ivory` | `#FFFCEB` | Light sections |
| `--orange` | `#CC5500` | Burnt Orange — single accent per composition |
| `--teal` | `#1C3A34` | Secondary brand colour |
| `--muted` | `rgba(16,16,20,0.45)` | Secondary text |
| `--rule` | `rgba(16,16,20,0.14)` | Hairline dividers (always 0.5px) |

---

## Content updates

All copy, links, and data live in `src/data/` — no need to touch page components for routine updates.

**Adding a portfolio project:** Add an entry to the `portfolioProjects` array in `src/data/portfolio.ts`. The `id` field must be unique and URL-safe.

**Updating booking links:** Edit `ctaPath` and set `ctaExternal: true` on the relevant entry in `src/data/services.ts`. External links open in a new tab automatically.

**Updating studio specs or amenities:** Edit `src/data/studio.ts`.

---

## Integrations

### Booking
Service CTAs link directly to Nuvoro:

| Service | URL |
|---|---|
| Standard Photoshoot | `lbbrandhaus.nuvoro.net/…/standard-photoshoot` |
| Express Photoshoot | `lbbrandhaus.nuvoro.net/…/professional-headshot-session` |
| Discovery Call | `lbbrandhaus.nuvoro.net/…/discovery-call-for-businesses/book` |
| Studio Rental | `lbbrandhaus.nuvoro.net/…/studio-rental/book` |
| Brand Strategy | `lbbrandhaus.nuvoro.net/…/discovery-call-for-businesses` |

### Contact form (Resend)
`src/lib/contact.ts` exports `submitContactForm`. It currently logs and returns a hardcoded success response. Replace the function body with a `fetch` call to your Resend API endpoint when ready. Form fields: `fullName`, `email`, `company`, `timeline`, `projectType`, `message`.

### Weather
`src/hooks/useNavMeta.ts` fetches current Calgary temperature from the Open-Meteo free API on mount and refreshes every 30 minutes. No API key required.

---

## Brand rules

- One `<em>` italic accent word per heading, coloured `var(--orange)` — never two per composition.
- Eyebrow labels: `<span className="mono">— LABEL</span>` in Geist Mono, uppercase, 11px.
- Terminal period on display headlines is a brand signature — do not remove.
- No gradients, no `backdrop-filter`, no drop shadows on cards.
- Hairline dividers: `0.5px solid var(--rule)` — never 1px.
- Hover transitions: `background`, `color`, `border-color` at `0.3s` only — no scale or spring.
- Photography: `filter: saturate(0.92)` applied to all `<img>` in content areas.
- Burnt Orange is single-touch — one accent per section (italic word *or* CTA *or* dot, not all three).
