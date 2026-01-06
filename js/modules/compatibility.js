// Compatibility Checker Module
// Checks for conflicts between species in the tank

export const WARNING_TYPES = {
    TANK_TOO_SMALL: 'tank_too_small',
    BIOLOAD_WARNING: 'bioload_warning',
    BIOLOAD_CRITICAL: 'bioload_critical',
    TERRITORIAL_CONFLICT: 'territorial_conflict',
    PREDATOR_PREY: 'predator_prey',
    TEMP_MISMATCH: 'temp_mismatch',
    PH_MISMATCH: 'ph_mismatch',
    SCHOOLING_MIN: 'schooling_min',
    FIN_NIPPER: 'fin_nipper',
    SAME_SPECIES_AGGRESSION: 'same_species_aggression',
    SNAIL_EATER: 'snail_eater',
    INCOMPATIBLE: 'incompatible',
    SHRIMP_UNSAFE: 'shrimp_unsafe',
    COLDWATER_TROPICAL_MIX: 'coldwater_tropical_mix'
};

const WARNING_SEVERITY = {
    [WARNING_TYPES.BIOLOAD_CRITICAL]: 'error',
    [WARNING_TYPES.PREDATOR_PREY]: 'error',
    [WARNING_TYPES.TERRITORIAL_CONFLICT]: 'error',
    [WARNING_TYPES.SAME_SPECIES_AGGRESSION]: 'error',
    [WARNING_TYPES.INCOMPATIBLE]: 'error',
    [WARNING_TYPES.COLDWATER_TROPICAL_MIX]: 'error',
    [WARNING_TYPES.TANK_TOO_SMALL]: 'warning',
    [WARNING_TYPES.BIOLOAD_WARNING]: 'warning',
    [WARNING_TYPES.TEMP_MISMATCH]: 'warning',
    [WARNING_TYPES.PH_MISMATCH]: 'warning',
    [WARNING_TYPES.FIN_NIPPER]: 'warning',
    [WARNING_TYPES.SNAIL_EATER]: 'warning',
    [WARNING_TYPES.SHRIMP_UNSAFE]: 'warning',
    [WARNING_TYPES.SCHOOLING_MIN]: 'info'
};

const WARNING_MESSAGES = {
    [WARNING_TYPES.TANK_TOO_SMALL]: {
        title: 'Tank Too Small',
        icon: '📏'
    },
    [WARNING_TYPES.BIOLOAD_WARNING]: {
        title: 'High Bioload',
        icon: '⚠️'
    },
    [WARNING_TYPES.BIOLOAD_CRITICAL]: {
        title: 'Critical Bioload',
        icon: '🚨'
    },
    [WARNING_TYPES.TERRITORIAL_CONFLICT]: {
        title: 'Territorial Conflict',
        icon: '⚔️'
    },
    [WARNING_TYPES.PREDATOR_PREY]: {
        title: 'Predator-Prey Risk',
        icon: '🎯'
    },
    [WARNING_TYPES.TEMP_MISMATCH]: {
        title: 'Temperature Mismatch',
        icon: '🌡️'
    },
    [WARNING_TYPES.PH_MISMATCH]: {
        title: 'pH Mismatch',
        icon: '🧪'
    },
    [WARNING_TYPES.SCHOOLING_MIN]: {
        title: 'Schooling Requirement',
        icon: '👥'
    },
    [WARNING_TYPES.FIN_NIPPER]: {
        title: 'Fin Nipping Risk',
        icon: '✂️'
    },
    [WARNING_TYPES.SAME_SPECIES_AGGRESSION]: {
        title: 'Same Species Aggression',
        icon: '💢'
    },
    [WARNING_TYPES.SNAIL_EATER]: {
        title: 'Snail-Eating Fish',
        icon: '🐌'
    },
    [WARNING_TYPES.INCOMPATIBLE]: {
        title: 'Incompatible Species',
        icon: '🚫'
    },
    [WARNING_TYPES.SHRIMP_UNSAFE]: {
        title: 'Shrimp at Risk',
        icon: '🦐'
    },
    [WARNING_TYPES.COLDWATER_TROPICAL_MIX]: {
        title: 'Cold/Tropical Mix',
        icon: '❄️'
    }
};

