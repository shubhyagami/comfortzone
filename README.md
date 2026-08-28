# ComfortZone

[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

## Overview
ComfortZone is a lightweight toolkit that combines Python and JavaScript to monitor and improve your personal workspace comfort. It gathers data from local IoT sensors (temperature, humidity, noise) and pairs it with user‑submitted mood and comfort scores, then visualizes the combined information on a simple web dashboard.

## Features
- **Environmental tracking** – logs temperature, humidity, and noise from connected sensors.  
- **Mood logging** – a CLI for recording subjective comfort and mood alongside sensor data.  
- **Customizable dashboard** – local web UI built with Node.js; layouts are configurable via `widgets.json`.  
- **Insightful analytics** – visual correlations help you discover optimal workspace conditions.  
- **Backup & export** – automatic weekly backups of log files.

## Getting Started
1. **Prerequisites** – Python 3.8+ and Node.js 14+.  
2. **Clone & install**  
   ```bash
   git clone https://github.com/shubhyagami/comfortzone.git
   cd comfortzone
   pip install -r requirements.txt
   npm install
   ```  
3. **Initialize and run**  
   ```bash
   python -m comfortzone --init
   npm start
   ```  
   The dashboard will be available at `http://localhost:3000`.

## Tips & Use Cases
- **Optimize temperature** – integrate with a smart thermostat to map productivity vs. temperature.  
- **Noise awareness** – spot spikes in ambient sound that may affect focus.  
- **Mood‑driven feedback** – regularly log mood to accelerate the algorithm’s learning of your ideal environment.  
- **Weekly backups** – configure automatic backups to preserve historical data.  
- **Dashboard customization** – edit `widgets.json` to add, remove, or rearrange visual widgets.

## Contributing
Contributions are welcome! Keep your branch up‑to‑date with `main` before opening a pull request. We follow conventional commit guidelines; see `CONTRIBUTING.md` for detailed instructions.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog
- **2026‑08‑28** – Polished README with clearer sections, added badges, and concise feature list.  
- **2026‑08‑26** – Initial README reorganization and typo fixes.
