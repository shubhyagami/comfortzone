[K[2m  [2mmodel z-ai/glm-5.3-flash failed, trying next...[0m[0m
[K[2m  [2mmodel deepseek-ai/deepseek-v4.1-flash failed, trying next...[0m[0m
# ComfortZone

[![MIT License](https://img.shields.io/github/license/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/blob/main/LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![CI](https://github.com/shubhyagami/comfortzone/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/shubhyagami/comfortzone/actions)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/shubhyagami/comfortzone/pulls)

ComfortZone is a lightweight, cross‑platform toolkit that logs environmental sensor data—temperature, humidity, and ambient noise—alongside user‑reported mood scores. A real‑time dashboard visualises the data, and a cron‑based backup system keeps the logs safe.

---

## Table of contents

- [Quick start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Command line interface](#command-line-interface)
  - [Log sensor data](#log-sensor-data)
  - [Record mood](#record-mood)
  - [Initialise environment](#initialise-environment)
- [Dashboard](#dashboard)
- [Backups & retention](#backups--retention)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Changelog](#changelog)

---

## Quick start

```bash
# 1️⃣ Clone the repository
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣ Create a Python virtual environment and activate it
python -m venv .venv
source .venv/bin/activate          # macOS / Linux
.\\.venv\\Scripts\\activate         # Windows PowerShell

# 3️⃣ Install the Python and Node dependencies
pip install -r requirements.txt
npm install

# 4️⃣ Initialise the configuration files and database
python -m comfortzone --init

# 5️⃣ Start the front‑end dashboard
npm start
```

Open <http://localhost:3000> in a browser. The dashboard refreshes automatically when `widgets.json` is edited.

---

## Prerequisites

| Component | Minimum version | Role |
|-----------|-----------------|------|
| Python    | 3.8+            | Backend engine |
| Node.js   | 14+             | Front‑end SPA |
| npm       | 6+              | JavaScript package manager |

---

## Installation

Follow the steps in the **Quick start** section.  
If you only need the backend (e.g., for a headless logger), you can skip the `npm` step and run `python -m comfortzone --init` to create the database and config files.

---

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
  logs: 7      # Keep logs for 7 days
  backups: 30  # Keep backup archives for 30 days
```

Edit `config.yaml` to match your environment. The dashboard watches `widgets.json` and reloads instantly when changes are detected.

---

## Command‑line interface

```bash
python -m comfortzone --help
```

### Log sensor data

```bash
python -m comfortzone log --temp <°C> --humidity <%> --noise <dB>
```

| Option     | Required | Description |
|------------|----------|-------------|
| `--temp`   | ✔        | Temperature in degrees Celsius. |
| `--humidity` | ✔    | Relative humidity in percent. |
| `--noise`  | ✔        | Ambient noise level in decibels. |

### Record mood

```bash
python -m comfortzone mood --score <1‑5> [--note “text”]
```

| Option   | Required | Description |
|----------|----------|-------------|
| `--score` | ✔   | Integer from 1 (least comfortable) to 5 (most). |
| `--note`  | ✘   | Optional descriptive text. |

### Initialise the environment

```bash
python -m comfortzone --init
```

Creates the SQLite database (`data.db`) and the two configuration files mentioned above.

---

## Dashboard

```bash
npm start
```

The dashboard is served at <http://localhost:3000>. It automatically refreshes as new sensor data or mood entries arrive. Customise the layout and widget behaviour by editing `widgets.json`.

---

## Backups & retention

- Backups run according to the `cron` expression defined under `backup:` in `config.yaml`.
- The `retention:` section controls how many days logs and backup archives are kept. Older files are purged automatically.

---

## Features

- **Real‑time logging** of temperature, humidity, and ambient noise.
- **Mood capture** with a 1–5 score and optional note.
- **Live‑refreshing front‑end** built from `widgets.json`.
- **Analytics** that correlate environmental data with mood.
- **Cron‑based backups** and configurable retention policies.
- **Extensible architecture**: add new sensor drivers or widgets with minimal effort.

---

## Contributing

Pull requests are welcome! To contribute:

1. Fork the repository and create a feature branch.  
2. Keep your branch up‑to‑date with `main`.  
3. Follow the style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
4. Add tests for any new functionality.  
5. Ensure all tests pass (`pytest`) before submitting.

All contributions are licensed under the MIT license.

---

## License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## Changelog

- **2026‑09‑28** – README cleanup and re‑organisation.  
- **2026‑09‑25** – Added quick‑start guide and updated configuration section.  
- **2026‑09‑20** – Minor documentation fixes.  
- **2026‑09‑07** – Updated feature list.
