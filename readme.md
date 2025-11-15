# Cole D. Miles — Personal Academic Website (Static)

This is a static, GitHub Pages–ready personal academic website for **Cole D. Miles**, Student at the University of Montana.

Features
- Pure static site (HTML/CSS/JS), no backend required.
- Content managed via `/data/*.json`.
- Responsive layout, accessible, and dark/light theme adaptive.
- Theme toggle (persisted to `localStorage`).
- Quick contact cards, research summary, publications & projects pages.
- Deploy directly to GitHub Pages.

## Quick start (deploy to GitHub Pages)

1. Create a new GitHub repository (e.g. `cole-miles-website`) and push this code to the repository's default branch (`main` or `master`).
2. In GitHub repository Settings → Pages:
   - Source: select **'Deploy from a branch'** and choose the branch (e.g. `main`) and folder `/ (root)`.
   - Save. GitHub Pages will build and serve the site (static files; no build step).
3. Visit `https://<your-username>.github.io/<repo-name>/` (or `https://<your-username>.github.io/` if you named the repo `<your-username>.github.io`).

## Local preview
Open `index.html` in a browser (modern browsers allow fetch of local JSON via `file://` only if CORS allows — best to use a simple static server during local dev):

### Simple local server (recommended)
- Python 3: `python -m http.server 8000` then open `http://localhost:8000/`
- Node (http-server): `npx http-server . -p 8000`

## Editing content
- `/data/profile.json` — profile, bio, keywords, email.
- `/data/publications.json` — publication list (sample items included).
- `/data/projects.json` — project list (sample items included).

## Notes
- No server-side contact form included; Contact page uses `mailto:` links and copy-to-clipboard.
- Replace `assets/media/avatar-placeholder.png` with your headshot if desired.
