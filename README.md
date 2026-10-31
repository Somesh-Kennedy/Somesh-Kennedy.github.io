# Somesh Kennedy · Portfolio

Static portfolio site (plain HTML, CSS and JavaScript, no build step) hosted on GitHub Pages at
https://somesh-kennedy.github.io/

Editorial, light-first design with an automatic dark theme (and a manual toggle). Fraunces for headings,
Inter for text, JetBrains Mono for labels, loaded from Google Fonts with system fallbacks.

## Structure
| File | Purpose |
| --- | --- |
| `index.html` | All page content: hero, selected work, experience, more projects, skills, education, contact |
| `style.css` | Design tokens (light and dark), layout, components, responsive and print rules |
| `script.js` | Theme toggle, mobile menu, scroll-spy navigation, reveal on scroll, image lightbox |
| `assets/projects/` | Project images (see below) |
| `assets/icons/` | Self-hosted single-colour tool logos, used as CSS masks so they take the text colour |
| `assets/Somesh_Kennedy_Resume.pdf` | Target of the Résumé links. Keep this exact filename: GitHub Pages is case-sensitive |

## Project images
Every image in `assets/projects/` comes from a real run, not a mock-up:

| Image | Source |
| --- | --- |
| `clinical-evidence-agent.png`, `...-mobile.png` | Screenshots of the built React interface, run with the scripted demo model |
| `billing-reconciler.png` | Output of a real reconciler run on a synthetic database with planted defects |
| `billing-service.png`, `billing-service-docs.png` | Real responses from the running API and its generated documentation page |
| `crm-support-agent.png` | Chart drawn from the project's saved evaluation reports |
| `case-triage-workflow.png` | The n8n workflow drawn from its exported JSON (layout rearranged for readability) |

Each project card also states what its result does and does not show.

## Editing
- **Add a project card:** copy a `.card` (More projects) or a `.case` (Selected work) block in `index.html`.
- **Add an image to a case study:** put it in `assets/projects/`, then use the same markup as the others:
  a `button.shot` (or `button.thumb`) with `data-lightbox` and `data-caption`, and set `width` and `height` on the
  `<img>` so the page does not shift while loading. Always write a descriptive `alt`.
- **Add a tool icon:** download a single-colour SVG (for example from [Simple Icons](https://simpleicons.org) or
  [Devicon](https://devicon.dev)) into `assets/icons/` and reference it as
  `<span class="icon" style="--src:url('assets/icons/<name>.svg')"></span>` inside a `.chip`.
- **Colours and fonts:** all in the `:root` block at the top of `style.css`.

## Accessibility and performance
Semantic landmarks and heading order, a skip link, visible focus styles, keyboard-operable menu and lightbox
(Escape closes, focus returns to the thumbnail), `prefers-reduced-motion` respected, light and dark themes with
sufficient contrast, lazy-loaded images with explicit dimensions, and no JavaScript needed to read the content.

## Run locally
Open `index.html` in a browser, or serve the folder:

    python -m http.server 8000

## Deploy
Push to `main` of the repo named exactly `Somesh-Kennedy.github.io`. Settings → Pages → Deploy from a branch →
`main` / `(root)`.
