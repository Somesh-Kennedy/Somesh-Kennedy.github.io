# Somesh Kennedy — Portfolio

Static portfolio site (plain HTML/CSS/JS, no build step) hosted on GitHub Pages.
Dark, motion-forward design — Inter for text, JetBrains Mono for labels/tags,
with a self-hosted set of real tool/framework logos in the Toolkit section.

## Structure
| File | Purpose |
| --- | --- |
| `index.html` | All page content and section markup |
| `style.css` | Design tokens, layout, animation/motion |
| `script.js` | Scroll reveals, nav state, marquee, counters, hero word-cycler, magnetic buttons, cursor-spotlight |
| `assets/icons/` | Self-hosted logo SVGs used in the Toolkit grid and skill chips |

## Add your own files
| File | Used for |
| --- | --- |
| `assets/photo.jpg` | Portrait in the Introduction and About sections. A lime "SK" monogram shows until it exists. |
| `assets/Somesh_Kennedy_Resume.pdf` | Target of the Résumé / CV links. Keep this exact filename — GitHub Pages is case-sensitive. |

## Toolkit icons
Logos in `assets/icons/` are single-color SVGs pulled from [Simple Icons](https://simpleicons.org)
(CC0) and [Devicon](https://devicon.dev) (MIT), referenced as CSS masks so they inherit
`currentColor` and recolor smoothly on hover — no external requests at runtime.

To add a new tool icon:
1. Download the SVG into `assets/icons/<name>.svg` (from Simple Icons or Devicon; a plain
   single-path/monochrome SVG works best).
2. Add a tile in the relevant `.stack-group` in `index.html`:
   ```html
   <div class="tool-tile"><span class="icon" style="--src:url('assets/icons/<name>.svg')"></span><span class="label">Tool Name</span></div>
   ```
3. If no icon exists for a tool (a few brands, e.g. OpenAI, AWS, VS Code, LinkedIn, have been
   pulled from Simple Icons over trademark requests), fall back to a monogram tile instead:
   ```html
   <div class="tool-tile"><span class="mono-badge">XX</span><span class="label">Tool Name</span></div>
   ```

## Run locally
Open `index.html` in a browser, or serve the folder:

    python -m http.server 8000

## Deploy to GitHub Pages
Create a repo named exactly `Somesh-Kennedy.github.io`, push this folder to `main`,
then Settings → Pages → Deploy from a branch → `main` / `(root)`.
The site goes live at https://somesh-kennedy.github.io/
