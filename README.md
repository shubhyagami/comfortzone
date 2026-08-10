# ComfortZone

[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node 14+](https://img.shields.io/badge/Node-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

A hybrid Python and JavaScript toolkit for tracking, visualizing, and optimizing personal environmental comfort. ComfortZone connects to local IoT sensors to monitor temperature, humidity, and ambient noise, combining this hardware data with subjective user inputs to help you find your ideal workspace conditions.

## Features

- **Sensor Integration:** Connects to standard IoT thermostats and hygrometers to automatically log ambient temperature and humidity.
- **Ambient Noise Tracking:** Monitors environmental noise levels to help identify disruptions in your focus.
- **Subjective Mood Logging:** A Python CLI tool to manually log your current mood and comfort level alongside sensor data.
- **Customizable Dashboard:** A local web dashboard built in Node.js that visualizes metrics and can be customized using `widgets.json`.

## Getting Started

**Prerequisites:** Ensure you have Python 3.8+ and Node.js 14+ installed before starting.

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhyagami/comfortzone.git
   cd comfortzone
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   npm install
   ```

3. **Initialize and run**
   ```bash
   python -m comfortzone --init
   npm start
   ```

   Your local dashboard will be available at `http://localhost:3000`.

## Usage Tips

- **The "Perfect Temperature" Hunt:** Use ComfortZone alongside an IoT thermostat to map productivity against room temperature. Most users discover their optimal "Goldilocks Zone" is approximately 21.5°C (71°F) with 45% relative humidity.
- **Zen Mode Integration:** Pair the ambient noise tracker with your morning routine. The dashboard automatically visualizes noise spikes, helping you identify exactly when your environment disrupts focus.
- **Export often:** Set configurations to automatically back up logs weekly to preserve historical tracking data.
- **Subjective inputs matter:** The optimization algorithm learns your ideal comfort conditions faster when you regularly log manual mood inputs via the CLI.
- **Dashboard Customization:** Add or rearrange widgets by modifying `widgets.json` to keep your dashboard focused on the metrics you care about most.

## Contributing

Contributions are welcome! Before opening a pull request, please ensure your local branch is up to date with `main`. We use conventional commits to maintain a clear project history (format: `feat: [change]`, `fix: [change]`). Keep your commits focused, and please open an issue to discuss any major refactors before submitting a PR. See `CONTRIBUTING.md` for more details.

## Changelog

### 2026-08-10
- **Docs:** Streamlined section formatting, refined the project description, and polished the usage tips for clarity.

### 2026-08-08
- **Docs:** Conducted a full README review, refining feature descriptions and tightening the Quick Start guide for clarity.

### 2026-08-07
- **New:** Replaced the theoretical Quantum Comfort Field stub with concrete documentation for the sensor integration and noise tracking features.
- **Docs:** Cleaned up README formatting, fixed broken widget configuration instructions, and removed outdated lore.
- **Docs:** Streamlined the Quick Start guide and updated the feature list.

### 2026-08-05
- **New:** Added project status badges to the README header.
- **Docs:** Added initial Quick Start guide and Pro Tips section.
