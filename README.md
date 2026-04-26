# AquaPlanner 🐠

> Smart Aquarium Planning Tool — browse, compare, and stock your perfect tank.

[![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-blue)](https://virgoagario.github.io/aquaplanner/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

- **200+ Species** — Fish, shrimp, snails, and aquatic plants with detailed care data
- **Smart Compatibility Check** — Detects territorial conflicts, temperature/pH mismatches, predator-prey risks, fin nipping, and incompatible species
- **Bioload Calculator** — Visual meter showing tank stocking levels
- **Care Recommendations** — Personalized temp, pH, filtration, feeding, and water change advice
- **Visual Tank Display** — See your fish swimming in a virtual aquarium
- **Image Gallery** — Scrollable species photos with detail modals
- **Persistent Storage** — Tank config saves automatically to your browser
- **Export/Import** — Save and share tank configurations
- **Mobile Friendly** — Responsive design with mobile navigation
- **Settings** — Switch between gallons/liters and °F/°C

## 🚀 Live Demo

**[https://virgoagario.github.io/aquaplanner/](https://virgoagario.github.io/aquaplanner/)**

## 🏃 Running Locally

```bash
git clone https://github.com/VirgoAgario/aquaplanner.git
cd aquaplanner
python3 -m http.server 8080
# Open http://localhost:8080
```

Or use the launcher script:
```bash
./start-aquaplanner.sh
```

## 📂 Project Structure

```
aquaplanner/
├── index.html              # Main application
├── css/
│   └── styles.css          # Design system & styles
├── js/
│   ├── app.js              # Application entry point
│   ├── data/
│   │   ├── fish.js         # Fish database (150+ species)
│   │   ├── shrimp.js       # Shrimp database
│   │   ├── snails.js       # Snail database
│   │   └── plants.js       # Aquatic plants database
│   └── modules/
│       ├── ui.js           # UI rendering & interactions
│       ├── tank.js         # Tank management & localStorage
│       └── compatibility.js # Compatibility checking engine
├── img/                    # Species images
├── start-aquaplanner.sh    # Local dev launcher
└── LICENSE
```

## 🐟 Species Database

The app includes detailed data on:

| Category | Count |
|----------|-------|
| Fish | 150+ |
| Snails | 14 |
| Shrimp | 13 |
| Plants | 25 |

Each species entry includes: common name, scientific name, minimum tank size, maximum size, temperament, care level, water parameters (temp/pH), bioload, schooling requirements, diet, tank position, incompatible species, and detailed care notes.

### Adding New Species

1. Edit the appropriate file in `js/data/`
2. Follow the existing data schema
3. Submit a pull request!

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📜 License

MIT License — see [LICENSE](LICENSE).

## 🙏 Data Sources

- Species compatibility data compiled from aquarium community research (Reddit r/Aquariums, r/PlantedTank)
- Scientific names verified against FishBase and seriouslyfish.com
- Care information synthesized from multiple hobbyist sources

---

*Made with 🐠 for the aquarium hobbyist community*
