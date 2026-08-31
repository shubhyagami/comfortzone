# ComfortZone  

[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)  
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)  
[![Docs](https://img.shields.io/badge/docs-yes-green?style=flat-square)](https://github.com/shubhyagami/comfortzone/blob/main/README.md)  
[![Version](https://img.shields.io/github/v/release/shubhyagami/comfortzone?include_prereleases&label=version&style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)  

---

## Introduction  

ComfortZone is a lightweight toolkit that bridges Python and JavaScript to monitor and improve personal workspace comfort. It records data from local IoT sensors—temperature, humidity, and noise—combines it with user‑submitted mood and comfort scores, and visualizes the integrated information on a simple web dashboard.

## Features  

- **Environmental tracking** – continuously logs temperature, humidity, and ambient noise.  
- **Mood logging** – CLI command captures subjective comfort alongside sensor readings.  
- **Customizable dashboard** – local web UI built with Node.js; layout can be edited via `widgets.json`.  
- **Correlation analytics** – automatically highlights relationships between environmental factors and mood.  
- **Automatic backups** – weekly backups of log files, fully configurable through `config.yaml`.  
- **Extensible plugins** – add new sensor drivers or visualization widgets with minimal configuration.  

## Getting Started  

### Prerequisites  
- Python 3.8+  
- Node.js 14+  

### Installation  
```bash
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone
pip install -r requirements.txt
npm install
```

### Initialize configuration  
```bash
python -m comfortzone --init   # creates default config.yml and widgets.json
npm start                      # starts the dashboard on http://localhost:3000
```

## Usage  

### Log environmental data  
```bash
python -m comfortzone log --temp 22 --humidity 45 --noise 38
```

### Record mood  
```bash
python -m comfortzone mood --score 4 --note "Focused"
```

### Customize the dashboard  
Edit `widgets.json` to add, remove, or rearrange widgets as desired.  

### Backup schedule  
Backups run automatically each Sunday; modify the schedule in `config.yaml` if needed.  

### Data retention  
Set retention policies in `config.yaml` to control how long historical data is kept.  

## Tips  

- Pair with a smart thermostat to explore how temperature influences productivity.  
- Detect occasional noise spikes that may disrupt focus.  
- Log mood regularly so the analytics engine can learn your optimal environment.  

## Contributing  

Contributions are welcome! Keep your branch synchronized with `main` before opening a pull request. Follow conventional commit conventions; detailed instructions are in `CONTRIBUTING.md`.  

## License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  

## Changelog  

- **2026‑08‑30** – Updated README with clearer sections, added relevant badges, and refined the feature list.  
- **2026‑08‑28** – Initial README reorganization, typo corrections, and wording improvements.
