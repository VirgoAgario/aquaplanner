// UI Module - Handles rendering and user interactions
import tankManager from './tank.js';

// Species image URLs - Using Lorem Picsum for reliable placeholder images
// Each species has multiple images for scrollable gallery demonstration
// Replace with real species images as needed
const SPECIES_IMAGES = {
  // === LIVEBEARERS ===
  'guppy': [
    'https://picsum.photos/seed/guppy1/400/250',
    'https://picsum.photos/seed/guppy2/400/250',
    'https://picsum.photos/seed/guppy3/400/250'
  ],
  'molly': [
    'https://picsum.photos/seed/molly1/400/250',
    'https://picsum.photos/seed/molly2/400/250'
  ],
  'platy': [
    'https://picsum.photos/seed/platy1/400/250',
    'https://picsum.photos/seed/platy2/400/250'
  ],
  'swordtail': [
    'https://picsum.photos/seed/swordtail1/400/250',
    'https://picsum.photos/seed/swordtail2/400/250'
  ],
  'endler': [
    'https://picsum.photos/seed/endler1/400/250'
  ],
  // === TETRAS ===
  'neon-tetra': [
    'https://picsum.photos/seed/neontetra1/400/250',
    'https://picsum.photos/seed/neontetra2/400/250'
  ],
  'cardinal-tetra': [
    'https://picsum.photos/seed/cardinaltetra1/400/250'
  ],
  'rummy-nose-tetra': [
    'https://picsum.photos/seed/rummynose1/400/250'
  ],
  'black-skirt-tetra': [
    'https://picsum.photos/seed/blackskirt1/400/250'
  ],
  'serpae-tetra': [
    'https://picsum.photos/seed/serpae1/400/250'
  ],
  'ember-tetra': [
    'https://picsum.photos/seed/ember1/400/250'
  ],
  // === BETTAS & GOURAMIS ===
  'betta': [
    'https://picsum.photos/seed/betta1/400/250',
    'https://picsum.photos/seed/betta2/400/250',
    'https://picsum.photos/seed/betta3/400/250'
  ],
  'dwarf-gourami': [
    'https://picsum.photos/seed/dwarfgourami1/400/250'
  ],
  'pearl-gourami': [
    'https://picsum.photos/seed/pearlgourami1/400/250'
  ],
  'honey-gourami': [
    'https://picsum.photos/seed/honeygourami1/400/250'
  ],
  // === CICHLIDS ===
  'angelfish': [
    'https://picsum.photos/seed/angelfish1/400/250',
    'https://picsum.photos/seed/angelfish2/400/250',
    'https://picsum.photos/seed/angelfish3/400/250'
  ],
  'discus': [
    'https://picsum.photos/seed/discus1/400/250'
  ],
  'oscar': [
    'https://picsum.photos/seed/oscar1/400/250'
  ],
  'german-blue-ram': [
    'https://picsum.photos/seed/gbram1/400/250'
  ],
  'apistogramma-cacatuoides': [
    'https://picsum.photos/seed/apisto1/400/250'
  ],
  'kribensis': [
    'https://picsum.photos/seed/kribensis1/400/250'
  ],
  // === BARBS ===
  'tiger-barb': [
    'https://picsum.photos/seed/tigerbarb1/400/250',
    'https://picsum.photos/seed/tigerbarb2/400/250'
  ],
  'cherry-barb': [
    'https://picsum.photos/seed/cherrybarb1/400/250',
    'https://picsum.photos/seed/cherrybarb2/400/250'
  ],
  // === RASBORAS ===
  'harlequin-rasbora': [
    'https://picsum.photos/seed/harlequin1/400/250'
  ],
  'chili-rasbora': [
    'https://picsum.photos/seed/chili1/400/250'
  ],
  // === DANIOS ===
  'zebra-danio': [
    'https://picsum.photos/seed/zebradanio1/400/250',
    'https://picsum.photos/seed/zebradanio2/400/250'
  ],
  'celestial-pearl-danio': [
    'https://picsum.photos/seed/cpd1/400/250'
  ],
  // === CORYDORAS ===
  'corydoras-bronze': [
    'https://picsum.photos/seed/corybronze1/400/250'
  ],
  'corydoras-panda': [
    'https://picsum.photos/seed/corypanda1/400/250'
  ],
  'corydoras-julii': [
    'https://picsum.photos/seed/coryjulii1/400/250'
  ],
  'corydoras-pygmy': [
    'https://picsum.photos/seed/corypygmy1/400/250'
  ],
  // === PLECOS ===
  'bristlenose-pleco': [
    'https://picsum.photos/seed/bristlenose1/400/250'
  ],
  'common-pleco': [
    'https://picsum.photos/seed/commonpleco1/400/250'
  ],
  'clown-pleco': [
    'https://picsum.photos/seed/clownpleco1/400/250'
  ],
  // === LOACHES ===
  'kuhli-loach': [
    'https://picsum.photos/seed/kuhli1/400/250'
  ],
  'clown-loach': [
    'https://picsum.photos/seed/clownloach1/400/250'
  ],
  // === OTHERS ===
  'otocinclus': [
    'https://picsum.photos/seed/oto1/400/250'
  ],
  'goldfish-fancy': [
    'https://picsum.photos/seed/fancygold1/400/250'
  ],
  'goldfish-common': [
    'https://picsum.photos/seed/commongold1/400/250'
  ],
  // === SNAILS (null = use emoji) ===
  'mystery-snail': null,
  'nerite-snail': null,
  'assassin-snail': null,
  'ramshorn-snail': null,
  'bladder-snail': null,
  'mts': null,
  // === SHRIMP (null = use emoji) ===
  'cherry-shrimp': null,
  'amano-shrimp': null,
  'ghost-shrimp': null,
  'crystal-red-shrimp': null
};

