# ComfortZone

A lightweight, cross‑language toolkit for logging environmental data and mood, visualising their relationship, and backing up the results.

---

## 📦 Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

---

## 🚀 Quick Start (under 5 min)

```bash
# 1. Clone the repository
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2. Install the two sides
pip install -r requirements.txt   # Python
npm install                         # Node.js

# 3. Generate configuration files
python -m comfortzone --init   # creates config.yaml and widgets.json

# 4. Launch the dashboard
npm start   # opens http://localhost:3000
```

The dashboard automatically picks up changes to `widgets.json`.  
Log sensor readings and moods from the CLI; visualisation updates in real time.

---

## ✨ Features

| Feature | Brief description |
|---------|-------------------|
| Continuous logging | Automatically records temperature, humidity, and ambient noise from connected sensors. |
| Mood capture | Record a 1–5 comfort score and an optional note via the CLI. |
| Customizable UI | Define widget layout in `widgets.json`. |
| Correlation visualisation | See how environmental factors influence mood. |
| Automated backups | Weekly backups of log data; schedule and retention set in `config.yaml`. |
| Extensible | Add new sensor drivers or dashboard widgets with minimal effort. |

---

## 🛠️ Installation

ComfortZone uses both Python for data handling and Node.js for the web dashboard.

```bash
pip install -r requirements.txt   # Python core
npm install                       # Front‑end assets
```

The `requirements.txt` contains only Python dependencies; `package.json` handles the UI side.

---

## ⚙️ Configuration

`comfortzone --init` creates two files in the project root:

| File | Purpose |
|------|---------|
| `config.yaml` | Core settings – backup schedule, retention policy, driver options. |
| `widgets.json` | Dashboard layout and widget definitions. |

### Example `config.yaml`

```yaml
backup:
  cron: "0 0 * * SUN"   # Every Sunday at midnight

retention:
  logs: 7   # Keep logs for 7 days
  backups: 30   # Keep backups for 30 days
```

Adjust these files as needed. The dashboard reloads automatically when `widgets.json` changes.

---

## 📚 Usage

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

### Dashboard editing

Edit `widgets.json` to add, remove, or reposition widgets and refresh the page.

### Backups & retention

Backups run according to the cron expression defined in `config.yaml`.  
The `retention` section controls how long logs and backups are kept.

---

## 💡 Tips

- Pair ComfortZone with a smart thermostat to see how temperature changes influence focus.  
- The noise widget flags irregular spikes that may disturb work.  
- Log a mood before each task; the analytics engine will use the data to recommend your ideal environment.

---

## 🤝 Contributing

We welcome contributions!

1. Keep your branch up‑to‑date with `main` before opening a PR.  
2. Follow the style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
3. All contributions are licensed under MIT.

---

## 📜 License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## 📅 Changelog

- **2026‑09‑01** – Added quick‑start guide, refined feature list.  
- **2026‑08‑30** – Updated badges; introduced `config.yaml` for backup and retention.  
- **2026‑08‑28** – Initial README rewrite and typo corrections.
