[K[2m  [2mmodel z-ai/glm-5.3-flash failed, trying next...[0m[0m
[K[2m  [2mmodel deepseek-ai/deepseek-v4.1-flash failed, trying next...[0m[0m
# ComfortZone

[![MIT License](https://img.shields.io/github/license/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/blob/main/LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![CI](https://github.com/shubhyagami/comfortzone/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/shubhyagami/comfortzone/actions)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/shubhyagami/comfortzone/pulls)

ComfortZone is a lightweight, cross‑platform toolkit that logs environmental sensor data—temperature, humidity, and ambient noise—alongside user‑reported mood scores. A real‑time dashboard visualises the data and can automatically back up the logs on a schedule you define.

---

## Quick start

```bash
# 1️⃣ Clone the repo
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣ Create and activate a Python virtual environment
python -m venv .venv
source .venv/bin/activate          # macOS / Linux
.\\.venv\\Scripts\\activate         # Windows PowerShell

# 3️⃣ Install dependencies
pip install -r requirements.txt
npm install

# 4️⃣ Initialise configuration and the database
python -m comfortzone --init

# 5️⃣ Launch the dashboard
npm start
```

Open <http://localhost:3000> in a browser. The dashboard refreshes automatically when `widgets.json` is edited.

## Prerequisites

| Component | Minimum version | Role |
|-----------|-----------------|------|
| Python    | 3.8+            | Backend |
| Node.js   | 14+             | Frontend SPA |
| npm       | 6+              | Package manager (bundled with Node.js) |

## Configuration

On first run, ComfortZone creates two files in the repository root:

| File          | Purpose |
|---------------|---------|
| `config.yaml` | Core backend settings (backup schedule, retention, driver options). |
| `widgets.json`| Layout and configuration of the dashboard widgets. |

**config.yaml**

```yaml
backup:
  cron: "0 0 * * SUN"   # Sunday at midnight

retention:
  logs: 7      # days
  backups: 30  # days
```

Edit the file to match your environment. The dashboard automatically reloads changes made to `widgets.json`.

## Command‑line interface

View all options with:

```bash
python -m comfortzone --help
```

### Log sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

| Option | Description |
|--------|-------------|
| `--temp` | Temperature in °C (required). |
| `--humidity` | Relative humidity in % (required). |
| `--noise` | Ambient noise level in dB (required). |

### Record mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

| Option | Description |
|--------|-------------|
| `--score` | Integer 1–5 (1 = least comfortable, 5 = most). |
| `--note` | Optional descriptive text. |

### Initialise the environment

```bash
python -m comfortzone --init
```

This creates the SQLite database and the two configuration files.

### Dashboard

```bash
npm start
```

Open <http://localhost:3000>. The UI is built from `widgets.json`, and any edits are applied on the fly.

### Backups & retention

Backups execute according to the `cron` expression in `config.yaml`. Retention rules govern how many days logs and backup archives are kept.

## Features

- Real‑time logging of temperature, humidity, and ambient noise.  
- Mood capture with a 1–5 score and optional note.  
- Live‑refreshing dashboard with customizable widgets (`widgets.json`).  
- Analytics that correlate environmental data with mood.  
- Cron‑based backups and configurable retention.  
- Extensible architecture: add new sensor drivers or widgets with minimal effort.

## Tips

- Pair ComfortZone with a smart thermostat to see how temperature changes affect your focus or relaxation.  
- The noise widget flags irregular dB spikes that may disturb concentration.  
- Log a mood before starting a task; the analytics engine can suggest the ideal environment for that activity.

## Contributing

Pull requests are welcome! Please:

1. Keep your branch up‑to‑date with `main`.  
2. Follow the style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
3. Include tests for new features.  
4. All contributions are licensed under the MIT license.

## License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

## Changelog

- **2026‑09‑28** – README cleanup and reorganization.  
- **2026‑09‑25** – Added quick‑start guide and updated configuration section.  
- **2026‑09‑20** – Minor documentation fixes.  
- **2026‑09‑07** – Updated feature list.
