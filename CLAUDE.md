# CLAUDE.md — Conventions for the Ersatzturnfest 2026 website

## What this project is

A static, statically generated single-page website for **Turnfest 2026 im Wegenstettertal** on **20 June 2026** at the Sportanlage Brugglismatt, Zeiningen. The site is the public-facing replacement for the printed flyers in `assets/`.

## Tech stack (do not change without asking)

- **Astro** (TypeScript, strict). No UI framework (no React/Vue/Svelte). No Tailwind. Plain CSS with custom properties.
- **Static output** (`output: "static"`). Deploys as plain files. GitHub Pages compatible: set `GH_PAGES_BASE=/<repo>/` when building for a project page.
- **Node** 22+ (see `.nvmrc`). **pnpm** 11+ (a `preinstall` hook blocks npm/yarn).
- **No client-side framework runtime.** Interactivity (countdown, schedule dropdown, interactive lageplan) is handled by tiny inline `<script>` blocks.

## Languages

- **Code, identifiers, comments, README**: English.
- **Frontend copy (everything the user sees)**: Schweizer Hochdeutsch. Always `ss`, never `ß`. Swiss vocabulary where natural (e.g. "Velo", "Trottoir"). The dialect slogans from the flyer (e.g. **"mir freue eus!"**) stay in dialect verbatim.

## Public-vs-internal split (important)

The per-club PDF (`assets/Ersatzturnfest Zeitplan pro Verein.pdf`) lists `18:00 Turnermenü` for every club. **Turnermenü is a participant-only item and must not appear on the public website** — neither in the Hero time pills, nor in the Festwirtschaft section, nor in the per-club schedule table. The public-facing "evening" anchor is **`Rangverlesen 19:00`**.

If a future PDF reintroduces Turnermenü, leave it out and ask before surfacing.

The Festwirtschaft is run by the **Pensioniertengruppe der Männerriege Zeiningen** and the **Einbeiner-Plausch-Club Zeiningen (EPCZ)** — credited in the Festwirtschaft section.

## Source of truth: `src/data/`

All event content lives in `src/data/`. Components must never hard-code event facts.

- `event.ts` — date, location, key times (`wettkampf`, `festwirtschaft`, `rangverlesen`, `bar`; no `turnermenue` key).
- `clubs.ts` — 8 participating clubs (TVZ, MRZ, FRZ, STVW, FRMRW, TVHD, TVHH, MRH).
- `disciplines.ts` — abbreviation → name + category. Authoritative spelling: **FTA = Fachtest Allround**, **SSB = Schulstufenbarren**. The `category` field is no longer surfaced in the UI but is kept for future use.
- `stations.ts` — 8 numbered stations **plus** `infoMarkers` (Sanität, WC/Toiletten, P/Parkplatz) for the Situationsplan legend.
- `schedule.ts` — per-club schedule rows (no Turnermenü).
- `organisations.ts` — the 4 footer logos with `url` field for outbound links (STV Wegenstetten, TV Zeiningen, TV Hellikon, EPCZ).

## Design tokens (`src/styles/tokens.css`)

```
--color-primary:    #1E4993  /* deep blue from logo */
--color-accent:     #FA9E0F  /* orange from flyer */
--color-surface:    #FFFFFF
--color-on-primary: #FFFFFF
--color-muted:      #E9EEF6
--color-ink:        #1A1A1A
--font-display:     "Barlow Condensed", system-ui, sans-serif
--font-body:        "Inter", system-ui, sans-serif
--font-brush:       "Caveat Brush", cursive   /* slogan: "mir freue eus!" */
```

`html { font-size: 110%; }` bumps every rem-based dimension by ~10 %.

Headlines: display font, 900 italic. Slogans (e.g. "mir freue eus!"): brush font, larger size, subtle rotation, painted with an SVG `feTurbulence` + `feDisplacementMap` filter on a `::before` pseudo-element so the text stays crisp.

**Icons**: Google Material Symbols Outlined, loaded via the same Google Fonts URL. Use inline as `<span class="material-symbols-outlined">name</span>`. Established names: `place`, `sprint`, `restaurant`, `nightlife`, `emoji_events`. No custom inline SVG icons.

**Grunge texture**: source file lives at `src/assets/grunge.jpg` (5.7 MB, gitignored under `assets/`). It is optimised at build time via `astro:assets` (`getImage` → ~134 KB WebP) and applied as a `mix-blend-mode: overlay` layer on the hero **and** the footer.

## Inlined SVGs

Three SVGs from `assets/` are read at build time via `fs.readFileSync` and injected with `set:html`:

- **Wordmark** (`Hero.astro`) — the blue stroke colour is rewritten from `rgb(30,73,147)` to `currentColor` so the logo turns white on the dark-blue hero while keeping the orange.
- **Lageplan** (`Situationsplan.astro`) — inlined so click handlers can target the numbered markers and the Sanität marker (red cross). Marker resolution depths are **fixed**, not heuristic, because the source file has an extra unnamed `<g>` wrapper inside `<g id="map">`:
  - Numbered + WC + P markers: `text.parentElement.parentElement` (2 levels above the `<text>`).
  - Sanität: `rect.parentElement.parentElement.parentElement` (3 levels above a red `rgb(255,31,72)` `<rect>`).
- **Favicon** (`public/favicon.svg`) — reuses the first subpath of the "Turnfest" wordmark for the "T" letter.

Click on a legend item or a map marker toggles `is-active` on both sides. WC has **two** map markers; `setActive` uses `querySelectorAll` so both highlight together.

## Assets

- `assets/` — raw source files delivered by the organisers. **Read-only and gitignored**. Do not edit.
- `public/images/` — copies prepared for serving (`wordmark.svg`, `logo.svg`, `lageplan.svg`, `fta.jpg`, `weitsprung.jpg`, `zelt.jpg`).
- `public/images/clubs/` — the 4 footer logos.
- `public/files/` — the two PDF schedules (no longer linked from the site, kept as archive).

Components reference assets by stable filename; swap the file under `public/images/` to upgrade a photo or the plan.

## Commands

```
pnpm install                              # once
pnpm dev                                  # local dev server on :4321
pnpm build                                # produces dist/
pnpm preview                              # serves dist/
GH_PAGES_BASE=/<repo>/ pnpm build         # for GitHub project pages
```

## House rules

- Don't add UI frameworks, CSS frameworks or client-side routers.
- Don't add comments that just restate what the code does.
- Don't introduce new top-level dependencies without asking — every dep ships to visitors.
- When in doubt about wording, mirror the flyer's tone (short, clean, slightly informal Swiss).
- Astro scoped CSS does **not** match elements injected via `set:html` (they lack the `data-astro-cid-*` attribute). Use `:global(...)` selectors when styling content inside an inlined SVG.
