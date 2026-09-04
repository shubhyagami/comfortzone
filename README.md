# ComfortZone

ComfortZone is a lightweight, cross‑language toolkit that records environmental data and mood, visualises their relationship, and keeps the results backed up. It uses Python for data collection and Node.js for a real‑time dashboard.

---  

## Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

---  

## Quick Start (under 5 min)

```bash
# 1. Clone
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2. Install dependencies
pip install -r requirements.txt   # Python core
npm install                       # Front‑end assets

# 3. Generate default config
python -m comfortzone --init   # creates config.yaml and widgets.json

# 4. Launch the dashboard
npm start   # opens http://localhost:3000
```

The dashboard watches `widgets.json`; changes are reflected immediately. Log sensor readings and moods from the CLI, and the view updates in real time.

---  

## Features

| Feature | What it does |
|---------|---------------|
| **Continuous logging** | Records temperature, humidity, and ambient noise from connected sensors. |
| **Mood capture** | Log a 1–5 comfort score and an optional note via the CLI. |
| **Custom UI** | Define widget layout in `widgets.json`. |
| **Correlation view** | Visualise how environmental factors affect mood. |
| **Automated backups** | Weekly log backups; schedule, retention and driver options in `config.yaml`. |
| **Extensible architecture** | Add new sensor drivers or dashboard widgets with minimal effort. |

---  

## Installation

ComfortZone requires **Python 3.8+** and **Node 14+**.

```bash
pip install -r requirements.txt   # Python
npm install                       # Node.js
```

`requirements.txt` contains only Python libraries; `package.json` lists the UI dependencies.

---  

## Configuration

Run `python -m comfortzone --init` once to create the default files:

| File | Purpose |
|------|---------|
| `config.yaml` | Core settings – backup schedule, retention policy, driver options. |
| `widgets.json` | Dashboard layout and widget definitions. |

**Example `config.yaml`**

```yaml
backup:
  cron: "0 0 * * SUN"   # every Sunday at midnight

retention:
  logs: 7    # keep logs for 7 days
  backups: 30   # keep backups for 30 days
```

Edit the files to suit your environment. The dashboard reloads automatically when `widgets.json` changes.

---  

## Usage

### Log sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

*Units: °C, %, dB (as defined by the sensor drivers).*

### Record a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

`score` must be an integer between 1 (least comfortable) and 5 (most comfortable).

### Dashboard

Open <http://localhost:3000> after `npm start`.  
Edit `widgets.json` to add, remove, or reposition widgets and refresh the page.

### Backups & retention

Backups run according to the cron expression in `config.yaml`.  
The `retention` section controls how long logs and backups are kept.

---  

## Tips

- Pair ComfortZone with a smart thermostat to view how temperature changes influence focus.
- The noise widget highlights irregular spikes that may disturb work.
- Log a mood before each task; the analytics engine recommends your ideal environment.

---  

## Contributing

Pull requests are welcome.

1. Keep your branch up‑to‑date with `main`.  
2. Follow the style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
3. All contributions are licensed under MIT.

---  

## License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---  

## Changelog

- **2026‑09‑01** – Added quick‑start guide, refined feature list.  
- **2026‑08‑30** – Updated badges; introduced `config.yaml` for backup and retention.  
- **2026‑08‑28** – Initial README rewrite and typo corrections.
