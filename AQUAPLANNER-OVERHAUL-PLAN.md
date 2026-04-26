# AquaPlanner Overhaul Implementation Plan

> **Goal:** Transform AquaPlanner from a functional MVP into a polished, comprehensive aquarium planning tool with exhaustive species coverage, real images, professional presentation, and deployment-ready infrastructure.

**Status:** Current at v1.2.0 (93 fish, 7 shrimp, 12 snails — ~112 species total)
**Target:** v2.0.0 (200+ species, real images, polished UI, deployable)

**Architecture:** Single-page vanilla JS app (ES modules). No framework, no build step. Data files (`fish.js`, `shrimp.js`, `snails.js`) export arrays consumed by `app.js` → `ui.js` and `tank.js`. Compatibility logic in `compatibility.js`. CSS design tokens in `styles.css`.

**Tech Stack:** Vanilla HTML/CSS/JS (ES modules), localStorage persistence, Lorem Picsum (to replace), GitHub Pages for hosting.

---

## Phase 1: Species Database Expansion

### Task 1: Complete Fish Coverage — Add 60+ Missing Species

**Objective:** Add all commonly kept freshwater aquarium fish not yet in the database, organized by category.

**Files:** Modify `js/data/fish.js`

**Current categories & what's missing:**

| Category | Current | Target | Missing highlights |
|----------|---------|--------|-------------------|
| Livebearers | 5 (guppy, molly, platy, swordtail, endler) | 8 | Limia, halfbeak, mosquito fish |
| Tetras | 20 (neon through red-eye) | 30+ | Head & tail light, flame tetra, silver tip, rosey, x-ray, DC tetra, columbian tetra |
| Barbs | 9 (tiger through tinfoil) | 14 | Checker barb, pentazona barb, black ruby, tiger barb |  
| Rasboras | 5 (harlequin through scissortail) | 10+ | Espei rasbora, lambchop rasbora, galaxy rasbora, phoenix rasbora |
| Danios | 2 | 5+ | Glowlight danio, pearl danio, giant danio, longfin zebra |
| Bettas & Gouramis | 8 (betta through sparkling) | 12+ | Samurai gourami, thicklip gourami, chocolate gourami |
| Dwarf Cichlids | 3 (ram, apisto, krib) | 6+ | Borelli, agassizii, hongsloi |
| Large Cichlids | 8 (angelfish through yellow-lab) | 14+ | Red terror, green terror, salvini, geophagus, eartheater, acara |
| Corydoras | 7 | 12+ | Adolfoi, venezuelanus, habrosus, elegans, schultzei, melanotaenia |
| Plecos & Catfish | 8 | 14+ | Royal pleco, rubber lip pleco, zebra pleco, gold nugget, L-number plecos, raphael catfish, corydoras from more regions |
| Loaches | 5 (kuhli through hillstream) | 8+ | Zebra loach, skunk loach, dwarf chain loach, sidthimunki, horseface loach |
| Goldfish | 2 | 5 | Oranda, ryukin, black moor, telescopes, ranchu |
| Killifish | 1 | 4+ | Aphyosemion, notho, golden wonder |
| Rainbows | 1 | 4+ | Threadfin, parkinsoni, turquoise, Australian |
| Other | 6 (oto through african butterfly) | 10+ | SAE, flying fox, ropefish, elephant nose, bichir, gar, arowana |
| **Puffers** | 1 | 4+ | Figure 8, green spotted, Congo, fahaka, Mbu |
| **Add entirely new:** | | | **Plants section** — 20+ aquatic plants |

**Data schema per species (already defined):**
```javascript
{
    id: 'species-id',
    type: 'fish', // or 'shrimp', 'snail', 'plant'
    commonName: 'Common Name',
    scientificName: 'Scientific Name',
    icon: '🐟',
    minTankSize: 10,
    maxSize: 2.5,
    temperament: 'peaceful', // 'semi-aggressive', 'aggressive'
    careLevel: 'beginner', // 'intermediate', 'advanced'
    waterParams: { tempMin: 72, tempMax: 82, phMin: 6.0, phMax: 7.5 },
    bioload: 1,
    schooling: true,
    minSchool: 6,
    preferredGroup: 10,
    diet: 'omnivore',
    position: 'middle',
    incompatibleWith: ['oscar', 'cichlid-african'],
    notes: 'Detailed care notes here.'
}
```

