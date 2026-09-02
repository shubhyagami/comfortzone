# ComfortZone

*A lightweight, cross‑language toolkit for monitoring and improving workspace comfort.*

---

## Badges

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)  
![Version](https://img.shields.io/github/v/release/shubhyagami/comfortzone?label=version&style=flat-square)  
![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)  
![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)  
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

---

## Quick start – 5 minutes

```bash
# 1️⃣ Clone the repository
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣ Install dependencies
pip install -r requirements.txt
npm install

# 3️⃣ Generate default configuration
python -m comfortzone --init   # creates config.yaml and widgets.json

# 4️⃣ Launch the dashboard
npm start                     # → http://localhost:3000
```

Open the dashboard, log a few data points with the CLI, and start visualising your workspace health.

---

## What ComfortZone does

| Feature | Description |
|---------|-------------|
| **Continuous recording** | Automatically logs temperature, humidity and ambient noise. |
| **Mood capture** | Record a 1–5 comfort score (and optional note) via a simple CLI command. |
| **Customisable UI** | A Node.js dashboard whose layout is defined in `widgets.json`. |
| **Correlation visualisation** | Shows how environmental factors relate to mood. |
| **Automated backups** | Weekly log backups with schedule and retention configurable in `config.yaml`. |
| **Extensible** | Add new sensor drivers or dashboard widgets with minimal effort. |

---

## Installation & setup

### Prerequisites

* Python 3.8+ (uses `requirements.txt`)
* Node.js 14+ (uses `package.json`)

### Steps

```bash
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone
pip install -r requirements.txt
npm install
python -m comfortzone --init
```

You’ll now have:

* `config.yaml` – main configuration (backup schedule, retention, driver settings)
* `widgets.json` – dashboard layout

### Launch the dashboard

```bash
npm start
```

Visit <http://localhost:3000>.

---

## Usage

### Log sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

Units: °C, %, dB.

### Record a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

`score` is an integer from 1 (least comfortable) to 5 (most comfortable). The note is optional.

### Edit the dashboard

Modify `widgets.json` to add, remove or reorder widgets and reload the page.

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

## Tips

* Pair ComfortZone with a smart thermostat to see how temperature changes affect focus.
* Use the noise widget to spot irregular spikes that may disturb work.
* Log a mood before each task to give the analytics engine enough data to discover your ideal environment.

---

## Contributing

We welcome contributions! Please:

1. Keep your branch up‑to‑date with `main` before opening a PR.
2. Follow the conventions in [CONTRIBUTING.md](CONTRIBUTING.md).
3. All contributions are licensed under MIT.

---

## License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## Changelog

- **2026‑09‑01** – Minor README cleanup, added quick‑start guide and refined feature list.  
- **2026‑08‑30** – Updated badges, introduced `config.yaml` for backup and retention settings.  
- **2026‑08‑28** – Initial README rewrite and typo corrections.
