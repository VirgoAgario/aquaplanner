# aquaplanner

> Browser-based aquarium planning and species compatibility tool.

## What

Static web app for planning a freshwater aquarium. Pick a tank size, browse a curated species database (fish, shrimp, snails, plants), and get bioload, water-parameter, and compatibility warnings for the selected stock. Runs entirely client-side; tank state persists in localStorage.

Live: https://virgoagario.github.io/aquaplanner/

## Stack

- Vanilla HTML/CSS/JS (no build step, no framework)
- ES modules under `js/`
- PWA: `manifest.json` + `sw.js` service worker
- Hosted on GitHub Pages

## Setup

```bash
git clone https://github.com/VirgoAgario/aquaplanner.git
cd aquaplanner
python3 -m http.server 8080
# open http://localhost:8080
```

Or:

```bash
./start-aquaplanner.sh
```

## Usage

Open the page, pick a tank size (preset or custom gallons/liters), browse species in the left/main panel, and add them to the tank. The app shows bioload, flags compatibility issues (temp/pH mismatch, territorial conflicts, predator/prey, fin nipping), and surfaces care recommendations. Use the settings button to switch units (gal/L, F/C). Export/import a tank config as JSON.

## Structure

```
index.html              — App shell and layout.
css/styles.css          — Styles and design tokens.
js/app.js               — Entry point.
js/data/                — Species data: fish.js, shrimp.js, snails.js, plants.js.
js/modules/             — ui.js, tank.js, compatibility.js.
img/fish/               — Species images.
manifest.json, sw.js    — PWA manifest and offline cache.
start-aquaplanner.sh    — Local dev launcher (python http.server).
AQUAPLANNER-OVERHAUL-PLAN.md — In-repo design/refactor notes.
```

## Status

Active. Recent work (v2.0.x): species expansion, tank space calculator, themes, image infrastructure, PWA support. See `AQUAPLANNER-OVERHAUL-PLAN.md` for in-flight work. Species counts and data quality vary; entries are sourced from hobbyist references and community research, not authoritative.