class UIManager {
  constructor() {
    this.searchTerm = '';
    this.activeFilter = 'all';
    this.allSpecies = [];
    this.selectedSpecies = null;
  }

  init(fishData, snailData, shrimpData) {
    this.allSpecies = [...fishData, ...snailData, ...shrimpData];
    this.setupEventListeners();
    this.render();

    // Subscribe to tank changes
    tankManager.subscribe(() => this.render());
  }

  setupEventListeners() {
    // Tank size buttons
    document.querySelectorAll('.tank-size-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const gallons = parseInt(e.currentTarget.dataset.gallons);
        tankManager.setTankSize(gallons);
        this.updateTankButtons(gallons);
      });
    });

    // Custom tank size input
    const customInput = document.getElementById('custom-tank-size');
    if (customInput) {
      customInput.addEventListener('change', (e) => {
        const gallons = parseInt(e.target.value);
        if (gallons > 0) {
          tankManager.setTankSize(gallons);
          this.updateTankButtons(null);
        }
      });
    }

    // Search input
    const searchInput = document.getElementById('species-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase();
        this.renderSpeciesGrid();
      });
    }

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.activeFilter = e.currentTarget.dataset.filter;
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.renderSpeciesGrid();
      });
    });

    // Modal close
    const modalOverlay = document.getElementById('species-modal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay || e.target.closest('.modal__close')) {
          this.closeModal();
        }
      });
    }

    // Clear tank button
    const clearBtn = document.getElementById('clear-tank-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        tankManager.clearTank();
      });
    }
  }

  updateTankButtons(activeGallons) {
    document.querySelectorAll('.tank-size-btn').forEach(btn => {
      const gallons = parseInt(btn.dataset.gallons);
      btn.classList.toggle('active', gallons === activeGallons);
    });
    const customInput = document.getElementById('custom-tank-size');
    if (customInput && activeGallons === null) {
      customInput.value = tankManager.getTankSize();
    }
  }

  getFilteredSpecies() {
    return this.allSpecies.filter(species => {
      // Type filter
      if (this.activeFilter !== 'all' && species.type !== this.activeFilter) {
        return false;
      }
      // Search filter
      if (this.searchTerm) {
        const searchable = `${species.commonName} ${species.scientificName}`.toLowerCase();
        return searchable.includes(this.searchTerm);
      }
      return true;
    });
  }

  renderSpeciesGrid() {
    const grid = document.getElementById('species-grid');
    if (!grid) return;

    const filtered = this.getFilteredSpecies();
    const stock = tankManager.getStock();

    grid.innerHTML = filtered.map(species => {
      const inTank = stock.some(s => s.species.id === species.id);
      const count = tankManager.getSpeciesCount(species.id);
      const isPest = species.isPest || false;

      return `
        <div class="species-card ${inTank ? 'in-tank' : ''}" data-species-id="${species.id}">
          ${isPest ? '<span class="species-card__pest-warning">⚠️ PEST</span>' : ''}
          <div class="species-card__header">
            <span class="species-card__icon">${species.icon}</span>
            <span class="species-card__type-badge ${species.type}">${species.type}</span>
          </div>
          <h3 class="species-card__name">${species.commonName}</h3>
          <p class="species-card__scientific">${species.scientificName}</p>
          <div class="species-card__stats">
            <span class="species-card__stat">
              <span class="species-card__stat-icon">📏</span>
              ${species.maxSize}"
            </span>
            <span class="species-card__stat">
              <span class="species-card__stat-icon">🪣</span>
              ${species.minTankSize}g+
            </span>
            <span class="species-card__stat badge--${species.temperament}">
              ${this.capitalizeFirst(species.temperament)}
            </span>
          </div>
          <button class="species-card__add-btn" title="Add to tank">
            ${inTank ? count : '+'}
          </button>
        </div>
      `;
    }).join('');

    // Add click handlers
    grid.querySelectorAll('.species-card').forEach(card => {
      // Card click opens modal
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.species-card__add-btn')) {
          const speciesId = card.dataset.speciesId;
          this.openModal(speciesId);
        }
      });

      // Add button click
      const addBtn = card.querySelector('.species-card__add-btn');
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const speciesId = card.dataset.speciesId;
          const species = this.allSpecies.find(s => s.id === speciesId);
          if (species) {
            tankManager.addSpecies(species, 1);
          }
        });
      }
    });
  }

  renderVisualTank() {
    const container = document.getElementById('visual-tank-species');
    const infoEl = document.getElementById('visual-tank-info');
    if (!container) return;

    const stock = tankManager.getStock();
    const tankSize = tankManager.getTankSize();

    // Update info
    if (infoEl) {
      const totalCount = tankManager.getTotalSpeciesCount();
      infoEl.textContent = `${tankSize}gal • ${totalCount} creatures`;
    }

    // Render creatures
    if (stock.length === 0) {
      container.innerHTML = '<span style="opacity: 0.4; font-size: 0.9rem;">Add fish to see them here!</span>';
      return;
    }

    // Create creature elements
    const creatures = [];
    stock.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        creatures.push(`<span class="visual-tank__creature" title="${item.species.commonName}">${item.species.icon}</span>`);
      }
    });

    container.innerHTML = creatures.join('');
  }

  renderBioloadMeter() {
    const fill = document.getElementById('bioload-fill');
    const value = document.getElementById('bioload-value');
    if (!fill || !value) return;

    const percentage = Math.min(tankManager.getBioloadPercentage(), 120);
    const status = tankManager.getBioloadStatus();

    fill.style.width = `${Math.min(percentage, 100)}%`;
    fill.className = `bioload-meter__fill ${status === 'warning' ? 'warning' : ''} ${status === 'danger' ? 'danger' : ''}`;
    value.textContent = `${tankManager.calculateBioload()} / ${tankManager.getMaxBioload()}`;
    value.className = `bioload-meter__value text-${status === 'safe' ? 'success' : status}`;
  }

  renderStockList() {
    const list = document.getElementById('stock-list');
    const countEl = document.getElementById('stock-count');
    const emptyEl = document.getElementById('empty-tank');

    if (!list) return;

    const stock = tankManager.getStock();
    const warnings = tankManager.getWarnings();

    if (countEl) {
      countEl.textContent = tankManager.getTotalSpeciesCount();
    }

    if (stock.length === 0) {
      list.style.display = 'none';
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    }

    list.style.display = 'flex';
    if (emptyEl) emptyEl.style.display = 'none';

    list.innerHTML = stock.map(item => {
      // Check if this species has warnings
      const hasError = warnings.some(w =>
        w.severity === 'error' &&
        (w.speciesId === item.species.id || w.speciesIds?.includes(item.species.id))
      );
      const hasWarning = warnings.some(w =>
        w.severity === 'warning' &&
        (w.speciesId === item.species.id || w.speciesIds?.includes(item.species.id))
      );

      return `
        <div class="stock-item ${hasError ? 'has-error' : hasWarning ? 'has-warning' : ''}" data-species-id="${item.species.id}">
          <span class="stock-item__icon">${item.species.icon}</span>
          <div class="stock-item__info">
            <div class="stock-item__name">${item.species.commonName}</div>
            <div class="stock-item__meta">${item.species.scientificName}</div>
          </div>
          <div class="stock-item__quantity">
            <button class="stock-item__qty-btn stock-item__qty-btn--remove" data-action="decrease">−</button>
            <span class="stock-item__qty-value">${item.quantity}</span>
            <button class="stock-item__qty-btn" data-action="increase">+</button>
          </div>
        </div>
      `;
    }).join('');

    // Add quantity handlers
    list.querySelectorAll('.stock-item').forEach(item => {
      const speciesId = item.dataset.speciesId;
      const species = this.allSpecies.find(s => s.id === speciesId);

      item.querySelector('[data-action="increase"]')?.addEventListener('click', () => {
        if (species) tankManager.addSpecies(species, 1);
      });

      item.querySelector('[data-action="decrease"]')?.addEventListener('click', () => {
        tankManager.removeSpecies(speciesId, 1);
      });
    });
  }

  renderWarnings() {
    const panel = document.getElementById('warnings-panel');
    const list = document.getElementById('warnings-list');
    if (!panel || !list) return;

    const warnings = tankManager.getWarnings();

    if (warnings.length === 0) {
      panel.style.display = 'none';
      return;
    }

    panel.style.display = 'block';
    list.innerHTML = warnings.map(warning => `
      <div class="warning-item ${warning.severity}">
        <span class="warning-item__icon">${warning.icon}</span>
        <div class="warning-item__content">
          <div class="warning-item__title">${warning.title}</div>
          <div class="warning-item__description">${warning.description}</div>
        </div>
      </div>
    `).join('');
  }

  // Render care recommendations based on tank inhabitants
  renderCareRecommendations() {
    const panel = document.getElementById('care-recommendations');
    const content = document.getElementById('care-recommendations-content');
    if (!panel || !content) return;

    const stock = tankManager.getStock();
    const tankSize = tankManager.getTankSize();

    // Hide if no fish
    if (stock.length === 0) {
      panel.style.display = 'none';
      return;
    }

    panel.style.display = 'block';

    // Analyze all species for recommendations
    let minTemp = 50, maxTemp = 95;
    let minPh = 4.0, maxPh = 9.5;
    let diets = new Set();
    let positions = new Set();
    let hasScavengers = false;
    let hasCarnivores = false;
    let hasHerbivores = false;
    let needsHighFlow = false;
    let needsLowFlow = false;
    let hasNocturnal = false;
    let specialNotes = [];
    let totalBioload = 0;

    stock.forEach(item => {
      const sp = item.species;

      // Temperature overlap
      if (sp.waterParams) {
        minTemp = Math.max(minTemp, sp.waterParams.tempMin || 50);
        maxTemp = Math.min(maxTemp, sp.waterParams.tempMax || 95);
        minPh = Math.max(minPh, sp.waterParams.phMin || 4.0);
        maxPh = Math.min(maxPh, sp.waterParams.phMax || 9.5);
      }

      // Diet types
      if (sp.diet) diets.add(sp.diet);
      if (sp.diet === 'carnivore') hasCarnivores = true;
      if (sp.diet === 'herbivore') hasHerbivores = true;

      // Position in tank
      if (sp.position) positions.add(sp.position);

      // Scavengers (bottom feeders, catfish, plecos)
      if (sp.position === 'bottom' || sp.id?.includes('cory') || sp.id?.includes('pleco') || sp.id?.includes('catfish')) {
        hasScavengers = true;
      }

      // Flow preferences
      if (sp.id?.includes('hillstream') || sp.id?.includes('danio')) needsHighFlow = true;
      if (sp.id?.includes('betta') || sp.id?.includes('gourami')) needsLowFlow = true;

      // Nocturnal species
      if (sp.notes?.toLowerCase().includes('nocturnal')) hasNocturnal = true;

      // Special notes
      if (sp.notes?.includes('driftwood')) {
        specialNotes.push('🪵 Include driftwood (required by some species)');
      }
      if (sp.notes?.toLowerCase().includes('plants') || sp.diet === 'herbivore') {
        specialNotes.push('🌿 Live plants recommended for grazing/cover');
      }
      if (sp.notes?.toLowerCase().includes('lid') || sp.notes?.toLowerCase().includes('jump')) {
        specialNotes.push('🔒 Tight-fitting lid required (jumpers in tank!)');
      }

      totalBioload += (sp.bioload || 1) * item.quantity;
    });

    // Remove duplicate notes
    specialNotes = [...new Set(specialNotes)];

    // Calculate recommended filter GPH (4-6x tank volume for fish)
    const filterMultiplier = totalBioload > tankSize ? 6 : (totalBioload > tankSize * 0.7 ? 5 : 4);
    const recommendedGPH = tankSize * filterMultiplier;

    // Determine feeding recommendation
    let feedingRec = '1-2 times daily';
    let feedingDetails = 'Small portions your fish can consume in 2-3 minutes.';
    if (hasCarnivores && !hasHerbivores) {
      feedingRec = '1-2 times daily (protein-focused)';
      feedingDetails = 'Frozen/live foods like bloodworms, brine shrimp. Occasional fasting day.';
    } else if (hasHerbivores && !hasCarnivores) {
      feedingRec = '2-3 times daily (small portions)';
      feedingDetails = 'Algae wafers, blanched veggies (zucchini, spinach), spirulina.';
    } else if (diets.size > 1) {
      feedingRec = 'Varied diet, 1-2 times daily';
      feedingDetails = 'Mix of flakes/pellets, frozen foods, and occasional veggies for variety.';
    }

    // Flow recommendation
    let flowRec = 'Moderate flow';
    let flowDetails = 'Standard HOB or canister filter flow is fine.';
    if (needsHighFlow && !needsLowFlow) {
      flowRec = 'High flow / High oxygen';
      flowDetails = 'Use powerhead or wavemaker. These species need strong current.';
    } else if (needsLowFlow && !needsHighFlow) {
      flowRec = 'Low/gentle flow';
      flowDetails = 'Baffle filter output or use sponge filter. Avoid strong currents.';
    } else if (needsHighFlow && needsLowFlow) {
      flowRec = 'Mixed (create zones)';
      flowDetails = 'Create high-flow and calm areas. Use plants/decor to break current.';
    }

    // Build HTML
    let html = '';

    // Temperature
    const tempRange = minTemp <= maxTemp ? `${minTemp}°F - ${maxTemp}°F` : 'Conflict!';
    const tempClass = minTemp > maxTemp ? 'care-rec-item--warning' : '';
    html += `
      <div class="care-rec-item ${tempClass}">
        <div class="care-rec-item__header">
          <span class="care-rec-item__icon">🌡️</span>
          <span class="care-rec-item__title">Water Temperature</span>
        </div>
        <div class="care-rec-item__value">${tempRange}</div>
        <div class="care-rec-item__details">
          ${minTemp > maxTemp ? '⚠️ Species have incompatible temperature needs!' : 'Overlapping safe range for all species. Use heater with thermostat.'}
        </div>
      </div>
    `;

    // pH
    const phRange = minPh <= maxPh ? `${minPh.toFixed(1)} - ${maxPh.toFixed(1)}` : 'Conflict!';
    const phClass = minPh > maxPh ? 'care-rec-item--warning' : '';
    html += `
      <div class="care-rec-item ${phClass}">
        <div class="care-rec-item__header">
          <span class="care-rec-item__icon">🧪</span>
          <span class="care-rec-item__title">pH Level</span>
        </div>
        <div class="care-rec-item__value">${phRange}</div>
        <div class="care-rec-item__details">
          ${minPh > maxPh ? '⚠️ Species have incompatible pH needs!' : 'Test weekly. Stability is more important than hitting exact numbers.'}
        </div>
      </div>
    `;

    // Filtration
    html += `
      <div class="care-rec-item">
        <div class="care-rec-item__header">
          <span class="care-rec-item__icon">🔄</span>
          <span class="care-rec-item__title">Filter Size</span>
        </div>
        <div class="care-rec-item__value">${recommendedGPH}+ GPH</div>
        <div class="care-rec-item__details">
          Rated for ${filterMultiplier}× tank volume. Canister or quality HOB recommended.
        </div>
      </div>
    `;

    // Flow
    html += `
      <div class="care-rec-item">
        <div class="care-rec-item__header">
          <span class="care-rec-item__icon">💨</span>
          <span class="care-rec-item__title">Water Flow</span>
        </div>
        <div class="care-rec-item__value">${flowRec}</div>
        <div class="care-rec-item__details">${flowDetails}</div>
      </div>
    `;

    // Feeding
    html += `
      <div class="care-rec-item">
        <div class="care-rec-item__header">
          <span class="care-rec-item__icon">🍽️</span>
          <span class="care-rec-item__title">Feeding</span>
        </div>
        <div class="care-rec-item__value">${feedingRec}</div>
        <div class="care-rec-item__details">${feedingDetails}</div>
      </div>
    `;

    // Water changes
    const waterChangePercent = totalBioload > tankSize * 0.7 ? '30-40%' : '20-25%';
    html += `
      <div class="care-rec-item">
        <div class="care-rec-item__header">
          <span class="care-rec-item__icon">💧</span>
          <span class="care-rec-item__title">Water Changes</span>
        </div>
        <div class="care-rec-item__value">${waterChangePercent} weekly</div>
        <div class="care-rec-item__details">
          Use dechlorinator. Gravel vacuum during changes. Test water parameters regularly.
        </div>
      </div>
    `;

    // Special notes
    if (specialNotes.length > 0) {
      html += `
        <div class="care-rec-item care-rec-item--highlight">
          <div class="care-rec-item__header">
            <span class="care-rec-item__icon">⭐</span>
            <span class="care-rec-item__title">Special Requirements</span>
          </div>
          <div class="care-rec-item__details">
            ${specialNotes.slice(0, 3).join('<br>')}
          </div>
        </div>
      `;
    }

    content.innerHTML = html;
  }

  getSpeciesImage(speciesId, icon) {
    const imageData = SPECIES_IMAGES[speciesId];

    // If no images or null, show emoji placeholder
    if (!imageData || (Array.isArray(imageData) && imageData.length === 0)) {
      return `
        <div class="modal__image-container">
          <div class="modal__image-placeholder">${icon}</div>
        </div>
      `;
    }

    // Convert to array if single string (backwards compatibility)
    const images = Array.isArray(imageData) ? imageData : [imageData];

    // Create scrollable gallery if multiple images
    if (images.length > 1) {
      const imageElements = images.map((url, index) => `
        <img class="modal__gallery-image" 
             src="${url}" 
             alt="Photo ${index + 1}" 
             onerror="this.style.display='none'"
             loading="lazy">
      `).join('');

      return `
        <div class="modal__gallery-container">
          <div class="modal__gallery-scroll">
            ${imageElements}
          </div>
          <div class="modal__gallery-hint">
            <span class="modal__gallery-hint-icon">👆</span>
            <span>Scroll for more photos</span>
          </div>
          <span class="modal__image-credit">📷 Wikimedia Commons</span>
        </div>
      `;
    }

    // Single image
    return `
      <div class="modal__image-container">
        <img class="modal__image" src="${images[0]}" alt="Photo" onerror="this.parentElement.innerHTML='<div class=\\'modal__image-placeholder\\'>${icon}</div>'">
        <span class="modal__image-credit">📷 Wikimedia Commons</span>
      </div>
    `;
  }

  openModal(speciesId) {
    const species = this.allSpecies.find(s => s.id === speciesId);
    if (!species) return;

    this.selectedSpecies = species;
    const modal = document.getElementById('species-modal');
    const content = document.getElementById('modal-content');

    if (!modal || !content) return;

    const count = tankManager.getSpeciesCount(speciesId);
    const isPest = species.isPest || false;

    content.innerHTML = `
      <div class="modal__header">
        <div>
          <h2 class="modal__title">${species.commonName}</h2>
          <p class="modal__scientific">${species.scientificName}</p>
          ${isPest ? '<span class="badge badge--pest" style="margin-top: 8px; display: inline-block;">⚠️ Pest Species</span>' : ''}
        </div>
        <button class="modal__close">✕</button>
      </div>
      <div class="modal__body">
        ${this.getSpeciesImage(speciesId, species.icon)}
        
        <div class="modal__section">
          <h4 class="modal__section-title">Quick Stats</h4>
          <div class="modal__stats-grid">
            <div class="modal__stat">
              <div class="modal__stat-label">Max Size</div>
              <div class="modal__stat-value">${species.maxSize} inches</div>
            </div>
            <div class="modal__stat">
              <div class="modal__stat-label">Min Tank Size</div>
              <div class="modal__stat-value">${species.minTankSize} gallons</div>
            </div>
            <div class="modal__stat">
              <div class="modal__stat-label">Temperament</div>
              <div class="modal__stat-value">
                <span class="badge badge--${species.temperament}">${this.capitalizeFirst(species.temperament)}</span>
              </div>
            </div>
            <div class="modal__stat">
              <div class="modal__stat-label">Care Level</div>
              <div class="modal__stat-value">
                <span class="badge badge--${species.careLevel}">${this.capitalizeFirst(species.careLevel)}</span>
              </div>
            </div>
            <div class="modal__stat">
              <div class="modal__stat-label">Diet</div>
              <div class="modal__stat-value">${this.capitalizeFirst(species.diet)}</div>
            </div>
            <div class="modal__stat">
              <div class="modal__stat-label">Bioload</div>
              <div class="modal__stat-value">${species.bioload} ${species.bioload === 1 ? 'point' : 'points'}</div>
            </div>
          </div>
        </div>
        
        <div class="modal__section">
          <h4 class="modal__section-title">Water Parameters</h4>
          <div class="modal__stats-grid">
            <div class="modal__stat">
              <div class="modal__stat-label">Temperature</div>
              <div class="modal__stat-value">${species.waterParams.tempMin}°F - ${species.waterParams.tempMax}°F</div>
            </div>
            <div class="modal__stat">
              <div class="modal__stat-label">pH Range</div>
              <div class="modal__stat-value">${species.waterParams.phMin} - ${species.waterParams.phMax}</div>
            </div>
          </div>
        </div>

        ${species.schooling ? `
        <div class="modal__section">
          <h4 class="modal__section-title">Schooling</h4>
          <p>This is a schooling species. Keep at least <strong>${species.minSchool || 6}</strong> individuals together.</p>
        </div>
        ` : ''}

        <div class="modal__section">
          <h4 class="modal__section-title">Notes</h4>
          <p>${species.notes || 'No additional notes.'}</p>
        </div>
      </div>
      <div class="modal__footer">
        <button class="btn btn--secondary" id="modal-close-btn">Close</button>
        <button class="btn btn--primary" id="modal-add-btn">
          ${count > 0 ? `Add Another (${count} in tank)` : 'Add to Tank'}
        </button>
      </div>
    `;

    // Event handlers
    content.querySelector('#modal-close-btn')?.addEventListener('click', () => this.closeModal());
    content.querySelector('#modal-add-btn')?.addEventListener('click', () => {
      tankManager.addSpecies(species, 1);
      // Update button text
      const newCount = tankManager.getSpeciesCount(speciesId);
      const btn = content.querySelector('#modal-add-btn');
      if (btn) btn.textContent = `Add Another (${newCount} in tank)`;
    });

    modal.classList.add('active');
  }

  closeModal() {
    const modal = document.getElementById('species-modal');
    if (modal) {
      modal.classList.remove('active');
      this.selectedSpecies = null;
    }
  }

  render() {
    this.renderSpeciesGrid();
    this.renderVisualTank();
    this.renderBioloadMeter();
    this.renderStockList();
    this.renderWarnings();
    this.renderCareRecommendations();
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export const uiManager = new UIManager();
export default uiManager;

