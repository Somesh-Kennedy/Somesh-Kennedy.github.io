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
| `billing-service.png`, `billing-service-docs.png` | Real responses from the running API and its generated documentation page |
| `crm-support-agent.png` | Chart drawn from the project's saved evaluation reports |
| `case-triage-workflow.png` | The n8n workflow drawn from its exported JSON (layout rearranged for readability) |

Each project card also states what its result does and does not show.

## Stock photos (More projects cards)
The banner photo on each card in More projects is an **illustrative stock photo**, not a screenshot of that
project. Each is labelled "Stock photo" with a credit link on the card. All are free to use under the
[Unsplash License](https://unsplash.com/license); they are hosted locally in `assets/photos/` (resized to 800x450,
metadata removed), not hotlinked. Do not replace them with Unsplash+ images: those need a paid licence.

| Card | Photo | Photographer |
| --- | --- | --- |
| Credit Card Fraud Detection | [A person holding a credit card at a table](https://unsplash.com/photos/eN_DifpOb4Q) | SumUp |
| Billing Reconciler | [Desk with calculator, notebook, pencil, and plant](https://unsplash.com/photos/QfQW294I8sQ) | Cht Gsml |
| Automated AI Research Assistant | [Desk with open book, laptop, and study materials](https://unsplash.com/photos/HNjWq8WPyoY) | Yen Vu |
| Case Escalation Tracker | [Graphs of performance analytics on a laptop screen](https://unsplash.com/photos/JKUTrJ4vK00) | Luke Chesser |
| Qwen2.5-1.5B LoRA Fine-Tuning | [Glowing AI chip on a circuit board](https://unsplash.com/photos/w69Z8K-HGQU) | Immo Wegmann |
| Movie Watchlist App | [Projector light beams illuminate an empty cinema auditorium](https://unsplash.com/photos/L70rE9UChmI) | Rafi Mohammed |
| AR Gesture Virtual Mouse | [A person making a hand gesture with their hands](https://unsplash.com/photos/pj-4qBDaGQw) | Jonathan Castañeda |
| Agentic Customer Support Platform | [Black and brown headset near laptop computer](https://unsplash.com/photos/BeVGrXEktIk) | Petr Macháček |
| RAG Enterprise Knowledge Agent | [Shelves filled with colorful binders and folders](https://unsplash.com/photos/vT7r4YYbX0w) | Richard Heinen |

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
