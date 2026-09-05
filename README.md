# ComfortZone

**ComfortZone** is an open‑source, cross‑platform toolkit that logs environmental sensor data (temperature, humidity, ambient noise) and mood scores, visualises their relationship on a live dashboard, and backs up the results automatically.  
The back‑end is written in Python; the front‑end dashboard is a Node.js SPA.

---

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)  
[![GitHub Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)  
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)  
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)  
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

---

## Quick Start (5 minutes)

```bash
# 1. Clone and change into the repository
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2. Install dependencies
pip install -r requirements.txt   # Python core
npm install                           # Front‑end assets

# 3. Create default config files
python -m comfortzone --init   # → config.yaml & widgets.json

# 4. Run the dashboard
npm start   # opens http://localhost:3000
```

The dashboard watches `widgets.json`. Any change is applied instantly.

---

## Features

| Feature | Description |
|---------|-------------|
| **Continuous logging** | Collect temperature (°C), humidity (%), and ambient noise (dB) from connected sensors. |
| **Mood capture** | Log a 1‑5 comfort score and optional note via CLI. |
| **Custom UI** | Arrange widgets in `widgets.json`. |
| **Correlation view** | Visualise environmental influence on mood in real time. |
| **Automated backups** | Weekly log backups, configurable via `config.yaml`. |
| **Extensible** | Add new sensor drivers or dashboard widgets with minimal effort. |

---

## Installation

```bash
# Python dependencies
pip install -r requirements.txt

# Node.js dependencies
npm install
```

> **Prerequisites**: Python 3.8+ and Node.js 14+.

---

## Configuration

Run `python -m comfortzone --init` once to generate the default files.

| File | Purpose |
|------|---------|
| `config.yaml` | Core settings – backup schedule, retention policy, driver options. |
| `widgets.json` | Dashboard layout and widget definitions. |

### Sample `config.yaml`

```yaml
backup:
  cron: "0 0 * * SUN"   # every Sunday at midnight
retention:
  logs: 7      # keep logs for 7 days
  backups: 30  # keep backups for 30 days
```

Edit these files to match your environment.  
`widgets.json` is hot‑reloaded by the dashboard.

---

## Usage

### Log sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

Units are °C, %, dB as defined by the sensor drivers.

### Record a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

`score` must be an integer between 1 (least comfortable) and 5 (most comfortable).

### Dashboard

Open <http://localhost:3000> after `npm start`.  
Manipulate `widgets.json` to add, remove, or reposition widgets; the page refreshes automatically.

### Backups & retention

Backups run according to the cron expression in `config.yaml`.  
The `retention` section controls how long logs and backups are kept.

---

## Tips

- Pair ComfortZone with a smart thermostat to observe how temperature adjustments affect focus.
- The noise widget highlights irregular dB spikes that may disturb concentration.
- Log a mood before each task; the analytics engine will suggest your ideal environment.

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
