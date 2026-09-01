# ComfortZone

*A lightweight, cross‑language toolkit for monitoring and improving workspace comfort.*

---

## 🔖 Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/github/v/release/shubhyagami/comfortzone?label=version&style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

---

## 🚀 Quick start – 5 minutes

```bash
# 1️⃣  Clone
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣  Install Python deps
pip install -r requirements.txt

# 3️⃣  Install Node.js deps
npm install

# 4️⃣  Create default config files
python -m comfortzone --init   # config.yaml + widgets.json

# 5️⃣  Launch the dashboard
npm start                     # → http://localhost:3000
```

Open the dashboard, log a few data points with the CLI, and start visualising your workspace health.

---

## 📚 What it does

| Feature | Description |
|--------|-------------|
| **Continuous recording** | Logs temperature, humidity and ambient noise automatically. |
| **Mood capture** | Record a 1‑5 comfort score (plus optional note) via a simple CLI command. |
| **Customisable UI** | A Node.js dashboard whose layout is defined in `widgets.json`. |
| **Correlation visualisation** | Shows how environmental factors relate to mood. |
| **Automated backups** | Weekly log backups, schedule and retention are set in `config.yaml`. |
| **Extensible** | Add new sensor drivers or dashboard widgets with minimal effort. |

---

## 🛠️ Installation & setup

### Prerequisites

- **Python 3.8+** (uses `requirements.txt`)
- **Node.js 14+** (uses `package.json`)

### Steps

```bash
# Clone the repo
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies
npm install

# Generate default configuration files
python -m comfortzone --init
```

You will now have:

- `config.yaml` – main configuration (backup schedule, retention, driver settings).
- `widgets.json` – dashboard layout.

### Launch the dashboard

```bash
npm start
```

Visit <http://localhost:3000> to see the live dashboard.

---

## 📦 Usage

### Log sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

Values are in the units expected by the sensor drivers (°C, %, dB).

### Record a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

`score` is an integer between 1 (least comfortable) and 5 (most comfortable). The note is optional.

### Edit the dashboard

Modify `widgets.json` to add, remove or rearrange widgets. Reload the page to see changes.

### Backup & retention

Backups run automatically according to the cron expression in `config.yaml`. Example:

```yaml
backup:
  cron: "0 0 * * SUN"   # every Sunday at midnight
retention:
  logs: 7                # keep logs for 7 days
  backups: 30            # keep backups for 30 days
```

---

## 💡 Tips

- Pair ComfortZone with a smart thermostat to see how temperature adjustments affect focus.
- The noise widget can highlight irregular spikes that may disturb work.
- Logging a mood before each task gives the analytics engine enough data to discover your ideal environment.

---

## 🤝 Contributing

We welcome contributions! Please:

1. Keep your branch up‑to‑date with `main` before opening a PR.
2. Follow the conventions in [CONTRIBUTING.md](CONTRIBUTING.md).
3. All contributions are licensed under MIT.

---

## 📜 License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## 📅 Changelog

- **2026‑09‑01** – Minor README cleanup, added Quick‑start guide and refined feature list.  
- **2026‑08‑30** – Updated badges, introduced `config.yaml` for backup and retention settings.  
- **2026‑08‑28** – Initial README rewrite and typo corrections.
