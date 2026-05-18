# CLAUDE.md — Conventions for the Ersatzturnfest 2026 website

## What this project is

A static, statically generated single-page website for **Turnfest 2026 im Wegenstettertal** on **20 June 2026** at the Sportanlage Brugglismatt, Zeiningen. The site is the public-facing replacement for the printed flyers in `assets/`.

## Tech stack (do not change without asking)

- **Astro** (TypeScript, strict). No UI framework (no React/Vue/Svelte). No Tailwind. Plain CSS with custom properties.
- **Static output** (`output: "static"`). Deploys as plain files. GitHub Pages compatible: set `GH_PAGES_BASE=/<repo>/` when building for a project page.
- **Node** 20+ (see `.nvmrc`).
- **No client-side framework runtime.** Interactivity (countdown, schedule dropdown) is handled by tiny inline `<script>` blocks.

## Languages

- **Code, identifiers, comments, README**: English.
- **Frontend copy (everything the user sees)**: Schweizer Hochdeutsch. Always `ss`, never `ß`. Swiss vocabulary where natural (e.g. "Velo", "Trottoir"). The dialect slogans from the flyer (e.g. **"mir freue eus!"**) stay in dialect verbatim.

## Public-vs-internal split (important)

The per-club PDF (`assets/Ersatzturnfest Zeitplan pro Verein.pdf`) lists `18:00 Turnermenü` for every club. **Turnermenü is a participant-only item and must not appear on the public website** — neither in the Hero time pills, nor in the Festwirtschaft section, nor in the per-club schedule table. The public-facing "evening" anchor is **`Rangverlesen 19:00`**.

If a future PDF reintroduces Turnermenü, leave it out and ask before surfacing.

## Source of truth: `src/data/`

All event content lives in `src/data/`:

- `event.ts` — date, location, key times (no `turnermenue` key).
- `clubs.ts` — 8 participating clubs.
- `disciplines.ts` — abbreviation → name + category. Authoritative spelling: **FTA = Fachtest Allround**, **SSB = Schulstufenbarren**.
- `stations.ts` — 8 stations on the situation plan.
- `schedule.ts` — per-club schedule rows (no Turnermenü).

Components must never hard-code event facts. Read from `src/data/`.

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

Headlines: display font, 900 italic. Slogans (e.g. "mir freue eus!"): brush font, larger size, subtle rotation.

**Icons**: Google Material Symbols Outlined, loaded via the same Google Fonts URL. Use inline as `<span class="material-symbols-outlined">name</span>` (e.g. `place`, `restaurant`, `directions_run`, `local_bar`, `emoji_events`). No custom inline SVG icons.

**Grunge texture**: source file lives at `src/assets/grunge.jpg` (5.7 MB). It is optimised at build time via `astro:assets` (`getImage` → ~133 KB WebP) and applied as a `mix-blend-mode: overlay` layer on the hero's deep-blue background.

## Assets

- `assets/` — the raw source files delivered by the organisers. **Read-only**. Do not edit.
- `public/images/` — copies prepared for serving (`hero-collage.png`, `situationsplan.png`, `logo.svg`).
- `public/files/` — the two PDF schedules linked from the Zeitplan section.

Hi-res photos / a clean site-plan SVG will arrive later. Swap them in by replacing the files under `public/images/`; the components reference them by stable file name. Club logos for the footer will land in `public/images/clubs/` — placeholders are wired up.

## Commands

```
npm install          # once
npm run dev          # local dev server on :4321
npm run build        # produces dist/
npm run preview      # serves dist/
GH_PAGES_BASE=/<repo>/ npm run build   # for GitHub project pages
```

## House rules

- Don't add UI frameworks, CSS frameworks or client-side routers.
- Don't add comments that just restate what the code does.
- Don't introduce new top-level dependencies without asking — every dep ships to visitors.
- When in doubt about wording, mirror the flyer's tone (short, clean, slightly informal Swiss).
