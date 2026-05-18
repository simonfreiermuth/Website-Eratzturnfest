# Turnfest 2026 — Wegenstettertal

Static single-page website for the **Ersatzturnfest 2026** in the Wegenstettertal, taking place on **Saturday, 20 June 2026** at Sportanlage Brugglismatt in Zeiningen.

## Tech

- [Astro](https://astro.build/) with TypeScript (strict)
- Plain CSS with design tokens (no Tailwind, no UI framework)
- Static output — deployable to any static host (GitHub Pages, Netlify, Cloudflare Pages, …)

## Prerequisites

- Node.js **20+** (`.nvmrc` provided)
- npm 10+

## Develop

```bash
npm install
npm run dev          # http://localhost:4321
```

## Build

```bash
npm run build        # outputs to ./dist
npm run preview      # serves ./dist locally
```

## Deploy to GitHub Pages

When deploying to a **project page** (e.g. `https://<user>.github.io/turnfest-website/`), the site needs a base path. Build with:

```bash
GH_PAGES_BASE=/turnfest-website/ npm run build
```

For a **user / organisation page** or a **custom domain**, omit `GH_PAGES_BASE` (defaults to `/`).

A GitHub Actions workflow is intentionally not committed yet — add one when the repository host and target URL are known.

## Updating content

All event facts live in `src/data/`:

| File | What it contains |
|---|---|
| `event.ts` | Date, location, public time pills (Wettkampf, Festwirtschaft, Rangverlesen, Bar) |
| `clubs.ts` | The eight participating clubs |
| `disciplines.ts` | Abbreviation → full name + category |
| `stations.ts` | The eight stations on the site plan |
| `schedule.ts` | Per-club schedule entries (no internal Turnermenü row) |

Change the data, save — Astro will hot-reload.

## Updating assets

| Replace this file | To swap in |
|---|---|
| `public/images/wordmark.svg` | Updated brand wordmark (used in the Hero) |
| `public/images/logo.svg` | Updated small logo (favicon-ish, currently unused on page) |
| `public/images/lageplan.svg` | Updated site plan |
| `public/images/fta.jpg`, `weitsprung.jpg`, `zelt.jpg` | Hi-res hero collage photos (referenced from `Hero.astro`) |
| `public/images/clubs/{stv-wegenstetten.png,tv-zeiningen.svg,tv-hellikon.png,epcz.jpg}` | Footer organisation logos |
| `public/files/zeitplan-uebersicht.pdf` | Updated overview PDF |
| `public/files/zeitplan-pro-verein.pdf` | Updated per-club PDF |

The 5.7 MB `assets/grunge-2.jpg` texture is intentionally **not** shipped — drop a web-optimised version (≤ ~120 KB) into `public/images/grunge.jpg` and reference it from a section's `background` if you want the flyer's paper-texture look.

Source originals live in `assets/`; do not edit them.

## Project structure

```
src/
├── layouts/BaseLayout.astro
├── pages/index.astro
├── components/        # Hero, Countdown, Situationsplan, Zeitplan, Festwirtschaft, Footer
├── data/              # event, clubs, disciplines, stations, schedule
└── styles/            # tokens, reset, global
public/
├── images/
└── files/
assets/                # delivered originals (read-only)
```

## Conventions

- **Frontend copy**: Schweizer Hochdeutsch (`ss`, never `ß`); dialect slogans from the flyer (e.g. *"mir freue eus!"*) stay verbatim.
- **Code / comments / docs**: English.
- **Public vs internal**: the per-club PDF's `18:00 Turnermenü` is internal to participants and is intentionally **not** shown on the public site. The public evening anchor is `Rangverlesen 19:00`.

See `CLAUDE.md` for the full set of conventions used by AI assistants on this repo.