// Check if species has long fins (targets for fin nippers)
function hasLongFins(species) {
    const longFinnedSpecies = ['betta', 'guppy', 'angelfish', 'goldfish-fancy'];
    return longFinnedSpecies.includes(species.id);
}

// Check if species is a coldwater fish
function isColdwater(species) {
    const coldwaterSpecies = ['goldfish-fancy', 'goldfish-common', 'zebra-danio'];
    return coldwaterSpecies.includes(species.id) ||
        (species.waterParams && species.waterParams.tempMax <= 76);
}

// Check if species is tropical
function isTropical(species) {
    return species.waterParams && species.waterParams.tempMin >= 75;
}

// Check if shrimp species
function isShrimp(species) {
    return species.type === 'shrimp';
}

// Check if snail species
function isSnail(species) {
    return species.type === 'snail';
}

// Main compatibility checker
export function checkCompatibility(stock, tankSize) {
    const warnings = [];

    if (stock.length === 0) return warnings;

    // Calculate total bioload
    const totalBioload = stock.reduce((sum, s) => sum + (s.species.bioload * s.quantity), 0);
    const maxBioload = tankSize * 1.5;
    const bioloadPercent = (totalBioload / maxBioload) * 100;

    // Bioload warnings
    if (bioloadPercent > 100) {
        warnings.push({
            type: WARNING_TYPES.BIOLOAD_CRITICAL,
            severity: WARNING_SEVERITY[WARNING_TYPES.BIOLOAD_CRITICAL],
            ...WARNING_MESSAGES[WARNING_TYPES.BIOLOAD_CRITICAL],
            description: `Bioload is at ${Math.round(bioloadPercent)}%. This is dangerous for fish health and water quality.`
        });
    } else if (bioloadPercent > 70) {
        warnings.push({
            type: WARNING_TYPES.BIOLOAD_WARNING,
            severity: WARNING_SEVERITY[WARNING_TYPES.BIOLOAD_WARNING],
            ...WARNING_MESSAGES[WARNING_TYPES.BIOLOAD_WARNING],
            description: `Bioload is at ${Math.round(bioloadPercent)}%. Consider reducing stock or increasing tank size.`
        });
    }

    // Check each species
    stock.forEach(item => {
        const species = item.species;
        const quantity = item.quantity;

        // Tank size check
        if (species.minTankSize > tankSize) {
            warnings.push({
                type: WARNING_TYPES.TANK_TOO_SMALL,
                severity: WARNING_SEVERITY[WARNING_TYPES.TANK_TOO_SMALL],
                ...WARNING_MESSAGES[WARNING_TYPES.TANK_TOO_SMALL],
                description: `${species.commonName} requires at least ${species.minTankSize} gallons. Current tank is ${tankSize} gallons.`,
                speciesId: species.id
            });
        }

        // Schooling fish minimum
        if (species.schooling && species.minSchool && quantity < species.minSchool) {
            warnings.push({
                type: WARNING_TYPES.SCHOOLING_MIN,
                severity: WARNING_SEVERITY[WARNING_TYPES.SCHOOLING_MIN],
                ...WARNING_MESSAGES[WARNING_TYPES.SCHOOLING_MIN],
                description: `${species.commonName} is a schooling fish and needs at least ${species.minSchool} individuals. You have ${quantity}.`,
                speciesId: species.id
            });
        }

        // Same species aggression (like bettas)
        if (species.sameSpeciesAggression && quantity > 1) {
            warnings.push({
                type: WARNING_TYPES.SAME_SPECIES_AGGRESSION,
                severity: WARNING_SEVERITY[WARNING_TYPES.SAME_SPECIES_AGGRESSION],
                ...WARNING_MESSAGES[WARNING_TYPES.SAME_SPECIES_AGGRESSION],
                description: `Multiple ${species.commonName} together will fight. Only keep one, or provide separate tanks.`,
                speciesId: species.id
            });
        }
    });

    // Check compatibility between all pairs
    for (let i = 0; i < stock.length; i++) {
        for (let j = i + 1; j < stock.length; j++) {
            const species1 = stock[i].species;
            const species2 = stock[j].species;

            // Direct incompatibility check
            if (species1.incompatibleWith?.includes(species2.id) ||
                species2.incompatibleWith?.includes(species1.id)) {
                warnings.push({
                    type: WARNING_TYPES.INCOMPATIBLE,
                    severity: WARNING_SEVERITY[WARNING_TYPES.INCOMPATIBLE],
                    ...WARNING_MESSAGES[WARNING_TYPES.INCOMPATIBLE],
                    description: `${species1.commonName} and ${species2.commonName} are not compatible together.`,
                    speciesIds: [species1.id, species2.id]
                });
            }

            // Temperature overlap check
            if (species1.waterParams && species2.waterParams) {
                const tempOverlap = Math.min(species1.waterParams.tempMax, species2.waterParams.tempMax) -
                    Math.max(species1.waterParams.tempMin, species2.waterParams.tempMin);
                if (tempOverlap < 3) {
                    warnings.push({
                        type: WARNING_TYPES.TEMP_MISMATCH,
                        severity: WARNING_SEVERITY[WARNING_TYPES.TEMP_MISMATCH],
                        ...WARNING_MESSAGES[WARNING_TYPES.TEMP_MISMATCH],
                        description: `${species1.commonName} (${species1.waterParams.tempMin}-${species1.waterParams.tempMax}°F) and ${species2.commonName} (${species2.waterParams.tempMin}-${species2.waterParams.tempMax}°F) have incompatible temperature needs.`,
                        speciesIds: [species1.id, species2.id]
                    });
                }

                // pH overlap check
                const phOverlap = Math.min(species1.waterParams.phMax, species2.waterParams.phMax) -
                    Math.max(species1.waterParams.phMin, species2.waterParams.phMin);
                if (phOverlap < 0.3) {
                    warnings.push({
                        type: WARNING_TYPES.PH_MISMATCH,
                        severity: WARNING_SEVERITY[WARNING_TYPES.PH_MISMATCH],
                        ...WARNING_MESSAGES[WARNING_TYPES.PH_MISMATCH],
                        description: `${species1.commonName} (pH ${species1.waterParams.phMin}-${species1.waterParams.phMax}) and ${species2.commonName} (pH ${species2.waterParams.phMin}-${species2.waterParams.phMax}) have incompatible pH needs.`,
                        speciesIds: [species1.id, species2.id]
                    });
                }
            }

            // Fin nipper + long-finned fish check
            if ((species1.finNipper && hasLongFins(species2)) ||
                (species2.finNipper && hasLongFins(species1))) {
                const nipper = species1.finNipper ? species1 : species2;
                const victim = species1.finNipper ? species2 : species1;
                warnings.push({
                    type: WARNING_TYPES.FIN_NIPPER,
                    severity: WARNING_SEVERITY[WARNING_TYPES.FIN_NIPPER],
                    ...WARNING_MESSAGES[WARNING_TYPES.FIN_NIPPER],
                    description: `${nipper.commonName} may nip the fins of ${victim.commonName}.`,
                    speciesIds: [species1.id, species2.id]
                });
            }

            // Predator/prey - large fish eating small fish/shrimp
            if (species1.predator && (isShrimp(species2) || species2.maxSize < 2)) {
                warnings.push({
                    type: WARNING_TYPES.PREDATOR_PREY,
                    severity: WARNING_SEVERITY[WARNING_TYPES.PREDATOR_PREY],
                    ...WARNING_MESSAGES[WARNING_TYPES.PREDATOR_PREY],
                    description: `${species1.commonName} may eat ${species2.commonName}.`,
                    speciesIds: [species1.id, species2.id]
                });
            }
            if (species2.predator && (isShrimp(species1) || species1.maxSize < 2)) {
                warnings.push({
                    type: WARNING_TYPES.PREDATOR_PREY,
                    severity: WARNING_SEVERITY[WARNING_TYPES.PREDATOR_PREY],
                    ...WARNING_MESSAGES[WARNING_TYPES.PREDATOR_PREY],
                    description: `${species2.commonName} may eat ${species1.commonName}.`,
                    speciesIds: [species1.id, species2.id]
                });
            }

            // Snail eaters + snails
            if ((species1.eatsSnails && isSnail(species2)) ||
                (species2.eatsSnails && isSnail(species1))) {
                const eater = species1.eatsSnails ? species1 : species2;
                const snail = isSnail(species1) ? species1 : species2;
                warnings.push({
                    type: WARNING_TYPES.SNAIL_EATER,
                    severity: WARNING_SEVERITY[WARNING_TYPES.SNAIL_EATER],
                    ...WARNING_MESSAGES[WARNING_TYPES.SNAIL_EATER],
                    description: `${eater.commonName} will eat ${snail.commonName}.`,
                    speciesIds: [species1.id, species2.id]
                });
            }

            // Assassin snails + other snails
            if ((species1.eatsSnails && isSnail(species1) && isSnail(species2)) ||
                (species2.eatsSnails && isSnail(species2) && isSnail(species1))) {
                const assassin = species1.eatsSnails ? species1 : species2;
                const prey = species1.eatsSnails ? species2 : species1;
                warnings.push({
                    type: WARNING_TYPES.SNAIL_EATER,
                    severity: WARNING_SEVERITY[WARNING_TYPES.SNAIL_EATER],
                    ...WARNING_MESSAGES[WARNING_TYPES.SNAIL_EATER],
                    description: `${assassin.commonName} will hunt and eat ${prey.commonName}.`,
                    speciesIds: [species1.id, species2.id]
                });
            }

            // Coldwater + tropical mix
            if ((isColdwater(species1) && isTropical(species2)) ||
                (isColdwater(species2) && isTropical(species1))) {
                const cold = isColdwater(species1) ? species1 : species2;
                const warm = isColdwater(species1) ? species2 : species1;
                warnings.push({
                    type: WARNING_TYPES.COLDWATER_TROPICAL_MIX,
                    severity: WARNING_SEVERITY[WARNING_TYPES.COLDWATER_TROPICAL_MIX],
                    ...WARNING_MESSAGES[WARNING_TYPES.COLDWATER_TROPICAL_MIX],
                    description: `${cold.commonName} is a coldwater fish and ${warm.commonName} is tropical. They cannot be kept at the same temperature.`,
                    speciesIds: [species1.id, species2.id]
                });
            }

            // Territorial conflicts
            if (species1.territorial && species2.territorial) {
                warnings.push({
                    type: WARNING_TYPES.TERRITORIAL_CONFLICT,
                    severity: WARNING_SEVERITY[WARNING_TYPES.TERRITORIAL_CONFLICT],
                    ...WARNING_MESSAGES[WARNING_TYPES.TERRITORIAL_CONFLICT],
                    description: `Both ${species1.commonName} and ${species2.commonName} are territorial and may fight over space.`,
                    speciesIds: [species1.id, species2.id]
                });
            }
        }
    }

    // Check shrimp safety with all fish
    const shrimp = stock.filter(s => isShrimp(s.species));
    const fish = stock.filter(s => s.species.type === 'fish');

    shrimp.forEach(shrimpItem => {
        fish.forEach(fishItem => {
            // Most fish over 3 inches will eat small shrimp
            if (fishItem.species.maxSize >= 3 && !['otocinclus', 'bristlenose-pleco', 'clown-pleco'].includes(fishItem.species.id)) {
                // Check if not already reported as incompatible
                const alreadyWarned = warnings.some(w =>
                    w.speciesIds?.includes(shrimpItem.species.id) && w.speciesIds?.includes(fishItem.species.id)
                );
                if (!alreadyWarned && shrimpItem.species.incompatibleWith?.includes(fishItem.species.id)) {
                    warnings.push({
                        type: WARNING_TYPES.SHRIMP_UNSAFE,
                        severity: WARNING_SEVERITY[WARNING_TYPES.SHRIMP_UNSAFE],
                        ...WARNING_MESSAGES[WARNING_TYPES.SHRIMP_UNSAFE],
                        description: `${fishItem.species.commonName} will likely eat ${shrimpItem.species.commonName}.`,
                        speciesIds: [shrimpItem.species.id, fishItem.species.id]
                    });
                }
            }
        });
    });

    // Sort warnings by severity (errors first, then warnings, then info)
    const severityOrder = { error: 0, warning: 1, info: 2 };
    warnings.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    // Remove duplicate warnings
    const unique = [];
    const seen = new Set();
    warnings.forEach(w => {
        const key = `${w.type}-${w.description}`;
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(w);
        }
    });

    return unique;
}

export default { checkCompatibility, WARNING_TYPES };