**Add these fields to some species (optional enhancements to schema):**
- `plantSafe: bool` — won't eat live plants
- `jumper: bool` — needs tight lid
- `requiresDriftwood: bool`
- `compatibleWith: []` — positive list (for plants)
- `nativeRegion: string`
- `difficultyStars: 1-5`

---

### Task 2: Expand Shrimp Database

**Files:** Modify `js/data/shrimp.js`

**Missing species to add (5 new):**
1. `green-jade-shrimp` — Neocaridina davidi (green variant)
2. `yellow-shrimp` — Neocaridina davidi (yellow variant)
3. `snowball-shrimp` — Neocaridina davidi
4. `tiger-shrimp` — Caridina cf. cantonensis
5. `bee-shrimp` — Caridina logemanni
6. `rili-shrimp` — Neocaridina davidi (red/blue rili)
7. `pinto-shrimp` — Caridina cf. cantonensis

---

### Task 3: Expand Snail Database

**Files:** Modify `js/data/snails.js`

**Missing species to add (3-4 new):**
1. `colombian-ramshorn` — Marisa cornuarietis (eats plants)
2. `pagoda-snail` — Brotia pagodula (interesting shell)
3. `black-knight-helena` — color variant of assassin snail
4. Add a `cleanupCrew` tag throughout for better filtering

---

### Task 4: Add Aquatic Plants Database

**Objective:** Create a completely new data file for aquatic plants.

**Files:**
- Create: `js/data/plants.js`

**Schema:**
```javascript
export const plantData = [
    {
        id: 'java-fern',
        type: 'plant',
        commonName: 'Java Fern',
        scientificName: 'Microsorum pteropus',
        icon: '🌿',
        difficulty: 'easy', // 'beginner', 'intermediate', 'advanced'
        growthRate: 'slow', // 'slow', 'moderate', 'fast'
        light: 'low', // 'low', 'moderate', 'high'
        co2: false, // required?
        placement: 'midground', // 'foreground', 'midground', 'background', 'floating'
        temperature: { min: 68, max: 82 },
        ph: { min: 6.0, max: 8.0 },
        size: '4-8 inches',
        propagation: 'Rhizome division',
        notes: 'Do not bury rhizome. Attach to driftwood. Very hardy.',
        safeWith: ['goldfish', 'snails', 'shrimp'] // won't be eaten
    }
]
```

**Initial 20+ plants to add:**
1. Java Fern, Java Moss, Christmas Moss
2. Anubias Nana, Anubias Coffeefolia, Anubias Barteri
3. Amazon Sword, Rosette Sword
4. Vallisneria Spiralis, Vallisneria Americana
5. Cryptocoryne Wendtii, Cryptocoryne Parva
6. Hornwort, Cabomba, Water Sprite
7. Ludwigia Repens, Rotala Rotundifolia
8. Dwarf Hairgrass, Monte Carlo
9. Duckweed, Frogbit, Salvinia (floating)
10. Marimo Moss Ball, Bucephalandra

---

## Phase 2: Real Species Images

### Task 5: Replace Placeholder Images with Real Fish Photos

**Objective:** Replace all `picsum.photos` placeholder URLs with real aquarium fish photos from Wikipedia Commons (free-licensed).

**Files:**
- Modify: `js/modules/ui.js` (the `SPECIES_IMAGES` object)

**Photo sources (all free-licensed / public domain):**
- **Wikimedia Commons** — largest source, search `https://commons.wikimedia.org/wiki/Category:<fish-common-name>`
- Use direct image URLs from uploaded files (format: `https://upload.wikimedia.org/wikipedia/commons/<hash>/<filename>`)
- **FishBase photos** — `https://www.fishbase.org/photos/...` (free for non-commercial)
- **USDA / NOAA** — public domain government fish photos
- **Albert Kok, Brian Gratwicke, NOAA Photo Library** — specific prolific aquarium photo contributors on Wikimedia

