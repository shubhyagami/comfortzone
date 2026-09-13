# ComfortZone

**ComfortZone** is a lightweight, cross‑platform toolkit that collects environmental sensor data—temperature, humidity, and ambient noise—alongside mood scores. It visualises their relationships on a live dashboard and automatically backs up all logs.

The back‑end is Python‑based, while the front‑end is a single‑page application built with Node.js.

---

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

---

## Quick Start

```bash
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# Backend
pip install -r requirements.txt

# Frontend
npm install

# Initialise configuration
python -m comfortzone --init

# Run the dashboard
npm start
```

The dashboard will be available at <http://localhost:3000>. Changes to `widgets.json` are hot‑reloaded automatically.

---

## Features

- **Continuous logging** of temperature (°C), humidity (%), and ambient noise (dB).  
- **Mood capture** with a 1–5 score and optional note.  
- **Customisable UI** defined in `widgets.json`; live‑reload on edits.  
- **Real‑time correlation charts** showing how environment affects mood.  
- **Automated backups** scheduled via cron syntax in `config.yaml`, with configurable retention.  
- **Extensible** – add new sensor drivers or dashboard widgets with minimal effort.

---

## Configuration

Run `python -m comfortzone --init` once to create two files:

| File          | Purpose |
|---------------|---------|
| `config.yaml` | Core settings – backup schedule, retention, driver options. |
| `widgets.json` | Dashboard layout and widget definitions. |

### Example `config.yaml`

```yaml
backup:
  cron: "0 0 * * SUN"   # Execute every Sunday at midnight
retention:
  logs: 7      # Keep logs for 7 days
  backups: 30 # Keep backups for 30 days
```

Edit these files to match your environment. `widgets.json` is hot‑reloaded by the dashboard.

---

## Usage

### Log sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

- `--temp` – temperature in °C.  
- `--humidity` – percentage.  
- `--noise` – noise level in dB.

### Record a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

- `--score` – integer between 1 (least comfortable) and 5 (most comfortable).  
- `--note` – optional descriptive text.

### Dashboard

After running `npm start`, open <http://localhost:3000>.  
Modify `widgets.json` to add, remove, or reposition widgets; the page updates immediately.

### Backups & retention

Backups run according to the cron expression in `config.yaml`.  
The `retention` section controls how long logs and backup archives are kept on disk.

---

## Tips

- Pair ComfortZone with a smart thermostat to see how temperature changes affect focus or relaxation.  
- The noise widget highlights irregular dB spikes that may disturb concentration.  
- Log a mood before every task; the analytics engine can suggest the ideal environment for that activity.

---

## Contributing

Pull requests are welcome.

1. Keep your branch up‑to‑date with `main`.  
2. Follow the coding style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
3. All contributions are licensed under MIT.

---

## License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## Changelog

- **2026‑09‑07** – Minor documentation cleanup and typo fixes.  
- **2026‑09‑01** – Added quick‑start guide and updated feature list.  
- **2026‑08‑30** – Updated badges; introduced `config.yaml` for backup and retention.  
- **2026‑08‑28** – Initial README rewrite and typo corrections.
