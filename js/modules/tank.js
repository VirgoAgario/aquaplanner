// Tank Management Module
import { checkCompatibility } from './compatibility.js';

const STORAGE_KEY = 'aquaplanner_tank';

class TankManager {
    constructor() {
        this.tankSize = 20; // Default gallons
        this.stock = []; // Array of {species, quantity}
        this.listeners = new Set();
        this.maxBioloadPerGallon = 1.5; // Conservative estimate
        this.allSpecies = []; // Will be set by init for restoring from storage
    }

    // Set all species data for restoring from localStorage
    setSpeciesData(speciesData) {
        this.allSpecies = speciesData;
        this.loadFromStorage();
    }

    setTankSize(gallons) {
        this.tankSize = Math.max(1, gallons);
        this.notifyListeners();
    }

    getTankSize() {
        return this.tankSize;
    }

    addSpecies(species, quantity = 1) {
        const existing = this.stock.find(s => s.species.id === species.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.stock.push({ species, quantity });
        }
        this.notifyListeners();
    }

    removeSpecies(speciesId, quantity = 1) {
        const index = this.stock.findIndex(s => s.species.id === speciesId);
        if (index !== -1) {
            this.stock[index].quantity -= quantity;
            if (this.stock[index].quantity <= 0) {
                this.stock.splice(index, 1);
            }
        }
        this.notifyListeners();
    }

    removeAllOfSpecies(speciesId) {
        this.stock = this.stock.filter(s => s.species.id !== speciesId);
        this.notifyListeners();
    }

    getStock() {
        return this.stock;
    }

    clearTank() {
        this.stock = [];
        this.notifyListeners();
    }

    getSpeciesCount(speciesId) {
        const item = this.stock.find(s => s.species.id === speciesId);
        return item ? item.quantity : 0;
    }

    getTotalSpeciesCount() {
        return this.stock.reduce((sum, s) => sum + s.quantity, 0);
    }

    // Calculate total bioload
    calculateBioload() {
        return this.stock.reduce((total, item) => {
            return total + (item.species.bioload * item.quantity);
        }, 0);
    }

    // Get max recommended bioload for current tank
    getMaxBioload() {
        return Math.floor(this.tankSize * this.maxBioloadPerGallon);
    }

    // Get bioload percentage (0-100+)
    getBioloadPercentage() {
        const max = this.getMaxBioload();
        if (max === 0) return 0;
        return Math.round((this.calculateBioload() / max) * 100);
    }

    // Get bioload status
    getBioloadStatus() {
        const percentage = this.getBioloadPercentage();
        if (percentage <= 70) return 'safe';
        if (percentage <= 100) return 'warning';
        return 'danger';
    }

    // Get all compatibility warnings
    getWarnings() {
        return checkCompatibility(this.stock, this.tankSize);
    }

    // Subscribe to changes
    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    notifyListeners() {
        this.saveToStorage(); // Auto-save on every change
        this.listeners.forEach(callback => callback(this));
    }

    // Export tank configuration
    exportConfig() {
        return {
            tankSize: this.tankSize,
            stock: this.stock.map(s => ({
                id: s.species.id,
                type: s.species.type,
                quantity: s.quantity
            }))
        };
    }

    // Save tank to localStorage
    saveToStorage() {
        try {
            const data = {
                tankSize: this.tankSize,
                stock: this.stock.map(s => ({
                    id: s.species.id,
                    quantity: s.quantity
                })),
                savedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save tank to localStorage:', e);
        }
    }

    // Load tank from localStorage
    loadFromStorage() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return false;

            const data = JSON.parse(saved);

            // Restore tank size
            if (data.tankSize) {
                this.tankSize = data.tankSize;
            }

            // Restore stock by looking up species from allSpecies
            if (data.stock && this.allSpecies.length > 0) {
                this.stock = [];
                data.stock.forEach(item => {
                    const species = this.allSpecies.find(s => s.id === item.id);
                    if (species) {
                        this.stock.push({ species, quantity: item.quantity });
                    }
                });
            }

            console.log('🐠 Tank restored from save!', data.savedAt);
            return true;
        } catch (e) {
            console.warn('Failed to load tank from localStorage:', e);
            return false;
        }
    }

    // Clear saved data
    clearStorage() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn('Failed to clear localStorage:', e);
        }
    }
}

export const tankManager = new TankManager();
export default tankManager;