**Process per species:**
1. Search Wikimedia Commons for the species scientific name
2. Download the best clear photo
3. Save copy locally in repo under `img/fish/` directory
4. Update URL in `SPECIES_IMAGES` to local path

**IMG directory structure:**
```
img/
├── fish/
│   ├── guppy.jpg
│   ├── neon-tetra.jpg
│   └── ... (one per species with photos)
├── shrimp/
│   ├── cherry-shrimp.jpg
│   └── ...
├── snails/
│   ├── mystery-snail.jpg
│   └── ...
└── plants/
    ├── java-fern.jpg
    └── ...
```

**For species without good free photos:** Keep emoji fallback (already implemented — `getSpeciesImage` returns emoji when `SPECIES_IMAGES[speciesId]` is null).

---

## Phase 3: Website Polish & UX Improvements

### Task 6: Add GitHub Pages Deployment

**Files:**
- Create: `docs/index.html` (copy of `index.html`, or update root)
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`

Add GitHub Pages-specific metadata and `CNAME` if you want a custom domain. The simplest approach: serve from root via `gh-pages` branch or `docs/` folder in repository settings.

**README.md should include:**
```markdown
# AquaPlanner 🐠

Smart Aquarium Planning Tool

## Features
- Browse 200+ fish, shrimp, snail, and plant species
- Check species compatibility (temp, pH, temperament, bioload)
- Calculate tank stocking levels
- Get personalized care recommendations
- Save tank configurations locally
- Mobile-friendly responsive design

## Usage
Visit https://virgoagario.github.io/aquaplanner/ or clone and open `index.html`.

