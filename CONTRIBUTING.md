# Contributing to AquaPlanner

Thanks for helping make AquaPlanner better! Here's how to contribute.

## Adding Species

The most valuable contribution is expanding our species database.

1. Choose the right file:
   - Fish: `js/data/fish.js`
   - Shrimp: `js/data/shrimp.js`
   - Snails: `js/data/snails.js`
   - Plants: `js/data/plants.js`

2. Follow the existing data schema in the file

3. Species data should include:
   - Accurate scientific names
   - Verified water parameters (temp, pH)
   - Realistic bioload values
   - Correct temperament assessment
   - Accurate incompatible species list
   - Helpful care notes

4. Submit a pull request with your changes

## Code Style

- 4-space indentation
- Trailing commas in arrays/objects
- Descriptive variable names
- Comments for complex logic
- ES module syntax (`export`, `import`)

## Reporting Issues

Open an issue on GitHub with:
- Description of the bug or feature request
- Steps to reproduce (for bugs)
- Screenshots if applicable
- Browser/device info

## Pull Request Process

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Test locally with `python3 -m http.server`
5. Submit a PR with clear description of changes

## Data Accuracy

Please verify species data from reliable sources:
- seriouslyfish.com
- FishBase
- Aquarium Co-Op
- Your personal experience
