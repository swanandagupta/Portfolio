# Swananda Gupta — Portfolio

A single-page portfolio built with React, Tailwind CSS, and Vite. Design concept: a
"signal monitoring console" — the site reads like the SOC dashboards and EEG/quantum
signal work it describes, using a live animated waveform as the hero's signature
element, with security/AI/software content color-coded in cyan/violet/amber throughout.

## Project structure

```
src/
  components/   All UI sections (Hero, Experience, Projects, Research, Skills, ...)
  data/content.js   All page copy and structured content — edit this file to update
                     experience, projects, skills, achievements, etc. without touching
                     any component code.
  index.css     Tailwind + global styles (fonts, focus states, reduced-motion handling)
```

## Editing content

Almost everything on the page (name, bio, roles, projects, skills, achievements,
links) lives in `src/data/content.js`. Update that file and the whole site updates —
no need to touch component files unless you're changing layout or design.

## Local development

```bash
npm install
npm run dev
```

Opens a local dev server with hot reload.

## Building for production

```bash
npm run build
```

This outputs a **single self-contained `dist/index.html`** file (CSS and JS inlined) —
you can deploy just that one file anywhere, or open it directly in a browser.

## Deploying

Any static host works. A few options:

**Netlify**
- Drag-and-drop the `dist` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or
- Connect the GitHub repo and set build command `npm run build`, publish directory `dist`.

**Vercel**
- Import the repo at [vercel.com/new](https://vercel.com/new) — it auto-detects Vite.
- Build command: `npm run build`, output directory: `dist`.

**GitHub Pages**
- Run `npm run build`, then push the contents of `dist/` to a `gh-pages` branch
  (e.g. with the `gh-pages` npm package), or use a GitHub Actions workflow that runs
  the build and deploys `dist/`.

## Notes

- Fonts (Space Grotesk, Inter, IBM Plex Mono) load from Google Fonts at runtime — no
  local font files to manage.
- The hero's animated signal trace respects `prefers-reduced-motion`.
- No tracking/analytics are wired up. If you want Google Analytics or similar, add
  the snippet to `index.html`.