## Species Database
All species data is in `js/data/` — contributions welcome!
```

### Task 7: Create a `start-aquaplanner.sh` Fix

**Files:** Modify `start-aquaplanner.sh`

Current issue: Lives in a different directory (`/home/swag/antigravity`). Fix to work from the repo root, detect available web servers, and be portable.

---

### Task 8: Add PWA Support (Progressive Web App)

**Files:**
- Create: `manifest.json`
- Create: `sw.js` (service worker)
- Modify: `index.html` (add meta tags + manifest link + service worker registration)

**manifest.json:**
```json
{
  "name": "AquaPlanner",
  "short_name": "AquaPlanner",
  "description": "Smart Aquarium Planning Tool",
  "start_url": "/aquaplanner/",
  "display": "standalone",
  "background_color": "#0a1628",
  "theme_color": "#0a1628",
  "icons": [
    { "src": "img/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "img/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

### Task 9: Improve Mobile Experience

**Files:**
- Modify: `css/styles.css`
- Modify: `js/modules/ui.js`

**Areas to improve:**
1. Touch drag-to-refresh prevention on mobile browsers
2. Better tap targets (48px minimum)
3. Add smooth scroll behavior for long species lists
4. Fix the mobile nav to stay above the keyboard when search is focused
5. Add bottom padding on mobile so the last card isn't hidden by the mobile nav bar
6. Improve visual tank animation performance on mobile (reduce `nth-child` animation load)
7. Add `inputmode` attribute to the custom tank size input for mobile number keypad

---

### Task 10: Add Loading States & Empty State Polish

**Files:**
- Modify: `js/modules/ui.js`
- Modify: `css/styles.css`

**Updates:**
1. Add skeleton loading cards while images load
2. Better empty state illustrations/messages for zero search results
3. "No results found" message when search/filter returns 0 matches
4. Smooth fade-in animation for species cards (CSS `@keyframes fadeIn` + stagger via `nth-child` delay)

---

### Task 11: Improve Compatibility Warnings

**Files:**
- Modify: `js/modules/compatibility.js`
- Modify: `js/modules/ui.js`

**Upgrades:**
1. Add "total inches of fish" check (commonly used inch-per-gallon rule as additional heuristic)
2. Highlight which specific species is causing each warning (already have `speciesId`/`speciesIds`)
3. Add clickable links from warnings to the related species card
4. Add suggestion text: "Consider replacing X with Y" for common conflicts
5. Add group warning suppression (don't show 7 warnings for 7 cardinals + 1 angelfish — show 1 warning)
6. Add "this works fine actually" note for commonly doubted combos (corys + betta, etc.)

---

### Task 12: Unit Conversion System Fix

**Files:**
- Modify: `js/modules/ui.js`
- Modify: `index.html`

Settings already exist for gallons/liters and °F/°C but the actual display values don't convert. Wire up:
1. When "liters" is selected, convert gallon display values to liters (multiply by ~3.785)
2. When "°C" is selected, convert temperature values
3. Store preference in localStorage (already wired — just need display logic)
4. Add a setting for tank shape (standard, tall, long) to adjust bioload calculations

---

### Task 13: Add Search Filters & Advanced Sorting

**Files:**
- Modify: `js/modules/ui.js`

**Add to search box:**
1. Dropdown filter by care level (beginner / intermediate / advanced)
2. Dropdown filter by temperament (peaceful / semi-aggressive / aggressive)
3. Dropdown filter by tank size (nano <10g, small 10-20g, medium 20-55g, large 55g+)
4. Sort by: name A-Z / name Z-A / min tank size / bioload / newest
5. Add category filter tags (not just fish/snail/shrimp — add subcategories like "Tetras", "Corydoras", "Loaches")

---

### Task 14: Keyboard Accessibility & ARIA

**Files:**
- Modify: `js/modules/ui.js`
- Modify: `index.html`

1. Add keyboard navigation for species cards (Tab, Enter, Escape)
2. Add ARIA labels for all buttons
3. Add `role="dialog"` and `aria-modal="true"` to settings modal
4. Add `aria-live="polite"` region for dynamic content (warnings, stock count)
5. Add focus trapping in modals (Tab cycles within modal)
6. Add focus restoration when modals close

---

## Phase 4: New Features

### Task 15: Import/Export Enhancement

**Files:**
- Modify: `js/modules/tank.js`
- Modify: `js/modules/ui.js`

Current export creates a JSON download. Enhance with:
1. **Import button** — allows drag-and-drop or file select to load a `.json` tank config
2. **Share URL** — generate a base64-encoded share link that can be bookmarked
3. **URL auto-load** — decode and load tank from `?tank=<base64>` query parameter on page load

---

### Task 16: Tank Space Calculator

**Objective:** Add aquarium dimensions and surface area calculations.

**Files:**
- Modify: `js/modules/tank.js`
- Modify: `js/modules/ui.js`

1. Add optional dimension inputs (L × W × H in inches or cm)
2. Calculate surface area (affects oxygen exchange)
3. Calculate actual water volume accounting for substrate displacement
4. Show spatial stock estimate: "Your 4 angelfish need at least 24\" of horizontal swimming space"
5. Add minimum length requirement: some fish (angelfish, discus) need tall tanks; some (plecos) need wide/long tanks

---

### Task 17: Community Tank Builder Sharing (Optional Enhancement)

**Objective:** Allow sharing tank builds between users.

1. Add "Share Build" button
2. Generate a URL with the stock list encoded
3. The recipient opens the URL and gets the exact tank config loaded
4. Format: `https://virgoagario.github.io/aquaplanner/?build=BASE64DATA`

Implementation:
```javascript
function encodeBuild(tankData) {
    const json = JSON.stringify(tankData);
    return btoa(json).replace(/=+$/, '');
}

function decodeBuild(encoded) {
    const json = atob(encoded + '='.repeat((4 - encoded.length % 4) % 4));
    return JSON.parse(json);
}
```

---

### Task 18: Dark Mode Toggle with Persistence

Already has a dark ocean theme. Add a proper theme switcher:
1. "Ocean" (current dark blue theme)
2. "Coral Reef" (lighter, warmer theme)
3. "Planted Tank" (green-tinted theme)

Implement as CSS custom property swap — change `:root` variables via JavaScript and save to localStorage.

---

## Phase 5: Code Quality & Repository Health

### Task 19: Add Repository Documentation

**Files:**
- Create: `README.md`
- Create: `CONTRIBUTING.md`
- Create: `LICENSE` (MIT recommended)
- Modify: `start-aquaplanner.sh`

**README content:**
- Project overview
- Features list
- Screenshots (after Task 5)
- How to run locally
- How to add species (with example)
- Link to live demo
- Credits and data sources

---

### Task 20: Clean Up Launch Script

**Files:** Modify `start-aquaplanner.sh`

Replace hardcoded path with:
```bash
cd "$(dirname "$0")"
```

Remove browser-specific xdg-open fallbacks and just use `xdg-open` or `python3 -m http.server` cleanly.

---

### Task 21: Add Git Pre-commit Checks

**Files:** Create `scripts/pre-commit.sh`

Basic checks:
1. `index.html` has valid HTML (check for unclosed tags)
2. JS files parse correctly (`node --check`)
3. No console.log left in production code

---

## Summary: Order of Execution

| # | Task | Effort | Impact | Depends On |
|---|------|--------|--------|------------|
| 19 | README, LICENSE, CONTRIBUTING | 30m | High | Nothing |
| 20 | Fix launcher script | 10m | Medium | Nothing |
| 6 | GitHub Pages / deploy | 20m | High | 19 |
| 1 | Expand fish species +60 | 2-3h | Very High | Nothing |
| 2-3 | Expand shrimp + snails | 30m | Medium | Nothing |
| 4 | Add plants database | 1h | High | Nothing |
| 5 | Real species images | 3-4h | Very High | 1 |
| 9 | Mobile improvements | 45m | High | Nothing |
| 10 | Loading states | 30m | Medium | Nothing |
| 11 | Warnings improvements | 1h | Medium | Nothing |
| 12 | Unit conversion | 30m | Medium | Nothing |
| 13 | Search filters/sorting | 45m | Medium | 1 |
| 14 | Keyboard accessibility | 30m | Medium | Nothing |
| 15 | Import/export enhancement | 30m | Medium | Nothing |
| 8 | PWA support | 30m | Medium | 6 |
| 16-17 | Tank space calculator / sharing | 1h | Low-Medium | Nothing |
| 18 | Theme system | 30m | Low | Nothing |
| 21 | Pre-commit checks | 15m | Low | Nothing |

**Total estimated effort:** ~15-20 hours of work

---

## Appendix: Species ID Reference for All Missing Fish

**Tetras to add:**
- `head-tail-light-tetra` — Hemigrammus ocellifer
- `flame-tetra` — Hyphessobrycon flammeus
- `silver-tip-tetra` — Hasemania nana
- `xray-tetra` — (already have as Pristella, duplicate check)
- `black-orphan-tetra` — also called Black Phantom (already have)
- `rosy-tetra` — Hyphessobrycon rosaceus
- `white-fin-tetra` — various
- `costello-tetra` — Hyphessobrycon herbertaxelrodi (Black Neon already covered)
- `red-phantom-tetra` — Megalamphodus sweglesi
- `garnet-tetra` — Hemigrammus pulcher
- `blue-tetra` — Mimagoniates microlepis
- `columbian-tetra` — Hyphessobrycon columbianus
- `golden-tetra` — Hemigrammus rodwayi
- `false-penguin-tetra` — various
- `rainbow-tetra` — Nematobrycon lacortei

**Barbs to add:**
- `snakeskin-barb` — Desmopuntius rhombocellatus
- `checker-barb` — Oliotius oligolepis
- `pentazona-barb` — Desmopuntius pentazona
- `clown-barb` — Barbodes everetti
- `filament-barb` — Dawkinsia filamentosa
- `melon-barb` — Haludaria fasciata
- `black-ruby-barb` — Pethia nigrofasciata
- `cuming-barb` — Puntius cumingii

**Rasboras to add:**
- `lambchop-rasbora` — Trigonostigma espei
- `galaxy-rasbora` — Danio margaritatus (already have as CPD)
- `dwarf-rasbora` — Boraras maculatus
- `least-rasbora` — Boraras urophthalmoides
- `false-harlequin` — Trigonostigma heteromorpha (already have)
- `brigittae-rasbora` — (already have as chili)
- `phoenix-rasbora` — Boraras merah

**Corydoras to add:**
- `corydoras-adolfoi` — Corydoras adolfoi
- `corydoras-venezuelanus` — Corydoras venezuelanus
- `corydoras-elegans` — Corydoras elegans
- `corydoras-schultzei` — Corydoras schultzei
- `corydoras-melanotaenia` — Corydoras melanotaenia
- `corydoras-duplicareus` — Corydoras duplicareus
- `corydoras-nanus` — Corydoras nanus
- `corydoras-ambiacus` — Corydoras ambiacus

**Cichlids to add:**
- `green-terror` — Andinoacara rivulatus
- `acara-electric-blue` — Andinoacara pulcher
- `salvini-cichlid` — Cichlasoma salvini
- `geophagus` — Geophagus altifrons / surinamensis
- `red-devil-cichlid` — Amphilophus labiatus
- `blood-parrot-cichlid` — hybrid
- `keyhole-cichlid` — Cleithracara maronii
- `laetacara-cichlid` — Laetacara curviceps
- `nannacara` — Nannacara anomala
- `festivum` — Mesonauta festivus
- `boleophthalmus` — (not aquarium fish, skip)
- `apistogramma-borelli` — Apistogramma borellii
- `apistogramma-agassizii` — Apistogramma agassizii
- `apistogramma-hongsloi` — Apistogramma hongsloi

**Loaches to add:**
- `zebra-loach` — Botia striata
- `dwarf-chain-loach` — Yasuhikotakia sidthimunki
- `skunk-loach` — Yasuhikotakia morleti
- `horseface-loach` — Acantopsis choirorhynchos
- `pangio-oblonga` — Pangio oblonga
- `pangio-anguillaris` — Pangio anguillaris

**Plecos to add:**
- `royal-pleco` — Panaque nigrolineatus
- `zebra-pleco` — Hypancistrus zebra
- `gold-nugget-pleco` — Baryancistrus xanthellus
- `rubber-lip-pleco` — Chaetostoma milesi
- `lemon-pleco` — Ancistrus sp.
- `blue-phantom-pleco` — Hemiancistrus sp.
- `sailfin-pleco` — Pterygoplichthys gibbiceps
- `gibby-pleco` — Pterygoplichthys pardalis

**Puffers to add:**
- `figure-8-puffer` — Tetraodon biocellatus
- `green-spotted-puffer` — Dichotomyctere nigroviridis
- `congo-puffer` — Tetraodon miurus
- `fahaka-puffer` — Tetraodon lineatus
- `mbu-puffer` — Tetraodon mbu
- `sap-puffer` — Colomesus asellus (South American)

**Rainbows to add:**
- `threadfin-rainbow` — Iriatherina werneri
- `parkinsoni-rainbow` — Melanotaenia parkinsoni
- `neon-dwarf-rainbow` — Melanotaenia praecox
- `australian-rainbow` — Melanotaenia fluviatilis
- `banded-rainbow` — Melanotaenia trifasciata

**Goldfish to add:**
- `oranda` — Carassius auratus
- `ryukin` — Carassius auratus
- `black-moor` — Carassius auratus
- `telescope-goldfish` — Carassius auratus
- `ranchu` — Carassius auratus
- `pearlscale` — Carassius auratus
- `lionchu` — Carassius auratus
- `bubble-eye` — Carassius auratus
- `pompom` — Carassius auratus

**Other to add:**
- `ropefish` — Erpetoichthys calabaricus
- `elephant-nose` — Gnathonemus petersii
- `bichir-senegalus` — Polypterus senegalus
- `bichir-oranate` — Polypterus ornatipinnis
- `reed-fish` — (same as ropefish)
- `arowana-asian` — Scleropages formosus
- `arowana-silver` — Osteoglossum bicirrhosum
- `gar-florida` — Lepisosteus platyrhincus
- `gar-spotted` — Lepisosteus oculatus
- `ghost-knife` — Apteronotus albifrons
- `kuli-loach` — Pangio kuhlii (already have)
- `glass-fish` — Parambassis ranga (Indian glassfish)

**Killifish to add:**
- `golden-wonder` — Aplocheilus lineatus
- `american-flagfish` — Jordanella floridae
- `clown-killifish` — Epiplatys annulatus
- `blue-gularis` — Fundulopanchax sjostedti

---

*End of plan. This file should be saved alongside the repo as the reference document for the full overhaul.*
