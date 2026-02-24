# AGENTS.md

## Cursor Cloud specific instructions

### Overview
This is a zero-dependency static website (Mattilha LP) — a Brazilian Portuguese landing page for a digital community product. There are no build tools, no package managers, no tests, and no linting.

### Project structure
- `index.html` — Main landing page (sales page)
- `loja.html` — Store/product listing page
- `agente-ia.html` — Individual product detail page
- `banner.png`, `logo.png` — Image assets
- All CSS and JS are inline within the HTML files

### Running the dev server
Serve the files with any static HTTP server:
```
python3 -m http.server 8080
```
Then open `http://localhost:8080/index.html` in the browser.

### Notes
- No dependencies to install, no build step, no tests, no linting tools.
- All purchases redirect to external Kiwify payment links (`pay.kiwify.com.br`).
- Google Fonts (Inter) is loaded from CDN; pages degrade gracefully without it.
