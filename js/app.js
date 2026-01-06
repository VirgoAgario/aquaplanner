// Main Application Entry Point
import { fishData } from './data/fish.js';
import { snailData } from './data/snails.js';
import { shrimpData } from './data/shrimp.js';
import { uiManager } from './modules/ui.js';
import tankManager from './modules/tank.js';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐠 Aquarium Planner initialized!');

    // Combine all species data
    const allSpecies = [...fishData, ...snailData, ...shrimpData];

    // Set species data on tank manager (this also loads from localStorage if available)
    tankManager.setSpeciesData(allSpecies);

    // Initialize UI with all species data
    uiManager.init(fishData, snailData, shrimpData);

    // Update tank size button to match restored tank size
    const restoredSize = tankManager.getTankSize();
    const matchingBtn = document.querySelector(`.tank-size-btn[data-gallons="${restoredSize}"]`);
    if (matchingBtn) {
        matchingBtn.classList.add('active');
    } else {
        // Set custom input if no matching preset
        const customInput = document.getElementById('custom-tank-size');
        if (customInput) customInput.value = restoredSize;
    }
});

