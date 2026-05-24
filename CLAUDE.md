# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # tsc -b + vite build (typecheck is part of build)
npm run lint     # ESLint over all .ts / .tsx
npm run preview  # Serve the production build locally
```

No test suite is configured.

---

## Architecture

**Entry:** `src/main.tsx` bootstraps React with `BrowserRouter`, imports the three global stylesheets in order (`tokens.css` → `site.css` → `responsive.css`), then mounts `App`.

**Routing** (`src/App.tsx`): Five `<Route>` entries — `/`, `/services`, `/studio`, `/portfolio`, `/contact`. All are wrapped in `<SiteLayout>`. The home route passes `showMassive` to `SiteLayout`, which causes the Footer to render the 168px decorative wordmark.

**Layout shell** (`src/components/layout/`):
- `SiteLayout.tsx` — owns mobile-menu open/closed state; composes Nav + MobileMenu + `<main>` + Footer
- `Nav.tsx` — fixed top bar; calls `useNavMeta` to show live Calgary time and temperature
- `MobileMenu.tsx` — full-screen overlay, receives `isOpen`/`onClose` from SiteLayout
- `Footer.tsx` — Onyx section; `showMassive` controls the decorative wordmark
- `Ticker.tsx` — duplicates the `tickerItems` array for seamless loop (no JS animation — pure CSS `linear` marquee)

**Content** (`src/data/`): All page copy, structure, and links live here as typed exports — pages are display-only and import from these files. `site.ts` holds nav links, ticker items, contact info, and footer config. `services.ts`, `portfolio.ts`, `studio.ts` hold page-specific data.

**Live data** (`src/hooks/useNavMeta.ts`): Fetches current temperature from the Open-Meteo free API (`api.open-meteo.com`) on mount and every 30 minutes. Ticks the time every 60 seconds. No API key required. Returns `tempLabel` and `timeLabel` strings used in Nav.

**Contact** (`src/lib/contact.ts`): `submitContactForm` is a stub — it logs and returns a hardcoded success. Wire up the Resend SDK here when the integration is ready. The form fields are: `fullName`, `email`, `company`, `timeline`, `projectType`, `message`.

---

## CSS conventions

All styles are plain CSS — no CSS Modules, no Tailwind.

- `src/styles/tokens.css` — CSS custom properties: `--contrast`, `--bone`, `--ivory`, `--orange`, `--teal`, `--rule`, radii (`--r-sm/md/lg/pill`), `--site-max: 1280px`, `--nav-height: 104px`
- `src/styles/site.css` — component and layout styles; all classes use the `scr-*` prefix (`scr-hero`, `scr-band`, `scr-ticker`, `scr-foot`, etc.)
- `src/styles/responsive.css` — mobile overrides only; uses `!important` to override grid/display rules set in `site.css`

`.scr-band` = full-width section strip. `.scr-main` = centred content wrapper (`max-width: var(--site-max); margin-inline: auto`). Use `.scr-band > .scr-main` when a section needs edge-to-edge background with centred content.

**Font note:** `site.css` and `tokens.css` currently reference `Montserrat` (sans) and `Playfair Display` (display) as the active font-family values — these are legacy names from the Gridhouse artboard. The canonical brand faces are **Geist / Geist Mono** (sans/mono) and **Fraunces** (display), loaded via Google Fonts. Updating the font-family declarations in `tokens.css` and `site.css` is the correct way to switch.

---

## Brand constraints (when writing copy or markup)

- One italic `<em>` accent word per heading, rendered in Fraunces italic and coloured `var(--orange)` — never two per composition.
- Eyebrow labels: `<span class="mono">— LABEL</span>` — Geist Mono, 11px, uppercase, `0.14em` letter-spacing.
- Terminal period on display headlines is a brand signature — do not remove.
- No exclamation marks. No emoji. No icon libraries (use `—`, `·`, `→`, `↗` instead).
- Hairline dividers: `0.5px solid var(--rule)` — never 1px.
- Card/section backgrounds: solid Ivory, Bone, Onyx, or Teal only — no gradients, no `backdrop-filter`.
- Burnt Orange (`var(--orange)`) is single-touch per composition — one accent only (italic word *or* CTA *or* dot marker, not multiple).
- Hover transitions: `transition: background 0.3s, color 0.3s, border-color 0.3s` — no scale, bounce, or spring.
