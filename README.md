# ComfortZone  

[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)  
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)  
[![Docs](https://img.shields.io/badge/docs-yes-green?style=flat-square)](https://github.com/shubhyagami/comfortzone/blob/main/README.md)  

---

## Overview  
ComfortZone is a lightweight toolkit that blends Python and JavaScript to monitor and improve personal workspace comfort. It collects data from local IoT sensors (temperature, humidity, noise) and merges it with user‑submitted mood and comfort scores, then visualizes the combined information on a simple web dashboard.

## Features  
- **Environmental tracking** – logs temperature, humidity, and noise from connected sensors.  
- **Mood logging** – CLI for recording subjective comfort and mood alongside sensor data.  
- **Customizable dashboard** – local web UI built with Node.js; layouts are configurable via `widgets.json`.  
- **Insightful analytics** – visual correlations reveal optimal workspace conditions.  
- **Backup & export** – automatic weekly backups of log files.  
- **Extensible plugins** – easy to add new sensor drivers or visualization widgets.  

## Getting Started  

### Prerequisites  
- Python 3.8+  
- Node.js 14+  

### Installation & Setup  
```bash
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone
pip install -r requirements.txt
npm install
```

### Initialization  
```bash
python -m comfortzone --init
npm start
```  
The dashboard will be available at `http://localhost:3000`.

### Quick Start Checklist  
1. Connect your IoT sensors (temperature, humidity, noise).  
2. Run `python -m comfortzone --init` to generate sample log files.  
3. Open the dashboard at `http://localhost:3000` and explore the default layout.  

## Usage  

- **Log environmental data** with the provided CLI:  
  ```bash
  python -m comfortzone log --temp 22 --humidity 45 --noise 38
  ```  
- **Record mood** using the `mood` command:  
  ```bash
  python -m comfortzone mood --score 4 --note "Focused"
  ```  
- **Customize the dashboard** by editing `widgets.json`. Add, remove, or rearrange widgets to suit your workflow.  
- **Back up data** automatically runs each Sunday; you can adjust the schedule in `config.yaml`.  

## Tips & Use Cases  

- **Optimize temperature** – pair with a smart thermostat to map productivity vs. temperature.  
- **Noise awareness** – detect spikes that may affect focus.  
- **Mood‑driven feedback** – regularly log mood to help the analytics algorithm learn your ideal environment.  
- **Weekly backups** – configure retention policies in `config.yaml` to keep historical data tidy.  

## Contributing  

Contributions are welcome! Keep your branch up‑to‑date with `main` before opening a pull request. Follow conventional commit guidelines; see `CONTRIBUTING.md` for detailed instructions.

## License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog  

- **2026‑08‑28** – Polished README with clearer sections, added badges, and concise feature list.  
- **2026‑08‑26** – Initial README reorganization and typo fixes.  

---  

*Feel free to explore the repository, file issues, or submit pull requests to help improve ComfortZone.*
