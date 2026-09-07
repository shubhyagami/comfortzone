# ComfortZone

**ComfortZone** is a lightweight, cross‑platform toolkit that collects environmental sensor data (temperature, humidity, ambient noise) and mood scores, visualises their relationships on a live dashboard, and backs them up automatically.

The back‑end is written in Python, while the front‑end is a single‑page application built with Node.js.

---

## 🏷 Badges

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

---

## 🚀 Quick Start

```bash
# 1️⃣ Clone the repo
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣ Install back‑end dependencies
pip install -r requirements.txt

# 3️⃣ Install front‑end assets
npm install

# 4️⃣ Generate default configuration files
python -m comfortzone --init   # creates config.yaml & widgets.json

# 5️⃣ Run the dashboard
npm start   # opens http://localhost:3000
```

The dashboard watches `widgets.json`. Any change is applied instantly.

---

## ✨ Features

- **Continuous logging** – temperature (°C), humidity (%), ambient noise (dB).  
- **Mood capture** – integer score (1–5) with optional note.  
- **Customisable UI** – layout defined in `widgets.json`; hot‑reloaded.  
- **Real‑time correlation** – visualises how environmental conditions affect mood.  
- **Automated backups** – weekly log backups with configurable schedule and retention.  
- **Extensible** – add new sensor drivers or dashboard widgets with minimal effort.

---

## 📦 Installation

```bash
# Python dependencies
pip install -r requirements.txt

# Node.js dependencies
npm install
```

**Prerequisites**: Python 3.8+ and Node.js 14+.

---

## ⚙️ Configuration

Run `python -m comfortzone --init` once to generate the default configuration files:

| File          | Purpose |
|---------------|---------|
| `config.yaml` | Core settings – backup schedule, retention, driver options. |
| `widgets.json` | Dashboard layout and widget definitions. |

### Example `config.yaml`

```yaml
backup:
  cron: "0 0 * * SUN"   # every Sunday at midnight
retention:
  logs: 7      # keep logs for 7 days
  backups: 30  # keep backups for 30 days
```

Edit these files to match your environment. `widgets.json` is hot‑reloaded by the dashboard.

---

## 📚 Usage

### Log sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

Units are defined by the sensor drivers: °C, %, dB.

### Record a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

`score` must be an integer between 1 (least comfortable) and 5 (most comfortable).

### Dashboard

After `npm start`, open <http://localhost:3000>.  
Modify `widgets.json` to add, remove, or reposition widgets; the page refreshes automatically.

### Backups & retention

Backups run according to the cron expression in `config.yaml`.  
The `retention` section controls how long logs and backups are kept.

---

## 💡 Tips

- Pair ComfortZone with a smart thermostat to observe how temperature changes influence focus.  
- The noise widget highlights irregular dB spikes that may disturb concentration.  
- Log a mood before each task; the analytics engine will suggest your ideal environment.

---

## 🤝 Contributing

Pull requests are welcome.

1. Keep your branch up‑to‑date with `main`.  
2. Follow the style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
3. All contributions are licensed under MIT.

---

## 📜 License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## 🔄 Changelog

- **2026‑09‑07** – Minor documentation cleanup and typo fixes.  
- **2026‑09‑01** – Added quick‑start guide and updated feature list.  
- **2026‑08‑30** – Updated badges; introduced `config.yaml` for backup and retention.  
- **2026‑08‑28** – Initial README rewrite and typo corrections.
