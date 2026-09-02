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

## 🚀 Getting Started (5 min)

```bash
# 1️⃣ Clone the repo
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣ Install dependencies
pip install -r requirements.txt
npm install

# 3️⃣ Create default configuration files
python -m comfortzone --init   # produces config.yaml + widgets.json

# 4️⃣ Launch the dashboard
npm start   # → http://localhost:3000
```

Open the dashboard, use the CLI to log sensors or moods, and start visualising your workspace health.

---

## 📚 Features

- **Continuous recording** – logs temperature, humidity and ambient noise automatically.
- **Mood capture** – record a 1–5 comfort score and an optional note via CLI.
- **Customisable UI** – a Node.js dashboard whose layout is defined in `widgets.json`.
- **Correlation visualisation** – shows how environmental factors relate to mood.
- **Automated backups** – weekly log backups with configurable schedule and retention.
- **Extensible** – add sensor drivers or dashboard widgets with minimal effort.

---

## 🔧 Configuration

| File | Purpose |
|------|---------|
| `config.yaml` | Main settings – backup schedule, retention, driver options. |
| `widgets.json` | Dashboard layout and widget definitions. |

An example `config.yaml`:

```yaml
backup:
  cron: "0 0 * * SUN"   # Every Sunday at midnight
retention:
  logs: 7                # Keep logs for 7 days
  backups: 30           # Keep backups for 30 days
```

---

## 📦 Usage

### Log sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

Units: °C, %, dB (according to the sensor drivers).

### Record a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

`score` must be an integer between 1 (least comfortable) and 5 (most comfortable).

### Edit the dashboard

Modify `widgets.json` to add, remove or rearrange widgets. Reload the page to see the changes.

### Backups & retention

Backups run automatically based on the cron expression in `config.yaml`. The `retention` section controls how long logs and backups are kept.

---

## 💡 Tips

- Pair ComfortZone with a smart thermostat to see how temperature adjustments affect focus.
- The noise widget can highlight irregular spikes that may disturb work.
- Logging a mood before each task provides enough data for the analytics engine to discover your ideal environment.

---

## 🤝 Contributing

We welcome contributions!

1. Keep your branch up‑to‑date with `main` before opening a PR.
2. Follow the style conventions in [CONTRIBUTING.md](CONTRIBUTING.md).
3. All contributions are licensed under the MIT license.

---

## 📜 License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## 📅 Changelog

- **2026‑09‑01** – Minor README cleanup, added Quick‑start guide and refined feature list.  
- **2026‑08‑30** – Updated badges, introduced `config.yaml` for backup and retention settings.  
- **2026‑08‑28** – Initial README rewrite and typo corrections.
