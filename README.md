# ComfortZone  

[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)  
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)  
[![Docs](https://img.shields.io/badge/docs-yes-green?style=flat-square)](https://github.com/shubhyagami/comfortzone/blob/main/README.md)  

---

## Overview  

ComfortZone is a lightweight toolkit that merges Python and JavaScript to monitor and improve personal workspace comfort. It logs data from local IoT sensors (temperature, humidity, noise) and combines it with user‑submitted mood and comfort scores, then visualizes the combined information on a simple web dashboard.

## Features  

- **Environmental tracking** – records temperature, humidity, and noise from connected sensors.  
- **Mood logging** – CLI command to capture subjective comfort and mood alongside sensor data.  
- **Customizable dashboard** – a local web UI built with Node.js; layouts are configurable via `widgets.json`.  
- **Insightful analytics** – visual correlations reveal optimal workspace conditions.  
- **Automatic backups** – weekly backups of log files, configurable via `config.yaml`.  
- **Extensible plugins** – easy to add new sensor drivers or visualization widgets.  

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

### Run the application  
```bash
python -m comfortzone --init   # initializes configuration files
npm start                      # launches the dashboard
```  
The dashboard is available at `http://localhost:3000`.

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
Edit `widgets.json` to add, remove, or rearrange widgets as needed.  

### Backup schedule  
Backups run automatically each Sunday; adjust the schedule in `config.yaml` if required.  

### Manage data retention  
Set retention policies in `config.yaml` to control how long historical data is kept.

## Tips  

- Pair with a smart thermostat to explore the relationship between temperature and productivity.  
- Detect noise spikes that may affect focus.  
- Regularly log mood to help the analytics algorithm learn your ideal environment.  

## Contributing  

Contributions are welcome! Keep your branch up‑to‑date with `main` before opening a pull request. Follow conventional commit guidelines; see `CONTRIBUTING.md` for detailed instructions.

## License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog  

- **2026‑08‑30** – Polished README with clearer sections, added badges, and concise feature list.  
- **2026‑08‑28** – Initial README reorganization, typo fixes, and improved wording.  

---  

Feel free to explore the repository, file issues, or submit pull requests to help improve ComfortZone.
