# Swananda Gupta — Portfolio

Single-page portfolio built with React and Vite, hand-written CSS (no UI framework).
Design direction: Neo-Retro Editorial — Deep Plum `#1E0A24`, Warm Cream `#FAF5EF`,
Limelight `#DFFF00` (accent only), Instrument Serif / Instrument Sans / JetBrains Mono.

## Structure

```
src/
  components/    One file per section (Hero, About, Experience, Projects, Skills, Recognition, Contact)
  data/content.js  All copy and structured content: edit here to update the site
  hooks/useReveal.js  Scroll reveal (IntersectionObserver, disabled for reduced motion)
  index.css      Design tokens and all styles
public/images/   Optimised .webp photos and architecture diagrams
```

## Develop

```bash
npm install
npm run dev
npm run build
```

## Contact form (Formspree)

The contact section always shows the email address, a copy button, LinkedIn and GitHub.
The message form is rendered **only when a Formspree form id is configured**, so a form
that does nothing is never shown.

1. Create a free form at https://formspree.io and confirm the destination email.
2. Copy the form id (the part after `/f/` in the endpoint URL).
3. Locally: create `.env` with `VITE_FORMSPREE_ID=<id>` (see `.env.example`).
4. On GitHub Pages: repository Settings → Secrets and variables → Actions → **Variables**
   → add `FORMSPREE_ID`. The deploy workflow passes it to the build.

A Formspree form id is public by design (it is visible in any site that uses it), so it is not a secret.
Spam protection: a honeypot field plus Formspree's own filtering.
